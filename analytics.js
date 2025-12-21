// ============================================
// FOCUSHUB ANALYTICS SYSTEM
// localStorage-based analytics for tracking usage
// ============================================

const FocusHubAnalytics = {
    // Initialize analytics
    init() {
        this.userId = this.getCurrentUserId();
        this.sessionId = this.getSessionId();
        this.trackPageView();
    },
    
    // Get current user ID
    getCurrentUserId() {
        const user = JSON.parse(localStorage.getItem('focushub_current_user') || 'null');
        return user ? user.id : 'anonymous';
    },
    
    // Get or create session ID
    getSessionId() {
        let sessionId = sessionStorage.getItem('focushub_session_id');
        if (!sessionId) {
            sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            sessionStorage.setItem('focushub_session_id', sessionId);
        }
        return sessionId;
    },
    
    // Track page view
    trackPageView() {
        const page = window.location.pathname.split('/').pop() || 'index.html';
        this.trackEvent('page_view', {
            page: page,
            url: window.location.href,
            referrer: document.referrer
        });
    },
    
    // Track event
    trackEvent(eventName, eventData = {}) {
        const event = {
            eventName: eventName,
            eventData: eventData,
            userId: this.userId,
            sessionId: this.sessionId,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            page: window.location.pathname
        };
        
        // Store event
        this.storeEvent(event);
    },
    
    // Store event in localStorage
    storeEvent(event) {
        const events = JSON.parse(localStorage.getItem('focushub_analytics_events') || '[]');
        events.push(event);
        
        // Keep only last 1000 events
        if (events.length > 1000) {
            events.shift();
        }
        
        localStorage.setItem('focushub_analytics_events', JSON.stringify(events));
    },
    
    // Track feature usage
    trackFeature(featureName, featureData = {}) {
        this.trackEvent('feature_used', {
            feature: featureName,
            ...featureData
        });
    },
    
    // Track error
    trackError(error, context = {}) {
        this.trackEvent('error_occurred', {
            errorMessage: error.message || String(error),
            errorStack: error.stack || '',
            context: context
        });
        
        // Also store in errors collection
        this.storeError(error, context);
    },
    
    // Store error for admin review
    storeError(error, context) {
        const errorLog = {
            userId: this.userId,
            sessionId: this.sessionId,
            errorMessage: error.message || String(error),
            errorStack: error.stack || '',
            context: context,
            timestamp: new Date().toISOString(),
            page: window.location.pathname,
            userAgent: navigator.userAgent
        };
        
        const errors = JSON.parse(localStorage.getItem('focushub_errors') || '[]');
        errors.push(errorLog);
        
        // Keep only last 100 errors
        if (errors.length > 100) {
            errors.shift();
        }
        
        localStorage.setItem('focushub_errors', JSON.stringify(errors));
    },
    
    // Track user action
    trackAction(actionName, actionData = {}) {
        this.trackEvent('user_action', {
            action: actionName,
            ...actionData
        });
    },
    
    // Get analytics summary for admin
    getAnalyticsSummary() {
        const events = JSON.parse(localStorage.getItem('focushub_analytics_events') || '[]');
        const errors = JSON.parse(localStorage.getItem('focushub_errors') || '[]');
        
        return {
            totalEvents: events.length,
            totalErrors: errors.length,
            eventsByType: this.groupBy(events, 'eventName'),
            errorsByPage: this.groupBy(errors, 'page'),
            recentEvents: events.slice(-50).reverse(),
            recentErrors: errors.slice(-20).reverse()
        };
    },
    
    // Helper: Group array by property
    groupBy(array, property) {
        return array.reduce((acc, item) => {
            const key = item[property] || 'unknown';
            acc[key] = (acc[key] || 0) + 1;
            return acc;
        }, {});
    },
    
    // Clear analytics data (admin only)
    clearAnalytics() {
        localStorage.removeItem('focushub_analytics_events');
        localStorage.removeItem('focushub_errors');
    }
};

// Auto-initialize on page load
if (typeof window !== 'undefined') {
    window.FocusHubAnalytics = FocusHubAnalytics;
    
    // Track page view on load
    window.addEventListener('load', () => {
        FocusHubAnalytics.init();
    });
    
    // Track errors globally
    window.addEventListener('error', (event) => {
        FocusHubAnalytics.trackError(event.error || new Error(event.message), {
            filename: event.filename,
            lineno: event.lineno,
            colno: event.colno
        });
    });
    
    // Track unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
        FocusHubAnalytics.trackError(new Error(event.reason), {
            type: 'unhandled_promise_rejection'
        });
    });
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FocusHubAnalytics;
}
