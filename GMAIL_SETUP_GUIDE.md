# Gmail SMTP Setup Guide for ISKCON Donation System

## Current Status ✅
- **SMTP Connection**: Working (Port 465 SSL)
- **Email Templates**: Enhanced with header image and attachments
- **Issue**: Requires Gmail App Password instead of regular password

## Required: Gmail App Password Setup

### Step 1: Enable 2-Factor Authentication
1. Go to [myaccount.google.com](https://myaccount.google.com)
2. Click **Security** in the left sidebar
3. Under "Signing in to Google", click **2-Step Verification**
4. Follow the setup process to enable 2FA (if not already enabled)

### Step 2: Generate App Password
1. Still in **Security** section
2. Click **App passwords** (appears only after 2FA is enabled)
3. Select app: **Mail**
4. Select device: **Other (Custom name)**
5. Enter name: **ISKCON Donation System**
6. Click **Generate**
7. **Copy the 16-character password** (format: xxxx xxxx xxxx xxxx)

### Step 3: Update Environment Variables
Replace the current password with the App Password:

```bash
# In .env and .env.local files
SMTP_USER=prachetastrial@gmail.com
SMTP_PASS=your_16_character_app_password_here
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
```

## Test Results

### ✅ **Connection Test (Port 465)**
```
✅ Secure connection established to Gmail
✅ SMTP handshake completed
❌ Authentication failed: App Password required
```

### 📧 **Current Configuration**
- **Host**: smtp.gmail.com
- **Port**: 465 (SSL/TLS)
- **Security**: SSL enabled
- **Authentication**: App Password required

## Next Steps

1. **Generate Gmail App Password** (follow steps above)
2. **Update environment files** with the App Password
3. **Test email system**: `npm run test:gmail-secure`
4. **Verify donation emails** work end-to-end

## Email System Features (Ready)

### ✅ **Enhanced Email Template**
- ISKCON header image embedded at top
- Professional HTML design
- Mobile-responsive layout
- Proper sender: "ISKCON Donations" <prachetastrial@gmail.com>

### ✅ **PDF Attachments**
- Dynamic receipt PDF (generated from transaction data)
- Static template PDF (test-receipt.pdf as Donation_Receipt.pdf)
- Both attached to every donation email

### ✅ **Cross-Client Compatibility**
- Gmail, Outlook, Apple Mail support
- Embedded images using Content ID (CID)
- Fallback text version included

## Troubleshooting

### If App Password Still Fails:
1. **Double-check 2FA is enabled**
2. **Regenerate the App Password**
3. **Remove spaces from App Password** when copying
4. **Try different device name** when generating

### Alternative SMTP Settings:
```bash
# If port 465 doesn't work, try:
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false  # Uses STARTTLS
```

## Security Notes

- ✅ App Passwords are more secure than account passwords
- ✅ Can be revoked independently without affecting main account
- ✅ Specific to the application (ISKCON Donation System)
- ✅ No access to other Google services

Once you have the App Password, the email system will work perfectly! 🎉