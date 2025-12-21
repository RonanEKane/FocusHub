/**
 * FocusHub Mode Configuration System
 * Supports: Professional Mode, Student Mode (High School + College)
 * Phase 2: localStorage-based mode switching
 * Phase 4+: Will integrate with user profiles
 */

const MODE_CONFIG = {
    professional: {
        mode: 'professional',
        displayName: 'Professional',
        
        labels: {
            strategic: "Strategic",
            deepwork: "Deep Work",
            urgent: "Urgent",
            meeting: "Meeting",
            endDay: "END DAY",
            taskEntry: "Add Task",
            brainDump: "What needs doing?",
            holding: "Holding Area",
            missionControl: "Mission Control"
        },
        
        timers: {
            options: [15, 20, 25, 30, 45],
            default: 25,
            energyBased: {
                low: 15,
                medium: 20,
                high: 30
            }
        },
        
        ai: {
            supportive: {
                welcome: "You've got this. Let's make today count.",
                sprintComplete: "Good sprint. Take your break.",
                behindPace: "You're behind target. Adjust your priorities.",
                distraction: "Distraction logged. Get back to work.",
                endOfDay: "Solid day. Review what you accomplished."
            },
            balanced: {
                welcome: "Ready to execute. Let's go.",
                sprintComplete: "Sprint done. Rest, then back at it.",
                behindPace: "You're behind. Time to focus.",
                distraction: "Park it. Return to task.",
                endOfDay: "Day complete. What worked, what didn't?"
            },
            tough: {
                welcome: "No excuses. Show up and deliver.",
                sprintComplete: "One down. Keep moving.",
                behindPace: "You're behind target. Stop wasting time.",
                distraction: "You just broke focus. That's on you.",
                endOfDay: "Did you do what you said you'd do? Be honest."
            }
        },
        
        taskWeights: {
            strategic: 3,
            deepwork: 2,
            urgent: 1,
            meeting: 0
        },
        
        baselineSprints: 5,
        
        features: {
            subjects: false,
            deadlines: false,
            customSubjects: false
        }
    },
    
    student: {
        mode: 'student',
        subMode: 'highschool', // Default to high school
        displayName: 'Student',
        
        // High School Configuration
        highschool: {
            displayName: 'High School',
            
            labels: {
                strategic: "Heavy Lifting / XP Tasks",
                deepwork: "Grinding / Study Mode",
                urgent: "Quick Wins / Quests",
                meeting: "Blocked Time",
                endDay: "LOG OFF",
                taskEntry: "Add Assignment",
                brainDump: "What's due tomorrow?",
                holding: "Backpack",
                missionControl: "Control Center"
            },
            
            timers: {
                options: [15, 20, 30],
                default: 20,
                energyBased: {
                    low: 15,
                    medium: 20,
                    high: 30
                }
            },
            
            ai: {
                supportive: {
                    welcome: "You got this! Let's make today count.",
                    sprintComplete: "Nice work! Take your break - you earned it.",
                    behindPace: "No worries, still plenty of time. Keep going.",
                    distraction: "Distractions happen. Park it and get back to work.",
                    endOfDay: "Solid work today. Take a minute to appreciate what you got done."
                },
                balanced: {
                    welcome: "Ready to level up? Let's do this.",
                    sprintComplete: "Solid sprint. Rest up, then back to work.",
                    behindPace: "You're behind target. Time to lock in.",
                    distraction: "Focus broken. Let's get it back.",
                    endOfDay: "Day's done. What went well? What needs work?"
                },
                tough: {
                    welcome: "No shortcuts. Show up and grind.",
                    sprintComplete: "One done. Next.",
                    behindPace: "You're behind. Stop messing around.",
                    distraction: "You broke focus. That's wasted time.",
                    endOfDay: "Did you do what you said you'd do? Real talk."
                }
            },
            
            taskWeights: {
                strategic: 3,
                deepwork: 2,
                urgent: 1,
                meeting: 0
            },
            
            baselineSprints: 4,
            
            subjects: {
                enabled: true,
                predefined: [
                    "Math",
                    "English",
                    "History",
                    "Science",
                    "Foreign Language",
                    "Elective",
                    "Other"
                ],
                customAllowed: true
            },
            
            features: {
                subjects: true,
                deadlines: true,
                customSubjects: true
            }
        },
        
        // College/Grad Configuration (Future - Phase 3+)
        college: {
            displayName: 'College/Grad',
            
            labels: {
                strategic: "Deep Work / Thesis",
                deepwork: "Study / Research",
                urgent: "Quick Hits",
                meeting: "Class / Office Hours",
                endDay: "WRAP UP",
                taskEntry: "Add Task",
                brainDump: "What's on deck?",
                holding: "Queue",
                missionControl: "Command Center"
            },
            
            timers: {
                options: [20, 30, 45, 60],
                default: 30,
                energyBased: {
                    low: 20,
                    medium: 30,
                    high: 45
                }
            },
            
            ai: {
                supportive: {
                    welcome: "Let's tackle this. You've got the skills.",
                    sprintComplete: "Good session. Recharge and continue.",
                    behindPace: "Behind schedule. Prioritize ruthlessly.",
                    distraction: "Distraction noted. Refocus and continue.",
                    endOfDay: "Productive day. Review progress and plan tomorrow."
                },
                balanced: {
                    welcome: "Ready to produce. Let's execute.",
                    sprintComplete: "Session complete. Break, then back.",
                    behindPace: "You're behind target. Adjust approach.",
                    distraction: "Focus broken. Minimize and return.",
                    endOfDay: "Day complete. Assess output vs. plan."
                },
                tough: {
                    welcome: "No excuses. Deliver results.",
                    sprintComplete: "One done. Next task.",
                    behindPace: "You're behind. Time to perform.",
                    distraction: "You broke concentration. That's lost productivity.",
                    endOfDay: "Did you execute? Be brutally honest."
                }
            },
            
            taskWeights: {
                strategic: 3,
                deepwork: 2,
                urgent: 1,
                meeting: 0
            },
            
            baselineSprints: 5,
            
            subjects: {
                enabled: true,
                predefined: [
                    "Major Course",
                    "Elective",
                    "Research",
                    "Thesis/Dissertation",
                    "TA Duties",
                    "Personal Project",
                    "Other"
                ],
                customAllowed: true
            },
            
            features: {
                subjects: true,
                deadlines: true,
                customSubjects: true
            }
        }
    }
};

/**
 * Mode Detection & Management
 */

// Get current mode from localStorage (Phase 2)
// Will be replaced with user.profile.mode in Phase 4+
function getCurrentMode() {
    const storedMode = localStorage.getItem('focushub_mode');
    return storedMode || 'professional';
}

// Get current submode for student mode
function getCurrentSubMode() {
    if (getCurrentMode() !== 'student') {
        return null;
    }
    const storedSubMode = localStorage.getItem('focushub_student_submode');
    return storedSubMode || 'highschool';
}

// Set mode (for testing in Phase 2, will be replaced with user profile update)
function setMode(mode, subMode = null) {
    localStorage.setItem('focushub_mode', mode);
    if (mode === 'student' && subMode) {
        localStorage.setItem('focushub_student_submode', subMode);
    }
    console.log(`Mode set to: ${mode}${subMode ? ' (' + subMode + ')' : ''}`);
    console.log('Reload page to apply changes.');
}

// Load active mode configuration
function loadModeConfig() {
    const mode = getCurrentMode();
    
    if (mode === 'student') {
        const subMode = getCurrentSubMode();
        return MODE_CONFIG.student[subMode];
    }
    
    return MODE_CONFIG[mode];
}

// Get mode display name
function getModeDisplayName() {
    const mode = getCurrentMode();
    if (mode === 'student') {
        const subMode = getCurrentSubMode();
        return `${MODE_CONFIG.student.displayName} - ${MODE_CONFIG.student[subMode].displayName}`;
    }
    return MODE_CONFIG[mode].displayName;
}

/**
 * UI Application Functions
 * These will be called from app.html during initialization
 */

// Apply mode configuration to all UI elements
function applyModeConfig() {
    const config = loadModeConfig();
    
    // Update labels
    applyLabels(config.labels);
    
    // Update timer options
    applyTimerOptions(config.timers);
    
    // Update AI persona messages
    applyAIMessages(config.ai);
    
    // Update task weights and baseline sprints
    if (window.state) {
        state.taskWeights = config.taskWeights;
        state.baselineSprints = config.baselineSprints;
    }
    
    // Update baseline sprint display
    updateBaselineSprints(config.baselineSprints);
    
    // Apply mode-specific features
    applyModeFeatures(config.features);
    
    console.log(`Mode configuration applied: ${getModeDisplayName()}`);
}

// Update baseline sprints value
function updateBaselineSprints(baselineSprints) {
    const baselineValueEl = document.getElementById('baselineValue');
    if (baselineValueEl) {
        baselineValueEl.textContent = baselineSprints;
    }
}

// Update all label elements with data-label attributes
function applyLabels(labels) {
    Object.keys(labels).forEach(key => {
        const elements = document.querySelectorAll(`[data-label="${key}"]`);
        elements.forEach(el => {
            el.textContent = labels[key];
        });
    });
}

// Update timer options in duration buttons
function applyTimerOptions(timerConfig) {
    const durationContainer = document.querySelector('.duration-buttons');
    if (!durationContainer) return;
    
    // Clear existing buttons
    durationContainer.innerHTML = '';
    
    // Add new buttons based on mode
    timerConfig.options.forEach(minutes => {
        const button = document.createElement('button');
        button.className = 'duration-btn';
        button.setAttribute('data-duration', minutes);
        button.textContent = `${minutes} min`;
        
        // Mark default as recommended
        if (minutes === timerConfig.default) {
            button.classList.add('recommended');
        }
        
        // Attach click event listener
        button.addEventListener('click', (e) => {
            const duration = parseInt(e.currentTarget.dataset.duration);
            if (window.startTimer) {
                window.startTimer(duration);
            }
        });
        
        durationContainer.appendChild(button);
    });
    
    // Also update energy-based descriptions on Start Day screen
    updateEnergyDescriptions(timerConfig.energyBased);
}

// Update energy level descriptions
function updateEnergyDescriptions(energyConfig) {
    const lowDesc = document.querySelector('[data-energy-desc="low"]');
    const mediumDesc = document.querySelector('[data-energy-desc="medium"]');
    const highDesc = document.querySelector('[data-energy-desc="high"]');
    
    if (lowDesc) lowDesc.textContent = `${energyConfig.low}min sprints`;
    if (mediumDesc) mediumDesc.textContent = `${energyConfig.medium}min sprints`;
    if (highDesc) highDesc.textContent = `${energyConfig.high}min sprints`;
}

// Update AI persona messages
function applyAIMessages(aiConfig) {
    // Store in window for access by app logic
    if (window.state) {
        state.aiMessages = aiConfig;
    }
}

// Apply mode-specific feature flags
function applyModeFeatures(features) {
    // Store features for conditional rendering
    if (window.state) {
        state.features = features;
    }
    
    // Toggle subject section visibility
    const subjectSection = document.getElementById('subjectSection');
    if (subjectSection) {
        if (features.subjects) {
            subjectSection.classList.remove('hidden');
            populateSubjectDropdown();
        } else {
            subjectSection.classList.add('hidden');
        }
    }
}

// Populate subject dropdown with mode-specific subjects
function populateSubjectDropdown() {
    const config = loadModeConfig();
    const subjectSelect = document.getElementById('subjectSelect');
    
    if (!subjectSelect || !config.subjects) return;
    
    // Clear existing options except the first one
    subjectSelect.innerHTML = '<option value="">Select subject...</option>';
    
    // Add predefined subjects
    config.subjects.predefined.forEach(subject => {
        const option = document.createElement('option');
        option.value = subject;
        option.textContent = subject;
        subjectSelect.appendChild(option);
    });
    
    // Add custom option if allowed
    if (config.subjects.customAllowed) {
        const customOption = document.createElement('option');
        customOption.value = 'custom';
        customOption.textContent = 'Other (type below)';
        subjectSelect.appendChild(customOption);
    }
}

// Handle subject selection (show custom input if "Other" selected)
function handleSubjectChange() {
    const subjectSelect = document.getElementById('subjectSelect');
    const customInput = document.getElementById('customSubjectInput');
    
    if (!subjectSelect || !customInput) return;
    
    if (subjectSelect.value === 'custom') {
        customInput.classList.remove('hidden');
    } else {
        customInput.classList.add('hidden');
        customInput.value = '';
    }
}

/**
 * Console Helper Functions for Testing
 */

// Quick mode switching helpers
window.switchToProfessional = function() {
    setMode('professional');
};

window.switchToStudentHS = function() {
    setMode('student', 'highschool');
};

window.switchToStudentCollege = function() {
    setMode('student', 'college');
};

window.showCurrentMode = function() {
    console.log('Current Mode:', getModeDisplayName());
    console.log('Config:', loadModeConfig());
};

// Log helper functions availability
console.log('FocusHub Mode Config loaded. Available commands:');
console.log('  switchToProfessional() - Switch to Professional mode');
console.log('  switchToStudentHS() - Switch to High School mode');
console.log('  switchToStudentCollege() - Switch to College mode');
console.log('  showCurrentMode() - Display current mode and config');
