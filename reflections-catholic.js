// ============================================
// CATHOLIC REFLECTIONS - OVERTLY CATHOLIC
// 50 Reflections from Saints, Scripture, Church Teaching
// ============================================

const REFLECTIONS_CATHOLIC = [
    {
        id: 1,
        headline: "ST. AUGUSTINE",
        text: "Our hearts are restless until they rest in You, O Lord. Every task today offers a chance to order your loves properly—to put first things first, eternal above temporal. What will you prioritize?",
        attribution: "Confessions, Book 1",
        theme: "rest",
        tags: ["any-day", "anxiety"]
    },
    {
        id: 2,
        headline: "ROMANS 12:11-12",
        text: "Never be lacking in zeal, but keep your spiritual fervor, serving the Lord. Be joyful in hope, patient in affliction, faithful in prayer. Your work today is an act of service. Approach it with zeal.",
        attribution: "Romans 12:11-12",
        theme: "service",
        tags: ["any-day", "motivation"]
    },
    {
        id: 3,
        headline: "ST. IGNATIUS OF LOYOLA",
        text: "Work as if everything depends on you. Pray as if everything depends on God. Give your best effort today, then entrust the results to providence. Control what you can, surrender what you cannot.",
        attribution: "Jesuit Maxim",
        theme: "surrender",
        tags: ["any-day", "anxiety"]
    },
    {
        id: 4,
        headline: "COLOSSIANS 3:23",
        text: "Whatever you do, work at it with all your heart, as working for the Lord, not for human masters. Transform your labor into worship. Each task becomes sacred when offered to God.",
        attribution: "Colossians 3:23",
        theme: "work",
        tags: ["any-day", "meaning"]
    },
    {
        id: 5,
        headline: "ST. THÉRÈSE OF LISIEUX",
        text: "The little way is doing small things with great love. You need not accomplish heroic deeds today. Do what is before you with love and attention. This is holiness.",
        attribution: "Story of a Soul",
        theme: "littleway",
        tags: ["any-day", "compassion"]
    },
    {
        id: 6,
        headline: "ECCLESIASTES 9:10",
        text: "Whatever your hand finds to do, do it with all your might. The hours given to you today are a gift. Use them well, for time once spent cannot be redeemed.",
        attribution: "Ecclesiastes 9:10",
        theme: "time",
        tags: ["procrastination", "any-day"]
    },
    {
        id: 7,
        headline: "ST. FRANCIS DE SALES",
        text: "Be patient with yourself. God is patient with you. Nothing great is created suddenly, not even a bunch of grapes or a fig. Give yourself time to grow through daily effort.",
        attribution: "Introduction to the Devout Life",
        theme: "patience",
        tags: ["perfectionism", "compassion"]
    },
    {
        id: 8,
        headline: "PROVERBS 16:3",
        text: "Commit to the Lord whatever you do, and He will establish your plans. Begin your work with prayer. Offer each task to God. Let divine purpose guide your effort.",
        attribution: "Proverbs 16:3",
        theme: "commitment",
        tags: ["morning", "any-day"]
    },
    {
        id: 9,
        headline: "ST. BENEDICT",
        text: "Idleness is the enemy of the soul. Structured work sanctifies the day. The Rule reminds us: prayer and work, ora et labora. Balance both. Avoid sloth, embrace discipline.",
        attribution: "Rule of St. Benedict",
        theme: "discipline",
        tags: ["monday", "any-day"]
    },
    {
        id: 10,
        headline: "PHILIPPIANS 4:13",
        text: "I can do all things through Christ who strengthens me. You are not alone in your work today. Divine grace empowers your effort. Trust in strength beyond your own.",
        attribution: "Philippians 4:13",
        theme: "strength",
        tags: ["low-energy", "any-day"]
    },
    {
        id: 11,
        headline: "ST. THOMAS AQUINAS",
        text: "To one who has faith, no explanation is necessary. To one without faith, no explanation is possible. But whether you feel it or not, act with integrity. Character precedes feeling.",
        attribution: "Summa Theologica",
        theme: "integrity",
        tags: ["any-day"]
    },
    {
        id: 12,
        headline: "MATTHEW 6:34",
        text: "Do not worry about tomorrow, for tomorrow will worry about itself. Each day has enough trouble of its own. Be fully present to today's tasks. Anxiety about the future steals energy from the present.",
        attribution: "Matthew 6:34",
        theme: "presence",
        tags: ["anxiety", "any-day"]
    },
    {
        id: 13,
        headline: "ST. CATHERINE OF SIENA",
        text: "Be who God meant you to be and you will set the world on fire. Your work today shapes who you are becoming. Choose deliberately. Every action is formation.",
        attribution: "Letter to the Abbess of Santa Marta",
        theme: "becoming",
        tags: ["any-day", "meaning"]
    },
    {
        id: 14,
        headline: "JAMES 1:22",
        text: "Do not merely listen to the word, and so deceive yourselves. Do what it says. Knowledge without action is sterile. Good intentions without follow-through accomplish nothing. Begin.",
        attribution: "James 1:22",
        theme: "action",
        tags: ["procrastination", "any-day"]
    },
    {
        id: 15,
        headline: "ST. JOHN PAUL II",
        text: "The future starts today, not tomorrow. What you do now determines what tomorrow holds. Do not defer your purpose. Live it today, in this moment, through this work.",
        attribution: "Homily, 1979",
        theme: "future",
        tags: ["any-day", "momentum"]
    },
    {
        id: 16,
        headline: "ECCLESIASTES 3:1",
        text: "There is a time for everything, and a season for every activity under the heavens. Today has its purpose. Discern what this day calls for. Then give yourself fully to it.",
        attribution: "Ecclesiastes 3:1",
        theme: "discernment",
        tags: ["any-day", "planning"]
    },
    {
        id: 17,
        headline: "ST. TERESA OF ÁVILA",
        text: "Christ has no body now but yours. No hands, no feet on earth but yours. You are His instruments today. Let your work be an extension of divine love in the world.",
        attribution: "Christ Has No Body",
        theme: "mission",
        tags: ["any-day", "meaning"]
    },
    {
        id: 18,
        headline: "GALATIANS 6:9",
        text: "Let us not become weary in doing good, for at the proper time we will reap a harvest if we do not give up. Persistence is required. The harvest comes to those who remain faithful.",
        attribution: "Galatians 6:9",
        theme: "persistence",
        tags: ["low-energy", "long-streak"]
    },
    {
        id: 19,
        headline: "ST. PADRE PIO",
        text: "Pray, hope, and don't worry. Worry is useless. God is merciful and will hear your prayer. Do your work, offer it up, and trust divine providence for the outcome.",
        attribution: "Letters",
        theme: "trust",
        tags: ["anxiety", "any-day"]
    },
    {
        id: 20,
        headline: "1 CORINTHIANS 10:31",
        text: "So whether you eat or drink or whatever you do, do it all for the glory of God. The mundane becomes holy when done for God's glory. Sanctify your ordinary tasks today.",
        attribution: "1 Corinthians 10:31",
        theme: "glory",
        tags: ["any-day", "meaning"]
    },
    {
        id: 21,
        headline: "ST. JOSEMARÍA ESCRIVÁ",
        text: "Work is prayer when it is done well and offered to God. Ordinary work becomes extraordinary through intention. Your desk is your altar. Your tasks are your offering.",
        attribution: "The Way",
        theme: "work-as-prayer",
        tags: ["any-day", "meaning"]
    },
    {
        id: 22,
        headline: "PSALM 90:17",
        text: "May the favor of the Lord our God rest on us; establish the work of our hands for us—yes, establish the work of our hands. Ask for divine blessing on your efforts today.",
        attribution: "Psalm 90:17",
        theme: "blessing",
        tags: ["morning", "any-day"]
    },
    {
        id: 23,
        headline: "ST. FRANCIS OF ASSISI",
        text: "Start by doing what's necessary; then do what's possible; and suddenly you are doing the impossible. Break your work into small steps. Progress compounds.",
        attribution: "Franciscan Wisdom",
        theme: "incremental",
        tags: ["any-day", "procrastination"]
    },
    {
        id: 24,
        headline: "HEBREWS 12:1",
        text: "Let us run with perseverance the race marked out for us, throwing off everything that hinders. Identify your distractions. Cast them aside. Focus on what matters.",
        attribution: "Hebrews 12:1",
        theme: "focus",
        tags: ["adhd", "distraction-prone"]
    },
    {
        id: 25,
        headline: "ST. MAXIMILIAN KOLBE",
        text: "Only love creates. Everything else is merely tolerated. Work done without love produces results but forms nothing within you. Labor with charity today.",
        attribution: "Writings",
        theme: "love",
        tags: ["any-day", "meaning"]
    },
    {
        id: 26,
        headline: "PROVERBS 6:6-8",
        text: "Go to the ant, you sluggard; consider its ways and be wise! It has no commander, yet it stores provisions in summer. Learn from nature's diligence. Work without needing external pressure.",
        attribution: "Proverbs 6:6-8",
        theme: "diligence",
        tags: ["procrastination", "any-day"]
    },
    {
        id: 27,
        headline: "POPE FRANCIS",
        text: "We cannot passively wait. We need to roll up our sleeves and get to work. Passivity accomplishes nothing. The world needs your active participation. Begin now.",
        attribution: "Address, 2015",
        theme: "action",
        tags: ["any-day", "low-energy"]
    },
    {
        id: 28,
        headline: "LUKE 16:10",
        text: "Whoever can be trusted with very little can also be trusted with much. Your faithfulness in small tasks qualifies you for larger ones. Be trustworthy today in what seems insignificant.",
        attribution: "Luke 16:10",
        theme: "faithfulness",
        tags: ["any-day"]
    },
    {
        id: 29,
        headline: "ST. AMBROSE",
        text: "No one heals himself by wounding another. Your frustration with distractions should not become self-condemnation. Treat yourself with the same mercy God offers you.",
        attribution: "Duties of the Clergy",
        theme: "mercy",
        tags: ["compassion", "recovering"]
    },
    {
        id: 30,
        headline: "EPHESIANS 5:15-16",
        text: "Be very careful, then, how you live—not as unwise but as wise, making the most of every opportunity. Time is precious. Use it wisely. Every hour is an opportunity.",
        attribution: "Ephesians 5:15-16",
        theme: "wisdom",
        tags: ["any-day", "time"]
    },
    {
        id: 31,
        headline: "ST. JOHN VIANNEY",
        text: "The Devil is afraid of people who pray and sacrifice. When tempted to abandon your work, persist. Your resistance builds spiritual strength.",
        attribution: "Sermons",
        theme: "resistance",
        tags: ["low-energy", "any-day"]
    },
    {
        id: 32,
        headline: "2 TIMOTHY 1:7",
        text: "For God has not given us a spirit of fear, but of power and of love and of a sound mind. Fear and anxiety are not from God. Claim the power, love, and clarity He offers.",
        attribution: "2 Timothy 1:7",
        theme: "courage",
        tags: ["anxiety", "any-day"]
    },
    {
        id: 33,
        headline: "ST. ALPHONSUS LIGUORI",
        text: "He who trusts in himself is lost. He who trusts in God can do all things. Your self-reliance has limits. Divine assistance has none. Lean on grace.",
        attribution: "The Way of Salvation",
        theme: "trust",
        tags: ["any-day", "low-energy"]
    },
    {
        id: 34,
        headline: "JAMES 4:17",
        text: "If anyone, then, knows the good they ought to do and doesn't do it, it is sin for them. Procrastination is not neutral. Delayed action becomes moral failure. Do what you know needs doing.",
        attribution: "James 4:17",
        theme: "conscience",
        tags: ["procrastination", "any-day"]
    },
    {
        id: 35,
        headline: "ST. JOHN CHRYSOSTOM",
        text: "The bee is more honored than other animals, not because she labors, but because she labors for others. Let your work today serve others, not just yourself.",
        attribution: "Homilies",
        theme: "service",
        tags: ["any-day", "meaning"]
    },
    {
        id: 36,
        headline: "PSALM 127:1",
        text: "Unless the Lord builds the house, the builders labor in vain. Invite God into your work. What is built without divine blessing will not stand.",
        attribution: "Psalm 127:1",
        theme: "foundation",
        tags: ["morning", "any-day"]
    },
    {
        id: 37,
        headline: "ST. JEROME",
        text: "Good, better, best. Never let it rest, until your good is better and your better is best. Excellence is a journey, not a destination. Improve daily.",
        attribution: "Letters",
        theme: "excellence",
        tags: ["any-day", "perfectionism"]
    },
    {
        id: 38,
        headline: "1 THESSALONIANS 4:11",
        text: "Make it your ambition to lead a quiet life: You should mind your own business and work with your hands. Focus on your work, not others' approval. Let your effort speak.",
        attribution: "1 Thessalonians 4:11",
        theme: "focus",
        tags: ["any-day", "distraction-prone"]
    },
    {
        id: 39,
        headline: "ST. BERNARD OF CLAIRVAUX",
        text: "What we love we shall grow to resemble. If you love excellence, you will become excellent. If you love ease, you will become mediocre. Choose what you love.",
        attribution: "On Loving God",
        theme: "formation",
        tags: ["any-day"]
    },
    {
        id: 40,
        headline: "PROVERBS 12:24",
        text: "Diligent hands will rule, but laziness ends in forced labor. Initiative today prevents crisis tomorrow. Choose voluntary discipline over involuntary consequences.",
        attribution: "Proverbs 12:24",
        theme: "diligence",
        tags: ["any-day", "procrastination"]
    },
    {
        id: 41,
        headline: "ST. AUGUSTINE",
        text: "God provides the wind, but man must raise the sails. Divine grace is available, but you must cooperate with it. Do your part. God will do His.",
        attribution: "Sermons",
        theme: "cooperation",
        tags: ["any-day"]
    },
    {
        id: 42,
        headline: "COLOSSIANS 3:17",
        text: "And whatever you do, whether in word or deed, do it all in the name of the Lord Jesus, giving thanks to God the Father through him. Let gratitude permeate your work today.",
        attribution: "Colossians 3:17",
        theme: "gratitude",
        tags: ["any-day", "meaning"]
    },
    {
        id: 43,
        headline: "ST. MOTHER TERESA",
        text: "Not all of us can do great things. But we can do small things with great love. Your hidden acts of effort matter. Faithfulness in little things is greatness.",
        attribution: "No Greater Love",
        theme: "smallthings",
        tags: ["any-day", "compassion"]
    },
    {
        id: 44,
        headline: "ECCLESIASTES 11:6",
        text: "Sow your seed in the morning, and at evening let your hands not be idle, for you do not know which will succeed. Begin your work today without certainty of outcome. Faith requires action despite uncertainty.",
        attribution: "Ecclesiastes 11:6",
        theme: "faith",
        tags: ["morning", "any-day"]
    },
    {
        id: 45,
        headline: "ST. JOHN OF THE CROSS",
        text: "In the evening of life, we will be judged on love alone. Let this eternal perspective shape today's temporal choices. Work matters, but love matters more.",
        attribution: "Sayings of Light and Love",
        theme: "perspective",
        tags: ["friday", "any-day"]
    },
    {
        id: 46,
        headline: "ROMANS 8:28",
        text: "And we know that in all things God works for the good of those who love him. Even your failures today can be redeemed. Trust divine providence in all outcomes.",
        attribution: "Romans 8:28",
        theme: "providence",
        tags: ["recovering", "any-day"]
    },
    {
        id: 47,
        headline: "ST. IGNATIUS OF LOYOLA",
        text: "Go forth and set the world on fire. Your work today should be fuel for transformation—yours and others'. Do not settle for mediocrity. Aim higher.",
        attribution: "Jesuit Motto",
        theme: "mission",
        tags: ["monday", "any-day"]
    },
    {
        id: 48,
        headline: "PHILIPPIANS 2:14",
        text: "Do everything without grumbling or arguing. Your attitude shapes your work's quality. Complaint drains energy. Gratitude multiplies it. Choose your posture.",
        attribution: "Philippians 2:14",
        theme: "attitude",
        tags: ["any-day", "low-energy"]
    },
    {
        id: 49,
        headline: "ST. GREGORY THE GREAT",
        text: "He who labors as he prays lifts his heart to God with his hands. Integrate your work and your spiritual life. They are not separate. Both are worship.",
        attribution: "Pastoral Care",
        theme: "integration",
        tags: ["any-day", "meaning"]
    },
    {
        id: 50,
        headline: "MATTHEW 25:21",
        text: "Well done, good and faithful servant! You have been faithful with a few things; I will put you in charge of many things. Strive today to hear these words tomorrow.",
        attribution: "Matthew 25:21",
        theme: "faithfulness",
        tags: ["any-day", "motivation"]
    }
];

// Export for use in app
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { REFLECTIONS_CATHOLIC };
}
