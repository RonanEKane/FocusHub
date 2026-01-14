// ============================================
// ISLAMIC REFLECTIONS - QURAN, HADITH, SCHOLARS
// 50 Reflections with Arabic + English for Key Verses
// ============================================

const REFLECTIONS_ISLAMIC = [
    {
        id: 1,
        headline: "QURAN 94:5-6",
        text: "إِنَّ مَعَ الْعُسْرِ يُسْرًا - Indeed, with hardship comes ease. With every difficulty, relief follows. Your struggle today precedes your breakthrough. Persevere.",
        attribution: "Quran 94:5-6",
        theme: "relief",
        tags: ["low-energy", "any-day"]
    },
    {
        id: 2,
        headline: "RUMI",
        text: "Let yourself be silently drawn by the strange pull of what you really love. It will not lead you astray. Your heart knows what work matters. Listen to it today.",
        attribution: "The Essential Rumi",
        theme: "calling",
        tags: ["any-day", "meaning"]
    },
    {
        id: 3,
        headline: "QURAN 13:11",
        text: "إِنَّ اللَّهَ لَا يُغَيِّرُ مَا بِقَوْمٍ حَتَّىٰ يُغَيِّرُوا مَا بِأَنفُسِهِمْ - Allah does not change the condition of a people until they change what is in themselves. Your transformation begins with today's choices.",
        attribution: "Quran 13:11",
        theme: "change",
        tags: ["any-day", "fresh-start"]
    },
    {
        id: 4,
        headline: "HADITH - SAHIH MUSLIM",
        text: "The strong person is not one who can overpower others. Rather, the strong person is one who controls himself when angry. Discipline your impulses today. Self-mastery is true strength.",
        attribution: "Hadith, Sahih Muslim",
        theme: "self-control",
        tags: ["any-day", "discipline"]
    },
    {
        id: 5,
        headline: "QURAN 2:286",
        text: "لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا - Allah does not burden a soul beyond what it can bear. You have the capacity for today's work. Trust this. Do not underestimate yourself.",
        attribution: "Quran 2:286",
        theme: "capacity",
        tags: ["anxiety", "any-day"]
    },
    {
        id: 6,
        headline: "IMAM AL-GHAZALI",
        text: "Knowledge without action is vanity, and action without knowledge is insanity. Your understanding means nothing without implementation. Apply what you know through your work today.",
        attribution: "The Alchemy of Happiness",
        theme: "application",
        tags: ["procrastination", "any-day"]
    },
    {
        id: 7,
        headline: "QURAN 3:159",
        text: "فَاعْفُ عَنْهُمْ وَاسْتَغْفِرْ لَهُمْ - Pardon them and ask forgiveness for them. Extend to yourself the mercy you extend to others. Forgive your imperfections today and continue forward.",
        attribution: "Quran 3:159",
        theme: "forgiveness",
        tags: ["compassion", "recovering"]
    },
    {
        id: 8,
        headline: "HADITH - TIRMIDHI",
        text: "The best of people are those who are most beneficial to people. Your work today should serve others. Service elevates mere effort into meaningful contribution.",
        attribution: "Hadith, Tirmidhi",
        theme: "service",
        tags: ["any-day", "meaning"]
    },
    {
        id: 9,
        headline: "QURAN 29:69",
        text: "وَالَّذِينَ جَاهَدُوا فِينَا لَنَهْدِيَنَّهُمْ سُبُلَنَا - Those who strive for Us, We will surely guide them to Our ways. Your sincere effort today invites divine guidance. Strive, and assistance will come.",
        attribution: "Quran 29:69",
        theme: "guidance",
        tags: ["any-day"]
    },
    {
        id: 10,
        headline: "IBN QAYYIM AL-JAWZIYYAH",
        text: "The heart is like a bird: love is its head, and fear and hope are its two wings. When the head and wings are sound, the bird flies gracefully. Balance love of your work with healthy concern for excellence.",
        attribution: "Madārij al-Sālikīn",
        theme: "balance",
        tags: ["any-day"]
    },
    {
        id: 11,
        headline: "QURAN 65:3",
        text: "وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ - Whoever relies upon Allah, He will be sufficient for him. Do your work today, then release anxiety about outcomes. Divine sufficiency covers what your effort cannot.",
        attribution: "Quran 65:3",
        theme: "reliance",
        tags: ["anxiety", "any-day"]
    },
    {
        id: 12,
        headline: "HADITH - BUKHARI",
        text: "None of you truly believes until he loves for his brother what he loves for himself. Approach your work with generosity. What you create should benefit others as it benefits you.",
        attribution: "Hadith, Sahih Bukhari",
        theme: "generosity",
        tags: ["any-day", "meaning"]
    },
    {
        id: 13,
        headline: "QURAN 94:7-8",
        text: "فَإِذَا فَرَغْتَ فَانصَبْ - So when you have finished, then stand up for worship. And to your Lord direct your longing. Complete today's work, then rest. Effort and renewal alternate.",
        attribution: "Quran 94:7-8",
        theme: "rhythm",
        tags: ["any-day"]
    },
    {
        id: 14,
        headline: "RUMI",
        text: "Why do you stay in prison when the door is so wide open? Your resistance imprisons you. The work before you is your liberation. Walk through the door. Begin.",
        attribution: "The Essential Rumi",
        theme: "freedom",
        tags: ["procrastination", "any-day"]
    },
    {
        id: 15,
        headline: "QURAN 16:97",
        text: "مَنْ عَمِلَ صَالِحًا مِّن ذَكَرٍ أَوْ أُنثَىٰ - Whoever does righteousness, whether male or female, while a believer, We will surely give them a good life. Righteous work creates a good life. Focus on integrity today.",
        attribution: "Quran 16:97",
        theme: "righteousness",
        tags: ["any-day", "foundation"]
    },
    {
        id: 16,
        headline: "HADITH - MUSLIM",
        text: "If the Hour comes while one of you has a palm shoot in his hand, let him plant it. Even if you perceive the end is near, continue your work. Meaningful action never wastes.",
        attribution: "Hadith, Musnad Ahmad",
        theme: "persistence",
        tags: ["any-day", "long-streak"]
    },
    {
        id: 17,
        headline: "QURAN 11:115",
        text: "وَاصْبِرْ فَإِنَّ اللَّهَ لَا يُضِيعُ أَجْرَ الْمُحْسِنِينَ - Be patient, for indeed Allah does not allow the reward of the doers of good to be lost. Your effort today will be rewarded, even when results are delayed.",
        attribution: "Quran 11:115",
        theme: "patience",
        tags: ["any-day", "recovering"]
    },
    {
        id: 18,
        headline: "IBN ARABI",
        text: "Do not attach yourself to any particular creed exclusively, so that you disbelieve in all the rest. Open yourself to the truth in all its forms. Approach your work with intellectual humility today.",
        attribution: "Tarjuman al-Ashwaq",
        theme: "openness",
        tags: ["any-day"]
    },
    {
        id: 19,
        headline: "QURAN 3:200",
        text: "يَا أَيُّهَا الَّذِينَ آمَنُوا اصْبِرُوا وَصَابِرُوا - O you who have believed, persevere and endure. Outdo others in endurance. The task that tests you today strengthens you for tomorrow.",
        attribution: "Quran 3:200",
        theme: "endurance",
        tags: ["low-energy", "any-day"]
    },
    {
        id: 20,
        headline: "HADITH - BUKHARI",
        text: "The deeds most loved by Allah are those done regularly, even if they are small. Consistency defeats intensity. Small daily effort compounds. Begin today's increment.",
        attribution: "Hadith, Sahih Bukhari",
        theme: "consistency",
        tags: ["any-day", "long-streak"]
    },
    {
        id: 21,
        headline: "QURAN 20:114",
        text: "وَقُل رَّبِّ زِدْنِي عِلْمًا - Say: My Lord, increase me in knowledge. Approach your work as learning today. Every task teaches. Every challenge instructs.",
        attribution: "Quran 20:114",
        theme: "learning",
        tags: ["any-day"]
    },
    {
        id: 22,
        headline: "IMAM MALIK",
        text: "Knowledge is not acquired by much narration. Rather, it is a light that Allah places in the heart. Intellectual understanding alone accomplishes nothing. Embody wisdom through action today.",
        attribution: "Al-Muwatta",
        theme: "embodiment",
        tags: ["any-day"]
    },
    {
        id: 23,
        headline: "QURAN 2:155",
        text: "وَلَنَبْلُوَنَّكُم بِشَيْءٍ مِّنَ الْخَوْفِ وَالْجُوعِ - We will surely test you with something of fear and hunger. Difficulty is inevitable. Your response to it determines everything. Choose courage today.",
        attribution: "Quran 2:155",
        theme: "testing",
        tags: ["low-energy", "any-day"]
    },
    {
        id: 24,
        headline: "RUMI",
        text: "Yesterday I was clever, so I wanted to change the world. Today I am wise, so I am changing myself. Your work today is self-transformation. External results follow internal change.",
        attribution: "The Essential Rumi",
        theme: "wisdom",
        tags: ["any-day"]
    },
    {
        id: 25,
        headline: "QURAN 39:10",
        text: "إِنَّمَا يُوَفَّى الصَّابِرُونَ أَجْرَهُم بِغَيْرِ حِسَابٍ - Indeed, the patient will be given their reward without account. Your sustained effort today may seem unrewarded now. Trust the process. Abundance comes.",
        attribution: "Quran 39:10",
        theme: "reward",
        tags: ["any-day", "long-streak"]
    },
    {
        id: 26,
        headline: "HADITH - TIRMIDHI",
        text: "Richness is not having many possessions, but richness is contentment of the soul. Your satisfaction today comes not from what you accomplish but from inner peace while working.",
        attribution: "Hadith, Tirmidhi",
        theme: "contentment",
        tags: ["any-day"]
    },
    {
        id: 27,
        headline: "QURAN 8:46",
        text: "وَأَطِيعُوا اللَّهَ وَرَسُولَهُ وَلَا تَنَازَعُوا - Obey Allah and His Messenger, and do not dispute. Internal conflict drains energy. Commit fully to today's work. Wholehearted action defeats half-hearted indecision.",
        attribution: "Quran 8:46",
        theme: "commitment",
        tags: ["any-day", "procrastination"]
    },
    {
        id: 28,
        headline: "AL-GHAZALI",
        text: "Declare your jihad on thirteen enemies: your ego, arrogance, conceit, selfishness, greed, lust, intolerance, anger, lying, cheating, gossiping, slandering, and disrespecting parents. Your greatest work today is internal.",
        attribution: "Revival of Religious Sciences",
        theme: "inner-work",
        tags: ["any-day", "foundation"]
    },
    {
        id: 29,
        headline: "QURAN 99:7-8",
        text: "فَمَن يَعْمَلْ مِثْقَالَ ذَرَّةٍ خَيْرًا يَرَهُ - Whoever does an atom's weight of good will see it. No effort is too small. Everything counts. Today's seemingly minor tasks accumulate into significance.",
        attribution: "Quran 99:7-8",
        theme: "accumulation",
        tags: ["any-day"]
    },
    {
        id: 30,
        headline: "HADITH - MUSLIM",
        text: "Allah does not look at your forms or wealth, but He looks at your hearts and deeds. Your intention matters more than appearance. Work with pure heart today, regardless of recognition.",
        attribution: "Hadith, Sahih Muslim",
        theme: "intention",
        tags: ["any-day", "meaning"]
    },
    {
        id: 31,
        headline: "QURAN 28:77",
        text: "وَأَحْسِن كَمَا أَحْسَنَ اللَّهُ إِلَيْكَ - Do good as Allah has done good to you. You have received countless blessings. Return excellence to the world through your work today.",
        attribution: "Quran 28:77",
        theme: "excellence",
        tags: ["any-day"]
    },
    {
        id: 32,
        headline: "RUMI",
        text: "Don't grieve. Anything you lose comes round in another form. Your perceived failures today are transformations, not endings. Trust the process of becoming.",
        attribution: "The Essential Rumi",
        theme: "transformation",
        tags: ["recovering", "compassion"]
    },
    {
        id: 33,
        headline: "QURAN 18:110",
        text: "فَمَن كَانَ يَرْجُو لِقَاءَ رَبِّهِ فَلْيَعْمَلْ عَمَلًا صَالِحًا - Whoever hopes to meet his Lord, let him do righteous deeds. Work today as if it will be examined in eternity. This perspective elevates every action.",
        attribution: "Quran 18:110",
        theme: "perspective",
        tags: ["any-day", "meaning"]
    },
    {
        id: 34,
        headline: "HADITH - ABU DAWUD",
        text: "The one who shows no mercy will be shown no mercy. Extend compassion to yourself today. Your harsh self-judgment accomplishes nothing. Work with kindness toward yourself.",
        attribution: "Hadith, Sunan Abu Dawud",
        theme: "mercy",
        tags: ["compassion", "perfectionism"]
    },
    {
        id: 35,
        headline: "QURAN 42:30",
        text: "وَمَا أَصَابَكُم مِّن مُّصِيبَةٍ فَبِمَا كَسَبَتْ أَيْدِيكُمْ - Whatever strikes you of disaster is for what your hands have earned. Take responsibility for outcomes today. Ownership empowers change.",
        attribution: "Quran 42:30",
        theme: "responsibility",
        tags: ["any-day"]
    },
    {
        id: 36,
        headline: "PROPHET MUHAMMAD (PBUH)",
        text: "Tie your camel first, then trust in Allah. Faith without action is incomplete. Do your work today with full effort, then trust divine wisdom for the outcome.",
        attribution: "Hadith, Tirmidhi",
        theme: "action-trust",
        tags: ["any-day"]
    },
    {
        id: 37,
        headline: "QURAN 9:105",
        text: "وَقُلِ اعْمَلُوا فَسَيَرَى اللَّهُ عَمَلَكُمْ - Say: Do as you will, for Allah will see your deeds. Work today knowing your effort is witnessed. This awareness transforms ordinary action into worship.",
        attribution: "Quran 9:105",
        theme: "witnessing",
        tags: ["any-day", "meaning"]
    },
    {
        id: 38,
        headline: "RABIA AL-ADAWIYYA",
        text: "O my Lord, if I worship You from fear of Hell, burn me in Hell. If I worship You from hope of Paradise, bar me from it. But if I worship You for Yourself alone, do not withhold from me Your eternal beauty. Work for love of the work today, not for reward.",
        attribution: "Sufi Teaching",
        theme: "pure-motive",
        tags: ["any-day", "meaning"]
    },
    {
        id: 39,
        headline: "QURAN 103:1-3",
        text: "وَالْعَصْرِ إِنَّ الْإِنسَانَ لَفِي خُسْرٍ - By time, indeed mankind is in loss. Except for those who believe and do righteous deeds. Time is your most precious resource. Use today wisely.",
        attribution: "Quran 103:1-3",
        theme: "time",
        tags: ["procrastination", "any-day"]
    },
    {
        id: 40,
        headline: "HADITH - MUSLIM",
        text: "Whoever removes a worldly hardship from a believer, Allah will remove from him one of the hardships of the Day of Resurrection. Let your work today ease others' burdens. Service is sacred.",
        attribution: "Hadith, Sahih Muslim",
        theme: "service",
        tags: ["any-day", "meaning"]
    },
    {
        id: 41,
        headline: "QURAN 41:34",
        text: "ادْفَعْ بِالَّتِي هِيَ أَحْسَنُ - Repel evil with that which is better. When frustration arises in your work today, respond with patience and excellence. Good defeats evil through being better, not louder.",
        attribution: "Quran 41:34",
        theme: "response",
        tags: ["any-day", "discipline"]
    },
    {
        id: 42,
        headline: "RUMI",
        text: "What you seek is seeking you. The meaningful work you desire is also calling to you. Stop resisting the call. Answer it today through action.",
        attribution: "The Essential Rumi",
        theme: "calling",
        tags: ["any-day", "procrastination"]
    },
    {
        id: 43,
        headline: "QURAN 64:16",
        text: "فَاتَّقُوا اللَّهَ مَا اسْتَطَعْتُمْ - Fear Allah as much as you are able. Perfection is not required. Sincere effort within your capacity is. Do what you can today. This suffices.",
        attribution: "Quran 64:16",
        theme: "capacity",
        tags: ["low-energy", "compassion"]
    },
    {
        id: 44,
        headline: "HADITH - BUKHARI",
        text: "Make things easy and do not make them difficult. Cheer people up and do not push them away. Your approach to work today matters as much as the work itself. Maintain ease and joy.",
        attribution: "Hadith, Sahih Bukhari",
        theme: "ease",
        tags: ["any-day"]
    },
    {
        id: 45,
        headline: "QURAN 17:84",
        text: "قُلْ كُلٌّ يَعْمَلُ عَلَىٰ شَاكِلَتِهِ - Say: Each works according to his own manner. Your unique approach to work is valid. Do not imitate others. Find your own way today.",
        attribution: "Quran 17:84",
        theme: "authenticity",
        tags: ["any-day"]
    },
    {
        id: 46,
        headline: "IMAM SHAFI'I",
        text: "My heart is at ease knowing that what was meant for me will never miss me, and that what misses me was never meant for me. Release anxiety about outcomes today. Trust divine distribution.",
        attribution: "Diwan al-Imam al-Shafi'i",
        theme: "trust",
        tags: ["anxiety", "any-day"]
    },
    {
        id: 47,
        headline: "QURAN 29:2-3",
        text: "أَحَسِبَ النَّاسُ أَن يُتْرَكُوا أَن يَقُولُوا آمَنَّا - Do people think they will be left alone because they say: We believe? They must be tested. Your commitment today will be tested. This is how faith becomes real.",
        attribution: "Quran 29:2-3",
        theme: "testing",
        tags: ["any-day", "low-energy"]
    },
    {
        id: 48,
        headline: "HADITH - MUSLIM",
        text: "Allah is gentle and loves gentleness in all matters. Approach your work today with gentleness—toward yourself and others. Force creates resistance. Gentleness opens doors.",
        attribution: "Hadith, Sahih Muslim",
        theme: "gentleness",
        tags: ["compassion", "any-day"]
    },
    {
        id: 49,
        headline: "QURAN 39:53",
        text: "لَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ - Do not despair of the mercy of Allah. Your past failures do not define your future. Today is a new beginning. Mercy covers what effort cannot.",
        attribution: "Quran 39:53",
        theme: "hope",
        tags: ["recovering", "fresh-start"]
    },
    {
        id: 50,
        headline: "RUMI",
        text: "Let the beauty we love be what we do. There are hundreds of ways to kneel and kiss the ground. Your work today is worship when done with love. Love transforms everything.",
        attribution: "The Essential Rumi",
        theme: "love",
        tags: ["any-day", "meaning"]
    }
];

// Export for use in app
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { REFLECTIONS_ISLAMIC };
}
