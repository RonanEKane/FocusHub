// ============================================
// FIRESTORE DATA MANAGEMENT
// Helper functions for saving/loading user data
// ============================================

/**
 * Firestore Data Structure:
 * 
 * users/{userId}/
 *   profile/
 *     settings - user mode, plan, email
 *   data/
 *     tasks - all tasks
 *     daily_stats - daily completion stats
 *     history - historical records
 *     distractions - distraction log
 *     intentions - daily intentions
 *     tough_love - tough love messages
 *     timer - timer state
 *     session - session info
 */

const FirestoreData = {
    
    // Get current user ID
    getUserId() {
        return window.currentFirebaseUser?.uid;
    },
    
    // Get Firestore database
    getDb() {
        return window.firebaseDb;
    },
    
    // Import Firestore modules dynamically
    async getFirestoreModules() {
        const { doc, setDoc, getDoc, collection, query, getDocs, updateDoc, deleteDoc } = 
            await import("https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js");
        return { doc, setDoc, getDoc, collection, query, getDocs, updateDoc, deleteDoc };
    },
    
    // ==================== TASKS ====================
    
    async saveTasks(tasks) {
        try {
            const userId = this.getUserId();
            if (!userId) throw new Error('Not authenticated');
            
            const { doc, setDoc } = await this.getFirestoreModules();
            const db = this.getDb();
            
            await setDoc(doc(db, 'users', userId, 'data', 'tasks'), {
                tasks: tasks,
                updatedAt: new Date().toISOString()
            });
            
            return true;
        } catch (error) {
            console.error('Error saving tasks:', error);
            return false;
        }
    },
    
    async loadTasks() {
        try {
            const userId = this.getUserId();
            if (!userId) return [];
            
            const { doc, getDoc } = await this.getFirestoreModules();
            const db = this.getDb();
            
            const docSnap = await getDoc(doc(db, 'users', userId, 'data', 'tasks'));
            
            if (docSnap.exists()) {
                return docSnap.data().tasks || [];
            }
            return [];
        } catch (error) {
            console.error('Error loading tasks:', error);
            return [];
        }
    },
    
    // ==================== DAILY STATS ====================
    
    async saveDailyStats(stats) {
        try {
            const userId = this.getUserId();
            if (!userId) throw new Error('Not authenticated');
            
            const { doc, setDoc } = await this.getFirestoreModules();
            const db = this.getDb();
            
            await setDoc(doc(db, 'users', userId, 'data', 'daily_stats'), {
                stats: stats,
                updatedAt: new Date().toISOString()
            });
            
            return true;
        } catch (error) {
            console.error('Error saving daily stats:', error);
            return false;
        }
    },
    
    async loadDailyStats() {
        try {
            const userId = this.getUserId();
            if (!userId) return {};
            
            const { doc, getDoc } = await this.getFirestoreModules();
            const db = this.getDb();
            
            const docSnap = await getDoc(doc(db, 'users', userId, 'data', 'daily_stats'));
            
            if (docSnap.exists()) {
                return docSnap.data().stats || {};
            }
            return {};
        } catch (error) {
            console.error('Error loading daily stats:', error);
            return {};
        }
    },
    
    // ==================== HISTORY ====================
    
    async saveHistory(history) {
        try {
            const userId = this.getUserId();
            if (!userId) throw new Error('Not authenticated');
            
            const { doc, setDoc } = await this.getFirestoreModules();
            const db = this.getDb();
            
            await setDoc(doc(db, 'users', userId, 'data', 'history'), {
                history: history,
                updatedAt: new Date().toISOString()
            });
            
            return true;
        } catch (error) {
            console.error('Error saving history:', error);
            return false;
        }
    },
    
    async loadHistory() {
        try {
            const userId = this.getUserId();
            if (!userId) return [];
            
            const { doc, getDoc } = await this.getFirestoreModules();
            const db = this.getDb();
            
            const docSnap = await getDoc(doc(db, 'users', userId, 'data', 'history'));
            
            if (docSnap.exists()) {
                return docSnap.data().history || [];
            }
            return [];
        } catch (error) {
            console.error('Error loading history:', error);
            return [];
        }
    },
    
    // ==================== DISTRACTIONS ====================
    
    async saveDistractions(distractions) {
        try {
            const userId = this.getUserId();
            if (!userId) throw new Error('Not authenticated');
            
            const { doc, setDoc } = await this.getFirestoreModules();
            const db = this.getDb();
            
            await setDoc(doc(db, 'users', userId, 'data', 'distractions'), {
                distractions: distractions,
                updatedAt: new Date().toISOString()
            });
            
            return true;
        } catch (error) {
            console.error('Error saving distractions:', error);
            return false;
        }
    },
    
    async loadDistractions() {
        try {
            const userId = this.getUserId();
            if (!userId) return [];
            
            const { doc, getDoc } = await this.getFirestoreModules();
            const db = this.getDb();
            
            const docSnap = await getDoc(doc(db, 'users', userId, 'data', 'distractions'));
            
            if (docSnap.exists()) {
                return docSnap.data().distractions || [];
            }
            return [];
        } catch (error) {
            console.error('Error loading distractions:', error);
            return [];
        }
    },
    
    // ==================== INTENTIONS ====================
    
    async saveIntentions(intentions) {
        try {
            const userId = this.getUserId();
            if (!userId) throw new Error('Not authenticated');
            
            const { doc, setDoc } = await this.getFirestoreModules();
            const db = this.getDb();
            
            await setDoc(doc(db, 'users', userId, 'data', 'intentions'), {
                intentions: intentions,
                updatedAt: new Date().toISOString()
            });
            
            return true;
        } catch (error) {
            console.error('Error saving intentions:', error);
            return false;
        }
    },
    
    async loadIntentions() {
        try {
            const userId = this.getUserId();
            if (!userId) return [];
            
            const { doc, getDoc } = await this.getFirestoreModules();
            const db = this.getDb();
            
            const docSnap = await getDoc(doc(db, 'users', userId, 'data', 'intentions'));
            
            if (docSnap.exists()) {
                return docSnap.data().intentions || [];
            }
            return [];
        } catch (error) {
            console.error('Error loading intentions:', error);
            return [];
        }
    },
    
    // ==================== TIMER STATE ====================
    
    async saveTimerState(timerState) {
        try {
            const userId = this.getUserId();
            if (!userId) throw new Error('Not authenticated');
            
            const { doc, setDoc } = await this.getFirestoreModules();
            const db = this.getDb();
            
            await setDoc(doc(db, 'users', userId, 'data', 'timer'), {
                timerState: timerState,
                updatedAt: new Date().toISOString()
            });
            
            return true;
        } catch (error) {
            console.error('Error saving timer state:', error);
            return false;
        }
    },
    
    async loadTimerState() {
        try {
            const userId = this.getUserId();
            if (!userId) return null;
            
            const { doc, getDoc } = await this.getFirestoreModules();
            const db = this.getDb();
            
            const docSnap = await getDoc(doc(db, 'users', userId, 'data', 'timer'));
            
            if (docSnap.exists()) {
                return docSnap.data().timerState || null;
            }
            return null;
        } catch (error) {
            console.error('Error loading timer state:', error);
            return null;
        }
    },
    
    // ==================== SESSION STATE ====================
    
    async saveSessionState(sessionDate) {
        try {
            const userId = this.getUserId();
            if (!userId) throw new Error('Not authenticated');
            
            const { doc, setDoc } = await this.getFirestoreModules();
            const db = this.getDb();
            
            await setDoc(doc(db, 'users', userId, 'data', 'session'), {
                sessionDate: sessionDate,
                updatedAt: new Date().toISOString()
            });
            
            return true;
        } catch (error) {
            console.error('Error saving session state:', error);
            return false;
        }
    },
    
    async loadSessionState() {
        try {
            const userId = this.getUserId();
            if (!userId) return null;
            
            const { doc, getDoc } = await this.getFirestoreModules();
            const db = this.getDb();
            
            const docSnap = await getDoc(doc(db, 'users', userId, 'data', 'session'));
            
            if (docSnap.exists()) {
                return docSnap.data().sessionDate || null;
            }
            return null;
        } catch (error) {
            console.error('Error loading session state:', error);
            return null;
        }
    },
    
    // ==================== MIGRATE FROM LOCALSTORAGE ====================
    
    async migrateFromLocalStorage() {
        console.log('Starting migration from localStorage to Firestore...');
        
        try {
            // Get all data from localStorage
            const tasks = JSON.parse(localStorage.getItem('focushub_tasks') || '[]');
            const dailyStats = JSON.parse(localStorage.getItem('focushub_daily_stats') || '{}');
            const history = JSON.parse(localStorage.getItem('focushub_history') || '[]');
            const distractions = JSON.parse(localStorage.getItem('focushub_distractions') || '[]');
            const intentions = JSON.parse(localStorage.getItem('focushub_intentions') || '[]');
            const timerState = JSON.parse(localStorage.getItem('focushub_timer') || 'null');
            const sessionDate = localStorage.getItem('focushub_session_date');
            
            // Save to Firestore
            const results = await Promise.all([
                tasks.length > 0 ? this.saveTasks(tasks) : Promise.resolve(true),
                Object.keys(dailyStats).length > 0 ? this.saveDailyStats(dailyStats) : Promise.resolve(true),
                history.length > 0 ? this.saveHistory(history) : Promise.resolve(true),
                distractions.length > 0 ? this.saveDistractions(distractions) : Promise.resolve(true),
                intentions.length > 0 ? this.saveIntentions(intentions) : Promise.resolve(true),
                timerState ? this.saveTimerState(timerState) : Promise.resolve(true),
                sessionDate ? this.saveSessionState(sessionDate) : Promise.resolve(true)
            ]);
            
            console.log('Migration completed:', results);
            return true;
        } catch (error) {
            console.error('Migration error:', error);
            return false;
        }
    }
};

// Make available globally
if (typeof window !== 'undefined') {
    window.FirestoreData = FirestoreData;
}
