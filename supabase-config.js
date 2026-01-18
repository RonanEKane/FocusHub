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

async function isProUser() {
    try {
        const membership = await getUserMembership();
        if (!membership) return false;
        
        // Pro or higher (premium, beta)
        if (membership.tier === 'pro' || membership.tier === 'premium' || membership.tier === 'beta') {
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
        if (!membership) return 'trial';
        
        // Check if trial period is active
        const trialStatus = await checkTrialStatus();
        if (trialStatus.inTrial) {
            return 'trial';
        }
        
        return membership.tier || 'free';
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
        
        // Calculate trial period based on tier
        const signupDate = new Date(membership.created_at || user.created_at);
        const now = new Date();
        const daysSinceSignup = Math.floor((now - signupDate) / (1000 * 60 * 60 * 24));
        
        // Lite: 7 days free trial
        // Pro: 14 days at $4.99
        // Premium: 14 days at $9.99
        const trialDays = membership.tier === 'lite' ? 7 : 14;
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

function getTierDisplayName(tier) {
    const tierNames = {
        'trial': 'Trial',
        'lite': 'Lite',
        'pro': 'Pro',
        'premium': 'Premium',
        'beta': 'Beta'
    };
    return tierNames[tier] || 'Free';
}

function getTierColor(tier) {
    const tierColors = {
        'trial': '#a855f7', // Purple
        'lite': '#64748b',  // Gray
        'pro': '#3b82f6',   // Blue
        'premium': '#f59e0b', // Gold
        'beta': '#22c55e'   // Green
    };
    return tierColors[tier] || '#64748b';
}

function getTierEmoji(tier) {
    const tierEmojis = {
        'trial': '⏱️',
        'lite': '💡',
        'pro': '⚡',
        'premium': '⭐',
        'beta': '🎖️'
    };
    return tierEmojis[tier] || '💡';
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

// ============================================
// SUPABASE DATA SYNC FUNCTIONS
// ============================================

// Get today's session data
async function getTodaySession() {
    try {
        const user = await getCurrentUser();
        if (!user) return null;
        
        const today = new Date().toISOString().split('T')[0];
        
        const { data, error } = await supabaseClient
            .from('daily_sessions')
            .select('*')
            .eq('user_id', user.id)
            .eq('date', today)
            .single();
        
        if (error && error.code !== 'PGRST116') {
            console.error('Error loading session:', error);
            return null;
        }
        
        return data;
    } catch (error) {
        console.error('Get today session error:', error);
        return null;
    }
}

// Save today's session data
async function saveTodaySession(sessionData) {
    try {
        const user = await getCurrentUser();
        if (!user) return false;
        
        const today = new Date().toISOString().split('T')[0];
        
        const { error } = await supabaseClient
            .from('daily_sessions')
            .upsert({
                user_id: user.id,
                date: today,
                ...sessionData,
                updated_at: new Date().toISOString()
            }, {
                onConflict: 'user_id,date'
            });
        
        if (error) {
            console.error('Error saving session:', error);
            return false;
        }
        
        return true;
    } catch (error) {
        console.error('Save today session error:', error);
        return false;
    }
}

// Load all tasks
async function loadAllTasks() {
    try {
        const user = await getCurrentUser();
        if (!user) return null;
        
        const { data, error } = await supabaseClient
            .from('tasks')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });
        
        if (error) {
            console.error('Error loading tasks:', error);
            return null;
        }
        
        // Convert array to bucket structure
        const tasks = {
            holding: [],
            urgent: [],
            deepwork: [],
            strategic: [],
            wins: []
        };
        
        if (data) {
            data.forEach(task => {
                if (tasks[task.bucket]) {
                    tasks[task.bucket].push({
                        id: task.id,
                        text: task.text,
                        bucket: task.bucket,
                        completed: task.completed || false,
                        completedAt: task.completed_at,
                        createdAt: task.created_at
                    });
                }
            });
        }
        
        return tasks;
    } catch (error) {
        console.error('Load all tasks error:', error);
        return null;
    }
}

// Save all tasks
async function saveAllTasks(tasks) {
    try {
        const user = await getCurrentUser();
        if (!user) return false;
        
        // Delete all existing tasks for this user
        await supabaseClient
            .from('tasks')
            .delete()
            .eq('user_id', user.id);
        
        // Prepare tasks for insert
        const taskRecords = [];
        for (const [bucket, bucketTasks] of Object.entries(tasks)) {
            bucketTasks.forEach(task => {
                taskRecords.push({
                    user_id: user.id,
                    id: task.id,
                    text: task.text,
                    bucket: bucket,
                    completed: task.completed || false,
                    completed_at: task.completedAt || null,
                    created_at: task.createdAt || new Date().toISOString()
                });
            });
        }
        
        // Insert all tasks
        if (taskRecords.length > 0) {
            const { error } = await supabaseClient
                .from('tasks')
                .insert(taskRecords);
            
            if (error) {
                console.error('Error saving tasks:', error);
                return false;
            }
        }
        
        return true;
    } catch (error) {
        console.error('Save all tasks error:', error);
        return false;
    }
}

// Load all distractions
async function loadAllDistractions() {
    try {
        const user = await getCurrentUser();
        if (!user) return [];
        
        const today = new Date().toISOString().split('T')[0];
        
        const { data, error } = await supabaseClient
            .from('distractions')
            .select('*')
            .eq('user_id', user.id)
            .gte('created_at', today)
            .order('created_at', { ascending: false });
        
        if (error) {
            console.error('Error loading distractions:', error);
            return [];
        }
        
        return data || [];
    } catch (error) {
        console.error('Load all distractions error:', error);
        return [];
    }
}

// Save all distractions
async function saveAllDistractions(distractions) {
    try {
        const user = await getCurrentUser();
        if (!user) return false;
        
        const today = new Date().toISOString().split('T')[0];
        
        // Delete today's distractions
        await supabaseClient
            .from('distractions')
            .delete()
            .eq('user_id', user.id)
            .gte('created_at', today);
        
        // Insert current distractions
        if (distractions && distractions.length > 0) {
            const distractionRecords = distractions.map(d => ({
                user_id: user.id,
                text: d.text,
                category: d.category,
                created_at: d.timestamp || new Date().toISOString()
            }));
            
            const { error } = await supabaseClient
                .from('distractions')
                .insert(distractionRecords);
            
            if (error) {
                console.error('Error saving distractions:', error);
                return false;
            }
        }
        
        return true;
    } catch (error) {
        console.error('Save all distractions error:', error);
        return false;
    }
}

// Load all intentions
async function loadAllIntentions() {
    try {
        const user = await getCurrentUser();
        if (!user) return [];
        
        const today = new Date().toISOString().split('T')[0];
        
        const { data, error } = await supabaseClient
            .from('intentions')
            .select('*')
            .eq('user_id', user.id)
            .gte('created_at', today)
            .order('created_at', { ascending: true });
        
        if (error) {
            console.error('Error loading intentions:', error);
            return [];
        }
        
        return data ? data.map(i => i.text) : [];
    } catch (error) {
        console.error('Load all intentions error:', error);
        return [];
    }
}

// Save all intentions
async function saveAllIntentions(intentions) {
    try {
        const user = await getCurrentUser();
        if (!user) return false;
        
        const today = new Date().toISOString().split('T')[0];
        
        // Delete today's intentions
        await supabaseClient
            .from('intentions')
            .delete()
            .eq('user_id', user.id)
            .gte('created_at', today);
        
        // Insert current intentions
        if (intentions && intentions.length > 0) {
            const intentionRecords = intentions.map(text => ({
                user_id: user.id,
                text: text,
                created_at: new Date().toISOString()
            }));
            
            const { error } = await supabaseClient
                .from('intentions')
                .insert(intentionRecords);
            
            if (error) {
                console.error('Error saving intentions:', error);
                return false;
            }
        }
        
        return true;
    } catch (error) {
        console.error('Save all intentions error:', error);
        return false;
    }
}

// Get all tasks (for multi-device sync checks)
async function getAllTasks() {
    return await loadAllTasks();
}

// Get all distractions (for multi-device sync checks)
async function getAllDistractions() {
    return await loadAllDistractions();
}

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
                    tier: 'lite',
                    is_beta_user: false
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

