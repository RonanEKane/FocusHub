// FocusHub Mode Configuration
const config = {
    professional: {
        mode: 'professional',
        toughLoveDefault: 'balanced',
        ai: {
            tough: {
                welcome: "Time to work. No excuses.",
                sprintComplete: "Sprint complete. What's next?",
                behindPace: "You're behind pace. Catch up.",
                distraction: "Too many distractions. Focus."
            },
            balanced: {
                welcome: "Ready to get started?",
                sprintComplete: "Sprint complete! Keep it up.",
                behindPace: "A bit behind schedule. Let's pick up the pace.",
                distraction: "Quite a few distractions today."
            },
            gentle: {
                welcome: "Welcome! Let's make today productive.",
                sprintComplete: "Great work on that sprint!",
                behindPace: "You're a bit behind, but you can do this!",
                distraction: "I notice some distractions today."
            }
        }
    },
    student: {
        mode: 'student',
        toughLoveDefault: 'balanced',
        ai: {
            // Same structure as professional
            tough: {
                welcome: "Study time. Let's go.",
                sprintComplete: "Session done. Next?",
                behindPace: "Behind on your goals. Focus.",
                distraction: "Too distracted. Get back to work."
            },
            balanced: {
                welcome: "Ready to study?",
                sprintComplete: "Study session complete!",
                behindPace: "A bit behind your study plan.",
                distraction: "Several distractions logged."
            },
            gentle: {
                welcome: "Let's have a great study session!",
                sprintComplete: "Excellent study session!",
                behindPace: "You can catch up on your study goals!",
                distraction: "A few distractions, but that's okay."
            }
        }
    }
};
