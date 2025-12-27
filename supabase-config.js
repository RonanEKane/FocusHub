// ============================================
// SUPABASE CONFIGURATION FOR FOCUSHUB
// ============================================

const SUPABASE_URL = 'https://zpbzursxjlhizminfvyd.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpwYnp1cnN4amxoaXptaW5mdnlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY3OTIzNjcsImV4cCI6MjA4MjM2ODM2N30.fKAO3lO5NEa2M-fHQC7I6uTb00rITdCA_o6Cek0H3Nk'

// Initialize Supabase client
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// ============================================
// AUTH HELPER FUNCTIONS
// ============================================

async function getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser()
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
    const { error } = await supabase.auth.signOut()
    if (error) {
        console.error('Sign out error:', error)
    } else {
        window.location.href = 'index.html'
    }
}

async function handleSignUp(email, password, mode) {
    try {
        // Sign up the user
        const { data: { user }, error } = await supabase.auth.signUp({
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
        const { error: profileError } = await supabase
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

async function handleSignIn(email, password) {
    try {
        const { data: { user }, error } = await supabase.auth.signInWithPassword({
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
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
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
    
    const { data, error } = await supabase
        .from('daily_sessions')
        .select('*')
        .eq('user_id', user.id)
        .eq('session_date', today)
        .single()
    
    if (error && error.code !== 'PGRST116') {  // PGRST116 = no rows
        console.error('Get session error:', error)
    }
    
    return data
}

async function saveTodaySession(sessionData) {
    const user = await getCurrentUser()
    if (!user) return { success: false, error: 'Not logged in' }
    
    const today = new Date().toISOString().split('T')[0]
    
    const { error } = await supabase
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

async function getTodayTasks() {
    const user = await getCurrentUser()
    if (!user) return []
    
    const today = new Date().toISOString().split('T')[0]
    
    const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', user.id)
        .eq('session_date', today)
        .order('created_at', { ascending: true })
    
    if (error) {
        console.error('Get tasks error:', error)
        return []
    }
    
    return data || []
}

async function saveTask(taskData) {
    const user = await getCurrentUser()
    if (!user) return { success: false, error: 'Not logged in' }
    
    const today = new Date().toISOString().split('T')[0]
    
    const { data, error } = await supabase
        .from('tasks')
        .insert({
            user_id: user.id,
            session_date: today,
            ...taskData
        })
        .select()
        .single()
    
    if (error) {
        console.error('Save task error:', error)
        return { success: false, error: error.message }
    }
    
    return { success: true, task: data }
}

async function updateTask(taskId, updates) {
    const { error } = await supabase
        .from('tasks')
        .update(updates)
        .eq('id', taskId)
    
    if (error) {
        console.error('Update task error:', error)
        return { success: false, error: error.message }
    }
    
    return { success: true }
}

async function deleteTask(taskId) {
    const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', taskId)
    
    if (error) {
        console.error('Delete task error:', error)
        return { success: false, error: error.message }
    }
    
    return { success: true }
}

async function saveDistraction(intention, reality, followedThrough) {
    const user = await getCurrentUser()
    if (!user) return { success: false, error: 'Not logged in' }
    
    const today = new Date().toISOString().split('T')[0]
    
    const { error } = await supabase
        .from('distractions')
        .insert({
            user_id: user.id,
            session_date: today,
            intention: intention,
            reality: reality || null,
            followed_through: followedThrough || false
        })
    
    if (error) {
        console.error('Save distraction error:', error)
        return { success: false, error: error.message }
    }
    
    return { success: true }
}

async function getTodayDistractions() {
    const user = await getCurrentUser()
    if (!user) return []
    
    const today = new Date().toISOString().split('T')[0]
    
    const { data, error } = await supabase
        .from('distractions')
        .select('*')
        .eq('user_id', user.id)
        .eq('session_date', today)
        .order('created_at', { ascending: true })
    
    if (error) {
        console.error('Get distractions error:', error)
        return []
    }
    
    return data || []
}

// ============================================
// MIGRATION HELPER (ONE-TIME USE)
// ============================================

async function migrateFromLocalStorage() {
    const user = await getCurrentUser()
    if (!user) return
    
    // Check if already migrated
    const migrated = localStorage.getItem('migrated_to_supabase')
    if (migrated) return
    
    console.log('🔄 Starting localStorage migration...')
    
    try {
        // Get old state
        const oldState = JSON.parse(localStorage.getItem('focushub_state') || '{}')
        const today = new Date().toISOString().split('T')[0]
        
        // Migrate today's session if it exists
        if (oldState.sessionDate === today && oldState.sessionState) {
            await saveTodaySession({
                energy_level: oldState.energyLevel || 'medium',
                baseline_sprints: oldState.baselineSprints || 5,
                planned_sprints: oldState.plannedSprints || 5,
                sprints_completed: oldState.sprintCount || 0,
                tasks_completed: oldState.tasksCompleted || 0,
                breaks_taken: oldState.breaksCount || 0,
                distractions_logged: oldState.distractionCount || 0,
                session_state: oldState.sessionState || 'not_started',
                current_grade: oldState.currentGrade || null
            })
        }
        
        // Mark as migrated
        localStorage.setItem('migrated_to_supabase', 'true')
        console.log('✅ Migration complete!')
    } catch (err) {
        console.error('Migration error:', err)
    }
}

console.log('✅ Supabase config loaded for FocusHub')
