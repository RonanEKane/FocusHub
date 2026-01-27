// ============================================
// DASHBOARD CHARTS - ENHANCED VISUALIZATIONS (V20.4)
// Professional charts using Chart.js
// ============================================

const DashboardCharts = {
    
    // Chart.js default configuration
    defaultOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    color: '#a1a1aa',
                    font: {
                        family: "'JetBrains Mono', monospace",
                        size: 11
                    },
                    padding: 10
                }
            },
            tooltip: {
                backgroundColor: '#18181b',
                titleColor: '#fafafa',
                bodyColor: '#a1a1aa',
                borderColor: '#3f3f46',
                borderWidth: 1,
                padding: 12,
                displayColors: false,
                titleFont: {
                    family: "'JetBrains Mono', monospace",
                    size: 12,
                    weight: 'bold'
                },
                bodyFont: {
                    family: "'JetBrains Mono', monospace",
                    size: 11
                }
            }
        }
    },
    
    // Color scheme
    colors: {
        orange: '#fb923c',
        blue: '#4a90e2',
        green: '#22c55e',
        red: '#ef4444',
        yellow: '#f59e0b',
        purple: '#8b5cf6',
        gray: '#6b7280',
        darkBg: '#0d0d0f',
        lightBorder: '#3f3f46'
    },
    
    charts: {},
    
    // Initialize all charts
    async init() {
        console.log('📊 Initializing dashboard charts...');
        
        // Get data from Supabase
        const data = await this.fetchDashboardData();
        
        // Create all charts
        this.createSprintTrendChart(data.sprintTrend);
        this.createTaskDistributionChart(data.taskDistribution);
        this.createGradeProgressChart(data.gradeProgress);
        this.createDistractionHeatmap(data.distractionHeatmap);
        this.createProductivityScoreChart(data.productivityScore);
        this.createWeeklyComparisonChart(data.weeklyComparison);
        
        console.log('✅ Dashboard charts initialized');
    },
    
    // Fetch all dashboard data from Supabase
    async fetchDashboardData() {
        try {
            // Get last 30 days of data
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
            
            const { data: historyData, error } = await supabaseClient
                .from('daily_history')
                .select('*')
                .gte('date', thirtyDaysAgo.toISOString().split('T')[0])
                .order('date', { ascending: true });
            
            if (error) throw error;
            
            return {
                sprintTrend: this.processSprintTrend(historyData),
                taskDistribution: await this.processTaskDistribution(),
                gradeProgress: this.processGradeProgress(historyData),
                distractionHeatmap: await this.processDistractionHeatmap(),
                productivityScore: this.processProductivityScore(historyData),
                weeklyComparison: this.processWeeklyComparison(historyData)
            };
            
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            return this.getEmptyData();
        }
    },
    
    // Sprint Trend Line Chart (Last 30 days)
    createSprintTrendChart(data) {
        const ctx = document.getElementById('sprintTrendChart');
        if (!ctx) return;
        
        if (this.charts.sprintTrend) {
            this.charts.sprintTrend.destroy();
        }
        
        this.charts.sprintTrend = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.labels,
                datasets: [{
                    label: 'Sprints Completed',
                    data: data.values,
                    borderColor: this.colors.orange,
                    backgroundColor: this.colors.orange + '20',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    pointBackgroundColor: this.colors.orange,
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2
                }]
            },
            options: {
                ...this.defaultOptions,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1,
                            color: '#a1a1aa',
                            font: {
                                family: "'JetBrains Mono', monospace"
                            }
                        },
                        grid: {
                            color: this.colors.lightBorder + '40'
                        }
                    },
                    x: {
                        ticks: {
                            color: '#a1a1aa',
                            font: {
                                family: "'JetBrains Mono', monospace",
                                size: 10
                            }
                        },
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    },
    
    // Task Distribution Pie Chart
    createTaskDistributionChart(data) {
        const ctx = document.getElementById('taskDistributionChart');
        if (!ctx) return;
        
        if (this.charts.taskDistribution) {
            this.charts.taskDistribution.destroy();
        }
        
        this.charts.taskDistribution = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Admin', 'Deep Work', 'Strategic'],
                datasets: [{
                    data: [data.admin, data.deepwork, data.strategic],
                    backgroundColor: [
                        this.colors.blue,
                        this.colors.orange,
                        this.colors.purple
                    ],
                    borderColor: this.colors.darkBg,
                    borderWidth: 3
                }]
            },
            options: {
                ...this.defaultOptions,
                cutout: '60%',
                plugins: {
                    ...this.defaultOptions.plugins,
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    },
    
    // Grade Progress Line Chart
    createGradeProgressChart(data) {
        const ctx = document.getElementById('gradeProgressChart');
        if (!ctx) return;
        
        if (this.charts.gradeProgress) {
            this.charts.gradeProgress.destroy();
        }
        
        this.charts.gradeProgress = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.labels,
                datasets: [{
                    label: 'Daily Grade',
                    data: data.values,
                    borderColor: this.colors.green,
                    backgroundColor: this.colors.green + '20',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 5,
                    pointHoverRadius: 7,
                    pointBackgroundColor: this.colors.green,
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2
                }]
            },
            options: {
                ...this.defaultOptions,
                scales: {
                    y: {
                        min: 0,
                        max: 100,
                        ticks: {
                            callback: (value) => value + '%',
                            color: '#a1a1aa',
                            font: {
                                family: "'JetBrains Mono', monospace"
                            }
                        },
                        grid: {
                            color: this.colors.lightBorder + '40'
                        }
                    },
                    x: {
                        ticks: {
                            color: '#a1a1aa',
                            font: {
                                family: "'JetBrains Mono', monospace",
                                size: 10
                            }
                        },
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    },
    
    // Distraction Heatmap Bar Chart
    createDistractionHeatmap(data) {
        const ctx = document.getElementById('distractionHeatmapChart');
        if (!ctx) return;
        
        if (this.charts.distractionHeatmap) {
            this.charts.distractionHeatmap.destroy();
        }
        
        this.charts.distractionHeatmap = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.labels,
                datasets: [{
                    label: 'Distractions by Hour',
                    data: data.values,
                    backgroundColor: this.colors.red + '80',
                    borderColor: this.colors.red,
                    borderWidth: 2
                }]
            },
            options: {
                ...this.defaultOptions,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1,
                            color: '#a1a1aa',
                            font: {
                                family: "'JetBrains Mono', monospace"
                            }
                        },
                        grid: {
                            color: this.colors.lightBorder + '40'
                        }
                    },
                    x: {
                        ticks: {
                            color: '#a1a1aa',
                            font: {
                                family: "'JetBrains Mono', monospace"
                            }
                        },
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    },
    
    // Productivity Score Radar Chart
    createProductivityScoreChart(data) {
        const ctx = document.getElementById('productivityScoreChart');
        if (!ctx) return;
        
        if (this.charts.productivityScore) {
            this.charts.productivityScore.destroy();
        }
        
        this.charts.productivityScore = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Consistency', 'Sprint Volume', 'Task Completion', 'Focus Quality', 'Distraction Control'],
                datasets: [{
                    label: 'Your Score',
                    data: [data.consistency, data.volume, data.completion, data.quality, data.control],
                    backgroundColor: this.colors.orange + '40',
                    borderColor: this.colors.orange,
                    borderWidth: 3,
                    pointBackgroundColor: this.colors.orange,
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 5
                }]
            },
            options: {
                ...this.defaultOptions,
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            stepSize: 20,
                            color: '#a1a1aa',
                            backdropColor: 'transparent',
                            font: {
                                family: "'JetBrains Mono', monospace",
                                size: 10
                            }
                        },
                        grid: {
                            color: this.colors.lightBorder + '60'
                        },
                        pointLabels: {
                            color: '#fafafa',
                            font: {
                                family: "'JetBrains Mono', monospace",
                                size: 11,
                                weight: 'bold'
                            }
                        }
                    }
                }
            }
        });
    },
    
    // Weekly Comparison Bar Chart
    createWeeklyComparisonChart(data) {
        const ctx = document.getElementById('weeklyComparisonChart');
        if (!ctx) return;
        
        if (this.charts.weeklyComparison) {
            this.charts.weeklyComparison.destroy();
        }
        
        this.charts.weeklyComparison = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [
                    {
                        label: 'This Week',
                        data: data.thisWeek,
                        backgroundColor: this.colors.orange,
                        borderColor: this.colors.orange,
                        borderWidth: 2
                    },
                    {
                        label: 'Last Week',
                        data: data.lastWeek,
                        backgroundColor: this.colors.gray + '60',
                        borderColor: this.colors.gray,
                        borderWidth: 2
                    }
                ]
            },
            options: {
                ...this.defaultOptions,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1,
                            color: '#a1a1aa',
                            font: {
                                family: "'JetBrains Mono', monospace"
                            }
                        },
                        grid: {
                            color: this.colors.lightBorder + '40'
                        }
                    },
                    x: {
                        ticks: {
                            color: '#a1a1aa',
                            font: {
                                family: "'JetBrains Mono', monospace"
                            }
                        },
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    },
    
    // Data processing functions
    processSprintTrend(historyData) {
        const last30Days = this.getLast30Days();
        const values = last30Days.map(date => {
            const day = historyData.find(d => d.date === date);
            return day ? day.sprints || 0 : 0;
        });
        
        return {
            labels: last30Days.map(d => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })),
            values: values
        };
    },
    
    async processTaskDistribution() {
        try {
            const { data, error } = await supabaseClient
                .from('task_history')
                .select('bucket')
                .gte('completed_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString());
            
            if (error) throw error;
            
            const counts = {
                admin: data.filter(t => t.bucket === 'admin').length,
                deepwork: data.filter(t => t.bucket === 'deepwork').length,
                strategic: data.filter(t => t.bucket === 'strategic').length
            };
            
            return counts;
        } catch (error) {
            return { admin: 0, deepwork: 0, strategic: 0 };
        }
    },
    
    processGradeProgress(historyData) {
        const last14Days = this.getLast14Days();
        const gradeMap = { 'A+': 98, 'A': 95, 'A-': 92, 'B+': 88, 'B': 85, 'B-': 82, 
                          'C+': 78, 'C': 75, 'C-': 72, 'D+': 68, 'D': 65, 'D-': 62, 'F': 50 };
        
        const values = last14Days.map(date => {
            const day = historyData.find(d => d.date === date);
            return day && day.grade ? gradeMap[day.grade] || 0 : null;
        });
        
        return {
            labels: last14Days.map(d => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })),
            values: values
        };
    },
    
    async processDistractionHeatmap() {
        try {
            const { data, error } = await supabaseClient
                .from('distraction_log')
                .select('timestamp')
                .gte('timestamp', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString());
            
            if (error) throw error;
            
            const hourCounts = Array(24).fill(0);
            data.forEach(d => {
                const hour = new Date(d.timestamp).getHours();
                hourCounts[hour]++;
            });
            
            return {
                labels: Array.from({length: 24}, (_, i) => `${i}:00`),
                values: hourCounts
            };
        } catch (error) {
            return {
                labels: Array.from({length: 24}, (_, i) => `${i}:00`),
                values: Array(24).fill(0)
            };
        }
    },
    
    processProductivityScore(historyData) {
        const last30 = historyData.slice(-30);
        
        // Consistency: Days with sprints / 30
        const consistency = (last30.filter(d => d.sprints > 0).length / 30) * 100;
        
        // Volume: Avg sprints per day vs target (5)
        const avgSprints = last30.reduce((sum, d) => sum + (d.sprints || 0), 0) / 30;
        const volume = Math.min((avgSprints / 5) * 100, 100);
        
        // Completion: Tasks completed
        const tasks = last30.reduce((sum, d) => sum + (d.tasks_completed || 0), 0);
        const completion = Math.min((tasks / 30) * 20, 100); // Assuming 1.5 tasks/day target
        
        // Quality: Avg grade
        const gradeMap = { 'A+': 98, 'A': 95, 'A-': 92, 'B+': 88, 'B': 85, 'B-': 82, 
                          'C+': 78, 'C': 75, 'C-': 72, 'D+': 68, 'D': 65, 'D-': 62, 'F': 50 };
        const grades = last30.filter(d => d.grade).map(d => gradeMap[d.grade] || 0);
        const quality = grades.length > 0 ? grades.reduce((a, b) => a + b, 0) / grades.length : 0;
        
        // Control: Low distractions
        const avgDistractions = last30.reduce((sum, d) => sum + (d.distractions || 0), 0) / 30;
        const control = Math.max(100 - (avgDistractions * 10), 0);
        
        return {
            consistency: Math.round(consistency),
            volume: Math.round(volume),
            completion: Math.round(completion),
            quality: Math.round(quality),
            control: Math.round(control)
        };
    },
    
    processWeeklyComparison(historyData) {
        const getWeekData = (startDate) => {
            const days = [];
            for (let i = 0; i < 7; i++) {
                const date = new Date(startDate);
                date.setDate(date.getDate() + i);
                const dateStr = date.toISOString().split('T')[0];
                const day = historyData.find(d => d.date === dateStr);
                days.push(day ? day.sprints || 0 : 0);
            }
            return days;
        };
        
        const today = new Date();
        const dayOfWeek = today.getDay();
        const thisWeekStart = new Date(today);
        thisWeekStart.setDate(today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1)); // Monday
        
        const lastWeekStart = new Date(thisWeekStart);
        lastWeekStart.setDate(lastWeekStart.getDate() - 7);
        
        return {
            thisWeek: getWeekData(thisWeekStart),
            lastWeek: getWeekData(lastWeekStart)
        };
    },
    
    // Helper functions
    getLast30Days() {
        const days = [];
        for (let i = 29; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            days.push(date.toISOString().split('T')[0]);
        }
        return days;
    },
    
    getLast14Days() {
        const days = [];
        for (let i = 13; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            days.push(date.toISOString().split('T')[0]);
        }
        return days;
    },
    
    getEmptyData() {
        return {
            sprintTrend: { labels: [], values: [] },
            taskDistribution: { admin: 0, deepwork: 0, strategic: 0 },
            gradeProgress: { labels: [], values: [] },
            distractionHeatmap: { labels: [], values: [] },
            productivityScore: { consistency: 0, volume: 0, completion: 0, quality: 0, control: 0 },
            weeklyComparison: { thisWeek: [], lastWeek: [] }
        };
    },
    
    // Refresh all charts
    async refresh() {
        console.log('🔄 Refreshing charts...');
        await this.init();
    }
};

// Auto-initialize when page loads
if (typeof supabaseClient !== 'undefined') {
    window.addEventListener('load', () => {
        setTimeout(() => DashboardCharts.init(), 1000);
    });
}
