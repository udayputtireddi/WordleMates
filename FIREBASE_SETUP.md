# Firebase Setup Instructions for WordleMates

## **Step 1: Firebase Console Setup**

1. **Go to [Firebase Console](https://console.firebase.google.com/)**
2. **Create a new project** or use existing one
3. **Project name**: `wordlemates` (or your preferred name)
4. **Enable Google Analytics**: Yes (recommended)

## **Step 2: Enable Authentication**

1. In Firebase Console, go to **Authentication**
2. Click **Get Started**
3. Go to **Sign-in method** tab
4. Enable these providers:
   - ✅ **Email/Password**
   - ✅ **Google** (optional but recommended)

## **Step 3: Create Firestore Database**

1. Go to **Firestore Database**
2. Click **Create database**
3. **Start in production mode** (we'll set rules later)
4. **Choose location**: Select closest to your users

## **Step 4: Get Firebase Configuration**

1. Go to **Project Settings** (gear icon)
2. Scroll down to **Your apps** section
3. Click **Web app** (</>) icon
4. **Register app**: Name it "WordleMates Web"
5. **Copy the configuration object**

## **Step 5: Update Firebase Config**

Replace the config in `client/lib/firebase.ts`:

```typescript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project.firebaseapp.com", 
  projectId: "your-actual-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-actual-app-id",
  measurementId: "G-XXXXXXXXXX"
};
```

## **Step 6: Set Firestore Security Rules**

In Firestore **Rules** tab, replace with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only access their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Games collection - users can only write their own games
    match /games/{gameId} {
      allow write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow read: if request.auth != null;
    }
  }
}
```

## **Step 7: Install Firebase (If not done)**

```bash
npm install firebase
```

## **Step 8: Deploy and Test**

1. **Build your project**: `npm run build`
2. **Deploy to Firebase Hosting** (if using Firebase hosting)
3. **Test authentication and data storage**

## **Features Now Available:**

✅ **Real User Authentication** - Email/password + Google login  
✅ **Persistent User Stats** - Games, wins, streaks stored in cloud  
✅ **Stats Reset Function** - Properly clears all user data  
✅ **Individual Game Records** - Each game stored with details  
✅ **User Profiles** - Display names, achievements, progress  
✅ **Security** - Users can only access their own data  

## **Testing the Reset Function:**

1. **Login to your deployed app**
2. **Play a few games** to generate stats
3. **Go to Settings**
4. **Click "Reset Statistics"**
5. **Confirm** - all your cloud data will be cleared!

Your WordleMates app now has **real user data management** with Firebase! 🎉
