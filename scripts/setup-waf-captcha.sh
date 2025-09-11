#!/usr/bin/env bash
set -euo pipefail

# This script creates (if needed) and associates an AWS WAFv2 Web ACL (CLOUDFRONT scope)
# with CAPTCHA protection for /api/register to the Amplify Hosting CloudFront distribution.
# It is safe to run repeatedly (idempotent association). Requires: awscli, jq.

echo "[WAF] Starting WAF CAPTCHA setup"

AWS_REGION_GLOBAL="us-east-1" # WAF global control-plane for CloudFront

# Ensure prerequisites
if ! command -v aws >/dev/null 2>&1; then
  echo "[WAF] AWS CLI not found; skipping WAF setup"
  exit 0
fi
if ! command -v jq >/dev/null 2>&1; then
  echo "[WAF] jq not found; skipping WAF setup"
  exit 0
fi

# Get Amplify App ID (from amplify CLI)
APP_ID=$(amplify status --json 2>/dev/null | jq -r '.providers.awscloudformation.AmplifyAppId // empty')
if [ -z "$APP_ID" ]; then
  echo "[WAF] Could not determine Amplify AppId from 'amplify status'. Skipping WAF setup."
  exit 0
fi

BRANCH="${AWS_BRANCH:-main}"
ALT_DOMAIN="${BRANCH}.${APP_ID}.amplifyapp.com"
echo "[WAF] Targeting Amplify AppId: $APP_ID, branch: $BRANCH, domain: $ALT_DOMAIN"

# Resolve AWS Account ID (for CloudFront ARN)
ACCOUNT_ID=${AWS_ACCOUNT_ID:-}
if [ -z "$ACCOUNT_ID" ] || [ "$ACCOUNT_ID" = "000000000000" ]; then
  ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text 2>/dev/null || echo "000000000000")
fi
echo "[WAF] Using Account ID: $ACCOUNT_ID"

# Find CloudFront distribution by alternate domain name
DIST_ID=$(aws cloudfront list-distributions --query "DistributionList.Items[?Aliases.Items && contains(join('',Aliases.Items),'${ALT_DOMAIN}')].Id | [0]" --output text 2>/dev/null || true)
if [ -z "$DIST_ID" ] || [ "$DIST_ID" = "None" ]; then
  echo "[WAF] Could not find CloudFront distribution for $ALT_DOMAIN. Skipping WAF setup."
  exit 0
fi

echo "[WAF] CloudFront DistributionId: $DIST_ID"

ACL_NAME="amplify-${APP_ID}-waf-captcha"

# Check if Web ACL exists
ACL_ARN=$(aws wafv2 list-web-acls --scope CLOUDFRONT --region "$AWS_REGION_GLOBAL" \
  --query "WebACLs[?Name=='${ACL_NAME}'].ARN | [0]" --output text 2>/dev/null || true)

if [ -z "$ACL_ARN" ] || [ "$ACL_ARN" = "None" ]; then
  echo "[WAF] Creating Web ACL: $ACL_NAME"
  # Create a minimal Web ACL with one CAPTCHA rule and a managed ruleset
  CREATE_OUT=$(aws wafv2 create-web-acl \
    --name "$ACL_NAME" \
    --scope CLOUDFRONT \
    --region "$AWS_REGION_GLOBAL" \
    --default-action '{"Allow": {}}' \
    --visibility-config '{"SampledRequestsEnabled":true,"CloudWatchMetricsEnabled":true,"MetricName":"'"$ACL_NAME"'"}' \
    --rules '[
      {
        "Name": "captcha-register-path",
        "Priority": 0,
        "Action": { "Captcha": {} },
        "Statement": {
          "ByteMatchStatement": {
            "FieldToMatch": { "UriPath": {} },
            "SearchString": "/api/register",
            "TextTransformations": [{"Priority": 0, "Type": "NONE"}],
            "PositionalConstraint": "STARTS_WITH"
          }
        },
        "VisibilityConfig": {"SampledRequestsEnabled":true,"CloudWatchMetricsEnabled":true,"MetricName":"captcha-register-path"}
      },
      {
        "Name": "aws-managed-common",
        "Priority": 10,
        "OverrideAction": { "None": {} },
        "Statement": {
          "ManagedRuleGroupStatement": {
            "VendorName": "AWS",
            "Name": "AWSManagedRulesCommonRuleSet"
          }
        },
        "VisibilityConfig": {"SampledRequestsEnabled":true,"CloudWatchMetricsEnabled":true,"MetricName":"aws-managed-common"}
      }
    ]' \
    --query 'Summary.ARN' --output text)
  ACL_ARN="$CREATE_OUT" || true
  if [ -n "$ACL_ARN" ] && [ "$ACL_ARN" != "None" ]; then
    echo "[WAF] Created Web ACL ARN: $ACL_ARN"
  else
    echo "[WAF] Create Web ACL failed or skipped"
  fi
else
  echo "[WAF] Found existing Web ACL: $ACL_ARN"
fi

# Associate Web ACL with the CloudFront distribution
echo "[WAF] Associating Web ACL with Distribution $DIST_ID"
aws wafv2 associate-web-acl --scope CLOUDFRONT --region "$AWS_REGION_GLOBAL" \
  --web-acl-arn "$ACL_ARN" \
  --resource-arn "arn:aws:cloudfront::${ACCOUNT_ID}:distribution/${DIST_ID}" || true

echo "[WAF] WAF CAPTCHA setup complete."
