// Supabase Configuration
const SUPABASE_URL = 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

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
        return membership.plan || 'free';
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
