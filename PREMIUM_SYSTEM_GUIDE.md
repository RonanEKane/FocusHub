# FocusHub Premium System - Complete Guide

**Status**: Framework ready, payment integration needed  
**Current**: LocalStorage-based (testing)  
**Goal**: Real payment processing + feature gating

---

## 🎯 CURRENT SETUP

### Where Users Manage Premium

**Option 1: Settings Panel in App** ⚙️
1. Open app (app.html)
2. Click ⚙️ gear icon in System Intelligence
3. See "Membership Level" dropdown
4. Change between Free/Premium
5. **Currently**: Just localStorage (for testing)

**Option 2: Upgrade Page** 💳
- **URL**: `/upgrade.html`
- **Features**: Full pricing comparison
- **Tiers**: Lite ($9/mo), Pro ($19/mo), Premium ($29/mo)
- **Currently**: Visual only, no payment processing

---

## 🔒 PREMIUM FEATURES

### What Premium Unlocks

**1. Reflection Traditions** (7 total)
- FREE: Secular only
- PREMIUM: Catholic, Protestant, Stoic, Buddhist, Islamic, Jewish

**2. Extended Reflection Library**
- FREE: 2 reflections per tradition (14 total)
- PREMIUM: 50 reflections per tradition (350 total)

**3. AI Coach Personalities**
- FREE: Balanced mode only
- PREMIUM: All 3 modes (Supportive, Balanced, Tough Love)

**4. Advanced Analytics** (Future)
- FREE: Basic stats
- PREMIUM: Trends, insights, performance graphs

**5. Cloud Sync** (Future)
- FREE: Local only
- PREMIUM: Cross-device sync

---

## 💳 PAYMENT INTEGRATION OPTIONS

### Option 1: Lemon Squeezy (Recommended)

**Why**: 
- Built-in license management
- Revenue share (no upfront cost)
- Easy integration
- Handles VAT/taxes

**Setup**:
```javascript
// 1. Sign up at lemonsqueezy.com
// 2. Create products ($29/mo Premium)
// 3. Get checkout URLs
// 4. Add to upgrade.html buttons

<button onclick="window.location.href='https://focushub.lemonsqueezy.com/checkout/...'">
    UPGRADE TO PREMIUM
</button>
```

**After Payment**:
- Lemon Squeezy webhook sends license key
- Store in Supabase
- Verify on app load

### Option 2: Stripe

**Why**: 
- Industry standard
- More control
- Lower fees (2.9% + 30¢)

**Setup**:
```javascript
// 1. Stripe account + API keys
// 2. Create subscription product
// 3. Add Stripe.js to upgrade.html
// 4. Handle webhooks in Supabase Edge Functions

const stripe = Stripe('pk_live_...');
stripe.redirectToCheckout({
    lineItems: [{price: 'price_premium', quantity: 1}]
});
```

### Option 3: Paddle

**Why**:
- Merchant of record (handles taxes)
- Good for SaaS
- Clean checkout

---

## 🔧 IMPLEMENTATION STEPS

### Step 1: Choose Payment Provider

**Recommendation**: Start with Lemon Squeezy
- Fastest to set up
- Revenue share model (no risk)
- Built-in license keys

### Step 2: Update upgrade.html Buttons

**Current** (visual only):
```html
<button onclick="selectPlan('premium', 'monthly')">
    UPGRADE TO PREMIUM
</button>
```

**Update to** (real payment):
```html
<button onclick="window.location.href='https://focushub.lemonsqueezy.com/checkout/buy/...'">
    UPGRADE TO PREMIUM - $29/MO
</button>
```

### Step 3: Add Webhook Handler

**Supabase Edge Function**: `/functions/lemon-webhook`
```javascript
// Receives payment confirmation
// Creates membership record in database
// Sends welcome email

export default async function handler(req) {
    const { user_email, license_key, product_id } = await req.json();
    
    // Store in Supabase
    const { data, error } = await supabase
        .from('memberships')
        .insert({
            email: user_email,
            plan: 'premium',
            license_key: license_key,
            status: 'active',
            started_at: new Date()
        });
        
    return new Response('OK', { status: 200 });
}
```

### Step 4: Verify Membership on App Load

**app.html** (already in place):
```javascript
async function getUserMembership() {
    const { data: { user } } = await supabaseClient.auth.getUser();
    
    const { data } = await supabaseClient
        .from('memberships')
        .select('*')
        .eq('user_id', user.id)
        .single();
        
    return data; // { plan: 'premium', status: 'active' }
}
```

### Step 5: Gate Premium Features

**Example: Reflection Traditions**
```javascript
function showStartDayModal() {
    const membership = getUserMembership();
    const tradition = localStorage.getItem('focushub_reflection_tradition') || 'secular';
    
    // Gate premium traditions
    const premiumTraditions = ['catholic', 'protestant', 'stoic', 'buddhist', 'islamic', 'jewish'];
    if (premiumTraditions.includes(tradition) && membership.plan !== 'premium') {
        // Downgrade to secular
        localStorage.setItem('focushub_reflection_tradition', 'secular');
        showUpgradePrompt('Reflection traditions require Premium. Showing secular.');
    }
    
    // Continue with start day...
}
```

---

## 🚧 FEATURE GATING EXAMPLES

### Lock Premium Reflection Traditions

**In Settings Panel**:
```javascript
// Disable premium options for free users
const membership = getUserMembership();
const traditionSelect = document.getElementById('reflectionTradition');

traditionSelect.querySelectorAll('option').forEach(option => {
    const premiumTraditions = ['catholic', 'protestant', 'stoic', 'buddhist', 'islamic', 'jewish'];
    if (premiumTraditions.includes(option.value) && membership.plan === 'free') {
        option.disabled = true;
        option.textContent += ' 🔒 PREMIUM';
    }
});
```

### Lock AI Intensity Modes

**In Settings Panel**:
```javascript
const membership = getUserMembership();
const agentModeSelect = document.getElementById('agentMode');

if (membership.plan === 'free') {
    // Lock supportive and tough modes
    agentModeSelect.querySelector('[value="supportive"]').disabled = true;
    agentModeSelect.querySelector('[value="tough"]').disabled = true;
    
    // Add premium badges
    agentModeSelect.querySelector('[value="supportive"]').textContent = 'Supportive 🔒 PREMIUM';
    agentModeSelect.querySelector('[value="tough"]').textContent = 'Tough Love 🔒 PREMIUM';
    
    // Force balanced
    state.currentMode = 'balanced';
    agentModeSelect.value = 'balanced';
}
```

### Show Upgrade Prompts

**When User Tries Premium Feature**:
```javascript
function showUpgradePrompt(message) {
    const modal = `
        <div class="upgrade-modal">
            <h2>🔒 Premium Feature</h2>
            <p>${message}</p>
            <button onclick="window.location.href='upgrade.html'">
                UPGRADE TO PREMIUM
            </button>
            <button onclick="this.closest('.upgrade-modal').remove()">
                Maybe Later
            </button>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modal);
}
```

---

## 📊 DATABASE SCHEMA

### Memberships Table (Supabase)

```sql
CREATE TABLE memberships (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id),
    email TEXT NOT NULL,
    plan TEXT NOT NULL, -- 'free', 'lite', 'pro', 'premium'
    status TEXT NOT NULL, -- 'active', 'cancelled', 'expired'
    license_key TEXT UNIQUE,
    started_at TIMESTAMP DEFAULT NOW(),
    expires_at TIMESTAMP,
    cancelled_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Index for quick lookups
CREATE INDEX idx_memberships_user_id ON memberships(user_id);
CREATE INDEX idx_memberships_license_key ON memberships(license_key);
```

---

## 🎯 USER FLOW

### For New Users

1. **Sign up** → Free tier (secular reflections, balanced AI)
2. **Use app** → See 🔒 PREMIUM badges on settings
3. **Click Upgrade** → Go to upgrade.html
4. **Select plan** → Premium $29/mo
5. **Checkout** → Lemon Squeezy payment page
6. **Payment complete** → Webhook updates database
7. **Return to app** → All features unlocked

### For Existing Users

1. **Open settings** → Click ⚙️ in System Intelligence
2. **See membership** → "Free Tier" displayed
3. **Click "UPGRADE"** button → Go to upgrade.html
4. **Complete purchase**
5. **Reload app** → Premium active

---

## 💰 PRICING STRUCTURE

### Current Tiers (from upgrade.html)

**Lite - $9/month**
- Core features
- Local storage only
- Secular reflections
- Balanced AI mode

**Pro - $19/month**  
- Everything in Lite
- Cloud sync
- Priority support
- 3 reflection traditions

**Premium - $29/month** ⭐
- Everything in Pro
- All 7 reflection traditions
- All 3 AI modes
- Extended library (350+ reflections)
- Advanced analytics
- Premium support

**Recommendation**: Simplify to 2 tiers:
- **FREE**: Secular + Balanced mode
- **PREMIUM**: Everything ($29/mo)

---

## 🔐 SECURITY CONSIDERATIONS

### Verify Membership Server-Side

**DON'T**:
```javascript
// Client-side only (easy to hack)
if (localStorage.getItem('plan') === 'premium') {
    showPremiumFeatures();
}
```

**DO**:
```javascript
// Verify with database
const { data } = await supabaseClient
    .from('memberships')
    .select('plan, status')
    .eq('user_id', user.id)
    .single();
    
if (data.plan === 'premium' && data.status === 'active') {
    showPremiumFeatures();
}
```

### Validate on Every Load

```javascript
async function validateMembership() {
    const cachedPlan = localStorage.getItem('cached_plan');
    
    // Check database (source of truth)
    const membership = await getUserMembership();
    
    // Update cache
    localStorage.setItem('cached_plan', membership.plan);
    
    // Apply restrictions
    applyFeatureGates(membership);
}
```

---

## 🚀 QUICK START (Testing)

### Current Testing Method

**In app.html Settings Panel**:
1. Click ⚙️
2. Change "Membership Level" to Premium
3. Saves to localStorage
4. Premium features unlocked

**Via Console**:
```javascript
// Grant premium
localStorage.setItem('focushub_membership', JSON.stringify({
    plan: 'premium',
    status: 'active'
}));
location.reload();

// Revoke premium
localStorage.setItem('focushub_membership', JSON.stringify({
    plan: 'free',
    status: 'active'
}));
location.reload();
```

---

## ✅ TODO CHECKLIST

### Phase 1: Payment Processing
- [ ] Choose provider (Lemon Squeezy recommended)
- [ ] Set up account
- [ ] Create $29/mo Premium product
- [ ] Get checkout URLs
- [ ] Update upgrade.html buttons
- [ ] Test checkout flow

### Phase 2: Webhook Integration
- [ ] Create Supabase memberships table
- [ ] Build webhook endpoint
- [ ] Connect webhook to provider
- [ ] Test payment → database flow
- [ ] Send confirmation emails

### Phase 3: Feature Gating
- [ ] Add membership verification on app load
- [ ] Lock premium reflection traditions
- [ ] Lock premium AI modes
- [ ] Add 🔒 badges to UI
- [ ] Show upgrade prompts

### Phase 4: Polish
- [ ] Add "Manage Subscription" link
- [ ] Build subscription.html page
- [ ] Add cancel/update flows
- [ ] Email notifications
- [ ] Analytics tracking

---

## 📱 WHERE TO UPGRADE

### Option 1: From App
Settings (⚙️) → See "FREE TIER" → Click "UPGRADE" button → upgrade.html

### Option 2: Direct Link
`https://focushub.app/upgrade.html`

### Option 3: In-App Prompts
When user tries premium feature → Modal → "UPGRADE NOW" → upgrade.html

---

## 🎯 RECOMMENDATION

**Start Simple**:
1. Use Lemon Squeezy (easiest, revenue share)
2. Single tier: Premium $29/mo
3. Gate reflection traditions only (most visible)
4. Expand to other features later

**Upgrade path upgrade.html** already has beautiful UI - just needs real payment buttons!

---

**Ready to implement payment processing?** Just need to pick a provider and get checkout URLs! 💳
