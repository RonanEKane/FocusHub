// ============================================
// WEEKLY REPORTS - SUPABASE EDITION (V20.4)
// Automated insights from daily_history table
// ============================================

const WeeklyReports = {
    
    // Generate weekly report from Supabase
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
            topTasks: await this.getTopTasks(startDate, endDate),
            distractionPatterns: await this.getDistractionPatterns(startDate, endDate),
            trends: await this.calculateTrends(startDate, endDate)
        };
        
        // Generate insights from data
        report.insights = this.generateInsights(report);
        
        return report;
    },
    
    // Get weekly statistics from Supabase daily_history
    async getWeeklyStats(startDate, endDate) {
        try {
            const { data, error } = await supabaseClient
                .from('daily_history')
                .select('*')
                .gte('date', startDate.toISOString().split('T')[0])
                .lte('date', endDate.toISOString().split('T')[0])
                .order('date', { ascending: true });
            
            if (error) {
                console.error('Error fetching weekly stats:', error);
                return this.getEmptyStats();
            }
            
            if (!data || data.length === 0) {
                return this.getEmptyStats();
            }
            
            // Calculate aggregates
            const stats = {
                totalSprints: data.reduce((sum, day) => sum + (day.sprints || 0), 0),
                totalBreaks: data.reduce((sum, day) => sum + (day.breaks || 0), 0),
                totalDistractions: data.reduce((sum, day) => sum + (day.distractions || 0), 0),
                tasksCompleted: data.reduce((sum, day) => sum + (day.tasks_completed || 0), 0),
                daysActive: data.length,
                avgSprintsPerDay: 0,
                avgGrade: 0,
                bestDay: null,
                worstDay: null,
                totalFocusTime: 0
            };
            
            // Calculate averages
            stats.avgSprintsPerDay = stats.daysActive > 0 
                ? (stats.totalSprints / stats.daysActive).toFixed(1)
                : 0;
            
            // Calculate average grade (exclude nulls)
            const gradesArray = data
                .filter(day => day.grade)
                .map(day => this.gradeToNumber(day.grade));
            
            if (gradesArray.length > 0) {
                const avgGradeNum = gradesArray.reduce((sum, g) => sum + g, 0) / gradesArray.length;
                stats.avgGrade = this.numberToGrade(avgGradeNum);
            }
            
            // Find best and worst days
            const daysWithGrades = data.filter(day => day.grade);
            if (daysWithGrades.length > 0) {
                daysWithGrades.sort((a, b) => 
                    this.gradeToNumber(b.grade) - this.gradeToNumber(a.grade)
                );
                stats.bestDay = {
                    date: daysWithGrades[0].date,
                    grade: daysWithGrades[0].grade,
                    sprints: daysWithGrades[0].sprints
                };
                stats.worstDay = {
                    date: daysWithGrades[daysWithGrades.length - 1].date,
                    grade: daysWithGrades[daysWithGrades.length - 1].grade,
                    sprints: daysWithGrades[daysWithGrades.length - 1].sprints
                };
            }
            
            // Calculate total focus time (assume 20 min per sprint average)
            stats.totalFocusTime = Math.round(stats.totalSprints * 20); // minutes
            
            return stats;
            
        } catch (error) {
            console.error('Error in getWeeklyStats:', error);
            return this.getEmptyStats();
        }
    },
    
    // Calculate streaks from daily_history
    async calculateStreaks() {
        try {
            // Get last 90 days of data for streak calculation
            const ninetyDaysAgo = new Date();
            ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
            
            const { data, error } = await supabaseClient
                .from('daily_history')
                .select('date, sprints')
                .gte('date', ninetyDaysAgo.toISOString().split('T')[0])
                .order('date', { ascending: true });
            
            if (error || !data) {
                return { current: 0, longest: 0, lastActive: null };
            }
            
            // Calculate current streak (consecutive days with sprints)
            let currentStreak = 0;
            let longestStreak = 0;
            let tempStreak = 0;
            let lastActiveDate = null;
            
            const today = new Date().toISOString().split('T')[0];
            const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
            
            // Sort by date descending for current streak
            const sortedData = [...data].reverse();
            
            for (let i = 0; i < sortedData.length; i++) {
                const day = sortedData[i];
                if (day.sprints > 0) {
                    if (!lastActiveDate) lastActiveDate = day.date;
                    
                    // Check if this continues the streak
                    if (i === 0 && (day.date === today || day.date === yesterday)) {
                        currentStreak = 1;
                    } else if (currentStreak > 0) {
                        const prevDate = sortedData[i - 1].date;
                        const daysDiff = this.daysBetween(day.date, prevDate);
                        if (daysDiff === 1) {
                            currentStreak++;
                        } else {
                            break; // Streak broken
                        }
                    }
                }
            }
            
            // Calculate longest streak
            tempStreak = 0;
            for (const day of data) {
                if (day.sprints > 0) {
                    tempStreak++;
                    longestStreak = Math.max(longestStreak, tempStreak);
                } else {
                    tempStreak = 0;
                }
            }
            
            return {
                current: currentStreak,
                longest: longestStreak,
                lastActive: lastActiveDate
            };
            
        } catch (error) {
            console.error('Error calculating streaks:', error);
            return { current: 0, longest: 0, lastActive: null };
        }
    },
    
    // Get top completed tasks from task_history
    async getTopTasks(startDate, endDate) {
        try {
            const { data, error } = await supabaseClient
                .from('task_history')
                .select('task_text, bucket, completed_at')
                .gte('completed_at', startDate.toISOString())
                .lte('completed_at', endDate.toISOString())
                .order('completed_at', { ascending: false })
                .limit(10);
            
            if (error || !data) {
                return [];
            }
            
            // Group by bucket
            const byBucket = {
                admin: data.filter(t => t.bucket === 'admin'),
                deepwork: data.filter(t => t.bucket === 'deepwork'),
                strategic: data.filter(t => t.bucket === 'strategic')
            };
            
            return {
                all: data,
                byBucket: byBucket,
                topBucket: Object.keys(byBucket).reduce((a, b) => 
                    byBucket[a].length > byBucket[b].length ? a : b
                )
            };
            
        } catch (error) {
            console.error('Error getting top tasks:', error);
            return [];
        }
    },
    
    // Get distraction patterns from distraction_log
    async getDistractionPatterns(startDate, endDate) {
        try {
            const { data, error } = await supabaseClient
                .from('distraction_log')
                .select('distraction_text, timestamp, handled')
                .gte('timestamp', startDate.toISOString())
                .lte('timestamp', endDate.toISOString())
                .order('timestamp', { ascending: true });
            
            if (error || !data) {
                return { total: 0, avgPerDay: 0, handled: 0, topDistractions: [] };
            }
            
            // Analyze patterns
            const patterns = {
                total: data.length,
                avgPerDay: (data.length / 7).toFixed(1),
                handled: data.filter(d => d.handled).length,
                byHour: {},
                topDistractions: []
            };
            
            // Group by hour of day
            data.forEach(d => {
                const hour = new Date(d.timestamp).getHours();
                patterns.byHour[hour] = (patterns.byHour[hour] || 0) + 1;
            });
            
            // Find peak distraction hour
            patterns.peakHour = Object.keys(patterns.byHour).reduce((a, b) => 
                patterns.byHour[a] > patterns.byHour[b] ? a : b
            );
            
            return patterns;
            
        } catch (error) {
            console.error('Error getting distraction patterns:', error);
            return { total: 0, avgPerDay: 0, handled: 0, topDistractions: [] };
        }
    },
    
    // Calculate week-over-week trends
    async calculateTrends(startDate, endDate) {
        try {
            // Get previous week for comparison
            const prevWeekEnd = new Date(startDate);
            prevWeekEnd.setDate(prevWeekEnd.getDate() - 1);
            const prevWeekStart = new Date(prevWeekEnd);
            prevWeekStart.setDate(prevWeekStart.getDate() - 7);
            
            const thisWeek = await this.getWeeklyStats(startDate, endDate);
            const lastWeek = await this.getWeeklyStats(prevWeekStart, prevWeekEnd);
            
            const calculateChange = (current, previous) => {
                if (previous === 0) return current > 0 ? 100 : 0;
                return Math.round(((current - previous) / previous) * 100);
            };
            
            return {
                sprints: {
                    change: calculateChange(thisWeek.totalSprints, lastWeek.totalSprints),
                    direction: thisWeek.totalSprints > lastWeek.totalSprints ? 'up' : 'down'
                },
                tasks: {
                    change: calculateChange(thisWeek.tasksCompleted, lastWeek.tasksCompleted),
                    direction: thisWeek.tasksCompleted > lastWeek.tasksCompleted ? 'up' : 'down'
                },
                distractions: {
                    change: calculateChange(thisWeek.totalDistractions, lastWeek.totalDistractions),
                    direction: thisWeek.totalDistractions < lastWeek.totalDistractions ? 'up' : 'down' // Lower is better
                }
            };
            
        } catch (error) {
            console.error('Error calculating trends:', error);
            return null;
        }
    },
    
    // Generate insights from report data
    generateInsights(report) {
        const insights = [];
        const { stats, streaks, trends, distractionPatterns } = report;
        
        // Streak insights
        if (streaks.current >= 7) {
            insights.push({
                type: 'positive',
                icon: '🔥',
                text: `${streaks.current}-day streak! You're on fire. Keep this momentum going.`
            });
        } else if (streaks.current === 0 && streaks.lastActive) {
            insights.push({
                type: 'warning',
                icon: '⚠️',
                text: `Streak broken. Last active: ${new Date(streaks.lastActive).toLocaleDateString()}. Time to get back on track.`
            });
        }
        
        // Sprint volume insights
        if (stats.totalSprints >= 35) { // 5+ per day average
            insights.push({
                type: 'positive',
                icon: '💪',
                text: `${stats.totalSprints} sprints this week - crushing it! That's ${stats.avgSprintsPerDay} per day.`
            });
        } else if (stats.totalSprints < 14) { // Less than 2 per day
            insights.push({
                type: 'warning',
                icon: '📊',
                text: `Only ${stats.totalSprints} sprints this week. Target is 35+ (5/day). You can do better.`
            });
        }
        
        // Trend insights
        if (trends && trends.sprints.direction === 'up' && trends.sprints.change >= 20) {
            insights.push({
                type: 'positive',
                icon: '📈',
                text: `Sprint volume up ${trends.sprints.change}% vs last week. Strong progress.`
            });
        }
        
        // Distraction insights
        if (distractionPatterns.avgPerDay > 5) {
            insights.push({
                type: 'warning',
                icon: '🚨',
                text: `Averaging ${distractionPatterns.avgPerDay} distractions/day. Peak time: ${distractionPatterns.peakHour}:00. Block that time next week.`
            });
        }
        
        // Grade insights
        if (stats.avgGrade && this.gradeToNumber(stats.avgGrade) >= 85) {
            insights.push({
                type: 'positive',
                icon: '⭐',
                text: `Average grade: ${stats.avgGrade}. Excellent performance this week.`
            });
        }
        
        return insights;
    },
    
    // Helper functions
    getEmptyStats() {
        return {
            totalSprints: 0,
            totalBreaks: 0,
            totalDistractions: 0,
            tasksCompleted: 0,
            daysActive: 0,
            avgSprintsPerDay: 0,
            avgGrade: null,
            bestDay: null,
            worstDay: null,
            totalFocusTime: 0
        };
    },
    
    gradeToNumber(grade) {
        const gradeMap = { 'A+': 98, 'A': 95, 'A-': 92, 'B+': 88, 'B': 85, 'B-': 82, 
                          'C+': 78, 'C': 75, 'C-': 72, 'D+': 68, 'D': 65, 'D-': 62, 'F': 50 };
        return gradeMap[grade] || 0;
    },
    
    numberToGrade(num) {
        if (num >= 97) return 'A+';
        if (num >= 93) return 'A';
        if (num >= 90) return 'A-';
        if (num >= 87) return 'B+';
        if (num >= 83) return 'B';
        if (num >= 80) return 'B-';
        if (num >= 77) return 'C+';
        if (num >= 73) return 'C';
        if (num >= 70) return 'C-';
        if (num >= 67) return 'D+';
        if (num >= 63) return 'D';
        if (num >= 60) return 'D-';
        return 'F';
    },
    
    daysBetween(date1, date2) {
        const d1 = new Date(date1);
        const d2 = new Date(date2);
        const diffTime = Math.abs(d2 - d1);
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    },
    
    // Format report for display
    formatReport(report) {
        const { stats, insights, streaks, trends } = report;
        
        return `
# 📊 WEEKLY PERFORMANCE REPORT
**Week of ${new Date(report.weekStart).toLocaleDateString()} - ${new Date(report.weekEnd).toLocaleDateString()}**

## 🎯 KEY METRICS
- **Sprints Completed:** ${stats.totalSprints} (${stats.avgSprintsPerDay}/day avg)
- **Tasks Completed:** ${stats.tasksCompleted}
- **Focus Time:** ${stats.totalFocusTime} minutes (${(stats.totalFocusTime / 60).toFixed(1)} hours)
- **Days Active:** ${stats.daysActive}/7
- **Average Grade:** ${stats.avgGrade || 'N/A'}

## 🔥 STREAKS
- **Current Streak:** ${streaks.current} days
- **Longest Streak:** ${streaks.longest} days

${trends ? `## 📈 TRENDS (vs Last Week)
- **Sprints:** ${trends.sprints.direction === 'up' ? '↑' : '↓'} ${Math.abs(trends.sprints.change)}%
- **Tasks:** ${trends.tasks.direction === 'up' ? '↑' : '↓'} ${Math.abs(trends.tasks.change)}%
- **Distractions:** ${trends.distractions.direction === 'up' ? '↓' : '↑'} ${Math.abs(trends.distractions.change)}%
` : ''}

${insights.length > 0 ? `## 💡 INSIGHTS
${insights.map(i => `${i.icon} ${i.text}`).join('\n')}
` : ''}

${stats.bestDay ? `## ⭐ BEST DAY
**${new Date(stats.bestDay.date).toLocaleDateString()}** - Grade: ${stats.bestDay.grade}, Sprints: ${stats.bestDay.sprints}
` : ''}

---
*Keep grinding. The system works if you work the system.*
        `.trim();
    }
};

// Export for use in dashboard
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WeeklyReports;
}
