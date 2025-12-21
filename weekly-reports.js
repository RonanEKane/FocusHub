// ============================================
// WEEKLY REPORTS
// Automated insights and progress tracking
// ============================================

const WeeklyReports = {
    
    // Generate weekly report
    async generateReport() {
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 7);
        
        const report = {
            weekStart: startDate.toISOString(),
            weekEnd: endDate.toISOString(),
            stats: await this.getWeeklyStats(startDate, endDate),
            insights: [],
            streaks: await this.calculateStreaks(),
            topTasks: await this.getTopTasks(),
            distractionPatterns: await this.getDistractionPatterns()
        };
        
        // Generate insights
        report.insights = this.generateInsights(report);
        
        return report;
    },
    
    // Get weekly statistics
    async getWeeklyStats(startDate, endDate) {
        // This would load from Firestore history
        // For now, using localStorage as fallback
        
        const history = JSON.parse(localStorage.getItem('focushub_history') || '[]');
        
        const weekData = history.filter(entry => {
            const entryDate = new Date(entry.date);
            return entryDate >= startDate && entryDate <= endDate;
        });
        
        const stats = {
            totalSprints: 0,
            totalBreaks: 0,
            totalDistractions: 0,
            tasksCompleted: 0,
            averageGrade: 0,
            daysActive: weekData.length,
            bestDay: null,
            worstDay: null
        };
        
        weekData.forEach(day => {
            stats.totalSprints += day.sprintCount || 0;
            stats.totalBreaks += day.breaksCount || 0;
            stats.totalDistractions += day.distractionCount || 0;
            stats.tasksCompleted += day.tasksCompleted || 0;
            
            if (day.grade) {
                stats.averageGrade += this.gradeToNumber(day.grade);
            }
        });
        
        if (weekData.length > 0) {
            stats.averageGrade = stats.averageGrade / weekData.length;
            stats.bestDay = weekData.reduce((best, day) => 
                (day.sprintCount > best.sprintCount) ? day : best
            );
            stats.worstDay = weekData.reduce((worst, day) => 
                (day.sprintCount < worst.sprintCount) ? day : worst
            );
        }
        
        return stats;
    },
    
    // Convert letter grade to number
    gradeToNumber(grade) {
        const gradeMap = { 'A': 4, 'B': 3, 'C': 2, 'D': 1, 'F': 0 };
        return gradeMap[grade] || 0;
    },
    
    // Calculate streaks
    async calculateStreaks() {
        const history = JSON.parse(localStorage.getItem('focushub_history') || '[]');
        
        let currentStreak = 0;
        let longestStreak = 0;
        let tempStreak = 0;
        
        const sortedHistory = history.sort((a, b) => 
            new Date(b.date) - new Date(a.date)
        );
        
        let lastDate = new Date();
        
        for (const entry of sortedHistory) {
            const entryDate = new Date(entry.date);
            const daysDiff = Math.floor((lastDate - entryDate) / (1000 * 60 * 60 * 24));
            
            if (daysDiff <= 1) {
                tempStreak++;
                if (tempStreak > longestStreak) {
                    longestStreak = tempStreak;
                }
            } else {
                if (currentStreak === 0) {
                    currentStreak = tempStreak;
                }
                tempStreak = 1;
            }
            
            lastDate = entryDate;
        }
        
        return {
            current: currentStreak || tempStreak,
            longest: longestStreak
        };
    },
    
    // Get top completed tasks
    async getTopTasks() {
        const history = JSON.parse(localStorage.getItem('focushub_history') || '[]');
        
        // Would need to track individual task completions
        // This is a placeholder for now
        return [];
    },
    
    // Get distraction patterns
    async getDistractionPatterns() {
        const distractions = JSON.parse(localStorage.getItem('focushub_distractions') || '[]');
        
        const patterns = {
            topDistractions: {},
            timeOfDay: { morning: 0, afternoon: 0, evening: 0 },
            totalThisWeek: 0
        };
        
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        
        distractions.forEach(distraction => {
            const distractionDate = new Date(distraction.timestamp);
            
            if (distractionDate >= weekAgo) {
                patterns.totalThisWeek++;
                
                // Count by type
                patterns.topDistractions[distraction.text] = 
                    (patterns.topDistractions[distraction.text] || 0) + 1;
                
                // Count by time of day
                const hour = distractionDate.getHours();
                if (hour < 12) patterns.timeOfDay.morning++;
                else if (hour < 18) patterns.timeOfDay.afternoon++;
                else patterns.timeOfDay.evening++;
            }
        });
        
        return patterns;
    },
    
    // Generate insights from report data
    generateInsights(report) {
        const insights = [];
        const { stats } = report;
        
        // Sprint insights
        if (stats.totalSprints > 0) {
            const avgPerDay = (stats.totalSprints / 7).toFixed(1);
            insights.push({
                type: 'sprint',
                icon: '🎯',
                title: `${stats.totalSprints} sprints completed`,
                detail: `Average ${avgPerDay} sprints per day`
            });
        }
        
        // Streak insights
        if (report.streaks.current > 3) {
            insights.push({
                type: 'streak',
                icon: '🔥',
                title: `${report.streaks.current}-day streak!`,
                detail: 'Keep it going!'
            });
        }
        
        // Tasks insights
        if (stats.tasksCompleted > 0) {
            insights.push({
                type: 'tasks',
                icon: '✅',
                title: `${stats.tasksCompleted} tasks completed`,
                detail: 'Making progress!'
            });
        }
        
        // Distraction insights
        if (report.distractionPatterns.totalThisWeek > 0) {
            const topDistraction = Object.entries(report.distractionPatterns.topDistractions)
                .sort((a, b) => b[1] - a[1])[0];
            
            if (topDistraction) {
                insights.push({
                    type: 'distraction',
                    icon: '⚠️',
                    title: `${report.distractionPatterns.totalThisWeek} distractions logged`,
                    detail: `Most common: "${topDistraction[0]}"`
                });
            }
        }
        
        // Grade insights
        if (stats.averageGrade > 0) {
            const letterGrade = this.numberToGrade(stats.averageGrade);
            insights.push({
                type: 'grade',
                icon: '📊',
                title: `Average grade: ${letterGrade}`,
                detail: stats.averageGrade >= 3 ? 'Excellent work!' : 'Room for improvement'
            });
        }
        
        return insights;
    },
    
    // Convert number to letter grade
    numberToGrade(num) {
        if (num >= 3.5) return 'A';
        if (num >= 2.5) return 'B';
        if (num >= 1.5) return 'C';
        if (num >= 0.5) return 'D';
        return 'F';
    },
    
    // Display report modal
    async showReport() {
        const report = await this.generateReport();
        
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal" style="max-width: 700px;">
                <div class="modal-header">
                    <h2>📊 Weekly Report</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">×</button>
                </div>
                <div class="modal-body">
                    <div style="display: grid; gap: 1.5rem;">
                        <div class="report-stats">
                            <div class="stat-card">
                                <div class="stat-icon">🎯</div>
                                <div class="stat-value">${report.stats.totalSprints}</div>
                                <div class="stat-label">Sprints</div>
                            </div>
                            <div class="stat-card">
                                <div class="stat-icon">✅</div>
                                <div class="stat-value">${report.stats.tasksCompleted}</div>
                                <div class="stat-label">Tasks</div>
                            </div>
                            <div class="stat-card">
                                <div class="stat-icon">🔥</div>
                                <div class="stat-value">${report.streaks.current}</div>
                                <div class="stat-label">Streak</div>
                            </div>
                            <div class="stat-card">
                                <div class="stat-icon">📅</div>
                                <div class="stat-value">${report.stats.daysActive}</div>
                                <div class="stat-label">Active Days</div>
                            </div>
                        </div>
                        
                        <div>
                            <h3 style="font-size: 16px; margin-bottom: 1rem;">Insights</h3>
                            <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                                ${report.insights.map(insight => `
                                    <div class="insight-card">
                                        <span class="insight-icon">${insight.icon}</span>
                                        <div>
                                            <div class="insight-title">${insight.title}</div>
                                            <div class="insight-detail">${insight.detail}</div>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button onclick="this.closest('.modal-overlay').remove()" class="btn btn-secondary">Close</button>
                    <button onclick="window.WeeklyReports.exportReport()" class="btn btn-primary">Export Report</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    },
    
    // Export report as JSON
    async exportReport() {
        const report = await this.generateReport();
        
        const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `focushub-weekly-report-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }
};

// Make available globally
if (typeof window !== 'undefined') {
    window.WeeklyReports = WeeklyReports;
}
