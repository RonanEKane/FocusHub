# 🚀 Expansion Guide - Adding Backend & Login

## Overview

Your FocusHub is currently **browserside-only** (localStorage). This guide shows you how to add:

1. **User Authentication** (Login/Signup)
2. **Database Storage** (Multi-device sync)
3. **API Backend** (Server-side logic)
4. **Team Features** (Accountability partners, etc.)

**Good News:** The frontend is ready. You just need to swap storage methods.

---

## 🎯 **Three Paths to Choose**

### **Path 1: Firebase (Easiest)**
- ⏱️ Setup Time: 2 hours
- 💰 Cost: Free for most users
- 🔧 Complexity: Low
- Best for: Quick launch, no backend experience

### **Path 2: Supabase (PostgreSQL)**
- ⏱️ Setup Time: 4 hours
- 💰 Cost: Free tier + paid plans
- 🔧 Complexity: Medium
- Best for: Need SQL, want more control

### **Path 3: Custom Backend**
- ⏱️ Setup Time: 1-2 weeks
- 💰 Cost: Varies (hosting)
- 🔧 Complexity: High
- Best for: Full control, custom features

---

## 🔥 **Path 1: Firebase Integration**

### **Step 1: Setup Firebase**

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create new project "FocusHub"
3. Enable Authentication → Email/Password
4. Enable Firestore Database
5. Copy your config object

### **Step 2: Add Firebase to Your App**

In `app.html`, add before closing `</body>`:

```html
<!-- Firebase SDK -->
<script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-auth-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore-compat.js"></script>

<script>
// Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "focushub-xxxxx.firebaseapp.com",
  projectId: "focushub-xxxxx",
  storageBucket: "focushub-xxxxx.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:xxxxx"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
</script>
```

### **Step 3: Add Login UI**

Create `login.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Login - FocusHub</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="login-container">
        <h1>⚡ FocusHub</h1>
        
        <div class="login-form">
            <input type="email" id="email" placeholder="Email">
            <input type="password" id="password" placeholder="Password">
            <button onclick="login()" class="btn btn-primary">Login</button>
            <button onclick="signup()" class="btn btn-secondary">Sign Up</button>
        </div>
    </div>

    <script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-auth-compat.js"></script>
    
    <script>
        // Your Firebase config here
        
        function login() {
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            auth.signInWithEmailAndPassword(email, password)
                .then(() => {
                    window.location.href = 'app.html';
                })
                .catch(error => {
                    alert('Login failed: ' + error.message);
                });
        }
        
        function signup() {
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            auth.createUserWithEmailAndPassword(email, password)
                .then(() => {
                    window.location.href = 'app.html';
                })
                .catch(error => {
                    alert('Signup failed: ' + error.message);
                });
        }
    </script>
</body>
</html>
```

### **Step 4: Protect App Routes**

Add to top of `app.html` script section:

```javascript
// Check authentication
auth.onAuthStateChanged(user => {
    if (!user) {
        // Not logged in, redirect to login
        window.location.href = 'login.html';
    } else {
        // User logged in, load their data
        loadUserData(user.uid);
    }
});
```

### **Step 5: Replace localStorage with Firestore**

**Find this in app.html:**
```javascript
function saveState() {
    localStorage.setItem('focushub_tasks', JSON.stringify(state.tasks));
    // ... other localStorage calls
}
```

**Replace with:**
```javascript
async function saveState() {
    const user = auth.currentUser;
    if (!user) return;
    
    try {
        await db.collection('users').doc(user.uid).set({
            tasks: state.tasks,
            distractions: state.distractions,
            intentions: state.intentions,
            stats: {
                sprintCount: state.sprintCount,
                distractionCount: state.distractionCount,
                tasksCompleted: state.tasksCompleted,
                plannedSprints: state.plannedSprints
            },
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
    } catch (error) {
        console.error('Save failed:', error);
    }
}

async function loadUserData(userId) {
    try {
        const doc = await db.collection('users').doc(userId).get();
        if (doc.exists) {
            const data = doc.data();
            state.tasks = data.tasks || state.tasks;
            state.distractions = data.distractions || [];
            state.intentions = data.intentions || [];
            if (data.stats) {
                state.sprintCount = data.stats.sprintCount || 0;
                state.distractionCount = data.stats.distractionCount || 0;
                state.tasksCompleted = data.stats.tasksCompleted || 0;
                state.plannedSprints = data.stats.plannedSprints || 5;
            }
            renderAll();
        }
    } catch (error) {
        console.error('Load failed:', error);
    }
}
```

### **Step 6: Save History to Firestore**

In `completeDay()` function, replace:

```javascript
// OLD:
const history = JSON.parse(localStorage.getItem('focushub_history') || '[]');
history.push(report);
localStorage.setItem('focushub_history', JSON.stringify(history));

// NEW:
const user = auth.currentUser;
await db.collection('users').doc(user.uid).collection('history').add(report);
```

### **Done! Now You Have:**
- ✅ User authentication
- ✅ Multi-device sync
- ✅ Persistent cloud storage
- ✅ Secure data per user

---

## 🐘 **Path 2: Supabase Integration**

### **Why Supabase?**
- PostgreSQL (real SQL database)
- Row Level Security (fine-grained permissions)
- Real-time subscriptions
- Built-in authentication

### **Step 1: Setup Supabase**

1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Get your API keys from Settings > API

### **Step 2: Create Database Schema**

In Supabase SQL Editor, run:

```sql
-- Users table (handled by Supabase Auth)

-- Tasks table
CREATE TABLE tasks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  bucket VARCHAR(20) NOT NULL, -- 'urgent', 'deepwork', 'strategic', 'holding', 'wins'
  text TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

-- Daily stats table
CREATE TABLE daily_stats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  date DATE NOT NULL,
  sprint_count INT DEFAULT 0,
  distraction_count INT DEFAULT 0,
  tasks_completed INT DEFAULT 0,
  planned_sprints INT DEFAULT 5,
  meeting_minutes INT DEFAULT 0,
  UNIQUE(user_id, date)
);

-- Distractions table
CREATE TABLE distractions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  text TEXT NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  is_intention BOOLEAN DEFAULT FALSE,
  completed BOOLEAN DEFAULT FALSE
);

-- History table (end of day reports)
CREATE TABLE history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  date DATE NOT NULL,
  sprint_count INT,
  planned_sprints INT,
  distraction_count INT,
  tasks_completed INT,
  auto_grade VARCHAR(3),
  user_grade VARCHAR(3),
  reflection TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE distractions ENABLE ROW LEVEL SECURITY;
ALTER TABLE history ENABLE ROW LEVEL SECURITY;

-- Create policies (users can only see their own data)
CREATE POLICY "Users can view own tasks" ON tasks
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own tasks" ON tasks
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own tasks" ON tasks
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own tasks" ON tasks
  FOR DELETE USING (auth.uid() = user_id);

-- Repeat for other tables...
```

### **Step 3: Add Supabase Client**

In `app.html`, add before your script:

```html
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>

<script>
// Initialize Supabase
const supabase = supabase.createClient(
  'https://xxxxx.supabase.co',
  'your-anon-key'
);
</script>
```

### **Step 4: Replace Storage Functions**

```javascript
// Save tasks
async function saveTasks() {
    const { data: user } = await supabase.auth.getUser();
    if (!user) return;
    
    // Delete old tasks for this user
    await supabase.from('tasks').delete().eq('user_id', user.user.id);
    
    // Insert new tasks
    const allTasks = [
        ...state.tasks.urgent.map(t => ({...t, bucket: 'urgent'})),
        ...state.tasks.deepwork.map(t => ({...t, bucket: 'deepwork'})),
        ...state.tasks.strategic.map(t => ({...t, bucket: 'strategic'})),
        ...state.tasks.holding.map(t => ({...t, bucket: 'holding'})),
        ...state.tasks.wins.map(t => ({...t, bucket: 'wins'}))
    ];
    
    await supabase.from('tasks').insert(
        allTasks.map(t => ({
            user_id: user.user.id,
            bucket: t.bucket,
            text: t.text,
            created_at: t.createdAt,
            completed_at: t.completedAt
        }))
    );
}

// Load tasks
async function loadTasks() {
    const { data: user } = await supabase.auth.getUser();
    if (!user) return;
    
    const { data: tasks } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', user.user.id);
    
    // Group by bucket
    state.tasks = {
        urgent: tasks.filter(t => t.bucket === 'urgent'),
        deepwork: tasks.filter(t => t.bucket === 'deepwork'),
        strategic: tasks.filter(t => t.bucket === 'strategic'),
        holding: tasks.filter(t => t.bucket === 'holding'),
        wins: tasks.filter(t => t.bucket === 'wins')
    };
}
```

---

## ⚙️ **Path 3: Custom Backend**

### **Stack Recommendation:**
- **API**: Node.js + Express (or Python + FastAPI)
- **Database**: PostgreSQL or MongoDB
- **Hosting**: Railway, Render, or DigitalOcean

### **Basic API Structure:**

```javascript
// server.js (Node.js + Express)
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

// Authentication middleware
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.sendStatus(401);
    
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// Routes
app.post('/api/login', async (req, res) => {
    // Validate credentials
    // Generate JWT token
    // Return token
});

app.get('/api/tasks', authenticateToken, async (req, res) => {
    // Get tasks for req.user.id from database
    res.json(tasks);
});

app.post('/api/tasks', authenticateToken, async (req, res) => {
    // Save task for req.user.id to database
    res.json({ success: true });
});

app.listen(3000, () => console.log('Server running on port 3000'));
```

### **Frontend API Calls:**

```javascript
// Add to app.html
const API_URL = 'https://your-api.com';
let authToken = localStorage.getItem('auth_token');

async function apiCall(endpoint, method = 'GET', body = null) {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authToken
        }
    };
    
    if (body) options.body = JSON.stringify(body);
    
    const response = await fetch(API_URL + endpoint, options);
    return response.json();
}

// Replace localStorage calls
async function saveTasks() {
    await apiCall('/api/tasks', 'POST', state.tasks);
}

async function loadTasks() {
    const tasks = await apiCall('/api/tasks');
    state.tasks = tasks;
}
```

---

## 🔐 **Security Checklist**

When adding backend:

- [ ] Use HTTPS (SSL certificate)
- [ ] Hash passwords (bcrypt)
- [ ] Validate all inputs
- [ ] Use prepared statements (SQL injection protection)
- [ ] Implement rate limiting
- [ ] Add CORS properly
- [ ] Use JWT tokens with expiration
- [ ] Never expose API keys in frontend code
- [ ] Enable database encryption
- [ ] Set up regular backups

---

## 🎯 **Feature Expansion Ideas**

Once you have backend + auth:

### **1. Accountability Partners**
- Share daily reports with friends
- See each other's grades
- Compete on streaks

### **2. Team Dashboard**
- Company-wide productivity metrics
- Team sprint totals
- Leaderboards

### **3. AI Coach Upgrades**
- Use OpenAI API for personalized coaching
- Pattern recognition across weeks
- Predictive insights

### **4. Integrations**
- Google Calendar (auto-import meetings)
- Slack (daily summary posts)
- Todoist (import tasks)
- RescueTime (auto-log distractions)

### **5. Analytics**
- Weekly/monthly trends
- Best productivity hours
- Task completion patterns
- Distraction heat maps

---

## 📊 **Data Migration**

If users have localStorage data, migrate it:

```javascript
async function migrateLocalDataToFirebase() {
    const user = auth.currentUser;
    if (!user) return;
    
    // Get local data
    const localTasks = JSON.parse(localStorage.getItem('focushub_tasks') || '{}');
    const localHistory = JSON.parse(localStorage.getItem('focushub_history') || '[]');
    
    // Upload to Firebase
    await db.collection('users').doc(user.uid).set({
        tasks: localTasks,
        migratedAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    
    // Upload history
    for (const report of localHistory) {
        await db.collection('users').doc(user.uid).collection('history').add(report);
    }
    
    // Clear localStorage (optional)
    localStorage.clear();
    
    alert('Data migrated successfully!');
}
```

---

## 🚀 **Deployment Changes**

### **With Backend:**
- **Frontend**: Still Cloudflare Pages (no changes)
- **Backend**: Railway, Render, or your choice
- **Database**: Firebase/Supabase (managed) or self-hosted

### **Environment Variables:**
Store secrets properly:
```javascript
// .env file (never commit this)
FIREBASE_API_KEY=xxxxx
FIREBASE_AUTH_DOMAIN=xxxxx
JWT_SECRET=xxxxx
DATABASE_URL=xxxxx
```

---

## 💡 **Quick Wins**

Start with these easy additions:

1. **Google Sign-In**: Add Firebase Auth → Google Provider (5 minutes)
2. **Export Data**: Add button to download JSON (10 minutes)
3. **Dark Mode**: Already have CSS vars, just toggle (5 minutes)
4. **Keyboard Shortcuts**: Add event listeners (30 minutes)

---

## 📞 **Need Help?**

**Firebase Issues:**
- Check Firebase Console logs
- Verify Firestore security rules
- Test with Firebase Emulator locally

**Supabase Issues:**
- Check Row Level Security policies
- Verify API keys in Settings
- Test queries in SQL Editor

**General:**
- Check browser console for errors
- Use Network tab to debug API calls
- Test authentication flow step-by-step

---

## 🎓 **Learning Resources**

- **Firebase Docs**: firebase.google.com/docs
- **Supabase Docs**: supabase.com/docs
- **JWT Tutorial**: jwt.io/introduction
- **REST API Design**: restfulapi.net

---

**Remember:** The frontend you have now works perfectly. Add backend only when you actually need:
- Multi-device sync
- User accounts
- Team features
- More than localStorage can handle (10MB)

Don't over-engineer. Start simple, scale when needed.
