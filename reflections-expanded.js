// ============================================
// FOCUSHUB - EXPANDED REFLECTIONS LIBRARY
// 50 Catholic-Rooted Reflections (Presented Universally)
// Smart Contextual Selection
// ============================================

const EXPANDED_REFLECTIONS = [
    // DISCIPLINE & FOUNDATION (10)
    {
        id: 1,
        headline: "MONASTIC DISCIPLINE",
        text: "The day begins in silence, not chaos. Before the demands come, before the noise rises, there is this moment. Use it to set your intention. What you do in the first hour shapes what follows. Begin with purpose, not with panic.",
        theme: "discipline",
        tags: ["foundation", "morning", "any-day"]
    },
    {
        id: 2,
        headline: "DESERT WISDOM",
        text: "Distraction is not your enemy—it is your teacher. Each time your mind wanders, you have a choice: follow it into the wilderness, or bring it back to the work. Attention is a muscle. Strengthen it with practice, not punishment.",
        theme: "focus",
        tags: ["adhd", "distraction-prone", "any-day"]
    },
    {
        id: 3,
        headline: "CONTEMPLATIVE PRACTICE",
        text: "Small things done with great love become extraordinary. The task before you may feel insignificant, but nothing done with intention is wasted. Excellence is not about the size of the work—it is about the quality of your presence within it.",
        theme: "presence",
        tags: ["meaning", "any-day"]
    },
    {
        id: 4,
        headline: "CLASSICAL VIRTUE",
        text: "Character is built in moments no one sees. When you keep a promise to yourself, even a small one, you reinforce the foundation of who you are becoming. Today, be someone you can trust.",
        theme: "integrity",
        tags: ["foundation", "any-day"]
    },
    {
        id: 5,
        headline: "ANCIENT WISDOM",
        text: "You cannot control outcomes. You can only control effort. Release your grip on results and focus on what is within your power: showing up, doing the work, choosing well. Let the rest unfold as it will.",
        theme: "surrender",
        tags: ["anxiety", "control", "any-day"]
    },
    {
        id: 6,
        headline: "SPIRITUAL DISCIPLINE",
        text: "Resistance is not a sign you are on the wrong path. Often, it is confirmation you are on the right one. What matters will always demand something of you. Do it anyway.",
        theme: "resistance",
        tags: ["low-energy", "procrastination", "any-day"]
    },
    {
        id: 7,
        headline: "MEDIEVAL PHILOSOPHY",
        text: "The body tires. The mind resists. This is expected. What distinguishes those who accomplish from those who merely intend is the willingness to work despite discomfort. Progress is not made in perfect conditions—it is made in spite of imperfect ones.",
        theme: "perseverance",
        tags: ["low-energy", "any-day"]
    },
    {
        id: 8,
        headline: "CONTEMPLATIVE TRADITION",
        text: "Silence is not emptiness. It is clarity. Before you fill your day with noise and tasks, sit with the silence. Ask yourself: what truly matters today? Then build your hours around that answer.",
        theme: "clarity",
        tags: ["morning", "planning", "any-day"]
    },
    {
        id: 9,
        headline: "MONASTIC TEACHING",
        text: "Each task is a prayer, whether you recognize it as such or not. You sanctify your work not through grandiose gestures but through simple attention. Do what is in front of you. Do it well. This is enough.",
        theme: "work",
        tags: ["any-day", "meaning"]
    },
    {
        id: 10,
        headline: "CLASSICAL STOICISM",
        text: "You will not feel ready. You will not feel inspired. These feelings are irrelevant. Action creates momentum. Momentum creates results. Waiting for readiness is waiting for nothing. Begin now.",
        theme: "action",
        tags: ["low-energy", "procrastination", "any-day"]
    },

    // TIME & CONSEQUENCE (10)
    {
        id: 11,
        headline: "DESERT FATHERS",
        text: "Today is not practice for tomorrow. This is your life, happening now. The hours you waste will not return. The effort you withhold will not be stored for later. Spend your time as you would spend your last coin—carefully and with purpose.",
        theme: "time",
        tags: ["procrastination", "any-day"]
    },
    {
        id: 12,
        headline: "ANCIENT TEACHING",
        text: "The work you avoid compounds like debt. Each delay adds weight to what must eventually be faced. But the inverse is also true: each task completed today lightens tomorrow's burden. Choose which future you are building.",
        theme: "consequence",
        tags: ["procrastination", "any-day"]
    },
    {
        id: 13,
        headline: "CONTEMPLATIVE WISDOM",
        text: "You have been given this day as a gift. What you do with it reflects not just your plans, but your values. Will you squander it on distraction and delay, or will you honor it with effort and intention? The choice is yours alone.",
        theme: "stewardship",
        tags: ["any-day", "morning"]
    },
    {
        id: 14,
        headline: "MEDIEVAL THOUGHT",
        text: "There is no later. There is only now, and the consequences of now. Every moment you defer action is a vote for who you are becoming. Cast your votes wisely.",
        theme: "urgency",
        tags: ["procrastination", "any-day"]
    },
    {
        id: 15,
        headline: "MONASTIC RHYTHM",
        text: "The hours are given equally to all, yet some build cathedrals while others build excuses. The difference is not in the time available but in the discipline with which it is spent. What will you build today?",
        theme: "time-use",
        tags: ["any-day", "planning"]
    },
    {
        id: 16,
        headline: "SPIRITUAL PRACTICE",
        text: "You cannot redeem yesterday. You cannot secure tomorrow. All you have is this present moment and what you choose to do within it. Stop dwelling on what was or worrying about what might be. Be here. Do this.",
        theme: "presence",
        tags: ["anxiety", "any-day"]
    },
    {
        id: 17,
        headline: "CLASSICAL VIRTUE",
        text: "Procrastination is not a scheduling problem. It is a character problem. When you delay what matters, you train yourself in weakness. When you act despite resistance, you train yourself in strength. Which person are you becoming?",
        theme: "character",
        tags: ["procrastination", "any-day"]
    },
    {
        id: 18,
        headline: "CONTEMPLATIVE TRADITION",
        text: "The tyranny of the urgent drowns out the importance of the essential. Pause. Ask: what truly matters? Then give that your time, even if a hundred lesser things clamor for attention. Protect what is sacred.",
        theme: "priorities",
        tags: ["planning", "any-day"]
    },
    {
        id: 19,
        headline: "DESERT WISDOM",
        text: "You will be tempted to mistake motion for progress. Busyness is not the same as effectiveness. Before you scatter your energy across a dozen tasks, choose the one that matters most. Then do that.",
        theme: "focus",
        tags: ["any-day", "distraction-prone"]
    },
    {
        id: 20,
        headline: "ANCIENT PHILOSOPHY",
        text: "Time is the one resource you cannot recover. Money can be earned again. Relationships can be repaired. But hours, once spent, are gone forever. Treat them accordingly.",
        theme: "time-value",
        tags: ["any-day"]
    },

    // ENERGY & MOMENTUM (10)
    {
        id: 21,
        headline: "MONASTIC PRACTICE",
        text: "Monday is not your enemy. Inertia is. The hardest part of any journey is the first step. Once you begin, continuation becomes easier. Do not focus on the week ahead—focus on the next hour. Then the hour after that.",
        theme: "starting",
        tags: ["monday", "low-energy"]
    },
    {
        id: 22,
        headline: "CLASSICAL TEACHING",
        text: "Your energy is finite. Your attention is limited. Every distraction is not merely lost time—it is stolen potential. Guard your focus as you would guard your most valuable possession. Because it is.",
        theme: "attention",
        tags: ["adhd", "distraction-prone", "any-day"]
    },
    {
        id: 23,
        headline: "SPIRITUAL DISCIPLINE",
        text: "Low energy is not an excuse—it is a constraint to work within. Adjust your expectations without abandoning your standards. Do what you can with what you have. This is all that has ever been asked of anyone.",
        theme: "energy",
        tags: ["low-energy", "compassion"]
    },
    {
        id: 24,
        headline: "DESERT FATHERS",
        text: "The mind that chases every impulse accomplishes nothing. The mind that returns, again and again, to what matters achieves the impossible. Your power is not in never being distracted—it is in always coming back.",
        theme: "persistence",
        tags: ["adhd", "any-day"]
    },
    {
        id: 25,
        headline: "CONTEMPLATIVE WISDOM",
        text: "You cannot think your way into action. You must act your way into clarity. Start before you feel ready. The path reveals itself to those who walk it, not to those who stand still planning the perfect route.",
        theme: "momentum",
        tags: ["procrastination", "any-day"]
    },
    {
        id: 26,
        headline: "MEDIEVAL THOUGHT",
        text: "Rest is not laziness. Fatigue ignored becomes burnout. Know the difference between resistance that must be pushed through and exhaustion that must be honored. Wisdom is knowing which you face today.",
        theme: "rest",
        tags: ["low-energy", "compassion"]
    },
    {
        id: 27,
        headline: "ANCIENT WISDOM",
        text: "Peak energy is a gift. Do not waste it on trivialities. When you feel strong, tackle what is hardest. When you feel weak, do what is possible. Match your energy to your tasks, and you will accomplish more than those who ignore their limits.",
        theme: "energy-management",
        tags: ["high-energy", "planning"]
    },
    {
        id: 28,
        headline: "MONASTIC RHYTHM",
        text: "The week is a rhythm, not a race. Monday builds. Tuesday sustains. Wednesday tests. Thursday persists. Friday completes. Honor the rhythm. Do not demand Friday's energy on Monday, nor Monday's ambition on Friday.",
        theme: "weekly-rhythm",
        tags: ["any-day", "planning"]
    },
    {
        id: 29,
        headline: "SPIRITUAL PRACTICE",
        text: "You are not a machine. You cannot produce at the same level every day. This is not failure—this is humanity. What matters is not perfect consistency but persistent return. Show up, even when diminished. It is enough.",
        theme: "compassion",
        tags: ["low-energy", "recovering"]
    },
    {
        id: 30,
        headline: "CLASSICAL VIRTUE",
        text: "Discipline without wisdom becomes rigidity. Push when you should, but do not break yourself in the pursuit of productivity. A cracked vessel serves no one. Tend to your capacity as carefully as you tend to your output.",
        theme: "balance",
        tags: ["high-energy", "burnout-risk"]
    },

    // FAILURE & RECOVERY (10)
    {
        id: 31,
        headline: "DESERT WISDOM",
        text: "You will fail today. Perhaps small failures, perhaps large ones. This does not make you a failure. It makes you human. What separates those who grow from those who quit is not the absence of failure but the response to it. Return tomorrow.",
        theme: "failure",
        tags: ["recovering", "compassion", "any-day"]
    },
    {
        id: 32,
        headline: "CONTEMPLATIVE TRADITION",
        text: "Perfection is not the goal. Progress is. You will stumble. You will fall short. These are not disqualifications—they are data points. Learn from them. Adjust. Continue. This is how all meaningful work gets done.",
        theme: "progress",
        tags: ["perfectionism", "any-day"]
    },
    {
        id: 33,
        headline: "MONASTIC TEACHING",
        text: "The streak is broken. The goal is missed. The plan has failed. And yet, you remain. You can still choose today. Yesterday's failure does not bind tomorrow's possibility. Begin again. Begin better. But begin.",
        theme: "fresh-start",
        tags: ["fresh-start", "recovering", "monday"]
    },
    {
        id: 34,
        headline: "ANCIENT TEACHING",
        text: "You are harder on yourself than you need to be. The voice that condemns every imperfection does not make you better—it makes you brittle. Excellence requires both effort and grace. Extend yourself the same patience you extend to others.",
        theme: "self-compassion",
        tags: ["perfectionism", "compassion"]
    },
    {
        id: 35,
        headline: "SPIRITUAL DISCIPLINE",
        text: "The worst day of effort is better than the best day of excuses. Even if you accomplish half of what you planned, you have accomplished something. Do not let the perfect become the enemy of the good. Do what you can.",
        theme: "effort",
        tags: ["low-energy", "any-day"]
    },
    {
        id: 36,
        headline: "MEDIEVAL PHILOSOPHY",
        text: "Shame is not motivation. Guilt does not produce excellence. These emotions may drive you briefly, but they will not sustain you. What sustains is purpose, not punishment. Remember why this matters. Then act from that place.",
        theme: "motivation",
        tags: ["recovering", "compassion"]
    },
    {
        id: 37,
        headline: "CONTEMPLATIVE WISDOM",
        text: "You are not starting over. You are starting again, with more knowledge than before. Every attempt teaches. Every failure refines. You are not back at the beginning—you are deeper into the process. This is progress, even when it doesn't feel like it.",
        theme: "learning",
        tags: ["fresh-start", "recovering"]
    },
    {
        id: 38,
        headline: "CLASSICAL STOICISM",
        text: "The gap between who you are and who you want to be is not crossed in a day. It is crossed in a thousand small decisions, made daily, often unremarkably. Today is one of those days. Make the choice. Again.",
        theme: "growth",
        tags: ["any-day", "momentum"]
    },
    {
        id: 39,
        headline: "DESERT FATHERS",
        text: "Persistence outlasts talent. Consistency defeats intensity. You do not need to be extraordinary today—you need to be present. Show up. Do the work. Return tomorrow. String enough of these days together, and you will surprise yourself.",
        theme: "persistence",
        tags: ["any-day", "long-streak"]
    },
    {
        id: 40,
        headline: "MONASTIC PRACTICE",
        text: "There is no shame in beginning again. The monk returns to prayer after distraction. The artist returns to the canvas after failure. You return to your work after falling short. This is not weakness—this is the work.",
        theme: "return",
        tags: ["recovering", "fresh-start"]
    },

    // MEANING & PURPOSE (10)
    {
        id: 41,
        headline: "CONTEMPLATIVE TRADITION",
        text: "You are not here merely to complete tasks. You are here to become someone. The work shapes you as much as you shape it. What kind of person are you becoming through your daily choices? Pay attention to this.",
        theme: "formation",
        tags: ["meaning", "any-day"]
    },
    {
        id: 42,
        headline: "SPIRITUAL PRACTICE",
        text: "The ordinary is sacred if you treat it as such. There is no hierarchy of meaningful work—only work done with meaning or without it. Sanctify your day not through what you do but through how you do it.",
        theme: "sanctification",
        tags: ["meaning", "any-day"]
    },
    {
        id: 43,
        headline: "ANCIENT WISDOM",
        text: "Your legacy is not what you accomplish but who you become and how you treat others along the way. Let this shape your priorities. Success without character is not success at all.",
        theme: "legacy",
        tags: ["meaning", "any-day"]
    },
    {
        id: 44,
        headline: "MONASTIC TEACHING",
        text: "Every task is an opportunity to practice virtue. Patience with tedious work. Diligence with complex work. Humility with simple work. You are not just completing tasks—you are training your character.",
        theme: "virtue",
        tags: ["any-day", "meaning"]
    },
    {
        id: 45,
        headline: "MEDIEVAL THOUGHT",
        text: "The work itself may not matter in a hundred years. But what it makes of you will matter forever. Approach each task not as a means to an end but as a means to becoming. This shifts everything.",
        theme: "transformation",
        tags: ["meaning", "any-day"]
    },
    {
        id: 46,
        headline: "DESERT WISDOM",
        text: "Busyness is not holiness. Accomplishment is not virtue. What matters is not how much you do but why you do it and who you are becoming in the process. Check your motivations regularly.",
        theme: "intention",
        tags: ["any-day", "meaning"]
    },
    {
        id: 47,
        headline: "CLASSICAL VIRTUE",
        text: "You will be remembered not for your productivity but for your integrity. Build both, but never sacrifice the latter for the former. Character is the foundation. Everything else is decoration.",
        theme: "character",
        tags: ["any-day", "foundation"]
    },
    {
        id: 48,
        headline: "CONTEMPLATIVE WISDOM",
        text: "The tasks before you are not interruptions to your life—they are your life. This moment, this work, this effort. This is not the preamble to something greater. This is it. Be fully here.",
        theme: "presence",
        tags: ["any-day", "meaning"]
    },
    {
        id: 49,
        headline: "SPIRITUAL DISCIPLINE",
        text: "You cannot serve two masters. Choose: will you be driven by anxiety and ambition, or by purpose and peace? Both produce work, but only one produces a life worth living. Choose deliberately.",
        theme: "priorities",
        tags: ["anxiety", "any-day"]
    },
    {
        id: 50,
        headline: "ANCIENT TEACHING",
        text: "At the end of your days, no one will ask how many tasks you completed or how busy you were. They will ask: were you kind? Were you faithful? Did you do what mattered? Let this question guide today's choices.",
        theme: "perspective",
        tags: ["meaning", "any-day", "friday"]
    }
];

// ============================================
// SMART REFLECTION SELECTION ALGORITHM
// ============================================

function getSmartReflection() {
    // Get today's context
    const now = new Date();
    const dayOfWeek = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const hour = now.getHours();
    
    // Get user's recent patterns
    const lastSession = JSON.parse(localStorage.getItem('focushub_daily_stats') || '{}');
    const lastEnergy = localStorage.getItem('focushub_energy') || 'medium';
    const streak = parseInt(localStorage.getItem('focushub_streak') || '0');
    
    // Get reflection history
    const history = JSON.parse(localStorage.getItem('focushub_reflection_history') || '[]');
    
    // Get recent themes (last 7 reflections)
    const recentThemes = history.slice(-7).map(h => h.theme);
    
    // Filter out recently seen reflections (last 10 days)
    const recentIds = history.slice(-10).map(h => h.id);
    const available = EXPANDED_REFLECTIONS.filter(r => !recentIds.includes(r.id));
    
    // If we've exhausted the pool, reset
    if (available.length < 5) {
        localStorage.setItem('focushub_reflection_history', JSON.stringify([]));
        return EXPANDED_REFLECTIONS[Math.floor(Math.random() * EXPANDED_REFLECTIONS.length)];
    }
    
    // Score each reflection based on context
    const scored = available.map(reflection => {
        let score = 0;
        
        // Day of week bonuses
        if (dayOfWeek === 1 && reflection.tags.includes('monday')) score += 5;
        if (dayOfWeek === 5 && reflection.tags.includes('friday')) score += 3;
        
        // Time of day bonuses
        if (hour < 11 && reflection.tags.includes('morning')) score += 3;
        if (hour >= 14 && reflection.tags.includes('afternoon')) score += 3;
        
        // Streak-based bonuses
        if (streak === 0 && reflection.tags.includes('fresh-start')) score += 4;
        if (streak >= 1 && streak <= 3 && reflection.tags.includes('momentum')) score += 3;
        if (streak >= 7 && reflection.tags.includes('long-streak')) score += 4;
        
        // Energy-based bonuses
        if (lastEnergy === 'low' && reflection.tags.includes('low-energy')) score += 3;
        if (lastEnergy === 'high' && reflection.tags.includes('high-energy')) score += 2;
        
        // Theme diversity bonus (avoid repeating recent themes)
        if (recentThemes.includes(reflection.theme)) score -= 2;
        
        // General applicability
        if (reflection.tags.includes('any-day')) score += 0.5;
        
        return { ...reflection, score };
    });
    
    // Sort by score (highest first)
    scored.sort((a, b) => b.score - a.score);
    
    // Pick from top 5 (add randomness to prevent predictability)
    const topCandidates = scored.slice(0, 5);
    const selected = topCandidates[Math.floor(Math.random() * topCandidates.length)];
    
    // Record this selection
    history.push({
        id: selected.id,
        theme: selected.theme,
        date: new Date().toDateString()
    });
    
    // Keep last 30 reflections in history
    localStorage.setItem('focushub_reflection_history', JSON.stringify(history.slice(-30)));
    
    return selected;
}

// Export for use in app.html
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { EXPANDED_REFLECTIONS, getSmartReflection };
}
