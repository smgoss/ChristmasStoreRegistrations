#!/usr/bin/env bash
set -euo pipefail

# Cleanup Amplify sandbox resources interactively.
# Usage:
#   ./scripts/cleanup-sandboxes.sh [FILTER]
# FILTER is a grep pattern to match resource names (default: "christmas|stephengoss|sandbox")

FILTER=${1:-"christmas|stephengoss|sandbox"}

echo "🔍 Filtering resources matching: $FILTER"
echo "This script will interactively offer to delete matched resources."
echo "It will touch Amplify Apps, CloudFormation stacks, and Lambda functions."
echo "Cognito and DynamoDB are NOT deleted by default."
echo

read -p "Proceed to enumerate resources? (y/N) " yn
if [[ ! "$yn" =~ ^[Yy]$ ]]; then
  echo "Aborted."
  exit 0
fi

echo
echo "=== Amplify Apps ==="
aws amplify list-apps --query 'apps[].{id:appId,name:name}' --output json | jq -r '.[] | "\(.id) \(.name)"' | grep -E "$FILTER" || true
echo
while read -r line; do
  [[ -z "$line" ]] && continue
  APP_ID=$(echo "$line" | awk '{print $1}')
  APP_NAME=$(echo "$line" | cut -d' ' -f2-)
  read -p "Delete Amplify App [$APP_NAME] (id=$APP_ID)? (y/N) " yn
  if [[ "$yn" =~ ^[Yy]$ ]]; then
    echo "🗑️  Deleting Amplify App $APP_NAME ($APP_ID)"
    aws amplify delete-app --app-id "$APP_ID" --no-cli-pager || echo "⚠️  Failed to delete $APP_ID"
  fi
done < <(aws amplify list-apps --query 'apps[].{id:appId,name:name}' --output json | jq -r '.[] | "\(.id) \(.name)"' | grep -E "$FILTER" || true)

echo
echo "=== CloudFormation Stacks ==="
aws cloudformation list-stacks --stack-status-filter CREATE_COMPLETE UPDATE_COMPLETE UPDATE_ROLLBACK_COMPLETE \
  --query 'StackSummaries[].{name:StackName,status:StackStatus}' --output json | jq -r '.[] | "\(.name) \(.status)"' | grep -E "$FILTER" || true
echo
while read -r sline; do
  [[ -z "$sline" ]] && continue
  STACK_NAME=$(echo "$sline" | awk '{print $1}')
  read -p "Delete CloudFormation stack [$STACK_NAME]? (y/N) " yn
  if [[ "$yn" =~ ^[Yy]$ ]]; then
    echo "🗑️  Deleting stack $STACK_NAME"
    aws cloudformation delete-stack --stack-name "$STACK_NAME" --no-cli-pager || echo "⚠️  Failed to delete $STACK_NAME"
  fi
done < <(aws cloudformation list-stacks --stack-status-filter CREATE_COMPLETE UPDATE_COMPLETE UPDATE_ROLLBACK_COMPLETE \
  --query 'StackSummaries[].{name:StackName,status:StackStatus}' --output json | jq -r '.[] | "\(.name) \(.status)"' | grep -E "$FILTER" || true)

echo
echo "=== Lambda Functions ==="
aws lambda list-functions --query 'Functions[].FunctionName' --output text | tr '\t' '\n' | grep -E "$FILTER" || true
echo
while read -r lname; do
  [[ -z "$lname" ]] && continue
  read -p "Delete Lambda function [$lname]? (y/N) " yn
  if [[ "$yn" =~ ^[Yy]$ ]]; then
    echo "🗑️  Deleting Lambda $lname"
    aws lambda delete-function --function-name "$lname" --no-cli-pager || echo "⚠️  Failed to delete $lname"
  fi
done < <(aws lambda list-functions --query 'Functions[].FunctionName' --output text | tr '\t' '\n' | grep -E "$FILTER" || true)

echo
echo "✅ Cleanup pass complete. Consider reviewing Cognito user pools and DynamoDB tables manually if they were sandbox-only."

