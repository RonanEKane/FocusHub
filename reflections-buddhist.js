// ============================================
// BUDDHIST REFLECTIONS - DHAMMAPADA, ZEN, TEACHERS
// 50 Reflections with Pali + English for Key Verses
// ============================================

const REFLECTIONS_BUDDHIST = [
    {
        id: 1,
        headline: "DHAMMAPADA 1:1",
        text: "Manopubbaṅgamā dhammā - All that we are is the result of what we have thought. The mind is everything. What you think, you become. Your work today shapes tomorrow's reality.",
        attribution: "Dhammapada 1:1",
        theme: "mind",
        tags: ["any-day", "foundation"]
    },
    {
        id: 2,
        headline: "THÍCH NHẤT HẠNH",
        text: "The present moment is the only moment available to us, and it is the door to all moments. Your work today does not exist in the future. It exists right here, right now. Be fully present.",
        attribution: "The Miracle of Mindfulness",
        theme: "presence",
        tags: ["any-day", "distraction-prone"]
    },
    {
        id: 3,
        headline: "DHAMMAPADA 8:103",
        text: "Attā have jitaṁ seyyo - Though one may conquer a thousand times a thousand men in battle, yet he who conquers himself is the greatest warrior. Your battle today is with your own resistance.",
        attribution: "Dhammapada 8:103",
        theme: "selfmastery",
        tags: ["procrastination", "any-day"]
    },
    {
        id: 4,
        headline: "SHUNRYU SUZUKI",
        text: "In the beginner's mind there are many possibilities, but in the expert's there are few. Approach your work today with fresh eyes. Expertise can blind. Curiosity opens.",
        attribution: "Zen Mind, Beginner's Mind",
        theme: "openness",
        tags: ["any-day"]
    },
    {
        id: 5,
        headline: "DHAMMAPADA 20:276",
        text: "Tumhehi kiccam ātappaṁ - You yourself must make the effort. The Buddhas only point the way. No one can do your work for you. Begin.",
        attribution: "Dhammapada 20:276",
        theme: "effort",
        tags: ["any-day", "procrastination"]
    },
    {
        id: 6,
        headline: "DALAI LAMA",
        text: "If you think you are too small to make a difference, try sleeping with a mosquito. Your work today matters, even when it feels insignificant. Small actions compound.",
        attribution: "The Art of Happiness",
        theme: "impact",
        tags: ["any-day", "meaning"]
    },
    {
        id: 7,
        headline: "DHAMMAPADA 1:2",
        text: "Manasā ce paduṭṭhena - If a man speaks or acts with an impure mind, suffering follows him as the wheel follows the ox. Your intentions shape outcomes. Work with right intention today.",
        attribution: "Dhammapada 1:2",
        theme: "intention",
        tags: ["any-day", "meaning"]
    },
    {
        id: 8,
        headline: "PEMA CHÖDRÖN",
        text: "The most fundamental aggression to ourselves is to remain ignorant by not having the courage to look at ourselves honestly. Face your resistance today. Avoidance strengthens it.",
        attribution: "When Things Fall Apart",
        theme: "courage",
        tags: ["any-day", "procrastination"]
    },
    {
        id: 9,
        headline: "DHAMMAPADA 12:165",
        text: "Attanā hi kataṁ pāpaṁ - By oneself is evil done, by oneself is one defiled. By oneself is evil left undone, by oneself is one purified. You alone control your effort today.",
        attribution: "Dhammapada 12:165",
        theme: "responsibility",
        tags: ["any-day"]
    },
    {
        id: 10,
        headline: "ZEN TEACHING",
        text: "Before enlightenment: chop wood, carry water. After enlightenment: chop wood, carry water. The tasks remain the same. What changes is your presence within them. Do your work with full attention today.",
        attribution: "Zen Proverb",
        theme: "mindfulness",
        tags: ["any-day", "meaning"]
    },
    {
        id: 11,
        headline: "DHAMMAPADA 5:60",
        text: "Dīghā jāgarato ratti - Long is the night to the wakeful, long is the journey to the weary. Stop resisting. Accept what must be done. Resistance multiplies suffering.",
        attribution: "Dhammapada 5:60",
        theme: "acceptance",
        tags: ["low-energy", "any-day"]
    },
    {
        id: 12,
        headline: "AJAHN CHAH",
        text: "If you let go a little, you will have a little peace. If you let go a lot, you will have a lot of peace. Release your grip on outcomes today. Do the work, surrender the results.",
        attribution: "No Ajahn Chah",
        theme: "letting-go",
        tags: ["anxiety", "any-day"]
    },
    {
        id: 13,
        headline: "DHAMMAPADA 2:21",
        text: "Appamādo amatapadaṁ - Mindfulness is the path to the deathless. Heedlessness is the path to death. Work with full attention today. Distraction wastes life itself.",
        attribution: "Dhammapada 2:21",
        theme: "mindfulness",
        tags: ["adhd", "distraction-prone"]
    },
    {
        id: 14,
        headline: "JACK KORNFIELD",
        text: "In the end, just three things matter: How well we have lived, how well we have loved, how well we have learned to let go. Your work today should serve these three. Nothing more is needed.",
        attribution: "A Path with Heart",
        theme: "essence",
        tags: ["any-day", "meaning"]
    },
    {
        id: 15,
        headline: "DHAMMAPADA 10:129",
        text: "Sabbe tasanti daṇḍassa - All tremble at violence, all fear death. Comparing oneself with others, one should neither kill nor cause others to kill. Compassion begins with yourself. Do not punish yourself for imperfection today.",
        attribution: "Dhammapada 10:129",
        theme: "compassion",
        tags: ["perfectionism", "compassion"]
    },
    {
        id: 16,
        headline: "BUDDHIST TEACHING",
        text: "Pain is inevitable. Suffering is optional. Discomfort in your work today is unavoidable. But the story you tell yourself about it—that creates suffering or peace. Choose your narrative.",
        attribution: "Buddhist Wisdom",
        theme: "suffering",
        tags: ["low-energy", "any-day"]
    },
    {
        id: 17,
        headline: "DHAMMAPADA 6:76",
        text: "Nidhīnaṁva pavattāraṁ - If you see a wise man who tells you where true treasures are to be found, who shows errors and points out what is right, follow such a wise person. Your mentors guide, but you must walk the path.",
        attribution: "Dhammapada 6:76",
        theme: "guidance",
        tags: ["any-day"]
    },
    {
        id: 18,
        headline: "SHARON SALZBERG",
        text: "Mindfulness isn't difficult. We just need to remember to do it. Return your attention to the present task. Then return again. And again. This is the practice.",
        attribution: "Real Happiness",
        theme: "practice",
        tags: ["adhd", "any-day"]
    },
    {
        id: 19,
        headline: "DHAMMAPADA 20:290",
        text: "Mattāsukhapariccāgā - By forsaking a lesser happiness, one may behold a greater one. Immediate comfort tempts. Meaningful work requires sacrifice. Choose the greater happiness today.",
        attribution: "Dhammapada 20:290",
        theme: "sacrifice",
        tags: ["procrastination", "any-day"]
    },
    {
        id: 20,
        headline: "DŌGEN ZENJI",
        text: "To study the Buddha Way is to study the self. To study the self is to forget the self. To forget the self is to be actualized by myriad things. Lose yourself in your work today. Ego dissolves in right action.",
        attribution: "Genjōkōan",
        theme: "selflessness",
        tags: ["any-day", "meaning"]
    },
    {
        id: 21,
        headline: "DHAMMAPADA 3:33",
        text: "Phandanaṁ capalaṁ cittaṁ - The mind is restless, unsteady, hard to guard, hard to control. The wise one straightens it as a fletcher straightens an arrow. Your wandering mind can be trained. Begin the training today.",
        attribution: "Dhammapada 3:33",
        theme: "discipline",
        tags: ["adhd", "distraction-prone"]
    },
    {
        id: 22,
        headline: "JOSEPH GOLDSTEIN",
        text: "Mindfulness is the aware, balanced acceptance of present experience. It isn't more complicated than that. Stop judging your work. Simply do it with full attention.",
        attribution: "Mindfulness",
        theme: "acceptance",
        tags: ["any-day", "perfectionism"]
    },
    {
        id: 23,
        headline: "DHAMMAPADA 12:157",
        text: "Attānañce piyaṁ jaññā - If one holds oneself dear, one should protect oneself well. Care for yourself today. Rest when needed. Push when possible. Wisdom discerns the difference.",
        attribution: "Dhammapada 12:157",
        theme: "selfcare",
        tags: ["low-energy", "compassion"]
    },
    {
        id: 24,
        headline: "CHÖGYAM TRUNGPA",
        text: "The bad news is you're falling through the air with no parachute. The good news is there's no ground. Your anxiety about failure assumes a final destination. There is none. Only continuous becoming. Work freely today.",
        attribution: "Cutting Through Spiritual Materialism",
        theme: "groundlessness",
        tags: ["anxiety", "any-day"]
    },
    {
        id: 25,
        headline: "DHAMMAPADA 1:5",
        text: "Na hi verena verāni - Hatred is never appeased by hatred. By non-hatred alone is hatred appeased. When frustrated with your work today, respond with patience, not anger. Aggression toward yourself accomplishes nothing.",
        attribution: "Dhammapada 1:5",
        theme: "patience",
        tags: ["compassion", "any-day"]
    },
    {
        id: 26,
        headline: "ALAN WATTS",
        text: "Muddy water is best cleared by leaving it alone. When your mind is cluttered, forcing clarity creates more confusion. Begin your work despite mental fog. Action brings clarity, not vice versa.",
        attribution: "The Wisdom of Insecurity",
        theme: "clarity",
        tags: ["any-day", "procrastination"]
    },
    {
        id: 27,
        headline: "DHAMMAPADA 21:290",
        text: "Yathā agāraṁ succhannaṁ - Just as rain breaks through an ill-thatched house, so passion breaks through an unreflecting mind. Discipline your attention today. Unchecked, it will wander to comfort.",
        attribution: "Dhammapada 21:290",
        theme: "attention",
        tags: ["distraction-prone", "any-day"]
    },
    {
        id: 28,
        headline: "MINGYUR RINPOCHE",
        text: "The true source of happiness is within. Not from your work, not from your achievements. But cultivating inner peace doesn't mean abandoning work. It means working without desperate clinging.",
        attribution: "The Joy of Living",
        theme: "happiness",
        tags: ["any-day", "meaning"]
    },
    {
        id: 29,
        headline: "DHAMMAPADA 24:348",
        text: "Sabbadānaṁ dhammadānaṁ - The gift of Dhamma exceeds all gifts. The taste of Dhamma exceeds all tastes. Your greatest contribution today is not what you produce but who you become in producing it.",
        attribution: "Dhammapada 24:348",
        theme: "contribution",
        tags: ["any-day", "meaning"]
    },
    {
        id: 30,
        headline: "TARA BRACH",
        text: "Perhaps the biggest tragedy in our lives is that freedom is possible, yet we can pass our years trapped in the same old patterns. Your work today is an opportunity to break free. Or to repeat. Choose.",
        attribution: "Radical Acceptance",
        theme: "freedom",
        tags: ["any-day", "fresh-start"]
    },
    {
        id: 31,
        headline: "DHAMMAPADA 13:183",
        text: "Sabbapāpassa akaraṇaṁ - To avoid all evil, to cultivate good, and to cleanse one's mind—this is the teaching of the Buddhas. Apply this to your work: avoid shortcuts, cultivate excellence, maintain right intention.",
        attribution: "Dhammapada 13:183",
        theme: "ethics",
        tags: ["any-day", "foundation"]
    },
    {
        id: 32,
        headline: "SUZUKI ROSHI",
        text: "Each of you is perfect the way you are... and you can use a little improvement. Accept yourself today while simultaneously committing to better. This paradox is wisdom.",
        attribution: "Zen Mind, Beginner's Mind",
        theme: "paradox",
        tags: ["perfectionism", "compassion"]
    },
    {
        id: 33,
        headline: "DHAMMAPADA 25:360",
        text: "Sukhakāmāni bhūtāni - All beings desire happiness. All fear pain. Recognizing this, act with compassion—toward others and toward yourself. Work hard today, but kindly.",
        attribution: "Dhammapada 25:360",
        theme: "compassion",
        tags: ["any-day", "compassion"]
    },
    {
        id: 34,
        headline: "MATTHIEU RICARD",
        text: "Happiness is not a succession of pleasures but a way of being. Your work today cannot make you lastingly happy. But the way you approach it—with mindfulness and compassion—can.",
        attribution: "Happiness",
        theme: "approach",
        tags: ["any-day"]
    },
    {
        id: 35,
        headline: "DHAMMAPADA 2:25",
        text: "Uṭṭhānenappamādena - By endeavor, by mindfulness, by restraint and self-control, the wise one makes for himself an island which no flood can overwhelm. Build your foundation today through consistent effort.",
        attribution: "Dhammapada 2:25",
        theme: "foundation",
        tags: ["any-day", "discipline"]
    },
    {
        id: 36,
        headline: "YONGEY MINGYUR RINPOCHE",
        text: "We may not always be able to change our external circumstances, but we can change our relationship to them. Your work today may be difficult. But suffering is optional. Choose your relationship to difficulty.",
        attribution: "Joyful Wisdom",
        theme: "relationship",
        tags: ["low-energy", "any-day"]
    },
    {
        id: 37,
        headline: "DHAMMAPADA 10:145",
        text: "Natthi puttasamā pema - There is no satisfying lust, not even with a shower of gold coins. Brief pleasures bring suffering and little joy. The wise one sees this. True satisfaction comes from right action.",
        attribution: "Dhammapada 10:145",
        theme: "satisfaction",
        tags: ["any-day"]
    },
    {
        id: 38,
        headline: "PEMA CHÖDRÖN",
        text: "Nothing ever goes away until it has taught us what we need to know. The challenge you face today will recur until you face it. Stop avoiding. Begin learning.",
        attribution: "When Things Fall Apart",
        theme: "learning",
        tags: ["any-day", "procrastination"]
    },
    {
        id: 39,
        headline: "DHAMMAPADA 8:100",
        text: "Sahassam api ce vācā - Though one should speak a thousand words, but they are senseless and unconnected with the goal, better is one word of sense which, if a man hears, he becomes calm. Less planning. More action.",
        attribution: "Dhammapada 8:100",
        theme: "action",
        tags: ["procrastination", "any-day"]
    },
    {
        id: 40,
        headline: "BODHIDHARMA",
        text: "Not thinking about anything is Zen. Once you know this, walking, standing, sitting, or lying down, everything you do is Zen. Your work today is meditation when done with full presence.",
        attribution: "The Zen Teaching of Bodhidharma",
        theme: "zen",
        tags: ["any-day", "meaning"]
    },
    {
        id: 41,
        headline: "DHAMMAPADA 5:61",
        text: "Na bhaje pāpake mitte - Associate not with evil friends, nor with the low. Associate with good friends, associate with noble friends. Choose influences that support your highest work today.",
        attribution: "Dhammapada 5:61",
        theme: "association",
        tags: ["any-day"]
    },
    {
        id: 42,
        headline: "JACK KORNFIELD",
        text: "The trouble is, you think you have time. You don't. This day will not return. These hours, once passed, are gone forever. Treat them accordingly.",
        attribution: "Buddha's Little Instruction Book",
        theme: "urgency",
        tags: ["procrastination", "any-day"]
    },
    {
        id: 43,
        headline: "DHAMMAPADA 20:277",
        text: "Sabbe saṅkhārā aniccā - All conditioned things are impermanent. When you see this with wisdom, one turns away from suffering. Your current difficulty is temporary. This knowledge brings freedom to act despite discomfort.",
        attribution: "Dhammapada 20:277",
        theme: "impermanence",
        tags: ["low-energy", "any-day"]
    },
    {
        id: 44,
        headline: "AJAHN SUMEDHO",
        text: "The experience of suffering is the First Noble Truth, which is awakening. Most people avoid suffering. But avoiding it is what perpetuates it. Face your work's difficulty today. Liberation lies within, not beyond.",
        attribution: "The Mind and the Way",
        theme: "suffering",
        tags: ["any-day", "procrastination"]
    },
    {
        id: 45,
        headline: "DHAMMAPADA 14:197",
        text: "Susukhaṁ vata jīvāma - Happy indeed we live, we who possess nothing. We shall feed on joy, like radiant gods. Your attachment to outcomes creates anxiety. Work with detachment today. Joy follows.",
        attribution: "Dhammapada 14:197",
        theme: "detachment",
        tags: ["anxiety", "any-day"]
    },
    {
        id: 46,
        headline: "SOGYAL RINPOCHE",
        text: "The purpose of reflection is to find something you can apply directly in your life. Contemplation alone accomplishes nothing. Today, embody what you understand. Live it through work.",
        attribution: "The Tibetan Book of Living and Dying",
        theme: "embodiment",
        tags: ["any-day"]
    },
    {
        id: 47,
        headline: "DHAMMAPADA 9:116",
        text: "Abhittharetha kalyāṇe - Make haste in doing good. If one delays, the mind delights in evil. Your impulse toward right action fades quickly. When you know what needs doing, do it immediately.",
        attribution: "Dhammapada 9:116",
        theme: "immediacy",
        tags: ["procrastination", "any-day"]
    },
    {
        id: 48,
        headline: "TENZIN PALMO",
        text: "We need to stop being so possessive. Everything is flowing. Nothing stays the same. Your current project, your current struggle—these too shall pass. Work with this awareness. Hold lightly.",
        attribution: "Reflections on a Mountain Lake",
        theme: "flow",
        tags: ["anxiety", "any-day"]
    },
    {
        id: 49,
        headline: "DHAMMAPADA 26:383",
        text: "Chinda sotaṁ parakkamma - Cut down the whole forest of desire, not just one tree. From the forest of desire, anxieties are born. Today, address root causes, not symptoms. Deep work requires deep attention.",
        attribution: "Dhammapada 26:383",
        theme: "root-cause",
        tags: ["any-day", "distraction-prone"]
    },
    {
        id: 50,
        headline: "RUMI (SUFI-BUDDHIST WISDOM)",
        text: "Let yourself be silently drawn by the strange pull of what you really love. It will not lead you astray. Your deepest work calls to you. Stop resisting the call. Begin today.",
        attribution: "The Essential Rumi",
        theme: "calling",
        tags: ["any-day", "meaning"]
    }
];

// Export for use in app
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { REFLECTIONS_BUDDHIST };
}
