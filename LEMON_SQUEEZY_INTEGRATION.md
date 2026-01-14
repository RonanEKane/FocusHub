# Lemon Squeezy Integration Guide

## Setup Overview

FocusHub uses Lemon Squeezy for payment processing. This guide covers the complete integration.

---

## 1. Lemon Squeezy Account Setup

### Create Products
Create 6 products in Lemon Squeezy dashboard:

1. **FocusHub Lite - Monthly** ($3.99/mo)
2. **FocusHub Lite - Annual** ($39/year)
3. **FocusHub Pro - Monthly** ($9.99/mo)
4. **FocusHub Pro - Annual** ($99/year)
5. **FocusHub Premium - Monthly** ($19.99/mo)
6. **FocusHub Premium - Annual** ($199/year)

### Trial Pricing Setup
For Pro and Premium:
- Set initial trial price (Pro: $4.99, Premium: $9.99)
- Duration: 14 days
- Then full price after

For Lite:
- Use Lemon Squeezy's native 7-day free trial
- No card required during trial

---

## 2. Update Checkout URLs

In `upgrade.html`, replace placeholder URLs with actual Lemon Squeezy checkout URLs:

```javascript
const checkoutUrls = {
    'lite-monthly': 'https://focushub.lemonsqueezy.com/checkout/buy/YOUR-LITE-MONTHLY-ID',
    'lite-annual': 'https://focushub.lemonsqueezy.com/checkout/buy/YOUR-LITE-ANNUAL-ID',
    'pro-monthly': 'https://focushub.lemonsqueezy.com/checkout/buy/YOUR-PRO-MONTHLY-ID',
    'pro-annual': 'https://focushub.lemonsqueezy.com/checkout/buy/YOUR-PRO-ANNUAL-ID',
    'premium-monthly': 'https://focushub.lemonsqueezy.com/checkout/buy/YOUR-PREMIUM-MONTHLY-ID',
    'premium-annual': 'https://focushub.lemonsqueezy.com/checkout/buy/YOUR-PREMIUM-ANNUAL-ID'
};
```

---

## 3. Webhook Handler (Backend Required)

Lemon Squeezy sends webhooks for subscription events. You need a backend endpoint to handle these.

### Webhook Events to Handle:

1. **subscription_created** - New subscription started
2. **subscription_updated** - Subscription changed (upgrade/downgrade)
3. **subscription_cancelled** - User cancelled
4. **subscription_resumed** - User resumed after cancellation
5. **subscription_expired** - Subscription ended
6. **subscription_payment_success** - Payment received
7. **subscription_payment_failed** - Payment failed

### Backend Endpoint (Node.js Example)

Create a serverless function or backend endpoint:

```javascript
// webhook-handler.js (Deploy to Vercel, Netlify, or Cloudflare Workers)

import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY // Use service role key for admin access
);

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // Verify webhook signature
    const signature = req.headers['x-signature'];
    const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET;
    
    const hmac = crypto.createHmac('sha256', secret);
    const digest = hmac.update(JSON.stringify(req.body)).digest('hex');
    
    if (signature !== digest) {
        return res.status(401).json({ error: 'Invalid signature' });
    }

    const event = req.body;
    const { meta, data } = event;
    const eventName = meta.event_name;
    
    try {
        switch (eventName) {
            case 'subscription_created':
                await handleSubscriptionCreated(data);
                break;
            
            case 'subscription_updated':
                await handleSubscriptionUpdated(data);
                break;
            
            case 'subscription_cancelled':
                await handleSubscriptionCancelled(data);
                break;
            
            case 'subscription_expired':
                await handleSubscriptionExpired(data);
                break;
            
            case 'subscription_payment_success':
                await handlePaymentSuccess(data);
                break;
            
            case 'subscription_payment_failed':
                await handlePaymentFailed(data);
                break;
        }
        
        res.status(200).json({ received: true });
    } catch (error) {
        console.error('Webhook error:', error);
        res.status(500).json({ error: 'Webhook processing failed' });
    }
}

async function handleSubscriptionCreated(data) {
    const customerId = data.attributes.customer_id;
    const email = data.attributes.user_email;
    const productId = data.attributes.product_id;
    const variantId = data.attributes.variant_id;
    const subscriptionId = data.id;
    
    // Determine tier from product
    const tier = getTierFromProduct(productId, variantId);
    
    // Get user by email
    const { data: users } = await supabase.auth.admin.listUsers();
    const user = users?.users?.find(u => u.email === email);
    
    if (!user) {
        console.error('User not found:', email);
        return;
    }
    
    // Update membership
    await supabase
        .from('user_memberships')
        .update({
            tier: tier,
            stripe_customer_id: customerId,
            stripe_subscription_id: subscriptionId,
            has_subscribed: true,
            updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id);
    
    console.log(`✅ Subscription created for ${email} - ${tier}`);
}

async function handleSubscriptionUpdated(data) {
    const subscriptionId = data.id;
    const status = data.attributes.status;
    const productId = data.attributes.product_id;
    const variantId = data.attributes.variant_id;
    
    const tier = getTierFromProduct(productId, variantId);
    
    await supabase
        .from('user_memberships')
        .update({
            tier: tier,
            updated_at: new Date().toISOString()
        })
        .eq('stripe_subscription_id', subscriptionId);
    
    console.log(`✅ Subscription updated: ${subscriptionId} - ${tier}`);
}

async function handleSubscriptionCancelled(data) {
    const subscriptionId = data.id;
    const endsAt = data.attributes.ends_at;
    
    await supabase
        .from('user_memberships')
        .update({
            premium_expires_at: endsAt,
            updated_at: new Date().toISOString()
        })
        .eq('stripe_subscription_id', subscriptionId);
    
    console.log(`✅ Subscription cancelled: ${subscriptionId}`);
}

async function handleSubscriptionExpired(data) {
    const subscriptionId = data.id;
    
    await supabase
        .from('user_memberships')
        .update({
            tier: 'lite',
            stripe_subscription_id: null,
            premium_expires_at: null,
            updated_at: new Date().toISOString()
        })
        .eq('stripe_subscription_id', subscriptionId);
    
    console.log(`✅ Subscription expired: ${subscriptionId}`);
}

async function handlePaymentSuccess(data) {
    // Log successful payment
    console.log(`✅ Payment successful: ${data.id}`);
}

async function handlePaymentFailed(data) {
    // Log failed payment
    // Consider sending email notification to user
    console.log(`⚠️ Payment failed: ${data.id}`);
}

function getTierFromProduct(productId, variantId) {
    // Map your Lemon Squeezy product/variant IDs to tiers
    const tierMap = {
        'LITE_MONTHLY_VARIANT_ID': 'lite',
        'LITE_ANNUAL_VARIANT_ID': 'lite',
        'PRO_MONTHLY_VARIANT_ID': 'pro',
        'PRO_ANNUAL_VARIANT_ID': 'pro',
        'PREMIUM_MONTHLY_VARIANT_ID': 'premium',
        'PREMIUM_ANNUAL_VARIANT_ID': 'premium'
    };
    
    return tierMap[variantId] || 'lite';
}
```

---

## 4. Environment Variables

Set these in your backend deployment:

```env
SUPABASE_URL=https://zpbzursxjlhizminfvyd.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
LEMON_SQUEEZY_WEBHOOK_SECRET=your-webhook-secret-from-lemon-squeezy
```

---

## 5. Configure Webhooks in Lemon Squeezy

1. Go to Lemon Squeezy Dashboard → Settings → Webhooks
2. Add webhook URL: `https://your-backend.com/api/webhook-handler`
3. Select events:
   - subscription_created
   - subscription_updated
   - subscription_cancelled
   - subscription_expired
   - subscription_payment_success
   - subscription_payment_failed
4. Copy webhook secret and add to environment variables

---

## 6. Customer Portal

Lemon Squeezy provides a customer portal where users can:
- Update payment method
- View invoices
- Cancel subscription
- Change billing cycle

Update `subscription.html` with your customer portal URL:

```javascript
function openCustomerPortal() {
    const portalUrl = 'https://focushub.lemonsqueezy.com/billing';
    window.open(portalUrl, '_blank');
}
```

---

## 7. Testing

### Test Mode
1. Enable test mode in Lemon Squeezy dashboard
2. Use test card: 4242 4242 4242 4242
3. Test all subscription flows:
   - New subscription
   - Upgrade/downgrade
   - Cancellation
   - Payment failure

### Verify in Supabase
After each test transaction, check `user_memberships` table:
```sql
SELECT * FROM user_memberships WHERE user_id = 'test-user-id';
```

---

## 8. Email Notifications

Consider sending emails for:
- Trial ending (3 days before, 1 day before)
- Subscription started
- Payment success
- Payment failure
- Subscription cancelled
- Subscription expired

Use a service like:
- SendGrid
- Mailgun
- Postmark
- Resend

---

## 9. Revenue Tracking

Lemon Squeezy provides built-in analytics:
- MRR (Monthly Recurring Revenue)
- Churn rate
- Customer lifetime value
- Revenue by product

Access at: Lemon Squeezy Dashboard → Analytics

---

## 10. Deployment Checklist

Before going live:

- [ ] All products created in Lemon Squeezy
- [ ] Checkout URLs updated in `upgrade.html`
- [ ] Webhook handler deployed and tested
- [ ] Webhooks configured in Lemon Squeezy
- [ ] Environment variables set
- [ ] Test mode transactions completed
- [ ] Customer portal URL updated
- [ ] Email notifications configured (optional)
- [ ] Switch to production mode in Lemon Squeezy

---

## Alternative: Lemon Squeezy Overlay

For simpler integration, use Lemon Squeezy's JavaScript overlay:

```javascript
// In upgrade.html
function selectPlan(tier, cycle) {
    const checkoutId = getCheckoutId(tier, cycle);
    
    window.createLemonSqueezy();
    window.LemonSqueezy.Url.Open(checkoutId);
}

function getCheckoutId(tier, cycle) {
    const ids = {
        'lite-monthly': 'YOUR-CHECKOUT-ID',
        'pro-monthly': 'YOUR-CHECKOUT-ID',
        // ... etc
    };
    return ids[`${tier}-${cycle}`];
}
```

This opens checkout in an overlay instead of redirecting.

---

## Support

If you need help with Lemon Squeezy integration:
- Lemon Squeezy Docs: https://docs.lemonsqueezy.com
- API Reference: https://docs.lemonsqueezy.com/api
- Support: support@lemonsqueezy.com
