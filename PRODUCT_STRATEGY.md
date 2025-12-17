# FocusHub V4 - Product Strategy & Page Flow

## PRODUCT VISION

**Target Audience:** Adults with ADHD and anxiety who need tactical, no-nonsense productivity support

**Core Philosophy:** "Tough-love accountability" - not gamification, not gentle therapy, but firm performance coaching for brains that wander but want to win.

**Key Differentiator:** Energy-based system that adapts to ADHD reality (time blindness, hyperfocus crashes, decision fatigue) with an AI "Agent" that provides brutal but effective feedback.

---

## USER JOURNEY & PAGE FLOW

### **Entry Point: Landing Page (index.html)**

**Purpose:** Convert visitors to users through emotional resonance + clear value prop

**Key Elements:**
- Opening hook that captures ADHD panic moments (missed deadlines, overwhelm)
- Tagline: "Built for Brains That Wander, but Still Want to Win"
- Three pricing tiers:
  - **Lite (Free Forever):** Core features, no nagging
  - **Standard ($7/mo):** + Morning reflections, streak tracking
  - **Premium ($15/mo):** + Multi-faith reflections, pattern recognition
- Social proof positioning (by Ronan E. Kane, includes author photo)
- License code entry modal for paid tiers

**Marketing Approach:** Lead with human problems, not feature lists. Use visceral scenarios ADHD brains recognize immediately.

---

### **Home Page (home.html)**

**Purpose:** Post-purchase orientation - "You made it, here's what happens next"

**Key Elements:**
- Welcome message acknowledging the struggle
- Quick overview of the system (energy levels → sprints → accountability)
- Links to How-To Guide and FAQ
- Clear path to launch the app

**Tone:** Firm but encouraging. "You bought this to get shit done, not to feel good. Let's go."

---

### **How-To Guide (how-to.html)**

**Purpose:** Comprehensive user manual with tactical instructions

**10-Step System:**
1. Choose Your Energy Level (15/20/30 min sprints)
2. Brain Dump Your Tasks (capture everything)
3. Sort Into Strategic Buckets (Urgent/Deep/Strategic)
4. Run Your Sprints (with enforced breaks)
5. Log Distractions (don't fight them, capture them)
6. Watch the Agent (your accountability GPS)
7. End Your Day & Get Graded (A-F based on output)
8. Track Your Wins (combat "I got nothing done" feeling)
9. Morning Reflection (Standard tier - spiritual direction)
10. Light/Dark Mode (practical toggle)

**Design Pattern:** Each section has a "Pro tip" callout with real ADHD-specific advice (e.g., "Be honest about energy - picking High when dragging just sets you up to fail")

**Key Feature:** Bidirectional task movement (Holding Area ↔ Buckets) - reflects ADHD brain's need to constantly re-prioritize

---

### **FAQ Page (faq.html)**

**Purpose:** Address objections, provide reassurance, enable self-service support

**Strategic FAQs:**
- "What makes this different?" → Anti-gamification, pro-scaffolding
- "Is this really for ADHD?" → Built by someone with ADHD who tried everything
- "What's the tough-love approach?" → Performance coach, not therapist
- "What are faith-grounded reflections?" → Virtue ethics + spiritual wisdom (not soft affirmations)
- "Can I use free forever?" → Yes, no nagging
- "What about privacy?" → Local storage only, no cloud tracking
- "What if I miss a day?" → No guilt spirals, just start fresh
- "How does Daily Pace GPS work?" → 1.5x buffer for ADHD reality

**NEW ADDITION: AI Support Chat Widget**
- Fixed bottom-right chat button: "💬 Need Help?"
- Popup chat using Anthropic API
- System prompt: "You are a helpful support assistant for FocusHub, a productivity app for ADHD. Answer questions about features, pricing, and usage. Be concise and friendly."
- Reduces support burden while maintaining brand voice

---

### **App Entry (app.html)**

**Purpose:** Simple launcher that loads the React app

**Function:** 
- Checks for license tier in localStorage
- Redirects to the actual React app interface
- Acts as bridge between marketing pages (static HTML) and application (React SPA)

---

### **The React App (main application)**

**Purpose:** The actual productivity OS where work happens

**Core Layout (2-Column Design):**

**LEFT COLUMN (Main Content):**
- Sprint Timer with energy selector and meeting toggle
- Task Command Center (Brain Dump + 3 Buckets + Holding Area)
- Today's Wins (completed tasks)
- Progress Tracker (historical grades)
- Reflection Insights (Standard/Premium)

**RIGHT COLUMN (Sticky Sidebar - 300px):**
- AI Agent / Daily Pace Ops
- Real-time performance coaching
- Sprint count vs target
- Pattern recognition
- Time-aware messaging

**Key Technical Decisions:**
1. **Energy-Based Timer:** 15/20/30 min options adapt to ADHD energy fluctuations
2. **Bidirectional Drag/Drop:** Tasks move freely between Holding Area and all three buckets
3. **Tough-Love Agent:** Calls out patterns (e.g., "8 distractions by noon - where's the focus?")
4. **End-of-Day Grading:** A-F based on sprints completed, tasks done, distractions logged
5. **Catholic-Focused Reflections:** Standard tier default (can be presented generically if needed)
6. **localStorage Only:** No backend, no tracking, all data client-side

---

## TECHNICAL ARCHITECTURE

### **Static Marketing Site (Public Pages)**
- Pure HTML/CSS - fast, SEO-friendly
- Self-contained styling per page
- Simple license validation (client-side)
- Easy to host on Cloudflare Pages

### **React Single Page App**
- Vite build system
- Component-based architecture
- Firebase config ready (for future features)
- localStorage for all data persistence

### **Hybrid Deployment:**
```
/index.html          ← Landing page (main entry)
/home.html           ← Post-purchase orientation
/how-to.html         ← User manual
/faq.html            ← FAQ + AI support
/app.html            ← Launches React app
/assets/             ← React build files
```

Users move from marketing pages → app seamlessly, but pages are technically separate for simplicity and performance.

---

## MONETIZATION STRATEGY

**Free Tier (Lite):** Fully functional forever
- Hooks users with complete core experience
- No feature nagging or time limits
- Acts as perpetual funnel to paid tiers

**Paid Tiers:** Value-adds, not core functionality
- **Standard ($7/mo):** Morning reflections, streak tracking
- **Premium ($15/mo):** Multi-faith options, pattern recognition

**License System:**
- Client-side validation via localStorage (Phase 1)
- Lemon Squeezy integration for payment (preferred - revenue share model)
- Backend validation coming later
- License codes: XXXX-XXXX-XXXX-XXXX format

---

## BRAND VOICE & POSITIONING

**Authored by:** Ronan E. Kane (pen name)

**Aesthetic:** Industrial/military-inspired
- Dark gaming UI
- Precision over playfulness
- Authority and discipline
- Professional logos (horizontal/vertical, normal/inverted)

**Tone:**
- Marketing pages: Human, relatable, visceral ADHD scenarios
- How-To: Tactical, directive, pro tips
- App Agent: Brutal performance coaching (but not mean)
- Reflections: Firm spiritual direction (not gentle affirmations)

**NOT:**
- Gamification (no points, badges, streaks for their own sake)
- Gentle therapeutic language
- Pastel colors or playful design
- Endless feature lists

---

## LAUNCH STRATEGY

**Free Marketing Channels:**
- Product Hunt launch
- Hacker News Show HN
- Reddit (r/ADHD, r/productivity)
- Twitter/X threads
- LinkedIn posts

**Content Strategy:**
- Lead with personal story (ADHD frustration with existing tools)
- Share visceral problem scenarios
- Position as "anti-gamification" solution
- Emphasize tough-love accountability

**Companion Product:**
- 35,000+ word ebook: "Tactical AI Productivity for ADHD"
- Military/Spec-Ops Field Manual style
- Conversation examples and prompt templates
- Published on Amazon KDP
- Cross-promotes the app

---

## FUTURE ROADMAP (Not in Current Build)

**Phase 2:**
- Backend license validation
- Real payment processing (Lemon Squeezy)
- Multi-device sync (optional - preserve privacy-first approach)

**Phase 3:**
- Premium pattern recognition features
- Multi-faith reflection options
- Historical analytics dashboard

**Phase 4:**
- Team/accountability partner features
- Export capabilities
- API for power users

---

## KEY DESIGN DECISIONS

### Why Separate Static Pages + React App?
- **Performance:** Landing page loads instantly
- **SEO:** Static HTML indexes better
- **Simplicity:** Marketing changes don't require React rebuild
- **Cost:** Easier to host, lower overhead

### Why localStorage Only?
- **Privacy:** True privacy by design, not just promise
- **ADHD-Friendly:** No account creation friction
- **Cost:** No backend, no database, no ongoing expenses
- **Trust:** Can't be hacked if there's no server

### Why Tough-Love Voice?
- **Differentiation:** Everyone else does gentle therapy
- **ADHD Reality:** Many ADHD adults respond better to firm structure
- **Authenticity:** Written by someone with ADHD who knows what works
- **Market Gap:** No one else is doing performance coaching for ADHD

### Why Energy-Based System?
- **ADHD-Specific:** Accounts for energy fluctuations throughout day
- **Adaptive:** Different sprint lengths for different states
- **Realistic:** Acknowledges you can't power through when depleted
- **Flexible:** No rigid "25 min Pomodoro" that doesn't fit

---

## SUCCESS METRICS

**User Acquisition:**
- Free tier signups (volume)
- Conversion to paid (7-15% target)
- Reddit/HN engagement

**User Retention:**
- Daily active usage
- Sprint completion rates
- Grade trends over time

**Revenue:**
- Monthly recurring revenue (MRR)
- License activations
- Ebook sales (cross-promotion)

**Product Quality:**
- Subjective user feedback
- Support ticket volume (AI chat should reduce)
- Distraction logs (dogfooding metric)

---

## COMPETITIVE POSITIONING

**vs Todoist/Things:** Not a to-do list. It's a productivity OS.

**vs Forest/Habitica:** Not gamification. It's scaffolding + accountability.

**vs Therapy Apps:** Not gentle. It's performance coaching.

**vs Notion/Obsidian:** Not a second brain. It's an execution system.

**Unique Value:** Only tool that combines ADHD-specific energy management + tough-love accountability + faith-grounded reflection in a privacy-first package.

---

This is the strategic foundation the technical implementation serves.
