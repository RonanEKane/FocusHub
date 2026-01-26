// ============================================
// FOCUSHUB ANALYTICS
// Event tracking and error monitoring with Supabase
// ============================================

const FocusHubAnalytics = {
    supabaseClient: null,
    sessionId: null,
    currentUser: null,
    
    // Initialize analytics
    async init() {
        try {
            this.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
            const { data: { user } } = await this.supabaseClient.auth.getUser();
            this.currentUser = user;
            
            // Generate session ID
            this.sessionId = this.generateSessionId();
            
            // Start session tracking
            if (user) {
                await this.startSession();
            }
            
            // Set up global error handler
            this.setupErrorHandling();
            
            // Track page view
            this.trackEvent('page_view', { page: window.location.pathname });
            
            console.log('✅ FocusHub Analytics initialized');
            return true;
        } catch (error) {
            console.error('❌ Analytics initialization error:', error);
            return false;
        }
    },
    
    // Generate session ID
    generateSessionId() {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    },
    
    // Start session
    async startSession() {
        if (!this.currentUser) return;
        
        const { error } = await this.supabaseClient
            .from('analytics_sessions')
            .insert({
                id: this.sessionId,
                user_id: this.currentUser.id,
                session_start: new Date().toISOString()
            });
        
        if (error) {
            console.error('Error starting session:', error);
        }
    },
    
    // End session
    async endSession() {
        if (!this.currentUser || !this.sessionId) return;
        
        const { error } = await this.supabaseClient
            .from('analytics_sessions')
            .update({
                session_end: new Date().toISOString()
            })
            .eq('id', this.sessionId);
        
        if (error) {
            console.error('Error ending session:', error);
        }
    },
    
    // Track event
    async trackEvent(eventType, eventData = {}) {
        try {
            const { error } = await this.supabaseClient
                .from('analytics_events')
                .insert({
                    user_id: this.currentUser?.id || null,
                    session_id: this.sessionId,
                    event_type: eventType,
                    event_data: eventData,
                    page: window.location.pathname,
                    timestamp: new Date().toISOString()
                });
            
            if (error) throw error;
        } catch (error) {
            console.error('Error tracking event:', error);
        }
    },
    
    // Track error
    async trackError(error, context = {}) {
        try {
            const { error: dbError } = await this.supabaseClient
                .from('analytics_errors')
                .insert({
                    user_id: this.currentUser?.id || null,
                    session_id: this.sessionId,
                    error_message: error.message || String(error),
                    error_stack: error.stack || null,
                    page: window.location.pathname,
                    user_agent: navigator.userAgent,
                    context: context,
                    timestamp: new Date().toISOString()
                });
            
            if (dbError) throw dbError;
        } catch (err) {
            console.error('Error tracking error:', err);
        }
    },
    
    // Set up global error handling
    setupErrorHandling() {
        // Catch unhandled errors
        window.addEventListener('error', (event) => {
            this.trackError(event.error || new Error(event.message), {
                filename: event.filename,
                lineno: event.lineno,
                colno: event.colno
            });
        });
        
        // Catch unhandled promise rejections
        window.addEventListener('unhandledrejection', (event) => {
            this.trackError(new Error(event.reason), {
                type: 'unhandledrejection'
            });
        });
    },
    
    // Get analytics summary (admin only)
    async getAnalyticsSummary() {
        try {
            const { data, error } = await this.supabaseClient
                .rpc('get_analytics_summary');
            
            if (error) throw error;
            return data && data.length > 0 ? data[0] : null;
        } catch (error) {
            console.error('Error getting analytics summary:', error);
            return null;
        }
    },
    
    // Shorthand methods for common events
    trackSprintStart: function(sprintNumber) {
        this.trackEvent('sprint_start', { sprint_number: sprintNumber });
    },
    
    trackSprintComplete: function(sprintNumber, duration) {
        this.trackEvent('sprint_complete', { sprint_number: sprintNumber, duration });
    },
    
    trackTaskComplete: function(bucket) {
        this.trackEvent('task_complete', { bucket });
    },
    
    trackDistractionParked: function() {
        this.trackEvent('distraction_parked');
    },
    
    trackDayStart: function() {
        this.trackEvent('day_start');
    },
    
    trackDayEnd: function(grade, stats) {
        this.trackEvent('day_end', { grade, ...stats });
    }
};

// Auto-initialize
(async function() {
    if (typeof SUPABASE_URL !== 'undefined') {
        await FocusHubAnalytics.init();
    }
})();

// Clean up session on page unload
window.addEventListener('beforeunload', () => {
    if (FocusHubAnalytics.sessionId) {
        FocusHubAnalytics.endSession();
    }
});
