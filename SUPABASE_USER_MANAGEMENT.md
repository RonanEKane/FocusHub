# FocusHub - Supabase User Management Guide

**Last Updated**: January 22, 2026  
**For**: Beta management and user access control

---

## 🎯 QUICK ACCESS

### Supabase Dashboard
**URL**: https://supabase.com/dashboard/project/YOUR_PROJECT_ID

**Login**: 
- Email: [your supabase account email]
- Password: [your supabase password]

---

## 📊 USER MANAGEMENT LOCATIONS

### 1. Authentication Users (Built-in)
**Path**: Supabase Dashboard → Authentication → Users

**What You See**:
- Email addresses
- Sign-up dates
- Last sign-in
- Email confirmed status
- User UUID (unique ID)

**What You Can Do**:
- ✅ See all registered users
- ✅ Delete users
- ✅ Reset passwords
- ✅ Ban/unban users
- ❌ Cannot set membership here (need custom table)

---

### 2. Custom Memberships Table (Your Control)

**Path**: Supabase Dashboard → Table Editor → `memberships`

**If table doesn't exist yet, create it**:

```sql
CREATE TABLE memberships (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    plan TEXT NOT NULL DEFAULT 'free', -- 'free', 'beta', 'premium'
    status TEXT NOT NULL DEFAULT 'active', -- 'active', 'cancelled', 'expired'
    beta_user BOOLEAN DEFAULT false,
    billing_cycle TEXT DEFAULT 'monthly', -- 'monthly', 'annual'
    started_at TIMESTAMP DEFAULT NOW(),
    expires_at TIMESTAMP,
    last_billing_date TIMESTAMP,
    cancelled_at TIMESTAMP,
    notes TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Index for fast lookups
CREATE INDEX idx_memberships_user_id ON memberships(user_id);
CREATE INDEX idx_memberships_email ON memberships(email);
CREATE INDEX idx_memberships_plan ON memberships(plan);

-- Enable Row Level Security
ALTER TABLE memberships ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read their own membership
CREATE POLICY "Users can view own membership" 
ON memberships FOR SELECT 
USING (auth.uid() = user_id);

-- Policy: Service role can do anything (for admin)
CREATE POLICY "Service role has full access" 
ON memberships FOR ALL 
USING (auth.role() = 'service_role');
```

---

## 👥 HOW TO MANAGE USER ACCESS

### Grant Beta Access to User

**Method 1: SQL Editor** (Recommended for bulk)

```sql
-- Option A: By email
INSERT INTO memberships (user_id, email, plan, status, beta_user)
SELECT id, email, 'beta', 'active', true
FROM auth.users
WHERE email = 'john@example.com';

-- Option B: Bulk grant to multiple users
INSERT INTO memberships (user_id, email, plan, status, beta_user)
SELECT id, email, 'beta', 'active', true
FROM auth.users
WHERE email IN (
    'user1@example.com',
    'user2@example.com',
    'user3@example.com'
);
```

**Method 2: Table Editor** (Easy for single users)

1. Go to: Table Editor → `memberships`
2. Click "Insert row"
3. Fill in:
   - `user_id`: Copy from Authentication → Users
   - `email`: User's email
   - `plan`: `beta`
   - `status`: `active`
   - `beta_user`: `true`
4. Click "Save"

---

### Upgrade User to Premium

```sql
-- Update existing user to premium
UPDATE memberships
SET 
    plan = 'premium',
    status = 'active',
    started_at = NOW()
WHERE email = 'user@example.com';

-- OR create new membership if doesn't exist
INSERT INTO memberships (user_id, email, plan, status)
SELECT id, email, 'premium', 'active'
FROM auth.users
WHERE email = 'user@example.com'
ON CONFLICT (user_id) DO UPDATE
SET plan = 'premium', status = 'active', started_at = NOW();
```

---

### Downgrade User to Free

```sql
UPDATE memberships
SET 
    plan = 'free',
    status = 'active'
WHERE email = 'user@example.com';
```

---

### Cancel User's Subscription

```sql
-- Keep access until period ends
UPDATE memberships
SET 
    status = 'cancelled',
    cancelled_at = NOW(),
    expires_at = NOW() + INTERVAL '30 days' -- Or whenever their billing period ends
WHERE email = 'user@example.com';

-- Immediate revoke
UPDATE memberships
SET 
    plan = 'free',
    status = 'cancelled',
    cancelled_at = NOW()
WHERE email = 'user@example.com';
```

---

### Find All Beta Users

```sql
SELECT 
    m.email,
    m.plan,
    m.status,
    m.started_at,
    u.created_at as signup_date,
    u.last_sign_in_at
FROM memberships m
JOIN auth.users u ON m.user_id = u.id
WHERE m.beta_user = true
ORDER BY m.started_at DESC;
```

---

### Find All Premium Users

```sql
SELECT 
    m.email,
    m.plan,
    m.status,
    m.started_at,
    m.last_billing_date
FROM memberships m
WHERE m.plan = 'premium' AND m.status = 'active'
ORDER BY m.started_at DESC;
```

---

## 🔧 COMMON ADMIN TASKS

### 1. Give Beta Access to New User

**Steps**:
1. User signs up normally (they get free tier)
2. Go to Supabase → SQL Editor
3. Run:
```sql
INSERT INTO memberships (user_id, email, plan, status, beta_user)
SELECT id, email, 'beta', 'active', true
FROM auth.users
WHERE email = 'newuser@example.com';
```
4. User refreshes app → Beta access active

---

### 2. Transition Beta User to Paid Premium

**When beta ends and you want them to start paying**:

```sql
UPDATE memberships
SET 
    plan = 'premium',
    beta_user = false,
    status = 'active',
    last_billing_date = NOW(),
    notes = 'Transitioned from beta to paid premium'
WHERE email = 'betauser@example.com';
```

---

### 3. Give Beta User 50% Off Discount

**For first year after beta**:

```sql
-- Add custom discount field first (if needed)
ALTER TABLE memberships ADD COLUMN discount_percent INTEGER DEFAULT 0;

UPDATE memberships
SET 
    discount_percent = 50,
    notes = 'Beta user - 50% off first year'
WHERE beta_user = true;
```

Then handle in payment processing:
- Regular price: $29/mo
- Beta user price: $14.50/mo for 12 months

---

### 4. Process Refund Request

**User requests refund within 5 days**:

1. Check billing date:
```sql
SELECT 
    email,
    plan,
    last_billing_date,
    NOW() - last_billing_date as days_since_billing
FROM memberships
WHERE email = 'user@example.com';
```

2. If within 5 days, approve:
```sql
UPDATE memberships
SET 
    plan = 'free',
    status = 'refunded',
    cancelled_at = NOW(),
    notes = 'Refund approved - within 5 day window'
WHERE email = 'user@example.com';
```

3. Process refund in payment processor (Stripe/Lemon Squeezy)
4. Email user confirmation

---

### 5. Ban Abusive User

```sql
-- In auth.users (Supabase built-in)
-- Go to: Authentication → Users → Click user → Ban user

-- Also update membership
UPDATE memberships
SET 
    status = 'banned',
    notes = 'Account banned - [reason]'
WHERE email = 'baduser@example.com';
```

---

## 📊 REPORTING QUERIES

### Monthly Active Users by Plan

```sql
SELECT 
    plan,
    COUNT(*) as user_count,
    COUNT(CASE WHEN last_sign_in_at > NOW() - INTERVAL '30 days' THEN 1 END) as active_30d
FROM memberships m
JOIN auth.users u ON m.user_id = u.id
WHERE m.status = 'active'
GROUP BY plan;
```

---

### Revenue Report (Manual)

```sql
SELECT 
    plan,
    COUNT(*) as subscribers,
    CASE 
        WHEN plan = 'lite' THEN COUNT(*) * 9
        WHEN plan = 'pro' THEN COUNT(*) * 19
        WHEN plan = 'premium' THEN COUNT(*) * 29
        ELSE 0
    END as mrr
FROM memberships
WHERE status = 'active' AND plan != 'free' AND plan != 'beta'
GROUP BY plan;
```

---

### Users Needing Billing Transition

```sql
-- Beta users who should transition to paid
SELECT 
    email,
    started_at,
    DATE_PART('day', NOW() - started_at) as days_in_beta
FROM memberships
WHERE beta_user = true 
  AND status = 'active'
  AND started_at < NOW() - INTERVAL '90 days' -- Example: beta period over
ORDER BY started_at;
```

---

## 🔐 APP VERIFICATION

### How App Checks Membership

**app.html already has this logic**:

```javascript
// Check localStorage first (fast)
const cached = localStorage.getItem('focushub_membership');

// Then verify with Supabase (source of truth)
const { data } = await supabaseClient
    .from('memberships')
    .select('plan, status, beta_user')
    .eq('user_id', user.id)
    .single();

// Apply features based on plan
if (data.plan === 'premium' || data.plan === 'beta') {
    // Unlock all features
} else {
    // Free tier restrictions
}
```

---

## 🚨 IMPORTANT NOTES

### Beta to Open Beta Transition Plan

**Current State**: 
- Beta users have free access
- No billing

**When Moving to Open Beta**:

1. **Notify Beta Users** (30 days notice):
```sql
SELECT email, started_at
FROM memberships
WHERE beta_user = true AND status = 'active';
```
Email: "Beta ending soon. Get 50% off Premium for first year."

2. **Create Discount Codes** (in payment processor):
- Code: `BETA50`
- Discount: 50% off for 12 months
- Eligible: Beta user emails only

3. **Update All Beta Users**:
```sql
UPDATE memberships
SET 
    notes = 'Beta ended - 50% discount code sent'
WHERE beta_user = true;
```

4. **Don't Auto-Charge**: Let them choose to upgrade
5. **Downgrade Non-Payers** (after grace period):
```sql
UPDATE memberships
SET plan = 'free', status = 'expired'
WHERE beta_user = true 
  AND status = 'active'
  AND started_at < NOW() - INTERVAL '120 days'; -- 30 day grace
```

---

## 🛠️ USEFUL SUPABASE FEATURES

### RLS (Row Level Security)
- Users can only see their own membership
- Admins (you) can see/edit all via service role
- Prevents users from hacking their plan

### Webhooks
- Set up at: Database → Webhooks
- Trigger on membership changes
- Send emails automatically

### Edge Functions
- Create at: Edge Functions → New function
- Handle payment webhooks
- Process refunds automatically
- Send notification emails

---

## 📧 EMAIL NOTIFICATIONS

### Set Up Email on Membership Changes

**Create Edge Function**: `send-membership-email`

```javascript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

serve(async (req) => {
  const { record } = await req.json()
  
  // Send email based on change
  if (record.plan === 'premium' && record.status === 'active') {
    await sendEmail(record.email, 'Welcome to Premium!')
  }
  
  return new Response('OK')
})
```

**Set Up Webhook**:
1. Database → Webhooks → Create webhook
2. Table: `memberships`
3. Events: `INSERT`, `UPDATE`
4. URL: Your edge function URL

---

## ✅ CHECKLIST: Setting Up User Management

- [ ] Create `memberships` table (run SQL above)
- [ ] Enable RLS policies
- [ ] Test by adding yourself as beta user
- [ ] Verify app recognizes your beta status
- [ ] Document your beta users (export list)
- [ ] Plan transition timeline (30 day notice)
- [ ] Set up discount codes in payment processor
- [ ] Create email templates for transitions

---

## 🔗 QUICK LINKS

**Supabase Dashboard**: https://supabase.com/dashboard  
**SQL Editor**: Dashboard → SQL Editor  
**Table Editor**: Dashboard → Table Editor → memberships  
**Auth Users**: Dashboard → Authentication → Users  

**Support Email**: support@focushub.app (for refund requests)

---

**Need help?** Check Supabase docs: https://supabase.com/docs

All user management happens in Supabase - no separate admin panel needed!
