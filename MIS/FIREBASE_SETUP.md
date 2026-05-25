# Firebase Setup Guide for MIS Project

## ✅ What I've Done

1. **Created Firebase Configuration File** at `src/firebase/firebaseconfig.ts`
   - Exports `auth` for authentication
   - Exports `db` for Firestore database
   - Ready to accept your Firebase credentials

2. **Updated package.json** with required dependencies:
   - `@react-navigation/native-stack` - for navigation
   - `@react-native-async-storage/async-storage` - for persistent storage
   - `@expo-google-fonts/poppins` - for custom fonts
   - `react-native-gesture-handler` - for gesture support
   - `react-native-reanimated` - for animations
   - `expo-font` - for font loading

3. **SignInScreen** is ready with:
   - Email & password form validation (YUP)
   - Firebase authentication integration
   - Error handling for auth failures
   - Loading states

---

## 📋 What You Need To Do

### Step 1: Install Dependencies
Run this command in the MIS project folder:
```bash
npm install
```
Or if using Expo:
```bash
expo install
```

### Step 2: Get Firebase Credentials
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing project
3. Go to **Project Settings** → **Your apps** → Select your app
4. Copy your Firebase config object

### Step 3: Update Firebase Config
Replace placeholder values in `src/firebase/firebaseconfig.ts`:

```typescript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",              // Copy from Firebase Console
  authDomain: "YOUR_AUTH_DOMAIN",      // e.g., "your-app.firebaseapp.com"
  projectId: "YOUR_PROJECT_ID",        // e.g., "your-app-12345"
  storageBucket: "YOUR_STORAGE_BUCKET",  // e.g., "your-app.appspot.com"
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID" // Optional
};
```

### Step 4: Enable Authentication in Firebase
1. In Firebase Console, go to **Authentication** → **Sign-in method**
2. Enable **Email/Password** authentication
3. Click **Save**

### Step 5: (Optional) Enable Firestore
If you want to store user data in Firestore:
1. Go to **Firestore Database**
2. Click **Create Database**
3. Choose **Start in test mode** (for development)
4. The `db` export is already ready to use

### Step 6: Run the App
```bash
npm start
```
Then choose your platform (Android/iOS/Web)

---

## 🔐 Security Rules (Production)

When deploying to production, update Firestore rules in Firebase Console:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
  }
}
```

---

## 🐛 Testing Credentials

For testing, you can:
1. Create a test account in Firebase Console → Authentication → Users
2. Or register a new account through the SignUp screen

---

## ⚠️ Common Issues

**Issue**: "Module not found" errors after updating package.json
- **Solution**: Run `npm install` again

**Issue**: "Firebase config is not defined"
- **Solution**: Make sure you've updated the placeholder values with real credentials

**Issue**: "Auth/invalid-api-key"
- **Solution**: Check your API key is correct in firebaseconfig.ts

---

## 📞 Next Steps

After completing setup:
1. Create a SignUp screen to register new users
2. Set up password reset functionality
3. Add user profile management
4. Implement role-based access control

Need help? Let me know!
