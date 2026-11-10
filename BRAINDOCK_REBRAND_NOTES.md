# BrainDock rebrand + mobile fix

Drop every file in this zip into the repo root, overwriting the old ones. Nothing needs deleting first.

## What changed

**Name.** Every place a user sees "FocusHub" now says "BrainDock": page titles, meta and share tags, headers, footers, onboarding, toasts, the support chat, privacy and terms pages, and the PWA manifest.

**Logos.** All pages now use the new BrainDock files:
- `BrainDock_horiinv.svg` / `BrainDock_horinorm.svg`: horizontal, for dark / light backgrounds
- `BrainDock_vertinv.svg` / `BrainDock_vertnorm.svg`: stacked, for dark / light backgrounds
- `BrainDock_mark_inv.svg` / `BrainDock_mark_norm.svg`: the Drift In mark on its own
- `BrainDock_appicon.svg`: compact bracket on a dark tile

The dashboard and overview pages used to point at `FocusHub_horiznorm.svg` / `FocusHub_horizinv.svg`, which never existed, so their logo was broken. Now they show the new logo.

**Icons.** New `favicon.svg`, `favicon.ico`, `apple-touch-icon.png`, `icon-192.png` and `icon-512.png`. Before this, most pages had no favicon link at all, and the manifest pointed at icon files that didn't exist. Every live page now links the favicon and the manifest.

**Share image.** New `og-image.png` and `twitter-card.png` (1200x630) for link previews. The app page now uses these for its share tags.

**Downloads.** Exported files are now named `braindock-daily-....csv`, `braindock-report-....txt`, `braindock-analytics-....json` and `braindock-next-session.ics`.

**Links.** The "How-To Guide" links in the app footer and in Settings used to go to docs.focushub.app, which doesn't exist. They now go to `/how-to.html`.

**Mobile.** All of the mobile changes are in one block at the end of `style.css`, and they only apply at 768px wide and under. Desktop is untouched. A small fix also went into the inline styles in `overview.html` and `beta.html`. On a 390px phone, every page now fits the screen without sideways scrolling, including the in-session app view:
- the header buttons wrap
- the timer card is a single column with its buttons in a 2 x 2 grid
- the task input runs full width
- the three buckets stack
- the dashboard status bar and today strip wrap
- settings rows stack

## Left alone on purpose

- **Storage keys** (`focushub_state`, `focushub_grade_history`, etc.). If these were renamed, everyone's saved tasks and history would look empty. Users never see them.
- **Supabase** tables and project.
- **Lemon Squeezy checkout links** (`focushub.lemonsqueezy.com`). That subdomain is your store, so renaming it in the code would break payments. If you rename the store in Lemon Squeezy, send me the new URL.
- **Protected files** (`supabase-config.js`, `config.js`, `reflections-*.js`, `keyboard-shortcuts.js`). The only "FocusHub" mentions in them are code comments, which users never see.
- **Firebase project IDs** (`focushub-91094`) in the old Firebase files. These are the real ID of that Firebase project and can't be renamed in code. The live site runs on Supabase, so nothing uses them.
- **`focushub-6ah.pages.dev`**, the "Launch App" link in `demo-final-dark.html`. That's your real Cloudflare address, so the link keeps working.

## Second pass: everything else

Every other non-doc file in the repo also got the rename: the backup, staging, test and demo pages, plus the email, export, weekly report, service worker and Lemon Squeezy config scripts. That covers on-screen text, logo files, page titles and download filenames. The `data-export.js` and overview CSV exports are now named `braindock_...`. The analytics code name `FocusHubAnalytics` is now `BrainDockAnalytics` in all three files that use it. The service worker cache names were renamed too.

The marketing screenshots and the book cover don't show the old name.

Not touched: the development notes (`*.md`) and SQL files. They're your build history, not site pages.

## Needs you

- **Domain.** Share tags and the contact emails (privacy@, legal@) now say `braindock.app`. They used to say `focushub.app`, which you didn't own either. Register braindock.app, or tell me the real domain and I'll swap it in one pass.
- **Old logo files.** The `FocusHub_*.svg` files and the old `logo*.svg` files are no longer referenced, so you can delete them whenever you like.
