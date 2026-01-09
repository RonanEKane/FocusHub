// ============================================
// HINDU REFLECTIONS - BHAGAVAD GITA, UPANISHADS, VEDIC WISDOM
// 50 Reflections with Sanskrit + English for Key Verses
// ============================================

const REFLECTIONS_HINDU = [
    {
        id: 1,
        headline: "BHAGAVAD GITA 2:47",
        text: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन - You have a right to perform your duty, but not to the fruits of action. Focus on the work today, not the outcome. Excellence lies in effort, not results.",
        attribution: "Bhagavad Gita 2:47",
        theme: "detachment",
        tags: ["any-day", "anxiety"]
    },
    {
        id: 2,
        headline: "SWAMI VIVEKANANDA",
        text: "Arise, awake, and stop not until the goal is reached. Your work today requires full commitment. Hesitation and half-measures accomplish nothing. Begin with conviction.",
        attribution: "Speeches and Writings",
        theme: "determination",
        tags: ["monday", "any-day"]
    },
    {
        id: 3,
        headline: "BHAGAVAD GITA 3:19",
        text: "तस्मादसक्तः सततं कार्यं कर्म समाचर - Therefore, perform your duty without attachment. Excellence comes from focused action, not anxious clinging to outcomes. Work freely today.",
        attribution: "Bhagavad Gita 3:19",
        theme: "nonattachment",
        tags: ["any-day", "anxiety"]
    },
    {
        id: 4,
        headline: "UPANISHADS",
        text: "तत् त्वम् असि - Thou art That. You are not separate from the divine. Your work today is not separate from spiritual practice. All action can be sacred.",
        attribution: "Chandogya Upanishad 6.8.7",
        theme: "unity",
        tags: ["any-day", "meaning"]
    },
    {
        id: 5,
        headline: "PATANJALI",
        text: "योगश्चित्तवृत्तिनिरोधः - Yoga is the cessation of the fluctuations of the mind. Before you work, still your mind. Clarity precedes effective action.",
        attribution: "Yoga Sutras 1.2",
        theme: "focus",
        tags: ["morning", "adhd", "any-day"]
    },
    {
        id: 6,
        headline: "BHAGAVAD GITA 6:5",
        text: "उद्धरेदात्मनात्मानं - Lift yourself by yourself. Do not degrade yourself. You are your own friend and your own enemy. Today, be your own ally.",
        attribution: "Bhagavad Gita 6:5",
        theme: "selfreliance",
        tags: ["any-day", "motivation"]
    },
    {
        id: 7,
        headline: "SRI RAMAKRISHNA",
        text: "The winds of grace are always blowing, but you have to raise the sail. Divine help is available, but you must do your part. Work diligently today. Grace meets effort.",
        attribution: "Gospel of Sri Ramakrishna",
        theme: "grace",
        tags: ["any-day"]
    },
    {
        id: 8,
        headline: "BHAGAVAD GITA 18:48",
        text: "सहजं कर्म - Every action has some imperfection. Even as smoke obscures fire, imperfection accompanies action. Do not let the fear of imperfection prevent you from beginning.",
        attribution: "Bhagavad Gita 18:48",
        theme: "perfectionism",
        tags: ["perfectionism", "any-day"]
    },
    {
        id: 9,
        headline: "ISHA UPANISHAD",
        text: "ईशावास्यमिदं सर्वं - The Lord pervades all that exists. Everything you encounter today is imbued with the divine. Treat all work as service to the sacred.",
        attribution: "Isha Upanishad 1",
        theme: "reverence",
        tags: ["any-day", "meaning"]
    },
    {
        id: 10,
        headline: "BHAGAVAD GITA 2:14",
        text: "मात्रास्पर्शास्तु - The contacts of the senses with objects give rise to cold and heat, pleasure and pain. They come and go. Be tolerant of discomfort today. It is temporary.",
        attribution: "Bhagavad Gita 2:14",
        theme: "endurance",
        tags: ["low-energy", "any-day"]
    },
    {
        id: 11,
        headline: "SWAMI SIVANANDA",
        text: "Do not brood over your past mistakes and failures. This will only fill your mind with grief, regret, and depression. Do not repeat them in the future. Focus on today's work with fresh resolve.",
        attribution: "Practical Lessons in Yoga",
        theme: "renewal",
        tags: ["recovering", "fresh-start"]
    },
    {
        id: 12,
        headline: "BHAGAVAD GITA 4:18",
        text: "कर्मण्यकर्म यः पश्येत् - One who sees inaction in action, and action in inaction, is wise. Even apparent stillness is active. Even constant motion can be mindless. Choose purposeful action today.",
        attribution: "Bhagavad Gita 4:18",
        theme: "wisdom",
        tags: ["any-day"]
    },
    {
        id: 13,
        headline: "KATHA UPANISHAD",
        text: "उत्तिष्ठत जाग्रत - Arise! Awake! And stop not till the goal is reached. Procrastination is spiritual sleep. Wake up. Begin your work now.",
        attribution: "Katha Upanishad 1.3.14",
        theme: "awakening",
        tags: ["procrastination", "monday", "any-day"]
    },
    {
        id: 14,
        headline: "BHAGAVAD GITA 3:8",
        text: "नियतं कुरु कर्म त्वं - Perform your prescribed duty. Action is superior to inaction. Even the maintenance of your body would be impossible without action. Move forward today.",
        attribution: "Bhagavad Gita 3:8",
        theme: "action",
        tags: ["procrastination", "any-day"]
    },
    {
        id: 15,
        headline: "PARAMAHANSA YOGANANDA",
        text: "The season of failure is the best time for sowing the seeds of success. What appears as failure today may be tomorrow's foundation. Trust the process.",
        attribution: "Autobiography of a Yogi",
        theme: "failure",
        tags: ["recovering", "compassion"]
    },
    {
        id: 16,
        headline: "BHAGAVAD GITA 6:17",
        text: "युक्ताहारविहारस्य - Yoga is not possible for one who eats too much or eats too little. Balance in all things creates capacity for excellence. Cultivate equilibrium today.",
        attribution: "Bhagavad Gita 6:17",
        theme: "balance",
        tags: ["any-day"]
    },
    {
        id: 17,
        headline: "MUNDAKA UPANISHAD",
        text: "सत्यमेव जयते - Truth alone triumphs. Let honesty guide your work today. Shortcuts and deception ultimately fail. Integrity endures.",
        attribution: "Mundaka Upanishad 3.1.6",
        theme: "truth",
        tags: ["any-day", "foundation"]
    },
    {
        id: 18,
        headline: "BHAGAVAD GITA 2:40",
        text: "नेहाभिक्रमनाशोऽस्ति - In this path, no effort is wasted. Even a little practice protects from great fear. Every task you complete today moves you forward. Nothing is lost.",
        attribution: "Bhagavad Gita 2:40",
        theme: "progress",
        tags: ["any-day", "motivation"]
    },
    {
        id: 19,
        headline: "RAMANA MAHARSHI",
        text: "Your own Self-realization is the greatest service you can render the world. Before you can effectively serve others through your work, you must know yourself. Begin within.",
        attribution: "Teachings",
        theme: "selfknowledge",
        tags: ["any-day", "meaning"]
    },
    {
        id: 20,
        headline: "BHAGAVAD GITA 16:1-3",
        text: "अभयं सत्त्वसंशुद्धिः - Fearlessness, purity of heart, steadfastness in knowledge—these are divine qualities. Cultivate them through your work today. Excellence in action builds character.",
        attribution: "Bhagavad Gita 16:1-3",
        theme: "character",
        tags: ["any-day", "foundation"]
    },
    {
        id: 21,
        headline: "SWAMI VIVEKANANDA",
        text: "Take up one idea. Make that one idea your life. Think of it, dream of it, live on that idea. This is the way to success. Focus intensely on today's most important task.",
        attribution: "Complete Works",
        theme: "focus",
        tags: ["any-day", "distraction-prone"]
    },
    {
        id: 22,
        headline: "BHAGAVAD GITA 2:48",
        text: "योगस्थः कुरु कर्माणि - Established in yoga, perform action. Work with equanimity, unattached to success or failure. Evenness of mind is called yoga. Maintain steady focus today.",
        attribution: "Bhagavad Gita 2:48",
        theme: "equanimity",
        tags: ["anxiety", "any-day"]
    },
    {
        id: 23,
        headline: "TAITTIRIYA UPANISHAD",
        text: "सत्यं वद धर्मं चर - Speak truth. Practice righteousness. Never neglect your duties toward learning and teaching. Let these principles guide your work today.",
        attribution: "Taittiriya Upanishad 1.11",
        theme: "duty",
        tags: ["any-day"]
    },
    {
        id: 24,
        headline: "BHAGAVAD GITA 5:10",
        text: "ब्रह्मण्याधाय कर्माणि - One who performs duty without attachment, surrendering results to Brahman, is untainted by sin. Dedicate your work to the divine. Release anxiety about outcomes.",
        attribution: "Bhagavad Gita 5:10",
        theme: "surrender",
        tags: ["anxiety", "any-day"]
    },
    {
        id: 25,
        headline: "SRI AUROBINDO",
        text: "All life is yoga. Every action, every thought, every breath can be an offering. Your seemingly mundane work today is part of a sacred practice. Approach it accordingly.",
        attribution: "The Synthesis of Yoga",
        theme: "integration",
        tags: ["any-day", "meaning"]
    },
    {
        id: 26,
        headline: "BHAGAVAD GITA 3:27",
        text: "प्रकृतेः क्रियमाणानि - All actions are performed by the gunas of nature. Yet the deluded, egoistic person thinks 'I am the doer.' Do your work humbly. You are an instrument, not the source.",
        attribution: "Bhagavad Gita 3:27",
        theme: "humility",
        tags: ["any-day"]
    },
    {
        id: 27,
        headline: "SVETASVATARA UPANISHAD",
        text: "न तस्य कार्यं करणं च विद्यते - The Supreme has no duty to perform. Yet continuous action sustains creation. If the divine works without obligation, how much more should you work with purpose today?",
        attribution: "Svetasvatara Upanishad 6.8",
        theme: "purpose",
        tags: ["any-day"]
    },
    {
        id: 28,
        headline: "BHAGAVAD GITA 18:78",
        text: "यत्र योगेश्वरः कृष्णः - Wherever there is Krishna and Arjuna, there is prosperity and victory. When divine wisdom meets human effort, success follows. Combine both today.",
        attribution: "Bhagavad Gita 18:78",
        theme: "success",
        tags: ["any-day"]
    },
    {
        id: 29,
        headline: "AMMA (MATA AMRITANANDAMAYI)",
        text: "The secret of happiness is not in doing what one likes, but in liking what one does. Transform your attitude toward today's work. Find meaning in what must be done.",
        attribution: "Teachings",
        theme: "attitude",
        tags: ["any-day", "low-energy"]
    },
    {
        id: 30,
        headline: "BHAGAVAD GITA 2:50",
        text: "बुद्धियुक्तो जहातीह - Endowed with wisdom, one casts off both good and bad actions. Strive for equanimity. The skilled in yoga abandon attachment to success and failure alike.",
        attribution: "Bhagavad Gita 2:50",
        theme: "detachment",
        tags: ["perfectionism", "any-day"]
    },
    {
        id: 31,
        headline: "BRIHADARANYAKA UPANISHAD",
        text: "असतो मा सद्गमय - Lead me from the unreal to the real, from darkness to light, from death to immortality. Let your work today move you toward truth and enlightenment.",
        attribution: "Brihadaranyaka Upanishad 1.3.28",
        theme: "truth",
        tags: ["any-day", "meaning"]
    },
    {
        id: 32,
        headline: "BHAGAVAD GITA 9:27",
        text: "यत्करोषि यदश्नासि - Whatever you do, whatever you eat, whatever you offer, whatever you give, whatever austerity you practice—do that as an offering to Me. Consecrate your work today.",
        attribution: "Bhagavad Gita 9:27",
        theme: "offering",
        tags: ["any-day", "meaning"]
    },
    {
        id: 33,
        headline: "SWAMI CHINMAYANANDA",
        text: "The tragedy of human history is decreasing happiness in the midst of increasing comforts. External success means nothing without inner peace. Tend to both in your work today.",
        attribution: "Teachings",
        theme: "balance",
        tags: ["any-day"]
    },
    {
        id: 34,
        headline: "BHAGAVAD GITA 6:35",
        text: "असंशयं महाबाहो - Undoubtedly, the mind is restless and difficult to control. But through practice and detachment, it can be restrained. Your distracted mind can be trained. Begin today.",
        attribution: "Bhagavad Gita 6:35",
        theme: "discipline",
        tags: ["adhd", "distraction-prone"]
    },
    {
        id: 35,
        headline: "KENA UPANISHAD",
        text: "यस्य अमतं तस्य मतं - He who thinks he knows, knows not. He who knows he knows not, knows. Approach your work with humility. The wisest acknowledge what they don't know.",
        attribution: "Kena Upanishad 2.3",
        theme: "humility",
        tags: ["any-day"]
    },
    {
        id: 36,
        headline: "BHAGAVAD GITA 4:38",
        text: "न हि ज्ञानेन सदृशं - Nothing in this world is as purifying as knowledge. One who is perfected in yoga finds this knowledge within through time. Your work today is a path to wisdom.",
        attribution: "Bhagavad Gita 4:38",
        theme: "knowledge",
        tags: ["any-day"]
    },
    {
        id: 37,
        headline: "SWAMI SATCHIDANANDA",
        text: "You can't stop the waves, but you can learn to surf. Difficulties in your work today are inevitable. Mastery comes not from eliminating challenges but from navigating them skillfully.",
        attribution: "The Yoga Sutras",
        theme: "mastery",
        tags: ["any-day", "low-energy"]
    },
    {
        id: 38,
        headline: "BHAGAVAD GITA 12:13-14",
        text: "अद्वेष्टा सर्वभूतानां - One who is free from malice toward all beings, friendly and compassionate, balanced in pleasure and pain—such a person is dear to Me. Bring this spirit to your work today.",
        attribution: "Bhagavad Gita 12:13-14",
        theme: "compassion",
        tags: ["any-day"]
    },
    {
        id: 39,
        headline: "MANDUKYA UPANISHAD",
        text: "ॐ - Om is the bow, the self is the arrow, Brahman is the target. One should aim at it with concentration. Unite your full attention with your work today, like an arrow seeking its mark.",
        attribution: "Mandukya Upanishad 2.2.4",
        theme: "concentration",
        tags: ["any-day", "focus"]
    },
    {
        id: 40,
        headline: "BHAGAVAD GITA 14:26",
        text: "मां च योऽव्यभिचारेण - One who serves Me with unwavering devotion transcends the gunas and becomes fit for Brahman. Consistent, devoted effort today builds spiritual capacity.",
        attribution: "Bhagavad Gita 14:26",
        theme: "devotion",
        tags: ["any-day", "long-streak"]
    },
    {
        id: 41,
        headline: "NISARGADATTA MAHARAJ",
        text: "Wisdom tells me I am nothing. Love tells me I am everything. Between the two my life flows. Hold both truths as you work today—humble yet confident, limited yet capable.",
        attribution: "I Am That",
        theme: "paradox",
        tags: ["any-day"]
    },
    {
        id: 42,
        headline: "BHAGAVAD GITA 2:71",
        text: "विहाय कामान्यः सर्वान् - One who has given up all desires for sense gratification attains peace. Not that you must abandon work, but abandon anxious attachment to its fruits.",
        attribution: "Bhagavad Gita 2:71",
        theme: "peace",
        tags: ["anxiety", "any-day"]
    },
    {
        id: 43,
        headline: "YOGA VASISHTA",
        text: "The mind is the cause of bondage and liberation. When attached to objects, it binds; when detached, it liberates. Free your mind from anxious clinging today. Work with inner freedom.",
        attribution: "Yoga Vasishta 6.1",
        theme: "freedom",
        tags: ["anxiety", "any-day"]
    },
    {
        id: 44,
        headline: "BHAGAVAD GITA 17:15",
        text: "अनुद्वेगकरं वाक्यं - Words that do not cause distress, that are truthful, pleasant, and beneficial—this is the austerity of speech. Let your communication today reflect these qualities.",
        attribution: "Bhagavad Gita 17:15",
        theme: "speech",
        tags: ["any-day"]
    },
    {
        id: 45,
        headline: "SADHGURU",
        text: "If you resist change, you resist life. Your work today will not unfold exactly as planned. Adapt. Flow. Resistance creates suffering; acceptance creates possibility.",
        attribution: "Inner Engineering",
        theme: "acceptance",
        tags: ["any-day", "anxiety"]
    },
    {
        id: 46,
        headline: "BHAGAVAD GITA 6:19",
        text: "यथा दीपो निवातस्थः - As a lamp in a windless place does not flicker, so the disciplined mind of a yogi remains steady in meditation. Cultivate this steadiness in your work today.",
        attribution: "Bhagavad Gita 6:19",
        theme: "steadiness",
        tags: ["focus", "any-day"]
    },
    {
        id: 47,
        headline: "CHANDOGYA UPANISHAD",
        text: "तत्त्वमसि श्वेतकेतो - You are That, O Svetaketu. Your true nature is divine. Let this awareness elevate your work today. You are not just doing tasks—you are expressing the divine through action.",
        attribution: "Chandogya Upanishad 6.9.4",
        theme: "identity",
        tags: ["any-day", "meaning"]
    },
    {
        id: 48,
        headline: "BHAGAVAD GITA 11:33",
        text: "तस्मात्त्वमुत्तिष्ठ - Therefore arise and attain glory. Conquer your enemies and enjoy a prosperous kingdom. These warriors stand already slain by Me. Be merely an instrument. Your work today is part of a larger plan.",
        attribution: "Bhagavad Gita 11:33",
        theme: "instrument",
        tags: ["any-day"]
    },
    {
        id: 49,
        headline: "SWAMI RAMA",
        text: "Meditation is not a way of making your mind quiet. It is a way of entering into the quiet that is already there. Before you work, find the stillness within. Act from that center.",
        attribution: "Living with the Himalayan Masters",
        theme: "stillness",
        tags: ["morning", "any-day"]
    },
    {
        id: 50,
        headline: "BHAGAVAD GITA 18:46",
        text: "यतः प्रवृत्तिर्भूतानां - By performing one's own duty, one worships the Creator from whom all beings originate. Your work today is worship when done with devotion and integrity.",
        attribution: "Bhagavad Gita 18:46",
        theme: "worship",
        tags: ["any-day", "meaning"]
    }
];

// Export for use in app
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { REFLECTIONS_HINDU };
}
