// ============================================
// SUPABASE CONFIGURATION (SINGLETON PATTERN)
// Prevents multiple client instances
// ============================================

// Supabase Configuration
const SUPABASE_URL = 'https://zpbzursxjlhizminfvyd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpwYnp1cnN4amxoaXptaW5mdnlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY3OTIzNjcsImV4cCI6MjA4MjM2ODM2N30.fKAO3lO5NEa2M-fHQC7I6uTb00rITdCA_o6Cek0H3Nk';

// SINGLETON: Create or return existing client
let supabaseClient;
if (typeof window !== 'undefined') {
    if (window.supabaseClient) {
        supabaseClient = window.supabaseClient;
        console.log('✅ Using existing Supabase client');
    } else {
        supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        window.supabaseClient = supabaseClient;
        console.log('✅ Created new Supabase client (singleton)');
    }
}

// Get current user
async function getCurrentUser() {
    const { data: { user } } = await supabaseClient.auth.getUser();
    return user;
}

// Get user membership
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
            console.log('No membership record yet, creating default...');
            const { data: newMembership } = await supabaseClient
                .from('user_memberships')
                .insert({
                    user_id: user.id,
                    plan: 'beta',
                    status: 'active'
                })
                .select()
                .single();
            return newMembership;
        }
        
        return data;
    } catch (error) {
        console.error('Error getting membership:', error);
        return null;
    }
}

// Check if premium user
async function isPremiumUser() {
    try {
        const membership = await getUserMembership();
        if (!membership) return false;
        
        const premiumPlans = ['beta', 'pro', 'premium'];
        if (premiumPlans.includes(membership.plan) && membership.status === 'active') {
            return true;
        }
        
        return false;
    } catch (error) {
        console.error('Error checking premium status:', error);
        return false;
    }
}

// Check if pro user
async function isProUser() {
    try {
        const membership = await getUserMembership();
        if (!membership) return false;
        
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

// Get user tier
async function getUserTier() {
    try {
        const membership = await getUserMembership();
        return membership?.plan || 'free';
    } catch (error) {
        console.error('Error getting user tier:', error);
        return 'free';
    }
}

// Handle signup
async function handleSignup(email, password) {
    try {
        const { data, error } = await supabaseClient.auth.signUp({
            email,
            password
        });
        
        if (error) throw error;
        
        // Create default membership
        if (data.user) {
            await supabaseClient
                .from('user_memberships')
                .insert({
                    user_id: data.user.id,
                    plan: 'beta',
                    status: 'active'
                });
        }
        
        return { success: true, data };
    } catch (error) {
        console.error('Signup error:', error);
        return { success: false, error };
    }
}

// Handle signout
async function handleSignout() {
    try {
        const { error } = await supabaseClient.auth.signOut();
        if (error) throw error;
        return { success: true };
    } catch (error) {
        console.error('Signout error:', error);
        return { success: false, error };
    }
}

// Get tier display name
function getTierDisplayName(plan) {
    const tierNames = {
        free: 'Free',
        lite: 'Lite',
        pro: 'Pro',
        premium: 'Premium',
        beta: 'Beta'
    };
    return tierNames[plan] || 'Free';
}

// Get tier color
function getTierColor(plan) {
    const tierColors = {
        free: '#64748b',
        lite: '#3b82f6',
        pro: '#8b5cf6',
        premium: '#f59e0b',
        beta: '#f45b07'
    };
    return tierColors[plan] || '#64748b';
}

// Get tier emoji
function getTierEmoji(plan) {
    const tierEmojis = {
        free: '💡',
        lite: '⚡',
        pro: '🚀',
        premium: '👑',
        beta: '🧪'
    };
    return tierEmojis[plan] || '💡';
}
