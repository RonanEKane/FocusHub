# Firebase Setup Guide for Member Login & Data Tracking

## Why Firebase?

**Recommended Approach:** Firebase Authentication + Firestore Database

**Advantages:**
- **Free Tier**: 10,000 auth users/month, 1GB storage, 50K reads/day
- **No Backend Server**: Everything runs client-side
- **Automatic Scaling**: Handles growth automatically
- **Easy Integration**: Already have `/src/firebase/config.js` stub
- **Google/Email Login**: Built-in authentication
- **Real-time Sync**: Data updates across devices instantly

**Perfect for your MVP:** Start free, scale as you grow

---

## Setup Steps

### 1. Create Firebase Project

1. Go to https://console.firebase.google.com
2. Click "Add Project"
3. Name: "FocusHub"
4. Disable Google Analytics (optional for MVP)
5. Create project

### 2. Enable Authentication

1. In Firebase Console → Authentication → Get Started
2. Enable "Email/Password" sign-in method
3. Enable "Google" sign-in method (recommended)
4. Save

### 3. Create Firestore Database

1. In Firebase Console → Firestore Database → Create Database
2. Start in "Production mode"
3. Choose location (closest to your users)
4. Enable

### 4. Set Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // User stats/history
    match /users/{userId}/history/{historyId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### 5. Get Firebase Config

1. In Firebase Console → Project Settings (gear icon)
2. Scroll to "Your apps"
3. Click "Web" (</> icon)
4. Register app: "FocusHub Web"
5. Copy the config object

### 6. Update `/src/firebase/config.js`

```javascript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "focushub-xxxx.firebaseapp.com",
  projectId: "focushub-xxxx",
  storageBucket: "focushub-xxxx.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const initializeFirebase = () => {
  console.log('Firebase initialized');
  return app;
};
```

### 7. Install Firebase SDK

Add to `package.json` dependencies:
```json
"firebase": "^10.7.1"
```

Then run: `npm install`

---

## Data Structure in Firestore

### Users Collection: `/users/{userId}`

```javascript
{
  email: "user@example.com",
  displayName: "John Doe",
  createdAt: "2024-01-15T10:30:00Z",
  lastActive: "2024-01-20T14:22:00Z",
  settings: {
    energyLevel: "medium",
    baselineSprints: 5,
    toughnessLevel: 2,
    theme: "dark"
  },
  stats: {
    totalDays: 45,
    totalSprints: 342,
    totalTasks: 156,
    currentStreak: 7,
    avgGrade: 3.8
  }
}
```

### History Subcollection: `/users/{userId}/history/{date}`

```javascript
{
  date: "2024-01-20",
  sprintCount: 8,
  plannedSprints: 10,
  distractionCount: 3,
  tasksCompleted: 12,
  breakMinutes: 30,
  meetingMinutes: 60,
  autoGrade: "B+",
  userGrade: "A-",
  gradesMatch: false,
  reflection: "Good focus today, met most goals",
  score: 80,
  timestamp: "2024-01-20T18:00:00Z"
}
```

---

## Authentication Flow

### New User Sign-up

```javascript
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

async function signUp(email, password) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  
  // Create user document
  await setDoc(doc(db, 'users', user.uid), {
    email: user.email,
    createdAt: new Date().toISOString(),
    settings: {
      baselineSprints: 5,
      toughnessLevel: 2,
      theme: 'dark'
    },
    stats: {
      totalDays: 0,
      totalSprints: 0,
      totalTasks: 0,
      currentStreak: 0,
      avgGrade: 0
    }
  });
}
```

### Login

```javascript
import { signInWithEmailAndPassword } from 'firebase/auth';

async function login(email, password) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
}
```

### Google Sign-in

```javascript
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

async function googleSignIn() {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  return result.user;
}
```

---

## Saving Daily Stats

```javascript
import { doc, setDoc } from 'firebase/firestore';

async function saveDay EndReport(userId, report) {
  const dateStr = new Date().toISOString().split('T')[0];
  await setDoc(doc(db, 'users', userId, 'history', dateStr), report);
  
  // Update user stats
  await updateDoc(doc(db, 'users', userId), {
    'stats.totalDays': increment(1),
    'stats.totalSprints': increment(report.sprintCount),
    'stats.totalTasks': increment(report.tasksCompleted),
    'stats.lastActive': new Date().toISOString()
  });
}
```

---

## Migration from localStorage to Firebase

### Step 1: Export localStorage data

```javascript
function exportLocalData() {
  return {
    history: JSON.parse(localStorage.getItem('focushub_history') || '[]'),
    tasks: JSON.parse(localStorage.getItem('focushub_tasks') || '{}'),
    settings: {
      energyLevel: localStorage.getItem('focushub_energy_level'),
      theme: localStorage.getItem('focushub_theme')
    }
  };
}
```

### Step 2: Import to Firebase after login

```javascript
async function migrateToFirebase(userId) {
  const localData = exportLocalData();
  
  // Save history
  for (const dayReport of localData.history) {
    const dateStr = dayReport.date;
    await setDoc(doc(db, 'users', userId, 'history', dateStr), dayReport);
  }
  
  // Save settings
  await updateDoc(doc(db, 'users', userId), {
    settings: localData.settings
  });
  
  // Clear localStorage after successful migration
  localStorage.clear();
}
```

---

## Phase 2: Monetization Integration

### Stripe + Firebase Extensions

1. Install Firebase Extension: "Run Payments with Stripe"
2. Configure subscription products in Stripe Dashboard
3. Pricing tiers:
   - **Lite**: Free (localStorage only)
   - **Standard**: $5/mo (Cloud sync, basic features)
   - **Premium**: $15/mo (All features + priority support)

### Check Subscription Status

```javascript
async function hasActiveSubscription(userId) {
  const userDoc = await getDoc(doc(db, 'users', userId));
  const subscription = userDoc.data().subscription;
  return subscription && subscription.status === 'active';
}
```

---

## Implementation Priority

**Phase 1 (Now):**
- Keep localStorage (working)
- Build app features
- Get users

**Phase 2 (After MVP validation):**
- Add Firebase Authentication
- Migrate localStorage → Firestore
- Enable cloud sync

**Phase 3 (With revenue):**
- Add Stripe subscriptions
- Premium features gating
- Multi-device sync

---

## Cost Estimate

**Free Tier (First ~500 users):**
- 10K auth/month = ~330/day
- 50K reads/day
- 1GB storage
- **Cost: $0**

**Paid (500+ active users):**
- Auth: ~$0.01/user/month
- Firestore: ~$0.20/user/month
- **Estimated: $50-150/month for 500 users**

**With Revenue ($5/user/month):**
- Revenue: $2,500/month (500 users)
- Firebase Cost: $100-150/month
- **Net: ~$2,350/month**

---

## Next Steps

1. ✅ **Deploy current app** (works with localStorage)
2. ⏸️ **Get users & validate** (free tier)
3. 🔜 **Add Firebase when**: You have 50+ daily active users OR users request cloud sync
4. 💰 **Add payments when**: You have 200+ users OR clear product-market fit

**Don't build auth/database until you need it.** Focus on getting users first.
