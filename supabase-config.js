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
            console.log('No membership record yet, creating default...');
            // Create default free membership
            const { data: newMembership } = await supabaseClient
                .from('user_memberships')
                .insert({
                    user_id: user.id,
                    tier: 'free',
                    is_beta_user: false
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

async function isPremiumUser() {
    try {
        const membership = await getUserMembership();
        if (!membership) return false;
        
        // Check if premium or beta
        if (membership.tier === 'premium' || membership.tier === 'beta') {
            return true;
        }
        
        // Check if beta flag set
        if (membership.is_beta_user) {
            return true;
        }
        
        // Check if premium hasn't expired
        if (membership.premium_expires_at) {
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

