// ============================================
// SUPABASE CONFIGURATION FOR FOCUSHUB
// ============================================

const SUPABASE_URL = 'https://zpbzursxjlhizminfvyd.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpwYnp1cnN4amxoaXptaW5mdnlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY3OTIzNjcsImV4cCI6MjA4MjM2ODM2N30.fKAO3lO5NEa2M-fHQC7I6uTb00rITdCA_o6Cek0H3Nk'

// Initialize Supabase client
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// ============================================
// AUTH HELPER FUNCTIONS
// ============================================

async function getCurrentUser() {
    const { data: { user }, error } = await supabaseClient.auth.getUser()
    if (error) {
        console.error('Get user error:', error)
        return null
    }
    return user
}

async function isLoggedIn() {
    const user = await getCurrentUser()
    return !!user
}

async function signOut() {
    // Save today's stats before logging out
    try {
        const stats = localStorage.getItem('focushub_daily_stats');
        if (stats) {
            const data = JSON.parse(stats);
            const logoutData = {
                sprints: data.sprintCount || 0,
                tasks: data.tasksCompleted || 0,
                grade: data.currentGrade || '—'
            };
            sessionStorage.setItem('focushub_logout_stats', JSON.stringify(logoutData));
        }
    } catch (e) {
        console.error('Error saving logout stats:', e);
    }
    
    const { error } = await supabaseClient.auth.signOut()
    if (error) {
        console.error('Sign out error:', error)
    } else {
        // Redirect to logout page
        window.location.href = 'logout.html'
    }
}

async function handleSignup(email, password, mode) {
    try {
        // Sign up the user
        const { data: { user }, error } = await supabaseClient.auth.signUp({
            email: email,
            password: password
        })
        
        if (error) {
            console.error('Sign up error:', error)
            return { success: false, error: error.message }
        }
        
        if (!user) {
            return { success: false, error: 'User creation failed' }
        }
        
        // Create user profile
        const { error: profileError } = await supabaseClient
            .from('user_profiles')
            .insert({
                id: user.id,
                email: email,
                mode: mode || 'professional',
                theme: 'light'
            })
        
        if (profileError) {
            console.error('Profile creation error:', profileError)
            // Continue anyway - profile can be created later
        }
        
        return { success: true, user: user }
    } catch (err) {
        console.error('Sign up exception:', err)
        return { success: false, error: err.message }
    }
}

async function handleSignin(email, password) {
    try {
        const { data: { user }, error } = await supabaseClient.auth.signInWithPassword({
            email: email,
            password: password
        })
        
        if (error) {
            console.error('Sign in error:', error)
            return { success: false, error: error.message }
        }
        
        return { success: true, user: user }
    } catch (err) {
        console.error('Sign in exception:', err)
        return { success: false, error: err.message }
    }
}

async function resetPassword(email) {
    try {
        const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
            redirectTo: window.location.origin + '/start.html'
        })
        
        if (error) {
            console.error('Password reset error:', error)
            return { success: false, error: error.message }
        }
        
        return { success: true }
    } catch (err) {
        console.error('Password reset exception:', err)
        return { success: false, error: err.message }
    }
}

// ============================================
// DATA HELPER FUNCTIONS
// ============================================

async function getTodaySession() {
    const user = await getCurrentUser()
    if (!user) return null
    
    const today = new Date().toISOString().split('T')[0]
    
    const { data, error } = await supabaseClient
        .from('daily_sessions')
        .select('*')
        .eq('user_id', user.id)
        .eq('session_date', today)
        .maybeSingle()  // Use maybeSingle() instead of single() - doesn't error if no rows
    
    if (error) {
        console.error('Get session error:', error)
        return null
    }
    
    return data
}

async function saveTodaySession(sessionData) {
    const user = await getCurrentUser()
    if (!user) return { success: false, error: 'Not logged in' }
    
    const today = new Date().toISOString().split('T')[0]
    
    const { error } = await supabaseClient
        .from('daily_sessions')
        .upsert({
            user_id: user.id,
            session_date: today,
            ...sessionData
        }, {
            onConflict: 'user_id,session_date'
        })
    
    if (error) {
        console.error('Save session error:', error)
        return { success: false, error: error.message }
    }
    
    return { success: true }
}

// ============================================
// ENHANCED DATA SYNC FUNCTIONS (PHASE 3)
// ============================================

// Save all tasks for today (batch operation)
async function saveAllTasks(tasksObj) {
    const user = await getCurrentUser();
    if (!user) return { success: false, error: 'Not logged in' };
    
    const today = new Date().toISOString().split('T')[0];
    
    // Flatten tasks object into array
    const allTasks = [];
    Object.keys(tasksObj).forEach(bucket => {
        tasksObj[bucket].forEach(task => {
            allTasks.push({
                user_id: user.id,
                session_date: today,
                text: task.text,
                bucket: bucket,
                sprints: task.sprints || 0,
                priority: task.priority || 'medium',
                completed: task.completed || false,
                completed_at: task.completed ? new Date().toISOString() : null,
                subject: task.subject || null,
                custom_subject: task.customSubject || null,
                deadline: task.deadline || null
            });
        });
    });
    
    // Delete existing tasks for today
    await supabaseClient
        .from('tasks')
        .delete()
        .eq('user_id', user.id)
        .eq('session_date', today);
    
    // Insert all tasks
    if (allTasks.length > 0) {
        const { data, error } = await supabaseClient
            .from('tasks')
            .insert(allTasks)
            .select();
        
        if (error) {
            console.error('Save all tasks error:', error);
            return { success: false, error: error.message };
        }
        
        return { success: true, tasks: data };
    }
    
    return { success: true, tasks: [] };
}

// Load all tasks for today and organize by bucket
async function loadAllTasks() {
    const user = await getCurrentUser();
    if (!user) return null;
    
    const today = new Date().toISOString().split('T')[0];
    
    const { data, error } = await supabaseClient
        .from('tasks')
        .select('*')
        .eq('user_id', user.id)
        .eq('session_date', today)
        .order('created_at', { ascending: true });
    
    if (error) {
        console.error('Load tasks error:', error);
        return null;
    }
    
    // Organize by bucket
    const tasks = {
        holding: [],
        urgent: [],
        deepwork: [],
        strategic: [],
        wins: []
    };
    
    (data || []).forEach(task => {
        const bucket = task.bucket || 'holding';
        if (tasks[bucket]) {
            tasks[bucket].push({
                id: task.id, // Use Supabase ID as primary
                supabase_id: task.id,
                text: task.text,
                bucket: task.bucket,
                sprints: task.sprints,
                priority: task.priority,
                completed: task.completed,
                createdAt: task.created_at,
                subject: task.subject,
                customSubject: task.custom_subject,
                deadline: task.deadline
            });
        }
    });
    
    return tasks;
}

// Save all distractions for today
async function saveAllDistractions(distractions) {
    const user = await getCurrentUser();
    if (!user) return { success: false, error: 'Not logged in' };
    
    const today = new Date().toISOString().split('T')[0];
    
    // Delete existing
    await supabaseClient
        .from('distractions')
        .delete()
        .eq('user_id', user.id)
        .eq('session_date', today);
    
    // Insert all
    const distractionsData = distractions.map(d => ({
        user_id: user.id,
        session_date: today,
        text: d.text,
        intention: d.intention || null,
        reality: d.reality || null,
        followed_through: d.followed_through || false
    }));
    
    if (distractionsData.length === 0) {
        return { success: true };
    }
    
    const { error } = await supabaseClient
        .from('distractions')
        .insert(distractionsData);
    
    if (error) {
        console.error('Save distractions error:', error);
        return { success: false, error: error.message };
    }
    
    return { success: true };
}

// Load all distractions for today
async function loadAllDistractions() {
    const user = await getCurrentUser();
    if (!user) return [];
    
    const today = new Date().toISOString().split('T')[0];
    
    const { data, error } = await supabaseClient
        .from('distractions')
        .select('*')
        .eq('user_id', user.id)
        .eq('session_date', today)
        .order('created_at', { ascending: true });
    
    if (error) {
        console.error('Load distractions error:', error);
        return [];
    }
    
    return (data || []).map(d => ({
        id: d.id,
        text: d.text,
        intention: d.intention,
        reality: d.reality,
        followed_through: d.followed_through
    }));
}

// Save all intentions for today
async function saveAllIntentions(intentions) {
    const user = await getCurrentUser();
    if (!user) return { success: false, error: 'Not logged in' };
    
    const today = new Date().toISOString().split('T')[0];
    
    // Delete existing
    await supabaseClient
        .from('intentions')
        .delete()
        .eq('user_id', user.id)
        .eq('session_date', today);
    
    // Insert all
    const intentionsData = intentions.map(i => ({
        user_id: user.id,
        session_date: today,
        distraction_id: i.distractionId || null,
        intention: i.intention,
        followed_through: i.followedThrough || false
    }));
    
    if (intentionsData.length === 0) {
        return { success: true };
    }
    
    const { error } = await supabaseClient
        .from('intentions')
        .insert(intentionsData);
    
    if (error) {
        console.error('Save intentions error:', error);
        return { success: false, error: error.message };
    }
    
    return { success: true };
}

// Load all intentions for today
async function loadAllIntentions() {
    const user = await getCurrentUser();
    if (!user) return [];
    
    const today = new Date().toISOString().split('T')[0];
    
    const { data, error } = await supabaseClient
        .from('intentions')
        .select('*')
        .eq('user_id', user.id)
        .eq('session_date', today)
        .order('created_at', { ascending: true });
    
    if (error) {
        console.error('Load intentions error:', error);
        return [];
    }
    
    return (data || []).map(i => ({
        id: i.id,
        distractionId: i.distraction_id,
        intention: i.intention,
        followedThrough: i.followed_through
    }));
}

// Create user profile if it doesn't exist
async function ensureUserProfile() {
    const user = await getCurrentUser();
    if (!user) return { success: false, error: 'Not logged in' };
    
    // Check if profile exists
    const { data: existing } = await supabaseClient
        .from('user_profiles')
        .select('id')
        .eq('id', user.id)
        .maybeSingle();
    
    if (existing) {
        return { success: true, existed: true };
    }
    
    // Create profile
    const { error } = await supabaseClient
        .from('user_profiles')
        .insert({
            id: user.id,
            email: user.email,
            mode: 'professional',
            theme: 'light',
            tough_love_level: 'balanced'
        });
    
    if (error) {
        console.error('Create profile error:', error);
        return { success: false, error: error.message };
    }
    
    console.log('✅ User profile created');
    return { success: true, existed: false };
}

console.log('✅ Supabase config loaded for FocusHub (with Phase 3 sync)')
