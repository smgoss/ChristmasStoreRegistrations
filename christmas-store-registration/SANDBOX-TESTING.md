# 🧪 Sandbox Testing Guide for Pathway Vineyard Campuses

## 🎯 **Testing Options**

### **Option 1: Quick Test with Current Sandbox (Easiest)**

Use the current running sandbox and switch between campus configurations:

```bash
# Test Lewiston Campus (Purple theme)
./scripts/test-campus.sh location1

# Test Brunswick Campus (Green theme)  
./scripts/test-campus.sh location2

# Test Gray Campus (Red theme)
./scripts/test-campus.sh location3
```

**Access at**: http://localhost:3004

### **Option 2: Separate Sandboxes (Full Independence)**

Run completely independent sandboxes for each campus:

```bash
# Terminal 1: Lewiston Campus
./scripts/sandbox-lewiston.sh

# Terminal 2: Brunswick Campus (different identifier)
./scripts/sandbox-brunswick.sh

# Terminal 3: Gray Campus (different identifier) 
./scripts/sandbox-gray.sh
```

Each gets its own AWS resources and database.

## 🎨 **What You'll See in Each Campus**

### **🟣 Lewiston Campus (location1)**
- **Colors**: Purple header (#7c3aed) with green accents
- **Name**: "Pathway Vineyard Lewiston Campus"
- **Time Slots**: 09:00, 09:30, 10:00, 10:30, 11:00, 11:30
- **Capacity**: 20 people per slot
- **Contact**: lewiston@pathwayvineyard.com
- **Admin Theme**: Purple gradient header

### **🟢 Brunswick Campus (location2)**  
- **Colors**: Green header (#059669) with red accents
- **Name**: "Pathway Vineyard Brunswick Campus"
- **Time Slots**: 10:00, 10:30, 11:00, 11:30, 12:00, 12:30
- **Capacity**: 25 people per slot
- **Contact**: brunswick@pathwayvineyard.com
- **Admin Theme**: Green gradient header

### **🔴 Gray-New Gloucester Campus (location3)**
- **Colors**: Red header (#dc2626) with yellow accents
- **Name**: "Pathway Vineyard Gray-New Gloucester Campus"  
- **Time Slots**: 08:30, 09:00, 09:30, 10:00, 10:30, 11:00
- **Capacity**: 15 people per slot
- **Contact**: gray@pathwayvineyard.com
- **Admin Theme**: Red gradient header

## 🧪 **Test Scenarios**

### **1. Test Registration Form**
- [ ] Visit registration page
- [ ] Verify campus name and contact info display
- [ ] Check time slot options match campus config
- [ ] Test form submission
- [ ] Verify campus-specific branding/colors

### **2. Test Admin Dashboard**
- [ ] Go to `/admin` 
- [ ] Login with admin credentials
- [ ] Verify campus-specific header and colors
- [ ] Check time slots are initialized with correct capacity
- [ ] Test adding/editing time slots
- [ ] Verify registration count displays

### **3. Test Registration Settings**
- [ ] Test open/close registration toggle
- [ ] Test invite-only mode toggle
- [ ] Test scheduled closure functionality
- [ ] Verify custom closure message

### **4. Test Email Functions (if SES configured)**
- [ ] Send test confirmation email
- [ ] Verify campus-specific email template
- [ ] Test attendance confirmation emails

## 🚀 **Quick Start Testing**

1. **Current Method** (using existing sandbox):
   ```bash
   # Test Lewiston campus
   export NEXT_PUBLIC_LOCATION=location1
   open http://localhost:3004
   
   # Test Brunswick campus  
   export NEXT_PUBLIC_LOCATION=location2
   # Refresh browser
   
   # Test Gray campus
   export NEXT_PUBLIC_LOCATION=location3
   # Refresh browser
   ```

2. **Or use the helper script**:
   ```bash
   ./scripts/test-campus.sh location1  # Lewiston
   ./scripts/test-campus.sh location2  # Brunswick  
   ./scripts/test-campus.sh location3  # Gray
   ```

## 💡 **Testing Tips**

### **Verify Campus Configuration**
Each campus should show:
- ✅ Different church emoji (⛪) and colors
- ✅ Campus-specific name and address  
- ✅ Different time slot options
- ✅ Correct capacity settings
- ✅ Campus-specific contact email

### **Test Data Isolation**
- Registrations made in one campus config shouldn't appear in others (when using different sandbox identifiers)
- Admin settings are independent per campus
- Time slot configurations are campus-specific

### **Admin Testing**
- Login: Use the same admin credentials across all campuses 
- Each campus admin shows different:
  - Header colors and branding
  - Time slot configurations  
  - Registration data
  - Contact information

## 🎯 **Expected Results**

After testing, you should see:
1. **3 distinct campus experiences** with different branding
2. **Independent time slot management** per campus
3. **Campus-specific contact information** throughout
4. **Consistent Pathway Vineyard branding** across all campuses
5. **Proper capacity limits** based on each campus configuration

## 🔧 **Troubleshooting**

### **Configuration not loading:**
- Check `NEXT_PUBLIC_LOCATION` environment variable
- Verify config files exist in `/config/` directory
- Restart dev server after changing environment variables

### **Wrong campus showing:**
- Clear browser cache
- Check console for JavaScript errors
- Verify environment variable is set correctly

### **Time slots wrong:**
- Check `config/locationX.json` has correct time slots
- Verify database was initialized with correct config
- Check admin panel time slot management

---

🎄 **Ready to test your multi-campus Christmas Store system!** 

Each campus will have its own unique look and feel while maintaining the unified Pathway Vineyard brand. 🎁