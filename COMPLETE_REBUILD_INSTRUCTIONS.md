# FocusHub V4 - COMPLETE Rebuild Instructions

## CRITICAL: DO NOT CREATE NEW FILE STRUCTURE
This package contains the complete working source code. Modify these files in place.

## Package Contents

### 1. React App Source (src/ folder)
Main application - modify these files for the app features

### 2. Public Pages (public-pages/ folder)
Static HTML pages that need to be integrated:
- `index.html` - Landing/sales page with pricing tiers
- `how-to.html` - Detailed usage guide
- `faq.html` - FAQ page (needs AI support agent integration)
- `home.html` - Home page
- `app.html` - Entry point to React app
- `ronan-headshot.jpg` - Author photo for pages

## Part 1: Fix React App Layout & Features

### Required Changes to React App:

#### 1. TWO-COLUMN LAYOUT (PRIMARY FIX)
**Reference Image:** See target-layout-reference.png
- LEFT COLUMN (main content, wider): Sprint Timer, Task Command Center, Today's Wins, Progress Tracker, Reflection Insights
- RIGHT COLUMN (sidebar, ~300px): Daily Pace Ops panel (sticky)
- Currently everything is stacked in one column - needs grid layout

**Implementation in App.jsx:**
```jsx
<div className="main-content">
  <div className="left-column">
    {/* Sprint Timer, Tasks, Progress, etc */}
  </div>
  <div className="right-column sidebar-sticky">
    {/* Daily Pace Ops */}
  </div>
</div>
```

**CSS (already in index.css, may need adjustment):**
```css
.main-content {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 2rem;
}

.sidebar-sticky {
  position: sticky;
  top: 2rem;
  align-self: start;
}
```

#### 2. DRAG AND DROP - BIDIRECTIONAL
**Missing Feature:** Tasks should drag from Holding Area → Task Buckets AND back
- Use React DnD or native HTML5 drag/drop
- Tasks must move between: Holding Area ↔ Urgent Admin ↔ Deep Work ↔ Strategic Leap
- Update TaskManager.jsx with drag handlers

#### 3. HEADER BAR IMPROVEMENTS
**Current Issues:**
- Header too tall/loose
- Missing "Home" button (should link to /index.html)
- Need sticky header that shrinks on scroll

**Required:**
- Compact header: reduce padding to `padding: 1rem 2rem`
- Add Home button: `<a href="/index.html">Home</a>`
- Sticky header that shrinks on scroll with Sprint Timer visible in collapsed state

**Sticky Header Behavior:**
```javascript
// When scrolled down:
- Header shrinks to ~60px height
- Sprint timer becomes compact inline display
- Logo scales down slightly
```

#### 4. MEETING TRACKER
**Current:** Separate card/section
**Required:** Small toggle switch inside Sprint Timer card
- Just a checkbox/toggle: "In Meeting? ☐"
- No separate UI component needed
- Move logic into SprintTimer.jsx

## Part 2: Integrate Public Pages

### Page Integration Strategy

**ALL PAGES ARE ALREADY COMPLETE** in the `public-pages/` directory:
- `index.html` - Landing/sales page with pricing tiers (READY TO USE)
- `home.html` - Home page (READY TO USE)
- `how-to.html` - Complete how-to guide (READY TO USE)
- `faq.html` - FAQ page (needs AI support widget added)
- `app.html` - Entry point to React app (READY TO USE)
- `ronan-headshot.jpg` - Author photo

These are production-ready HTML files that just need to be copied to the right location for deployment.

### Deployment Steps for Public Pages

**SIMPLE COPY APPROACH (Recommended):**

After building the React app, copy all pages from `public-pages/` to the `dist/` directory:

```bash
# After npm run build
cp public-pages/*.html dist/
cp public-pages/*.jpg dist/
```

This gives you:
- `dist/index.html` - Landing page (the main entry point)
- `dist/home.html` - Home page
- `dist/app.html` - React app launcher
- `dist/how-to.html` - Complete guide
- `dist/faq.html` - FAQ (with AI support widget)
- `dist/ronan-headshot.jpg` - Author photo
- `dist/assets/` - React app build files

All pages are already complete and styled. Just copy them.

### FAQ Page - AI Support Agent

The FAQ page needs an AI-powered support chat widget. Here's what to add:

**At the bottom of faq.html, before `</body>`:**

```html
<!-- AI Support Chat Widget -->
<div class="chat-widget" id="chatWidget">
    <div class="chat-header">
        <h3>AI Support Assistant</h3>
        <button class="chat-close" onclick="toggleChat()">&times;</button>
    </div>
    <div class="chat-messages" id="chatMessages">
        <div class="chat-message bot">
            Hi! I'm the FocusHub AI assistant. Ask me anything about using the app, pricing, or features.
        </div>
    </div>
    <div class="chat-input-area">
        <input type="text" id="chatInput" placeholder="Ask a question..." />
        <button onclick="sendMessage()">Send</button>
    </div>
</div>

<button class="chat-toggle" onclick="toggleChat()">
    💬 Need Help?
</button>

<style>
.chat-widget {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 350px;
    height: 500px;
    background: #1F2937;
    border: 2px solid #2563EB;
    border-radius: 12px;
    display: none;
    flex-direction: column;
    box-shadow: 0 8px 32px rgba(0,0,0,0.3);
    z-index: 1000;
}

.chat-widget.active {
    display: flex;
}

.chat-header {
    padding: 1rem;
    background: #2563EB;
    border-radius: 10px 10px 0 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.chat-header h3 {
    font-size: 16px;
    margin: 0;
}

.chat-close {
    background: none;
    border: none;
    color: white;
    font-size: 24px;
    cursor: pointer;
}

.chat-messages {
    flex: 1;
    overflow-y: auto;
    padding: 1rem;
}

.chat-message {
    margin-bottom: 1rem;
    padding: 0.75rem;
    border-radius: 8px;
    max-width: 80%;
}

.chat-message.bot {
    background: #374151;
    margin-right: auto;
}

.chat-message.user {
    background: #2563EB;
    margin-left: auto;
}

.chat-input-area {
    padding: 1rem;
    border-top: 1px solid #374151;
    display: flex;
    gap: 0.5rem;
}

.chat-input-area input {
    flex: 1;
    padding: 0.5rem;
    background: #374151;
    border: 1px solid #4B5563;
    border-radius: 6px;
    color: white;
}

.chat-input-area button {
    padding: 0.5rem 1rem;
    background: #2563EB;
    border: none;
    border-radius: 6px;
    color: white;
    cursor: pointer;
    font-weight: 600;
}

.chat-toggle {
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 1rem 1.5rem;
    background: #2563EB;
    border: none;
    border-radius: 50px;
    color: white;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 0 4px 16px rgba(37, 99, 235, 0.4);
    z-index: 999;
}

.chat-toggle.hidden {
    display: none;
}
</style>

<script>
function toggleChat() {
    const widget = document.getElementById('chatWidget');
    const toggle = document.querySelector('.chat-toggle');
    
    widget.classList.toggle('active');
    toggle.classList.toggle('hidden');
}

async function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Add user message to chat
    const messagesDiv = document.getElementById('chatMessages');
    const userMsg = document.createElement('div');
    userMsg.className = 'chat-message user';
    userMsg.textContent = message;
    messagesDiv.appendChild(userMsg);
    
    input.value = '';
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
    
    // Call Claude API for response
    try {
        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'claude-sonnet-4-20250514',
                max_tokens: 500,
                system: 'You are a helpful support assistant for FocusHub, a productivity app for ADHD. Answer questions about features, pricing, and usage. Be concise and friendly.',
                messages: [
                    { role: 'user', content: message }
                ]
            })
        });
        
        const data = await response.json();
        const botMsg = document.createElement('div');
        botMsg.className = 'chat-message bot';
        botMsg.textContent = data.content[0].text;
        messagesDiv.appendChild(botMsg);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
        
    } catch (error) {
        const errorMsg = document.createElement('div');
        errorMsg.className = 'chat-message bot';
        errorMsg.textContent = 'Sorry, I had trouble connecting. Please try again.';
        messagesDiv.appendChild(errorMsg);
    }
}

// Send message on Enter key
document.getElementById('chatInput')?.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});
</script>
```

### Navigation Between Pages

Ensure all pages have consistent navigation:

**Standard Header Navigation:**
```html
<nav>
    <a href="/index.html">Home</a>
    <a href="/app.html">Launch App</a>
    <a href="/how-to.html">How-To Guide</a>
    <a href="/faq.html">FAQ</a>
</nav>
```

## Build Process

After making all changes:

```bash
# Install dependencies (if not already done)
npm install

# Build for production
npm run build

# Output will be in dist/ folder
```

## Deployment Structure

After build, your dist/ folder should contain:
```
dist/
├── index.html           # React app entry
├── app.html             # Redirect to React app
├── home.html            # Home page
├── how-to.html          # Guide
├── faq.html             # FAQ with AI chat
├── assets/              # Compiled JS/CSS
├── logo.svg
├── favicon.svg
└── ronan-headshot.jpg
```

## Success Criteria

When done, the complete site should:
1. ✅ React app has 2-column layout matching screenshot
2. ✅ Bidirectional drag/drop for tasks
3. ✅ Compact sticky header with Home button
4. ✅ Header shrinks on scroll showing timer
5. ✅ Meeting tracker as toggle in sprint timer
6. ✅ Landing page (index.html) with pricing tiers
7. ✅ How-To guide page
8. ✅ FAQ page with AI support chat widget
9. ✅ All navigation links work between pages
10. ✅ Build produces single dist/ folder ready to deploy

## Important Notes

- The CSS in src/index.css is already complete - focus on layout and missing features
- Don't rewrite existing CSS - it's been carefully crafted
- Public pages are standalone HTML - don't need to be converted to React
- AI chat on FAQ uses Anthropic API (already configured in the script)
- License validation is client-side placeholder - backend validation coming later
