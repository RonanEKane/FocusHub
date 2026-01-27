// ============================================
// EMAIL NOTIFICATIONS - RESEND API (V20.4)
// Daily reminders, weekly reports, accountability
// ============================================

const EmailNotifications = {
    
    // Resend API configuration
    RESEND_API_KEY: 'YOUR_RESEND_API_KEY_HERE', // TODO: Replace with actual key
    RESEND_API_URL: 'https://api.resend.com/emails',
    FROM_EMAIL: 'FocusHub <noreply@focushub.app>', // TODO: Update with your domain
    
    // Email templates
    templates: {
        dailyReminder: {
            subject: '⚡ FocusHub: Time to Execute',
            getBody: (userName, streak) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: 'Courier New', monospace; background: #0d0d0f; color: #fafafa; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: #18181b; border: 2px solid #3f3f46; padding: 40px; }
        .header { font-size: 28px; font-weight: 700; color: #fb923c; margin-bottom: 20px; letter-spacing: 2px; }
        .content { font-size: 16px; line-height: 1.6; margin-bottom: 30px; }
        .stats { background: #0d0d0f; border: 1px solid #3f3f46; padding: 20px; margin: 20px 0; }
        .stat-item { display: inline-block; margin-right: 30px; }
        .stat-value { font-size: 36px; font-weight: 700; color: #fb923c; }
        .stat-label { font-size: 12px; color: #a1a1aa; letter-spacing: 1px; }
        .cta { background: #fb923c; color: white; padding: 15px 30px; text-decoration: none; display: inline-block; font-weight: 700; letter-spacing: 1px; margin-top: 20px; }
        .footer { font-size: 12px; color: #a1a1aa; margin-top: 30px; padding-top: 20px; border-top: 1px solid #3f3f46; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">TIME TO EXECUTE</div>
        
        <div class="content">
            <p>Hey ${userName || 'there'},</p>
            <p>The clock is ticking. Your goals don't care about excuses.</p>
            ${streak > 0 ? `<p><strong>🔥 ${streak}-DAY STREAK</strong> - Don't break it now.</p>` : ''}
            <p>Start your day. Log in. Get to work.</p>
        </div>
        
        <a href="https://focushub.app/app.html" class="cta">START DAY →</a>
        
        <div class="footer">
            <p>Built for brains that wander, but still want to win.</p>
            <p><a href="https://focushub.app/settings.html" style="color: #fb923c;">Manage email preferences</a></p>
        </div>
    </div>
</body>
</html>
            `
        },
        
        weeklyReport: {
            subject: '📊 Your Weekly Performance Report',
            getBody: (userName, report) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: 'Courier New', monospace; background: #0d0d0f; color: #fafafa; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: #18181b; border: 2px solid #3f3f46; padding: 40px; }
        .header { font-size: 28px; font-weight: 700; color: #fb923c; margin-bottom: 10px; letter-spacing: 2px; }
        .date-range { font-size: 14px; color: #a1a1aa; margin-bottom: 30px; }
        .section { margin: 30px 0; }
        .section-title { font-size: 18px; font-weight: 700; color: #fafafa; margin-bottom: 15px; letter-spacing: 1px; }
        .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; background: #0d0d0f; border: 1px solid #3f3f46; padding: 20px; }
        .stat-item { text-align: center; }
        .stat-value { font-size: 36px; font-weight: 700; color: #fb923c; }
        .stat-label { font-size: 11px; color: #a1a1aa; margin-top: 5px; letter-spacing: 1px; }
        .insight { background: #0d0d0f; border-left: 4px solid #fb923c; padding: 15px; margin: 10px 0; }
        .insight-positive { border-left-color: #22c55e; }
        .insight-warning { border-left-color: #f59e0b; }
        .trend-up { color: #22c55e; }
        .trend-down { color: #ef4444; }
        .cta { background: #fb923c; color: white; padding: 15px 30px; text-decoration: none; display: inline-block; font-weight: 700; letter-spacing: 1px; margin-top: 20px; }
        .footer { font-size: 12px; color: #a1a1aa; margin-top: 30px; padding-top: 20px; border-top: 1px solid #3f3f46; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">WEEKLY REPORT</div>
        <div class="date-range">${new Date(report.weekStart).toLocaleDateString()} - ${new Date(report.weekEnd).toLocaleDateString()}</div>
        
        <div class="section">
            <div class="section-title">📊 KEY METRICS</div>
            <div class="stats-grid">
                <div class="stat-item">
                    <div class="stat-value">${report.stats.totalSprints}</div>
                    <div class="stat-label">SPRINTS</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">${report.stats.tasksCompleted}</div>
                    <div class="stat-label">TASKS</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">${report.stats.avgGrade || '—'}</div>
                    <div class="stat-label">AVG GRADE</div>
                </div>
            </div>
        </div>
        
        ${report.streaks.current > 0 ? `
        <div class="section">
            <div class="section-title">🔥 STREAK STATUS</div>
            <div class="insight insight-positive">
                <strong>${report.streaks.current}-day streak</strong> active. Longest streak: ${report.streaks.longest} days.
            </div>
        </div>
        ` : ''}
        
        ${report.insights.length > 0 ? `
        <div class="section">
            <div class="section-title">💡 INSIGHTS</div>
            ${report.insights.map(insight => `
                <div class="insight ${insight.type === 'positive' ? 'insight-positive' : 'insight-warning'}">
                    ${insight.icon} ${insight.text}
                </div>
            `).join('')}
        </div>
        ` : ''}
        
        ${report.trends ? `
        <div class="section">
            <div class="section-title">📈 TRENDS (vs Last Week)</div>
            <div style="background: #0d0d0f; border: 1px solid #3f3f46; padding: 20px;">
                <p>Sprints: <span class="${report.trends.sprints.direction === 'up' ? 'trend-up' : 'trend-down'}">${report.trends.sprints.direction === 'up' ? '↑' : '↓'} ${Math.abs(report.trends.sprints.change)}%</span></p>
                <p>Tasks: <span class="${report.trends.tasks.direction === 'up' ? 'trend-up' : 'trend-down'}">${report.trends.tasks.direction === 'up' ? '↑' : '↓'} ${Math.abs(report.trends.tasks.change)}%</span></p>
            </div>
        </div>
        ` : ''}
        
        <a href="https://focushub.app/dashboard.html" class="cta">VIEW FULL DASHBOARD →</a>
        
        <div class="footer">
            <p>Keep grinding. The system works if you work the system.</p>
            <p><a href="https://focushub.app/settings.html" style="color: #fb923c;">Manage email preferences</a></p>
        </div>
    </div>
</body>
</html>
            `
        },
        
        streakAlert: {
            subject: '🔥 Streak Alert: Don\'t Break It!',
            getBody: (userName, streak, lastActive) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: 'Courier New', monospace; background: #0d0d0f; color: #fafafa; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: #18181b; border: 2px solid #f59e0b; padding: 40px; }
        .header { font-size: 28px; font-weight: 700; color: #f59e0b; margin-bottom: 20px; letter-spacing: 2px; }
        .warning { background: rgba(245, 158, 11, 0.1); border: 1px solid #f59e0b; padding: 20px; margin: 20px 0; }
        .streak-number { font-size: 48px; font-weight: 700; color: #f59e0b; text-align: center; margin: 20px 0; }
        .content { font-size: 16px; line-height: 1.6; margin-bottom: 30px; }
        .cta { background: #f59e0b; color: white; padding: 15px 30px; text-decoration: none; display: inline-block; font-weight: 700; letter-spacing: 1px; margin-top: 20px; }
        .footer { font-size: 12px; color: #a1a1aa; margin-top: 30px; padding-top: 20px; border-top: 1px solid #3f3f46; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">⚠️ STREAK ALERT</div>
        
        <div class="warning">
            <div class="streak-number">${streak} DAYS</div>
            <p style="text-align: center; font-size: 14px; color: #a1a1aa;">ABOUT TO BE LOST</p>
        </div>
        
        <div class="content">
            <p>Hey ${userName || 'there'},</p>
            <p>You haven't logged in today. Your ${streak}-day streak is at risk.</p>
            <p>Last active: ${new Date(lastActive).toLocaleDateString()}</p>
            <p><strong>Don't let it go to waste.</strong> Log in now and keep it alive.</p>
        </div>
        
        <a href="https://focushub.app/app.html" class="cta">SAVE MY STREAK →</a>
        
        <div class="footer">
            <p>Consistency is everything. Show up.</p>
        </div>
    </div>
</body>
</html>
            `
        },
        
        accountabilityCheckIn: {
            subject: '💪 Accountability Check-In',
            getBody: (userName, daysInactive) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: 'Courier New', monospace; background: #0d0d0f; color: #fafafa; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: #18181b; border: 2px solid #ef4444; padding: 40px; }
        .header { font-size: 28px; font-weight: 700; color: #ef4444; margin-bottom: 20px; letter-spacing: 2px; }
        .content { font-size: 16px; line-height: 1.6; margin-bottom: 30px; }
        .truth-bomb { background: rgba(239, 68, 68, 0.1); border-left: 4px solid #ef4444; padding: 20px; margin: 20px 0; font-size: 18px; font-weight: 700; }
        .cta { background: #ef4444; color: white; padding: 15px 30px; text-decoration: none; display: inline-block; font-weight: 700; letter-spacing: 1px; margin-top: 20px; }
        .footer { font-size: 12px; color: #a1a1aa; margin-top: 30px; padding-top: 20px; border-top: 1px solid #3f3f46; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">ACCOUNTABILITY CHECK</div>
        
        <div class="content">
            <p>Hey ${userName || 'there'},</p>
            <p>You've been gone for ${daysInactive} days.</p>
        </div>
        
        <div class="truth-bomb">
            Your goals don't pause because you're "busy."
        </div>
        
        <div class="content">
            <p>Real talk: Are you serious about this or not?</p>
            <p>If you're serious, prove it. Log in. Do the work.</p>
            <p>If you're not, that's fine too. But don't lie to yourself.</p>
        </div>
        
        <a href="https://focushub.app/app.html" class="cta">GET BACK TO WORK →</a>
        
        <div class="footer">
            <p>Built for brains that wander, but still want to win.</p>
            <p><a href="https://focushub.app/settings.html" style="color: #fb923c;">Manage email preferences</a></p>
        </div>
    </div>
</body>
</html>
            `
        }
    },
    
    // Send email via Resend API
    async sendEmail(to, subject, html) {
        try {
            const response = await fetch(this.RESEND_API_URL, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.RESEND_API_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    from: this.FROM_EMAIL,
                    to: [to],
                    subject: subject,
                    html: html
                })
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Email send failed');
            }
            
            console.log('✅ Email sent:', { to, subject, id: data.id });
            return { success: true, id: data.id };
            
        } catch (error) {
            console.error('❌ Email send error:', error);
            return { success: false, error: error.message };
        }
    },
    
    // Send daily reminder
    async sendDailyReminder(userEmail, userName, streak) {
        const template = this.templates.dailyReminder;
        const html = template.getBody(userName, streak);
        return await this.sendEmail(userEmail, template.subject, html);
    },
    
    // Send weekly report
    async sendWeeklyReport(userEmail, userName, report) {
        const template = this.templates.weeklyReport;
        const html = template.getBody(userName, report);
        return await this.sendEmail(userEmail, template.subject, html);
    },
    
    // Send streak alert
    async sendStreakAlert(userEmail, userName, streak, lastActive) {
        const template = this.templates.streakAlert;
        const html = template.getBody(userName, streak, lastActive);
        return await this.sendEmail(userEmail, template.subject, html);
    },
    
    // Send accountability check-in
    async sendAccountabilityCheckIn(userEmail, userName, daysInactive) {
        const template = this.templates.accountabilityCheckIn;
        const html = template.getBody(userName, daysInactive);
        return await this.sendEmail(userEmail, template.subject, html);
    },
    
    // Schedule daily reminders (call this from backend/cron)
    async scheduleDailyReminders() {
        try {
            // Get all users with email notifications enabled
            const { data: users, error } = await supabaseClient
                .from('memberships')
                .select('email, email_daily_reminder, user_id')
                .eq('email_daily_reminder', true);
            
            if (error) throw error;
            
            console.log(`📧 Sending daily reminders to ${users.length} users...`);
            
            for (const user of users) {
                // Get user's streak
                const { data: historyData } = await supabaseClient
                    .from('daily_history')
                    .select('date')
                    .eq('user_id', user.user_id)
                    .gte('sprints', 1)
                    .order('date', { ascending: false })
                    .limit(30);
                
                const streak = this.calculateCurrentStreak(historyData);
                
                // Get user's name from profile or use email
                const userName = user.email.split('@')[0];
                
                await this.sendDailyReminder(user.email, userName, streak);
                
                // Rate limit: Wait 100ms between sends
                await new Promise(resolve => setTimeout(resolve, 100));
            }
            
            console.log('✅ Daily reminders sent');
            
        } catch (error) {
            console.error('❌ Error sending daily reminders:', error);
        }
    },
    
    // Schedule weekly reports (call this from backend/cron)
    async scheduleWeeklyReports() {
        try {
            // Get all users with weekly reports enabled
            const { data: users, error } = await supabaseClient
                .from('memberships')
                .select('email, email_weekly_report, user_id')
                .eq('email_weekly_report', true);
            
            if (error) throw error;
            
            console.log(`📊 Sending weekly reports to ${users.length} users...`);
            
            for (const user of users) {
                // Generate report for this user
                const report = await WeeklyReports.generateReport(user.user_id);
                const userName = user.email.split('@')[0];
                
                await this.sendWeeklyReport(user.email, userName, report);
                
                // Rate limit: Wait 100ms between sends
                await new Promise(resolve => setTimeout(resolve, 100));
            }
            
            console.log('✅ Weekly reports sent');
            
        } catch (error) {
            console.error('❌ Error sending weekly reports:', error);
        }
    },
    
    // Check for streak alerts (call this daily)
    async checkStreakAlerts() {
        try {
            const { data: users, error } = await supabaseClient
                .from('memberships')
                .select('email, email_streak_alert, user_id')
                .eq('email_streak_alert', true);
            
            if (error) throw error;
            
            const today = new Date().toISOString().split('T')[0];
            
            for (const user of users) {
                // Check if user has logged in today
                const { data: todayData } = await supabaseClient
                    .from('daily_history')
                    .select('date')
                    .eq('user_id', user.user_id)
                    .eq('date', today)
                    .single();
                
                if (todayData) continue; // Already logged in today
                
                // Get streak and last active
                const { data: historyData } = await supabaseClient
                    .from('daily_history')
                    .select('date')
                    .eq('user_id', user.user_id)
                    .gte('sprints', 1)
                    .order('date', { ascending: false })
                    .limit(30);
                
                const streak = this.calculateCurrentStreak(historyData);
                
                // Only alert if streak is 3+ days
                if (streak >= 3) {
                    const lastActive = historyData[0]?.date;
                    const userName = user.email.split('@')[0];
                    
                    await this.sendStreakAlert(user.email, userName, streak, lastActive);
                }
            }
            
        } catch (error) {
            console.error('❌ Error checking streak alerts:', error);
        }
    },
    
    // Helper: Calculate current streak
    calculateCurrentStreak(historyData) {
        if (!historyData || historyData.length === 0) return 0;
        
        let streak = 0;
        const today = new Date();
        
        for (let i = 0; i < historyData.length; i++) {
            const date = new Date(historyData[i].date);
            const expectedDate = new Date(today);
            expectedDate.setDate(expectedDate.getDate() - i);
            
            if (date.toDateString() === expectedDate.toDateString()) {
                streak++;
            } else {
                break;
            }
        }
        
        return streak;
    }
};

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EmailNotifications;
}
