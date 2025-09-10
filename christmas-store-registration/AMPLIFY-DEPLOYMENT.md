# 🚀 Amplify Deployment Guide for Pathway Vineyard Christmas Store

## 📋 **Deployment Options**

### **Option 1: Git-Based Multi-Branch (Recommended for CI/CD)**

This creates one Amplify app with multiple branches, each representing a campus:

```bash
# Create branches for each campus
git checkout -b lewiston
git checkout -b brunswick  
git checkout -b gray

# Push all branches
git push origin lewiston
git push origin brunswick
git push origin gray

# Connect branches in Amplify Console
# Each branch will auto-deploy when updated
```

### **Option 2: Separate Apps with Scripts (Recommended for Independence)**

This creates completely separate Amplify apps for maximum isolation:

```bash
# Deploy each campus as separate app
./scripts/deploy-location.sh location1  # Lewiston
./scripts/deploy-location.sh location2  # Brunswick  
./scripts/deploy-location.sh location3  # Gray
```

### **Option 3: Manual Amplify Console Setup**

Set up each app manually through the Amplify Console with environment variables.

## 🎯 **Recommended Approach: Separate Apps**

For your use case, **separate apps** are best because:
- ✅ **Complete isolation** between campuses
- ✅ **Independent scaling** and costs
- ✅ **Different admin access** per campus
- ✅ **No risk of cross-campus issues**

## 🔧 **Step-by-Step Deployment**

### **Prerequisites**
```bash
# Install required tools
brew install jq  # For JSON parsing
npm install -g @aws-amplify/cli

# Configure AWS CLI
aws configure

# Configure Amplify CLI
amplify configure
```

### **Deploy All Campuses**

```bash
# Make sure you're in the project root
cd christmas-store-registration

# Deploy Lewiston Campus (Purple Theme)
./scripts/deploy-location.sh location1

# Deploy Brunswick Campus (Green Theme)  
./scripts/deploy-location.sh location2

# Deploy Gray Campus (Red Theme)
./scripts/deploy-location.sh location3
```

### **What the Script Does**

For each campus, the script:
1. 📝 **Reads config** from `config/locationX.json`
2. 🔧 **Sets environment variables** for the build
3. ☁️ **Creates Amplify app** with campus-specific name
4. 🚀 **Deploys backend** (API, Database, Auth, Functions)
5. 🌐 **Builds and deploys frontend** with campus branding
6. ⚙️ **Sets runtime environment variables** in Amplify
7. 🔄 **Triggers rebuild** with new environment variables

## 📧 **Environment Variables Set Automatically**

The script automatically sets these for each campus:

```bash
# Frontend (Build Time)
NEXT_PUBLIC_LOCATION=location1

# Lambda Functions (Runtime)  
LOCATION_NAME="Pathway Vineyard Lewiston Campus"
LOCATION_ADDRESS="Lewiston, Maine"
CONTACT_EMAIL="lewiston@pathwayvineyard.com"
FROM_EMAIL="noreply@pathwayvineyard.com"
PRIMARY_COLOR="#7c3aed" 
SECONDARY_COLOR="#059669"
LOCATION_EMOJI="⛪"
```

## 🌐 **Using Amplify Console**

### **Alternative: Manual Setup in Console**

1. **Go to AWS Amplify Console**
2. **Create New App** → Connect Git Repository
3. **Choose Branch** for campus (e.g., `lewiston`)
4. **Set Build Settings**: Use the `amplify.yml` file
5. **Set Environment Variables** manually for each app
6. **Deploy**

### **Environment Variables in Console**

For each app, set these in **App Settings → Environment Variables**:

#### **Lewiston Campus:**
```
NEXT_PUBLIC_LOCATION = location1
LOCATION_NAME = Pathway Vineyard Lewiston Campus
LOCATION_ADDRESS = Lewiston, Maine
CONTACT_EMAIL = lewiston@pathwayvineyard.com
FROM_EMAIL = noreply@pathwayvineyard.com
PRIMARY_COLOR = #7c3aed
SECONDARY_COLOR = #059669
LOCATION_EMOJI = ⛪
```

*(Repeat similar pattern for Brunswick and Gray with their respective values)*

## 🔄 **Continuous Deployment**

### **With Git Branches:**

```bash
# Make changes to specific campus
git checkout lewiston
# Make campus-specific changes
git commit -m "Update Lewiston campus capacity"
git push origin lewiston
# Amplify automatically deploys changes to Lewiston app only
```

### **With Separate Apps:**

```bash
# Make changes to main branch
git checkout main
# Update code
git commit -m "Add new feature"

# Redeploy specific campus
./scripts/deploy-location.sh location1  # Only redeploy Lewiston

# Or redeploy all
for location in location1 location2 location3; do
  ./scripts/deploy-location.sh $location
done
```

## 🎛️ **Managing Multiple Apps**

### **List All Your Christmas Store Apps:**
```bash
aws amplify list-apps --query "apps[?name.contains(@, 'christmas') || name.contains(@, 'pathway')].{Name:name,Id:appId,URL:defaultDomain}" --output table
```

### **Update Environment Variables:**
```bash
# Update single app
APP_ID="your-app-id"
aws amplify put-app --app-id $APP_ID --environment-variables KEY=VALUE

# Update all apps with script
./scripts/update-all-envs.sh
```

### **Monitor Deployments:**
```bash
# Check deployment status
aws amplify list-jobs --app-id YOUR_APP_ID --branch-name main

# View logs
aws amplify get-job --app-id YOUR_APP_ID --branch-name main --job-id JOB_ID
```

## 🚨 **Troubleshooting**

### **Common Issues:**

1. **"amplify command not found"**
   ```bash
   npm install -g @aws-amplify/cli
   ```

2. **"jq command not found"**  
   ```bash
   # macOS
   brew install jq
   # Ubuntu  
   sudo apt-get install jq
   ```

3. **AWS credentials not configured**
   ```bash
   aws configure
   amplify configure
   ```

4. **Environment variables not working**
   - Check they're set in Amplify Console
   - Trigger a new build after setting them
   - Verify `NEXT_PUBLIC_*` variables for frontend

5. **Build fails**
   - Check build logs in Amplify Console
   - Verify `amplify.yml` is correct
   - Check Node.js version compatibility

## 📊 **Post-Deployment URLs**

After successful deployment, you'll get:

### **Lewiston Campus:**
- 🌐 **App**: `https://main.APP_ID.amplifyapp.com`
- 👑 **Admin**: `https://main.APP_ID.amplifyapp.com/admin`

### **Brunswick Campus:**
- 🌐 **App**: `https://main.APP_ID.amplifyapp.com`
- 👑 **Admin**: `https://main.APP_ID.amplifyapp.com/admin`

### **Gray Campus:**
- 🌐 **App**: `https://main.APP_ID.amplifyapp.com`  
- 👑 **Admin**: `https://main.APP_ID.amplifyapp.com/admin`

## 🔐 **Security Considerations**

- ✅ Each campus has **separate databases** (no data mixing)
- ✅ Each campus has **separate Cognito user pools** (separate admin access)
- ✅ Each campus has **separate Lambda functions** (isolated processing)
- ✅ **API keys are separate** per campus
- ✅ **Email domains can be shared** (`@pathwayvineyard.com`)

## 💡 **Pro Tips**

1. **Use Custom Domains**:
   ```
   lewiston.christmasstore.pathwayvineyard.com
   brunswick.christmasstore.pathwayvineyard.com  
   gray.christmasstore.pathwayvineyard.com
   ```

2. **Monitor All Apps**:
   - Set up CloudWatch alarms for each
   - Monitor registration numbers across campuses
   - Track email delivery rates

3. **Backup Strategy**:
   - Each campus data is automatically backed up by DynamoDB
   - Export registration data before events
   - Keep deployment scripts in version control

4. **Cost Optimization**:
   - Each campus pays only for their usage
   - Scale down unused resources after events
   - Monitor costs per campus in AWS Console

---

🎄 **Your three Pathway Vineyard campuses are now ready for independent Christmas Store registration!** 🎁

Each campus can operate completely independently while maintaining the unified Pathway Vineyard brand and experience.