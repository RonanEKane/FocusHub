// Supabase Configuration
const SUPABASE_URL = 'https://zpbzursxjlhizminfvyd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpwYnp1cnN4amxoaXptaW5mdnlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY3OTIzNjcsImV4cCI6MjA4MjM2ODM2N30.fKAO3lO5NEa2M-fHQC7I6uTb00rITdCA_o6Cek0H3Nk';

// Initialize Supabase client
let supabaseClient;
if (typeof window !== 'undefined' && window.supabase) {
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log('✅ Supabase client initialized');
} else {
    console.warn('⚠️ Supabase not available - will use localStorage only');
}

// ============================================
// PREMIUM MEMBERSHIP FUNCTIONS
// ============================================

async function getUserMembership() {
    try {
        const user = await getCurrentUser();
        if (!user) return null;
        
        const { data, error } = await supabaseClient
            .from('user_memberships')
            .select('*')
            .eq('user_id', user.id)
            .single();
        
        if (error) {
            if (error.code === 'PGRST116') {
                // No membership record yet, creating default...
                console.log('No membership record yet, creating default...');
                const { data: newMembership, error: insertError } = await supabaseClient
                    .from('user_memberships')
                    .insert({
                        user_id: user.id,
                        plan: 'beta',
                        status: 'active'
                    })
                    .select()
                    .single();
                
                if (insertError) {
                    console.error('Failed to create membership:', insertError);
                    return null;
                }
                return newMembership;
            } else {
                console.error('Error getting membership:', error);
                return null;
            }
        }
        
        return data;
    } catch (error) {
        console.error('Error getting membership:', error);
        return null;
    }
}

async function isPremiumUser() {
    try {
        const membership = await getUserMembership();
        if (!membership) return false;
        
        // Check if plan is beta, pro, or premium with active status
        const premiumPlans = ['beta', 'pro', 'premium'];
        if (premiumPlans.includes(membership.plan) && membership.status === 'active') {
            return true;
        }
        
        // Check if premium hasn't expired
        if (membership.premium_expires_at && membership.status === 'active') {
            const expiresAt = new Date(membership.premium_expires_at);
            if (expiresAt > new Date()) {
                return true;
            }
        }
        
        return false;
    } catch (error) {
        console.error('Error checking premium status:', error);
        return false;
    }
}

async function isProUser() {
    try {
        const membership = await getUserMembership();
        if (!membership) return false;
        
        // Pro or higher (premium, beta) with active status
        const proPlans = ['pro', 'premium', 'beta'];
        if (proPlans.includes(membership.plan) && membership.status === 'active') {
            return true;
        }
        
        return false;
    } catch (error) {
        console.error('Error checking pro status:', error);
        return false;
    }
}

async function getUserTier() {
    try {
        const membership = await getUserMembership();
        if (!membership) return 'free';
        
        return membership.plan || 'free';
    } catch (error) {
        console.error('Error getting user tier:', error);
        return 'free';
    }
}

async function checkTrialStatus() {
    try {
        const user = await getCurrentUser();
        if (!user) return { inTrial: false, daysRemaining: 0 };
        
        const membership = await getUserMembership();
        if (!membership) return { inTrial: false, daysRemaining: 0 };
        
        // Check if user has ever subscribed
        if (membership.stripe_subscription_id || membership.has_subscribed) {
            return { inTrial: false, daysRemaining: 0 };
        }
        
        // Calculate trial period based on plan
        const signupDate = new Date(membership.created_at || user.created_at);
        const now = new Date();
        const daysSinceSignup = Math.floor((now - signupDate) / (1000 * 60 * 60 * 24));
        
        // Lite: 7 days free trial
        // Pro: 14 days at $4.99
        // Premium: 14 days at $9.99
        const trialDays = membership.plan === 'lite' ? 7 : 14;
        const daysRemaining = trialDays - daysSinceSignup;
        
        return {
            inTrial: daysRemaining > 0,
            daysRemaining: Math.max(0, daysRemaining),
            trialEndsAt: new Date(signupDate.getTime() + trialDays * 24 * 60 * 60 * 1000)
        };
    } catch (error) {
        console.error('Error checking trial status:', error);
        return { inTrial: false, daysRemaining: 0 };
    }
}

function getTierDisplayName(plan) {
    const planNames = {
        'free': 'Free',
        'lite': 'Lite',
        'pro': 'Pro',
        'premium': 'Premium',
        'beta': 'Beta'
    };
    return planNames[plan] || 'Free';
}

function getTierColor(plan) {
    const planColors = {
        'free': '#64748b',  // Gray
        'lite': '#64748b',  // Gray
        'pro': '#3b82f6',   // Blue
        'premium': '#f59e0b', // Gold
        'beta': '#22c55e'   // Green
    };
    return planColors[plan] || '#64748b';
}

function getTierEmoji(plan) {
    const planEmojis = {
        'free': '💡',
        'lite': '💡',
        'pro': '⚡',
        'premium': '⭐',
        'beta': '🎖️'
    };
    return planEmojis[plan] || '💡';
}

async function getReflectionTradition() {
    try {
        const user = await getCurrentUser();
        if (!user) return 'universal';
        
        const { data } = await supabaseClient
            .from('user_profiles')
            .select('reflection_tradition')
            .eq('id', user.id)
            .single();
        
        return data?.reflection_tradition || 'universal';
    } catch (error) {
        console.error('Error getting reflection tradition:', error);
        return 'universal';
    }
}

async function setReflectionTradition(tradition) {
    try {
        const user = await getCurrentUser();
        if (!user) return false;
        
        // Check if user has premium access
        const hasPremium = await isPremiumUser();
        if (!hasPremium && tradition !== 'universal') {
            console.warn('Premium required for non-universal reflections');
            return false;
        }
        
        const { error } = await supabaseClient
            .from('user_profiles')
            .update({ reflection_tradition: tradition })
            .eq('id', user.id);
        
        if (error) throw error;
        
        console.log(`✅ Reflection tradition set to: ${tradition}`);
        return true;
    } catch (error) {
        console.error('Error setting reflection tradition:', error);
        return false;
    }
}

// Note: The full Supabase functions (getTodaySession, saveTodaySession, etc.) 
// are defined in a separate file that was part of the Supabase migration.
// If those functions are not available, the app will automatically fall back to localStorage.

async function getCurrentUser() {
    const { data: { user }, error } = await supabaseClient.auth.getUser();
    if (error) {
        console.error('Get user error:', error);
        return null;
    }
    return user;
}

async function isLoggedIn() {
    const user = await getCurrentUser();
    return !!user;
}

// Authentication functions
async function handleSignin(email, password) {
    try {
        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email: email,
            password: password
        });
        
        if (error) {
            console.error('Sign in error:', error);
            return { success: false, error: error.message };
        }
        
        console.log('✅ Sign in successful');
        return { success: true, user: data.user };
    } catch (error) {
        console.error('Sign in error:', error);
        return { success: false, error: 'An unexpected error occurred' };
    }
}

async function handleSignup(email, password, name) {
    try {
        // Sign up the user
        const { data, error } = await supabaseClient.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    name: name
                }
            }
        });
        
        if (error) {
            console.error('Sign up error:', error);
            return { success: false, error: error.message };
        }
        
        // Create user profile
        if (data.user) {
            const { error: profileError } = await supabaseClient
                .from('user_profiles')
                .insert({
                    id: data.user.id,
                    name: name,
                    email: email,
                    mode: 'default'
                });
            
            if (profileError) {
                console.error('Profile creation error:', profileError);
            }
            
            // Create default membership
            const { error: membershipError } = await supabaseClient
                .from('user_memberships')
                .insert({
                    user_id: data.user.id,
                    plan: 'beta',
                    status: 'active'
                });
            
            if (membershipError) {
                console.error('Membership creation error:', membershipError);
            }
        }
        
        console.log('✅ Sign up successful');
        
        // Mark as new user for onboarding
        localStorage.setItem('focushub_new_user', 'true');
        
        return { success: true, user: data.user };
    } catch (error) {
        console.error('Sign up error:', error);
        return { success: false, error: 'An unexpected error occurred' };
    }
}

async function handleSignout() {
    try {
        const { error } = await supabaseClient.auth.signOut();
        
        if (error) {
            console.error('Sign out error:', error);
            return { success: false, error: error.message };
        }
        
        console.log('✅ Sign out successful');
        return { success: true };
    } catch (error) {
        console.error('Sign out error:', error);
        return { success: false, error: 'An unexpected error occurred' };
    }
}

async function handlePasswordReset(email) {
    try {
        const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
            redirectTo: window.location.origin + '/reset-password.html'
        });
        
        if (error) {
            console.error('Password reset error:', error);
            return { success: false, error: error.message };
        }
        
        console.log('✅ Password reset email sent');
        return { success: true };
    } catch (error) {
        console.error('Password reset error:', error);
        return { success: false, error: 'An unexpected error occurred' };
    }
}

