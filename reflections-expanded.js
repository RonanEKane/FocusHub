// ============================================
// FOCUSHUB - EXPANDED REFLECTIONS LIBRARY
// 50 Reflections with Smart Contextual Selection
// ============================================

const EXPANDED_REFLECTIONS = [
    // ORIGINAL 10 - Core Themes
    {
        id: 1,
        text: "The day stretches before you like an empty canvas. What you choose to place on it reflects not just your plans, but your character. Discipline is not a burden placed upon you by others—it is the gift you give to your future self. Today, you have the power to honor your commitments or to excuse your failures. Choose deliberately.",
        attribution: "On Discipline and Duty",
        theme: "discipline",
        tags: ["foundation", "any-day"]
    },
    {
        id: 2,
        text: "You will be tempted to drift. Your attention will be pulled in a dozen directions. This is not a moral failing—this is the nature of the mind. But you are not merely your impulses. You possess the capacity to redirect, to refocus, to persist. Use it. The scattered mind achieves nothing. The focused mind moves mountains.",
        attribution: "On Focus and Perseverance",
        theme: "focus",
        tags: ["adhd", "any-day", "distraction-prone"]
    },
    {
        id: 3,
        text: "Today, you will face resistance. The voice that says 'later' or 'not now' or 'this doesn't matter.' That voice is not wisdom. It is entropy. Progress requires you to act against comfort, against ease, against the path of least resistance. This is not punishment. This is the price of growth.",
        attribution: "On Resistance and Growth",
        theme: "resistance",
        tags: ["low-energy", "any-day"]
    },
    {
        id: 4,
        text: "You are not here to feel productive. You are here to produce. Feelings follow action, not the other way around. Start before you feel ready. Work before you feel motivated. The path forward is not paved with perfect conditions—it is built by imperfect effort, repeated daily.",
        attribution: "On Action Over Feeling",
        theme: "action",
        tags: ["low-energy", "procrastination", "any-day"]
    },
    {
        id: 5,
        text: "Each task before you is an opportunity to practice integrity. Not the integrity of grand gestures, but the integrity of small promises kept. When you say you will do something, and then you do it, you build trust with yourself. This is the foundation of all achievement.",
        attribution: "On Integrity and Trust",
        theme: "integrity",
        tags: ["foundation", "any-day"]
    },
    {
        id: 6,
        text: "The work you avoid today does not disappear—it compounds. Every delay adds weight to tomorrow's burden. But the inverse is also true: every task completed today lightens tomorrow's load. You control which future you create. Choose wisely.",
        attribution: "On Time and Consequence",
        theme: "time",
        tags: ["procrastination", "any-day"]
    },
    {
        id: 7,
        text: "Excellence is not a destination. It is a practice. Today, you will not achieve perfection. You will achieve effort. String enough days of effort together, and you will look back surprised at what you have built. But first, you must begin.",
        attribution: "On Excellence Through Practice",
        theme: "excellence",
        tags: ["perfectionism", "any-day"]
    },
    {
        id: 8,
        text: "Your energy is finite. Your attention is finite. Every distraction is not merely a loss of time—it is a theft of potential. Guard your focus as you would guard your most valuable possession. Because it is.",
        attribution: "On Stewardship of Attention",
        theme: "attention",
        tags: ["adhd", "distraction-prone", "any-day"]
    },
    {
        id: 9,
        text: "Today, you may fail. You may fall short of your target, succumb to distraction, or lose focus. This does not make you a failure. It makes you human. What matters is not perfection, but the choice to return tomorrow. Persistence outlasts talent.",
        attribution: "On Failure and Persistence",
        theme: "failure",
        tags: ["recovering", "compassion", "any-day"]
    },
    {
        id: 10,
        text: "The tasks before you are not obstacles to your life. They are your life. This moment, this work, this effort—this is not the preamble to something greater. This is it. Be here. Do this. Make it count.",
        attribution: "On Presence and Purpose",
        theme: "presence",
        tags: ["meaning", "any-day"]
    },
    
    // NEW - Monday / New Week (5)
    {
        id: 11,
        text: "The week ahead is not a burden to survive but territory to claim. Monday's resistance is predictable—expect it, acknowledge it, then work anyway. The momentum you build today will carry you through Wednesday's doubt and Friday's fatigue. Begin.",
        attribution: "On Weekly Rhythm",
        theme: "momentum",
        tags: ["monday", "new-week", "fresh-start"]
    },
    {
        id: 12,
        text: "Monday is not the enemy. Inertia is. The hardest part of any week is the transition from rest to motion. Once you start, continuation becomes easier. Don't focus on the week—focus on the next hour. Then the hour after that.",
        attribution: "On Overcoming Inertia",
        theme: "starting",
        tags: ["monday", "low-energy"]
    },
    {
        id: 13,
        text: "Seven days. What will you build? Each week is both long enough to accomplish something meaningful and short enough that wasting it is inexcusable. Set your targets clearly. Then exceed them.",
        attribution: "On the Week as a Unit",
        theme: "planning",
        tags: ["monday", "new-week", "goal-setting"]
    },
    {
        id: 14,
        text: "You start this week with empty stats and an open road. Last week's failures do not follow you here. Last week's wins do not entitle you to rest. You begin again, as you must, with nothing but intention and effort.",
        attribution: "On Fresh Starts",
        theme: "renewal",
        tags: ["monday", "fresh-start", "recovering"]
    },
    {
        id: 15,
        text: "Monday is for builders. While others complain about the start of the week, you are already moving. This gives you a 24-hour head start on everyone who waited until Tuesday to care. Use it.",
        attribution: "On Early Momentum",
        theme: "advantage",
        tags: ["monday", "competitive"]
    },
    
    // NEW - Energy States (8)
    {
        id: 16,
        text: "You don't feel ready. You won't. Energy follows action, not the other way around. Start with the smallest possible step—open the file, write one sentence, make one call. The engine turns over slowly, but it turns. Trust the process more than the feeling.",
        attribution: "On Starting Despite Resistance",
        theme: "low-energy",
        tags: ["low-energy", "starting", "any-day"]
    },
    {
        id: 17,
        text: "Low energy is not an excuse. It is a condition. Adjust your approach, not your commitment. Take shorter sprints. Choose easier tasks first. Move slower if you must, but keep moving. Stagnation is the only true failure.",
        attribution: "On Working Through Fatigue",
        theme: "adaptation",
        tags: ["low-energy", "compassion"]
    },
    {
        id: 18,
        text: "You're sharp today. Alert. Clear-headed. This is rare—don't squander it on email or shallow work. Tackle the hardest problem first. Do the deep work that requires your full capacity. Tomorrow you may not have this clarity. Use it now.",
        attribution: "On Capitalizing on Peak Energy",
        theme: "optimization",
        tags: ["high-energy", "strategic"]
    },
    {
        id: 19,
        text: "Energy comes in waves. You cannot maintain peak performance all day. The goal is not constant output—it is strategic bursts. Work hard when you're sharp. Rest strategically when you're not. This is wisdom, not weakness.",
        attribution: "On Energy Management",
        theme: "sustainability",
        tags: ["any-day", "strategic"]
    },
    {
        id: 20,
        text: "Tired is not the same as done. Your body wants rest but your commitments remain. Push through this resistance—not recklessly, but deliberately. Often what you think is exhaustion is merely discomfort. Test the boundary.",
        attribution: "On Distinguishing Fatigue from Resistance",
        theme: "endurance",
        tags: ["low-energy", "afternoon"]
    },
    {
        id: 21,
        text: "Friday afternoon is when discipline matters most. The week is almost done. The temptation to coast is strong. But these final hours separate those who finish from those who merely endure. Complete what you started.",
        attribution: "On Finishing Strong",
        theme: "completion",
        tags: ["friday", "afternoon", "endurance"]
    },
    {
        id: 22,
        text: "The afternoon slump is not unexpected. Plan for it. Stack your easier tasks here. Use systems instead of willpower. Design your day around your energy, not against it.",
        attribution: "On Designing Around Energy",
        theme: "systems",
        tags: ["afternoon", "strategic"]
    },
    {
        id: 23,
        text: "Morning energy is a gift. Treat it as such. The first hours of your day have disproportionate value. What you accomplish before lunch determines the tone of what follows. Start strong.",
        attribution: "On Morning Priority",
        theme: "timing",
        tags: ["morning", "high-energy"]
    },
    
    // NEW - Streaks & Momentum (7)
    {
        id: 24,
        text: "Three days. Five days. Ten. This is not luck—this is the compound interest of consistency. But streaks are fragile. They end the moment you believe you've earned a break. Don't celebrate yet. Keep moving.",
        attribution: "On Maintaining Momentum",
        theme: "streaks",
        tags: ["momentum", "streak"]
    },
    {
        id: 25,
        text: "Every streak starts with day one. Yesterday doesn't matter. Last month doesn't matter. You show up today and you begin counting. The first step is always the hardest and always the most important.",
        attribution: "On Starting the Count",
        theme: "beginning",
        tags: ["fresh-start", "streak-zero"]
    },
    {
        id: 26,
        text: "You broke your streak. So what? Streaks are tools, not identities. You did not lose progress—you lost a number. The work you completed still exists. Start again today. The gap only matters if you let it.",
        attribution: "On Recovering from Breaks",
        theme: "recovery",
        tags: ["recovering", "compassion", "fresh-start"]
    },
    {
        id: 27,
        text: "Consistency is not perfection. It is showing up more often than you don't. It is choosing the work more days than you avoid it. Three out of five is better than zero out of seven. Progress, not perfection.",
        attribution: "On Imperfect Consistency",
        theme: "realistic-progress",
        tags: ["compassion", "any-day"]
    },
    {
        id: 28,
        text: "Day thirty. Day sixty. Day ninety. At some point, the streak stops being a motivation and becomes an identity. You are not someone trying to show up—you are someone who shows up. This is the transformation.",
        attribution: "On Identity Through Repetition",
        theme: "identity",
        tags: ["momentum", "long-streak"]
    },
    {
        id: 29,
        text: "Momentum is easier to maintain than to create. You've built velocity. Don't let a single day of rest become three. The hardest part is behind you—now simply continue.",
        attribution: "On Protecting Momentum",
        theme: "maintenance",
        tags: ["momentum", "any-day"]
    },
    {
        id: 30,
        text: "You're building something here. Not just completing tasks, but constructing a pattern. Each day adds another stone to the foundation. You won't see the structure for months. Build it anyway.",
        attribution: "On Long-Term Construction",
        theme: "patience",
        tags: ["momentum", "meaning"]
    },
    
    // NEW - Overwhelm & Challenge (7)
    {
        id: 31,
        text: "Everything feels urgent. None of it probably is. True urgency is rare. Most 'urgent' work is simply loud. Step back. Identify the one task that actually matters. Do that. Let the noise wait.",
        attribution: "On Distinguishing Urgent from Loud",
        theme: "prioritization",
        tags: ["overwhelm", "strategic"]
    },
    {
        id: 32,
        text: "Twenty tasks. Forty tasks. The number doesn't matter if you're only working on one at a time. Pick one. Complete it. Pick another. The size of the pile is irrelevant to the work in front of you right now.",
        attribution: "On Working Despite Scale",
        theme: "focus",
        tags: ["overwhelm", "adhd"]
    },
    {
        id: 33,
        text: "Overwhelm is not a planning problem—it is a commitment problem. You have said yes to too many things. The solution is not better organization. It is ruthless elimination. Choose what matters. Abandon the rest.",
        attribution: "On Elimination Over Organization",
        theme: "saying-no",
        tags: ["overwhelm", "strategic"]
    },
    {
        id: 34,
        text: "You cannot do everything today. But you can do something. One meaningful task completed is infinitely more valuable than ten tasks started. Finish one thing. Then decide what comes next.",
        attribution: "On Sequential Progress",
        theme: "completion",
        tags: ["overwhelm", "any-day"]
    },
    {
        id: 35,
        text: "The interruptions will not stop. Accept this. Your task is not to eliminate them but to return faster. Every return is a victory. Every refocus is progress. Perfection is not the goal. Resilience is.",
        attribution: "On Managing Interruption",
        theme: "resilience",
        tags: ["interruptions", "adhd"]
    },
    {
        id: 36,
        text: "Hard days are where you prove what you're building. Anyone can work when it's easy. When everything is hard, when you don't want to, when you're tired—that's when the choice matters. This is the day that counts.",
        attribution: "On Difficult Days",
        theme: "adversity",
        tags: ["hard-day", "low-energy"]
    },
    {
        id: 37,
        text: "You're stuck. The task before you feels impossible. So break it into five smaller pieces. If those feel impossible, break them again. Keep dividing until you find something you can do right now. Then do it.",
        attribution: "On Breaking Through Paralysis",
        theme: "problem-solving",
        tags: ["stuck", "adhd"]
    },
    
    // NEW - Purpose & Meaning (6)
    {
        id: 38,
        text: "This work matters. Maybe not globally. Maybe not historically. But it matters to the person who hired you, to the family that depends on you, to the future self who needs you to have done this. Small work, done well, has dignity.",
        attribution: "On the Dignity of Work",
        theme: "meaning",
        tags: ["meaning", "any-day"]
    },
    {
        id: 39,
        text: "You will spend years of your life on tasks that feel meaningless. This is part of being human. Meaning is not found in the task—it is brought to the task. You decide whether this matters. Choose to make it matter.",
        attribution: "On Creating Meaning",
        theme: "agency",
        tags: ["meaning", "mundane"]
    },
    {
        id: 40,
        text: "Excellence in small things prepares you for excellence in large things. How you do anything is how you do everything. The task before you may be trivial. Your approach to it is not.",
        attribution: "On Universal Standards",
        theme: "character",
        tags: ["meaning", "any-day"]
    },
    {
        id: 41,
        text: "Every professional was once an amateur. Every master was once a beginner. The distance between here and there is measured in hours of deliberate effort. You're adding to that count today. The work you do now builds what you become later.",
        attribution: "On the Long View",
        theme: "growth",
        tags: ["meaning", "patience"]
    },
    {
        id: 42,
        text: "Your work is a service. Someone needs what you produce. Someone benefits from your effort. This is not abstract—it is literal. The task before you has a recipient. Do it well for them.",
        attribution: "On Service Through Work",
        theme: "service",
        tags: ["meaning", "any-day"]
    },
    {
        id: 43,
        text: "You are building a body of work. Not a single task, not a single project, but a collection that spans years. Each day adds to this collection. What will yours show? Consistency? Excellence? Care? You're writing that story today.",
        attribution: "On Building a Legacy",
        theme: "legacy",
        tags: ["meaning", "long-term"]
    },
    
    // NEW - Professional Growth (7)
    {
        id: 44,
        text: "You're not as good at this as you want to be. Good. That gap between current and desired skill is called potential. The only way to close it is through repeated, focused effort. Today is one day of that effort.",
        attribution: "On the Gap as Opportunity",
        theme: "skill-development",
        tags: ["growth", "any-day"]
    },
    {
        id: 45,
        text: "Mastery is not a destination you reach. It is a direction you face. Every day you can either move toward it or away from it. There is no standing still. Which direction are you facing today?",
        attribution: "On Direction Over Distance",
        theme: "mastery",
        tags: ["growth", "any-day"]
    },
    {
        id: 46,
        text: "You learn more from finishing bad work than from abandoning good ideas. Completion teaches judgment, reveals gaps, exposes weaknesses. Finish what you start, even if it's imperfect. Especially if it's imperfect.",
        attribution: "On Learning Through Completion",
        theme: "learning",
        tags: ["completion", "perfectionism"]
    },
    {
        id: 47,
        text: "Quality is not about having more time—it is about using the time you have more carefully. You don't need extra hours. You need better focus during the hours you have. That starts now.",
        attribution: "On Quality Through Focus",
        theme: "quality",
        tags: ["any-day", "focus"]
    },
    {
        id: 48,
        text: "Speed matters. Not recklessness, but velocity. The faster you complete work, the faster you receive feedback, the faster you improve. Slow perfection is often disguised procrastination. Move quickly and adjust.",
        attribution: "On Velocity as Learning",
        theme: "iteration",
        tags: ["any-day", "perfectionism"]
    },
    {
        id: 49,
        text: "You are not paid to think about the work. You are paid to do the work. Thinking has its place, but that place is small. Most of what you need to know, you will learn through doing. Start doing.",
        attribution: "On Bias Toward Action",
        theme: "pragmatism",
        tags: ["procrastination", "overthinking"]
    },
    {
        id: 50,
        text: "The best work comes from the edge of your ability. Not so hard you fail, not so easy you coast. Find that edge and stay there. This is where growth happens. This is where you become more than you are.",
        attribution: "On Working at the Edge",
        theme: "challenge",
        tags: ["growth", "any-day"]
    }
];

// ============================================
// SMART SELECTION ALGORITHM
// ============================================

function selectContextualReflection() {
    const now = new Date();
    const dayOfWeek = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const hour = now.getHours();
    
    // Get reflection history
    const history = JSON.parse(localStorage.getItem('focushub_reflection_history') || '[]');
    const recentThemes = history.slice(-7).map(r => r.theme);
    const recentIds = history.slice(-10).map(r => r.id);
    
    // Get user streak data
    const userHistory = JSON.parse(localStorage.getItem('focushub_history') || '[]');
    const streak = calculateStreak(userHistory);
    
    // Filter out recently seen reflections
    let available = EXPANDED_REFLECTIONS.filter(r => !recentIds.includes(r.id));
    
    // If we've seen everything recently, reset
    if (available.length < 5) {
        available = EXPANDED_REFLECTIONS;
    }
    
    // Score each reflection based on context
    const scored = available.map(reflection => {
        let score = 1;
        
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
        
        // Energy-based (assume from last session or default to medium)
        const lastEnergy = localStorage.getItem('focushub_energy') || 'medium';
        if (lastEnergy === 'low' && reflection.tags.includes('low-energy')) score += 3;
        if (lastEnergy === 'high' && reflection.tags.includes('high-energy')) score += 2;
        
        // Avoid recently seen themes
        if (recentThemes.includes(reflection.theme)) score -= 2;
        
        // Always-appropriate tags get slight bonus
        if (reflection.tags.includes('any-day')) score += 0.5;
        
        return { ...reflection, score };
    });
    
    // Sort by score
    scored.sort((a, b) => b.score - a.score);
    
    // Pick randomly from top 5
    const topFive = scored.slice(0, 5);
    const selected = topFive[Math.floor(Math.random() * topFive.length)];
    
    // Track in history
    history.push({
        id: selected.id,
        theme: selected.theme,
        date: now.toISOString(),
        dayOfWeek: dayOfWeek,
        hour: hour
    });
    
    // Keep last 30 days
    localStorage.setItem('focushub_reflection_history', JSON.stringify(history.slice(-30)));
    
    return selected;
}

function calculateStreak(history) {
    if (!history || history.length === 0) return 0;
    
    const today = new Date().toDateString();
    const sortedHistory = history.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    let streak = 0;
    let checkDate = new Date();
    
    for (let i = 0; i < sortedHistory.length; i++) {
        const entryDate = new Date(sortedHistory[i].date).toDateString();
        const expectedDate = new Date(checkDate).toDateString();
        
        if (entryDate === expectedDate) {
            streak++;
            checkDate.setDate(checkDate.getDate() - 1);
        } else if (new Date(entryDate) < new Date(expectedDate)) {
            break;
        }
    }
    
    return streak;
}

// Export for use in app.html
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { EXPANDED_REFLECTIONS, selectContextualReflection };
}
