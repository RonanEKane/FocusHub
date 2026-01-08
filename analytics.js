// FocusHub Analytics Tracking
window.FocusHubAnalytics = {
    trackFeature: function(feature, data) {
        console.log('📊 Analytics:', feature, data);
        // Add your analytics provider here (e.g., Google Analytics, Plausible, etc.)
    },
    
    trackPageView: function(page) {
        console.log('📄 Page view:', page);
    },
    
    trackError: function(error) {
        console.error('❌ Error tracked:', error);
    }
};
