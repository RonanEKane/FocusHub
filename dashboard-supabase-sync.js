// ============================================
// DASHBOARD SUPABASE ADAPTER
// Syncs localStorage data to Supabase tables
// Allows dashboard.html to work with minimal changes
// ============================================

const DashboardSync = {
    supabaseClient: null,
    currentUser: null,
    
    // Initialize
    async init() {
        // Use the global supabaseClient from supabase-config.js
        this.supabaseClient = window.supabaseClient || window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        const { data: { user } } = await this.supabaseClient.auth.getUser();
        this.currentUser = user;
        return user;
    },
    
    // Save daily stats to Supabase
    async saveDailyStats(stats) {
        if (!this.currentUser) return;
        
        const today = new Date().toISOString().split('T')[0];
        
        const { error } = await this.supabaseClient
            .from('daily_history')
            .upsert({
                user_id: this.currentUser.id,
                date: today,
                sprints_completed: stats.sprintsCompleted || 0,
                sprints_target: stats.sprintsTarget || 5,
                tasks_completed: stats.tasksCompleted || 0,
                wins_count: stats.winsCount || 0,
                distractions_parked: stats.distractionsParked || 0,
                grade: stats.grade || null,
                focus_score: stats.focusScore || 0,
                intentions: stats.intentions || [],
                session_stats: stats.sessionStats || {},
                updated_at: new Date().toISOString()
            }, {
                onConflict: 'user_id,date'
            });
        
        if (error) {
            console.error('Error saving daily stats:', error);
        } else {
            console.log('✅ Daily stats synced to Supabase');
        }
    },
    
    // Save task completion
    async saveTask(task) {
        if (!this.currentUser) return;
        
        const { error } = await this.supabaseClient
            .from('task_history')
            .insert({
                user_id: this.currentUser.id,
                task_text: task.text,
                bucket: task.bucket || 'admin',
                sprint_number: task.sprintNumber || null,
                date: new Date().toISOString().split('T')[0]
            });
        
        if (error) {
            console.error('Error saving task:', error);
        }
    },
    
    // Save distraction
    async saveDistraction(distraction) {
        if (!this.currentUser) return;
        
        const now = new Date();
        
        const { error } = await this.supabaseClient
            .from('distraction_log')
            .insert({
                user_id: this.currentUser.id,
                distraction_text: distraction.text,
                hour_of_day: now.getHours(),
                date: now.toISOString().split('T')[0]
            });
        
        if (error) {
            console.error('Error saving distraction:', error);
        }
    },
    
    // Load weekly stats from Supabase
    async loadWeeklyStats() {
        if (!this.currentUser) return null;
        
        const { data, error } = await this.supabaseClient
            .rpc('get_weekly_stats', { user_uuid: this.currentUser.id });
        
        if (error) {
            console.error('Error loading weekly stats:', error);
            return null;
        }
        
        return data && data.length > 0 ? data[0] : null;
    },
    
    // Load recent task history
    async loadTaskHistory(days = 7) {
        if (!this.currentUser) return [];
        
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - days);
        
        const { data, error } = await this.supabaseClient
            .from('task_history')
            .select('*')
            .eq('user_id', this.currentUser.id)
            .gte('date', startDate.toISOString().split('T')[0])
            .order('completed_at', { ascending: false });
        
        if (error) {
            console.error('Error loading task history:', error);
            return [];
        }
        
        return data || [];
    },
    
    // Load distraction patterns
    async loadDistractionPatterns(days = 7) {
        if (!this.currentUser) return [];
        
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - days);
        
        const { data, error } = await this.supabaseClient
            .from('distraction_log')
            .select('*')
            .eq('user_id', this.currentUser.id)
            .gte('date', startDate.toISOString().split('T')[0])
            .order('parked_at', { ascending: false });
        
        if (error) {
            console.error('Error loading distractions:', error);
            return [];
        }
        
        return data || [];
    },
    
    // Load daily history for chart
    async loadDailyHistory(days = 30) {
        if (!this.currentUser) return [];
        
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - days);
        
        const { data, error } = await this.supabaseClient
            .from('daily_history')
            .select('*')
            .eq('user_id', this.currentUser.id)
            .gte('date', startDate.toISOString().split('T')[0])
            .order('date', { ascending: true });
        
        if (error) {
            console.error('Error loading daily history:', error);
            return [];
        }
        
        return data || [];
    },
    
    // Calculate streak from daily history
    async calculateStreak() {
        if (!this.currentUser) return 0;
        
        const history = await this.loadDailyHistory(90);
        if (!history || history.length === 0) return 0;
        
        // Count consecutive days with B+ or higher
        let streak = 0;
        const today = new Date().toISOString().split('T')[0];
        let checkDate = new Date(today);
        
        const gradeValues = { 'A+': 10, 'A': 9, 'B+': 8, 'B': 7, 'C+': 6, 'C': 5, 'D': 4, 'F': 3 };
        
        for (let i = 0; i < 90; i++) {
            const dateStr = checkDate.toISOString().split('T')[0];
            const dayData = history.find(h => h.date === dateStr);
            
            if (dayData && gradeValues[dayData.grade] >= 8) {
                streak++;
            } else if (i > 0) {
                break; // Streak broken
            }
            
            checkDate.setDate(checkDate.getDate() - 1);
        }
        
        return streak;
    }
};

// Auto-initialize when script loads (wait for Supabase)
(async function() {
    try {
        // Wait for supabaseClient to be available
        if (typeof supabaseClient === 'undefined') {
            console.warn('⚠️ Dashboard sync: Waiting for Supabase...');
            // Retry after a short delay
            setTimeout(async () => {
                if (typeof supabaseClient !== 'undefined') {
                    await DashboardSync.init();
                    console.log('✅ Dashboard Supabase sync initialized');
                } else {
                    console.warn('⚠️ Dashboard sync: Supabase not available, running without sync');
                }
            }, 100);
        } else {
            await DashboardSync.init();
            console.log('✅ Dashboard Supabase sync initialized');
        }
    } catch (error) {
        console.error('❌ Error initializing dashboard sync:', error);
    }
})();
