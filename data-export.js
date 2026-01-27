// ============================================
// DATA EXPORT - ENHANCED (V20.4)
// CSV, JSON, and summary exports with date ranges
// ============================================

const DataExport = {
    
    // Export daily history as CSV
    async exportDailyHistoryCSV(startDate, endDate) {
        try {
            const { data, error } = await supabaseClient
                .from('daily_history')
                .select('*')
                .gte('date', startDate)
                .lte('date', endDate)
                .order('date', { ascending: true });
            
            if (error) throw error;
            
            // CSV headers
            const headers = ['Date', 'Sprints', 'Breaks', 'Distractions', 'Tasks Completed', 'Grade', 'Energy Level', 'Reflection'];
            
            // CSV rows
            const rows = data.map(day => [
                day.date,
                day.sprints || 0,
                day.breaks || 0,
                day.distractions || 0,
                day.tasks_completed || 0,
                day.grade || 'N/A',
                day.energy_level || 'N/A',
                `"${(day.reflection || '').replace(/"/g, '""')}"`  // Escape quotes
            ]);
            
            // Combine
            const csv = [
                headers.join(','),
                ...rows.map(row => row.join(','))
            ].join('\n');
            
            // Download
            this.downloadFile(csv, `focushub_daily_history_${startDate}_to_${endDate}.csv`, 'text/csv');
            
            showToast('Daily history exported', 'success');
            
        } catch (error) {
            console.error('Error exporting daily history:', error);
            showToast('Export failed', 'error');
        }
    },
    
    // Export task history as CSV
    async exportTaskHistoryCSV(startDate, endDate) {
        try {
            const { data, error} = await supabaseClient
                .from('task_history')
                .select('*')
                .gte('completed_at', startDate)
                .lte('completed_at', endDate)
                .order('completed_at', { ascending: true });
            
            if (error) throw error;
            
            const headers = ['Completed At', 'Task', 'Bucket', 'Priority', 'Sprints Required'];
            const rows = data.map(task => [
                new Date(task.completed_at).toLocaleString(),
                `"${(task.task_text || '').replace(/"/g, '""')}"`,
                task.bucket || 'N/A',
                task.priority || 'medium',
                task.sprints || 1
            ]);
            
            const csv = [
                headers.join(','),
                ...rows.map(row => row.join(','))
            ].join('\n');
            
            this.downloadFile(csv, `focushub_tasks_${startDate}_to_${endDate}.csv`, 'text/csv');
            
            showToast('Task history exported', 'success');
            
        } catch (error) {
            console.error('Error exporting tasks:', error);
            showToast('Export failed', 'error');
        }
    },
    
    // Export distraction log as CSV
    async exportDistractionLogCSV(startDate, endDate) {
        try {
            const { data, error } = await supabaseClient
                .from('distraction_log')
                .select('*')
                .gte('timestamp', startDate)
                .lte('timestamp', endDate)
                .order('timestamp', { ascending: true });
            
            if (error) throw error;
            
            const headers = ['Timestamp', 'Distraction', 'Handled', 'Hour', 'Day of Week'];
            const rows = data.map(d => {
                const date = new Date(d.timestamp);
                return [
                    date.toLocaleString(),
                    `"${(d.distraction_text || '').replace(/"/g, '""')}"`,
                    d.handled ? 'Yes' : 'No',
                    date.getHours(),
                    date.toLocaleDateString('en-US', { weekday: 'long' })
                ];
            });
            
            const csv = [
                headers.join(','),
                ...rows.map(row => row.join(','))
            ].join('\n');
            
            this.downloadFile(csv, `focushub_distractions_${startDate}_to_${endDate}.csv`, 'text/csv');
            
            showToast('Distraction log exported', 'success');
            
        } catch (error) {
            console.error('Error exporting distractions:', error);
            showToast('Export failed', 'error');
        }
    },
    
    // Export complete data package as JSON
    async exportCompleteDataJSON(startDate, endDate) {
        try {
            const [dailyHistory, taskHistory, distractionLog] = await Promise.all([
                supabaseClient.from('daily_history').select('*').gte('date', startDate).lte('date', endDate),
                supabaseClient.from('task_history').select('*').gte('completed_at', startDate).lte('completed_at', endDate),
                supabaseClient.from('distraction_log').select('*').gte('timestamp', startDate).lte('timestamp', endDate)
            ]);
            
            const exportData = {
                exportDate: new Date().toISOString(),
                dateRange: {
                    start: startDate,
                    end: endDate
                },
                dailyHistory: dailyHistory.data || [],
                taskHistory: taskHistory.data || [],
                distractionLog: distractionLog.data || [],
                stats: {
                    totalDays: dailyHistory.data?.length || 0,
                    totalSprints: dailyHistory.data?.reduce((sum, d) => sum + (d.sprints || 0), 0) || 0,
                    totalTasks: taskHistory.data?.length || 0,
                    totalDistractions: distractionLog.data?.length || 0
                }
            };
            
            const json = JSON.stringify(exportData, null, 2);
            this.downloadFile(json, `focushub_complete_data_${startDate}_to_${endDate}.json`, 'application/json');
            
            showToast('Complete data exported', 'success');
            
        } catch (error) {
            console.error('Error exporting complete data:', error);
            showToast('Export failed', 'error');
        }
    },
    
    // Export weekly report as Markdown
    async exportWeeklyReportMD() {
        try {
            const report = await WeeklyReports.generateReport();
            const markdown = WeeklyReports.formatReport(report);
            
            const filename = `focushub_weekly_report_${new Date(report.weekStart).toISOString().split('T')[0]}.md`;
            this.downloadFile(markdown, filename, 'text/markdown');
            
            showToast('Weekly report exported', 'success');
            
        } catch (error) {
            console.error('Error exporting weekly report:', error);
            showToast('Export failed', 'error');
        }
    },
    
    // Export summary statistics as CSV
    async exportSummaryStatsCSV(startDate, endDate) {
        try {
            const { data, error } = await supabaseClient
                .from('daily_history')
                .select('*')
                .gte('date', startDate)
                .lte('date', endDate);
            
            if (error) throw error;
            
            // Calculate summary stats
            const totalDays = data.length;
            const totalSprints = data.reduce((sum, d) => sum + (d.sprints || 0), 0);
            const totalBreaks = data.reduce((sum, d) => sum + (d.breaks || 0), 0);
            const totalDistractions = data.reduce((sum, d) => sum + (d.distractions || 0), 0);
            const totalTasks = data.reduce((sum, d) => sum + (d.tasks_completed || 0), 0);
            
            const avgSprintsPerDay = totalDays > 0 ? (totalSprints / totalDays).toFixed(2) : 0;
            const avgTasksPerDay = totalDays > 0 ? (totalTasks / totalDays).toFixed(2) : 0;
            const avgDistractionsPerDay = totalDays > 0 ? (totalDistractions / totalDays).toFixed(2) : 0;
            
            const csv = [
                'Metric,Value',
                `Date Range,${startDate} to ${endDate}`,
                `Total Days,${totalDays}`,
                `Total Sprints,${totalSprints}`,
                `Total Breaks,${totalBreaks}`,
                `Total Distractions,${totalDistractions}`,
                `Total Tasks Completed,${totalTasks}`,
                `Avg Sprints/Day,${avgSprintsPerDay}`,
                `Avg Tasks/Day,${avgTasksPerDay}`,
                `Avg Distractions/Day,${avgDistractionsPerDay}`,
                `Total Focus Time (mins),${totalSprints * 20}`
            ].join('\n');
            
            this.downloadFile(csv, `focushub_summary_${startDate}_to_${endDate}.csv`, 'text/csv');
            
            showToast('Summary stats exported', 'success');
            
        } catch (error) {
            console.error('Error exporting summary:', error);
            showToast('Export failed', 'error');
        }
    },
    
    // Helper: Download file
    downloadFile(content, filename, mimeType) {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    },
    
    // Show export modal with date range selector
    showExportModal() {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 500px;">
                <h2 style="font-family: 'JetBrains Mono', monospace; margin-bottom: 1.5rem;">📊 Export Data</h2>
                
                <div style="margin-bottom: 1.5rem;">
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Date Range:</label>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                        <div>
                            <label style="font-size: 0.875rem; color: var(--text-secondary);">Start Date</label>
                            <input type="date" id="exportStartDate" value="${this.getDefaultStartDate()}" style="width: 100%; padding: 0.5rem; border: 1px solid var(--border-light); background: var(--bg-secondary); color: var(--text-primary); border-radius: 4px;">
                        </div>
                        <div>
                            <label style="font-size: 0.875rem; color: var(--text-secondary);">End Date</label>
                            <input type="date" id="exportEndDate" value="${this.getToday()}" style="width: 100%; padding: 0.5rem; border: 1px solid var(--border-light); background: var(--bg-secondary); color: var(--text-primary); border-radius: 4px;">
                        </div>
                    </div>
                </div>
                
                <div style="margin-bottom: 1.5rem;">
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Export Type:</label>
                    <select id="exportType" style="width: 100%; padding: 0.75rem; border: 1px solid var(--border-light); background: var(--bg-secondary); color: var(--text-primary); border-radius: 4px; font-family: 'JetBrains Mono', monospace;">
                        <option value="daily_csv">Daily History (CSV)</option>
                        <option value="tasks_csv">Task History (CSV)</option>
                        <option value="distractions_csv">Distraction Log (CSV)</option>
                        <option value="summary_csv">Summary Statistics (CSV)</option>
                        <option value="complete_json">Complete Data Package (JSON)</option>
                        <option value="weekly_md">Weekly Report (Markdown)</option>
                    </select>
                </div>
                
                <div style="display: flex; gap: 1rem; justify-content: flex-end;">
                    <button onclick="document.querySelector('.modal-overlay').remove()" class="btn btn-secondary">Cancel</button>
                    <button onclick="DataExport.performExport()" class="btn btn-primary">Export</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    },
    
    // Perform export based on selected type
    async performExport() {
        const startDate = document.getElementById('exportStartDate').value;
        const endDate = document.getElementById('exportEndDate').value;
        const type = document.getElementById('exportType').value;
        
        // Close modal
        document.querySelector('.modal-overlay').remove();
        
        // Show loading
        showToast('Exporting data...', 'info');
        
        // Perform export
        switch(type) {
            case 'daily_csv':
                await this.exportDailyHistoryCSV(startDate, endDate);
                break;
            case 'tasks_csv':
                await this.exportTaskHistoryCSV(startDate, endDate);
                break;
            case 'distractions_csv':
                await this.exportDistractionLogCSV(startDate, endDate);
                break;
            case 'summary_csv':
                await this.exportSummaryStatsCSV(startDate, endDate);
                break;
            case 'complete_json':
                await this.exportCompleteDataJSON(startDate, endDate);
                break;
            case 'weekly_md':
                await this.exportWeeklyReportMD();
                break;
        }
    },
    
    // Helper: Get today's date
    getToday() {
        return new Date().toISOString().split('T')[0];
    },
    
    // Helper: Get date 30 days ago
    getDefaultStartDate() {
        const date = new Date();
        date.setDate(date.getDate() - 30);
        return date.toISOString().split('T')[0];
    }
};

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DataExport;
}
