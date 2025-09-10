# 🎄 Pathway Vineyard Christmas Store - Multi-Campus Deployment Guide

This guide will help you deploy the Christmas Store registration system for all three Pathway Vineyard campuses.

## 🏫 Campus Information

### 1. **Lewiston Campus** (Purple Theme)
- **Location**: Lewiston, Maine
- **Contact**: lewiston@pathwayvineyard.com
- **Time Slots**: 09:00 - 11:30 (30-minute intervals)
- **Default Capacity**: 20 people per slot
- **Colors**: Purple (#7c3aed) and Green (#059669)

### 2. **Brunswick Campus** (Green Theme)
- **Location**: Brunswick, Maine  
- **Contact**: brunswick@pathwayvineyard.com
- **Time Slots**: 10:00 - 12:30 (30-minute intervals)
- **Default Capacity**: 25 people per slot
- **Colors**: Green (#059669) and Red (#dc2626)

### 3. **Gray-New Gloucester Campus** (Red Theme)
- **Location**: Gray-New Gloucester, Maine
- **Contact**: gray@pathwayvineyard.com  
- **Time Slots**: 08:30 - 11:00 (30-minute intervals)
- **Default Capacity**: 15 people per slot
- **Colors**: Red (#dc2626) and Yellow (#f59e0b)

## 🚀 **Quick Deployment (3 Separate Apps)**

### **Prerequisites**
```bash
# Install AWS CLI and configure
aws configure

# Install Amplify CLI  
npm install -g @aws-amplify/cli

# Clone the repository
git clone <your-repo-url>
cd christmas-store-registration
```

### **Method 1: Separate Directories (Recommended)**

```bash
# Create 3 separate project directories
cp -r . ../lewiston-christmas-store
cp -r . ../brunswick-christmas-store  
cp -r . ../gray-christmas-store

# Deploy Lewiston Campus
cd ../lewiston-christmas-store
export NEXT_PUBLIC_LOCATION=location1
amplify init --appname lewiston-christmas-store --yes
amplify push --yes

# Deploy Brunswick Campus
cd ../brunswick-christmas-store
export NEXT_PUBLIC_LOCATION=location2  
amplify init --appname brunswick-christmas-store --yes
amplify push --yes

# Deploy Gray Campus
cd ../gray-christmas-store
export NEXT_PUBLIC_LOCATION=location3
amplify init --appname gray-christmas-store --yes  
amplify push --yes
```

### **Method 2: Using Deployment Script**

```bash
# Make deployment script executable
chmod +x scripts/deploy-location.sh

# Deploy all 3 locations
./scripts/deploy-location.sh location1  # Lewiston
./scripts/deploy-location.sh location2  # Brunswick
./scripts/deploy-location.sh location3  # Gray
```

## ⚙️ **Environment Variables Setup**

After deployment, set these environment variables for each Lambda function in the AWS Console:

### **For Each Campus, Set These Variables:**

#### **Lewiston Campus (location1):**
```bash
LOCATION_NAME="Pathway Vineyard Lewiston Campus"
LOCATION_ADDRESS="Lewiston, Maine"
CONTACT_EMAIL="lewiston@pathwayvineyard.com"
FROM_EMAIL="noreply@pathwayvineyard.com"
PRIMARY_COLOR="#7c3aed"
SECONDARY_COLOR="#059669"
LOCATION_EMOJI="⛪"
FRONTEND_URL="https://your-lewiston-app-id.amplifyapp.com"
```

#### **Brunswick Campus (location2):**
```bash
LOCATION_NAME="Pathway Vineyard Brunswick Campus"
LOCATION_ADDRESS="Brunswick, Maine"
CONTACT_EMAIL="brunswick@pathwayvineyard.com"  
FROM_EMAIL="noreply@pathwayvineyard.com"
PRIMARY_COLOR="#059669"
SECONDARY_COLOR="#dc2626"
LOCATION_EMOJI="⛪"
FRONTEND_URL="https://your-brunswick-app-id.amplifyapp.com"
```

#### **Gray Campus (location3):**
```bash
LOCATION_NAME="Pathway Vineyard Gray-New Gloucester Campus"
LOCATION_ADDRESS="Gray-New Gloucester, Maine"
CONTACT_EMAIL="gray@pathwayvineyard.com"
FROM_EMAIL="noreply@pathwayvineyard.com" 
PRIMARY_COLOR="#dc2626"
SECONDARY_COLOR="#f59e0b"
LOCATION_EMOJI="⛪"
FRONTEND_URL="https://your-gray-app-id.amplifyapp.com"
```

## 📧 **Email Configuration**

### **1. Setup Custom Domain in Amazon SES**

1. **Add Domain**: Go to SES Console → Verified identities → Create identity → Domain
2. **Add DNS Records**: Add the TXT and CNAME records to your domain's DNS
3. **Request Production Access**: Submit production access request for `noreply@pathwayvineyard.com`

### **2. DNS Records to Add**

Add these records to your `pathwayvineyard.com` DNS:

```dns
# Domain Verification
Type: TXT
Name: @
Value: amazonses:YOUR_VERIFICATION_STRING

# DKIM Records (3 records)
Type: CNAME
Name: abc123._domainkey
Value: abc123.dkim.amazonses.com

Type: CNAME  
Name: def456._domainkey
Value: def456.dkim.amazonses.com

Type: CNAME
Name: ghi789._domainkey
Value: ghi789.dkim.amazonses.com
```

## 👥 **Admin User Setup**

For each campus, create admin users:

```bash
# Create admin users for each campus
aws cognito-idp admin-create-user \
  --user-pool-id us-east-1_YOURPOOL \
  --username lewiston-admin \
  --user-attributes Name=email,Value=admin-lewiston@pathwayvineyard.com \
  --temporary-password TempPass123! \
  --message-action SUPPRESS

aws cognito-idp admin-add-user-to-group \
  --user-pool-id us-east-1_YOURPOOL \
  --username lewiston-admin \
  --group-name admin
```

## 🌐 **Custom Domain Setup (Optional)**

### **Setup Custom Domains:**
- Lewiston: `lewiston.christmasstore.pathwayvineyard.com`
- Brunswick: `brunswick.christmasstore.pathwayvineyard.com`  
- Gray: `gray.christmasstore.pathwayvineyard.com`

```bash
# Add custom domain to each Amplify app
aws amplify create-domain-association \
  --app-id YOUR_APP_ID \
  --domain-name lewiston.christmasstore.pathwayvineyard.com \
  --sub-domain-settings prefix="",branch-name="main"
```

## 📊 **Post-Deployment Checklist**

### **For Each Campus:**

#### ✅ **Test Registration System**
- [ ] Visit registration page
- [ ] Complete a test registration
- [ ] Verify email confirmation is sent
- [ ] Check registration appears in admin dashboard

#### ✅ **Test Admin Features**  
- [ ] Login to admin dashboard
- [ ] View registrations
- [ ] Send attendance confirmation emails
- [ ] Test registration open/close controls
- [ ] Test invite-only mode

#### ✅ **Test Email System**
- [ ] Test confirmation emails
- [ ] Test attendance confirmation emails  
- [ ] Verify campus-specific branding
- [ ] Check links work correctly

#### ✅ **Capacity Management**
- [ ] Verify time slots show correct capacity
- [ ] Test time slot management
- [ ] Verify registration counts update correctly

## 🔧 **Configuration Management**

### **Location-Specific Settings:**

Each campus can independently configure:
- **Time Slots**: Different start/end times
- **Capacity**: Different max registrations per slot
- **Registration Status**: Open/closed independently  
- **Invite-Only Mode**: Enable/disable per campus
- **Scheduled Closure**: Set automatic closure times
- **Custom Messages**: Personalize closure messages

### **Shared Settings:**
- Pathway Vineyard branding
- Contact website (pathwayvineyard.com)
- Email domain (@pathwayvineyard.com)

## 📱 **URLs After Deployment**

### **Registration Pages:**
- Lewiston: `https://YOUR-LEWISTON-ID.amplifyapp.com`
- Brunswick: `https://YOUR-BRUNSWICK-ID.amplifyapp.com`
- Gray: `https://YOUR-GRAY-ID.amplifyapp.com`

### **Admin Dashboards:**
- Lewiston: `https://YOUR-LEWISTON-ID.amplifyapp.com/admin`
- Brunswick: `https://YOUR-BRUNSWICK-ID.amplifyapp.com/admin`  
- Gray: `https://YOUR-GRAY-ID.amplifyapp.com/admin`

## 🎯 **Key Features by Campus**

All campuses have:
- ✅ **Independent Databases**: No data cross-contamination
- ✅ **Campus-Specific Branding**: Colors, logos, contact info
- ✅ **Custom Time Slots**: Each campus has different availability  
- ✅ **Flexible Capacity**: Different limits per campus
- ✅ **Email Customization**: Campus-specific sender and content
- ✅ **Admin Control**: Independent management for each location
- ✅ **Registration Control**: Open/close independently
- ✅ **Invite System**: Generate location-specific invite links

## 🆘 **Troubleshooting**

### **Common Issues:**

1. **Configuration not loading**: Check `NEXT_PUBLIC_LOCATION` environment variable
2. **Wrong campus showing**: Verify environment variables in Lambda functions  
3. **Emails not sending**: Check SES domain verification and production access
4. **Wrong colors/branding**: Verify environment variables are set correctly
5. **Time slots wrong**: Check location config JSON files

### **Support Contacts:**
- Technical: Your developer contact
- AWS Issues: Check AWS Console CloudWatch logs
- Email Issues: Check SES Console for bounce/complaint rates

---

🎄 **You now have 3 independent Christmas Store registration systems, one for each Pathway Vineyard campus!** 🎁

Each campus can operate completely independently with their own:
- Registration data and users
- Admin access and controls  
- Time slot configurations
- Email branding and messaging
- Capacity and availability settings

This setup ensures maximum flexibility while maintaining consistent Pathway Vineyard branding across all locations.