# Project Overview

**Dunk Lab** is a single-page web application that helps athletes train for and track their progress toward dunking a basketball. It combines a quick "can you dunk?" calculator, structured workout programs, progress tracking (vertical jump and sprints), gamification (XP, ranks, badges, streaks), and a rule-based "AI Coach" that responds to the user's training data.

* **What it is:** A client-only React app (no backend). All user data lives in the browser via `localStorage`. It is a dunk *tracking and training* tool wrapped in a motivational, game-like UI.
* **Target users:** Recreational and aspiring basketball players (typically beginner to intermediate) who want a clear, structured path to increasing their vertical jump and eventually dunking. The tone and copy are aimed at self-motivated individual athletes, not coaches or teams.
* **Core purpose:** Tell a user exactly how far they are from dunking, give them a structured plan to close that gap, and keep them consistent through daily workouts, feedback, and rewards.

---

# Architecture

## Major files and folders

```
DunkLab/
├── index.html          # HTML entry point; mounts #root and loads /src/main.jsx
├── package.json        # Dependencies (React 18, Vite 5, @vercel/analytics) and scripts
├── vite.config.js      # Vite config — dev server on port 3000, auto-open
├── .gitignore
├── README.md           # Setup, feature list, tech stack
├── App.jsx             # ⚠️ STALE duplicate at repo root — NOT used by the build
└── src/
    ├── main.jsx        # React root — renders <App/> in StrictMode
    ├── App.jsx         # ✅ The real application — nearly all code lives here
    └── index.css       # Global styles (mobile-tuned variant of the inline style block)
```

* **`src/App.jsx`** is the heart of the project (~3,000+ lines). It contains:
  * **Data constants:** `RANKS`, `LEVELS`, `WORKOUTS`, `PRO_WEEKS`, `CHALLENGES`, `WEEKLY_CHALLENGE_POOLS`, `GYM_SPLITS`, `RECOVERY_DAYS`, `RANK_REWARDS`, theme/accent definitions.
  * **Pure utilities:** streak, rank, XP, and dunk-gap math.
  * **Coach engine:** `snapshot`, `coachMsg`, `coachAnswer`, `generateTextResponse`.
  * **Presentational components:** `RankCard`, `BadgeCard`, `XPBar`, `Tag`, `VertChart`, `Milestone`, `ProModal`, `DunkCalc`, `Onboarding`, `DrillInstructions`.
  * **The monolithic `App()` component** holding all view logic and state.
* The **root `App.jsx`** is an older copy (orange-only theme, no `DrillInstructions`). The README itself notes it "can be deleted." The build never imports it.

## Entry points

1. `index.html` loads `/src/main.jsx` as a module.
2. `src/main.jsx` creates the React root and renders `<App />` inside `<React.StrictMode>`, importing `./index.css`.
3. `src/App.jsx` exports the default `App()` component, which decides the initial screen: `calc` (Dunk Calculator) if no saved profile, otherwise `app`.

## State management approach

* **No external state library.** State is managed entirely with React hooks inside `App()`.
* A single object, `raw`, holds all persisted user data. A `mut(fn)` helper is the **single writer**: it updates `raw` and calls `save()` in one step.
* `raw` is normalized into a derived object `D` (with defaults) and a computed metrics object `snap = snapshot(raw)` (gap, streak, trend, weekly/monthly gain, dunk ETA, etc.).
* Roughly two dozen additional `useState` hooks hold transient UI state (current view, modals open, coach typing, inputs, selected pro tab/phase, etc.).
* Views are computed as JSX values (`HomeView`, `TrainView`, `TrackView`, `RankView`, `ProgramView`, `SettingsView`) and selected via a `VIEWS` map with a bottom navigation bar.

## Persistence / localStorage structure

All persistence is `localStorage`-based. Key storage keys:

* **`dunklab-v10`** — the main user blob (JSON). Read/written by `load()` / `save()`. Contains:
  * Profile: `name`, `age`, `height`, `level`, `skill`
  * Progress: `xp`, `activeDays[]`, `vertLogs[]` (`{v, date}`), `sprints[]` (`{time, dist, date}`), `chDates[]`
  * Pro/flags: `isPro`, `proPhasesClaimed[]`, `gymPhasesClaimed[]`, `shieldUsedWeek`, weekly-challenge claim arrays (`wc_week_<n>`), `recXpDates`, `allBadgesBonusClaimed`
  * Anti-exploit maps: `drillXpDates` (XP-once-per-drill-per-day), `coachQDates` (daily coach question counts), `fullWorkouts[]`
* **`dl_drills_v10`** — date-scoped daily drill completion (pruned to recent days).
* **`dl_prog_v10`** — permanent completion for Pro / Gym drills (keys prefixed `pro-`, `gym-`), plus date-scoped Recovery drills (`rec-`).
* The **`RESET`** action clears `dunklab-v5` through `-v10` and the `dl_drills_*` keys, then reloads.

---

# Data Flow

## How onboarding works

1. New users (no `name` in storage) land on the **Dunk Calculator** screen. They enter height and current vertical; the app computes their dunk gap and shows a result.
2. Pressing **Start My Program** moves to the **Onboarding** flow (`Onboarding` component), a two-step form: Step 1 collects name, age, height, and experience level (beginner/intermediate/advanced); Step 2 asks the user to pick their current jumping milestone (height-adjusted estimates are shown).
3. On completion, a fresh user object is created (seeding `vertLogs` with the calculator result if present), saved to `dunklab-v10`, and the screen switches to `app`.

## How profile data is saved

* Profile fields are written into `raw` via `save()` at the end of onboarding, then updated through `mut()` thereafter.
* Because `mut()` always calls `save()`, every state change to `raw` is immediately persisted to `localStorage`. There is no separate "save" action for the user.

## How workout progress is tracked

* Each drill has a completion key. Daily workout drills use `${today}-${drillName}`; Pro drills use `pro-<phase>-<name>`; Gym drills use `gym-<phase>-<split>-<name>`; Recovery drills use `rec-<date>-<name>`.
* `drillsDone` state is synced to `localStorage` by a `useEffect` that splits keys into date-scoped (`dl_drills_v10`) and permanent (`dl_prog_v10`) buckets.
* Marking a drill done awards **+10 XP once per drill per day** (guarded by `drillXpDates`). Completing the full daily workout via **markDone** adds the day to `activeDays`, awards **+60 XP** plus streak bonuses, and triggers post-workout coach feedback and milestone checks.

## How AI Coach data is generated

The "AI Coach" is **rule-based string generation**, not a real model:

1. `snapshot(raw)` builds a metrics object from the user's data (gap, streak, sessions, last/best vert, weekly/monthly gain, sessions-this-week, days since last session, trend, dunk-week estimate, avg sessions/week).
2. `coachMsg(snap, mode)` selects a contextual message. `mode` can trigger specific messages (post-workout, missed days, new PB, streak, milestones); otherwise it picks a daily message based on state. `pick()` randomly chooses among several phrasings to avoid repetition.
3. Quick questions call `coachAnswer(snap, key)`; free-text questions are routed by regex keyword matching in `generateTextResponse(text)` to the closest canned answer, with varied fallbacks.
4. Free users get **3 questions/day** (tracked in `coachQDates`); Pro is unlimited.

## How Pro data is stored

* `isPro` is a boolean flag on the main `raw` blob. The `upgrade()` function (currently demo-only — no real payment) sets `isPro:true` and grants bonus XP.
* Pro-specific progress is stored alongside everything else: `proPhasesClaimed`, `gymPhasesClaimed`, `shieldUsedWeek`, `recXpDates`, and weekly-challenge claim arrays keyed by ISO week.

---

# Current Features

* **Dunk calculator** — quick height + vertical input that returns inches-from-dunking, a percentage, an estimated timeline, and the user's current milestone.
* **Standing Reach support** — standing reach is estimated as `height × 1.335` and used to compute height-adjusted vertical targets for each milestone.
* **AI Coach** — rule-based coaching with a daily assessment, quick questions, free-text Q&A, typing animation, and context-aware triggers (missed days, PBs, streaks, plateaus).
* **XP system** — XP for workouts, individual drills, vertical/sprint logs, streaks, challenges, phase completion, and badges, with anti-double-claim guards.
* **Levels and ranks** — 8 jumping **levels** (Can't Touch Net → CAN DUNK) and 9 XP **ranks** (PROSPECT → LEGEND), each rank unlocking features.
* **Workout tracking** — daily workout rotates by weekday across four types; drills can be completed or skipped (with a reason); skill level adjusts drill count/sets.
* **Sprint tracking** — log sprint times by distance (10/20/40/100 yd) with per-distance personal bests.
* **Themes** — selectable accent colors (orange/blue/purple/green) defined via `ACCENT_COLORS`/`THEME_NAMES`, with per-workout color variants.
* **Settings page** — theme/accent selection and related preferences.
* **Pro system** — unlocks the structured 6-week program, gym splits, recovery days, weekly challenges, streak shield, weekly report, and unlimited coach questions.
* **Recovery days** — a mobility/stretch session that resets daily and awards XP on completion.
* **Gym splits** — Push/Pull/Legs routines synced to each Pro phase, with phase locking.
* **Weekly challenges** — three rotating goals per ISO week (from `WEEKLY_CHALLENGE_POOLS`) with real progress bars and XP rewards.
* **Streak system** — consecutive-day streak with bonus XP at milestones; Pro "Streak Shield" can save one missed day per week.

---

# Important Logic

## Dunk gap calculations

* `sReach(h) = round(h × 1.335)` — estimated standing reach in inches.
* `gapFn(h, v) = max(0, 120 - sReach(h) - v)` — inches from dunking (rim = 120").
* `dunkPctFn(h, v)` — percentage of the way to dunking, clamped between 3 and 100.
* `weeksEst(gap) = ceil(gap / 0.32)` — estimated weeks to close the gap at ~0.32"/week.
* Per-milestone targets in the calculator/onboarding apply an `extraNeeded` offset above the rim per level (e.g. grab rim +2", dunk +10").

## Rank progression

* `getRank(xp)` returns the highest rank whose `min` XP threshold the user meets; `rankIndex`/`hasRank` gate feature unlocks.
* `xpProg(xp)` computes percent-to-next-rank, XP needed, and the next rank name.
* Crossing a threshold during an XP gain triggers a "RANK UP" milestone popup with the rank's reward text.

## Workout completion

* A drill is "done" when its completion key is truthy in `drillsDone`; completion is **one-way** (the DONE button is disabled once set) to prevent XP farming.
* `markDone()` requires the day not already be logged; it appends to `activeDays`, awards 60 XP plus streak bonuses (+100/+150/+400 at 7/14/30 days), records full-workout completion, and fires coach feedback plus milestone/badge/rank checks.

## Coach response generation

* All coach text derives from `snapshot()` metrics. `coachMsg` handles both event triggers and the default daily message; `coachAnswer` handles fixed quick-questions; `generateTextResponse` keyword-routes free text. Variety comes from `pick()` over multiple phrasings. The daily message is memoized so typing in inputs doesn't cause flicker.

## Theme system

* `accentColor` selects a base accent; `getWorkoutColors(accentColor)` derives per-workout color variants; `getWorkouts(accentColor)` rebuilds the `WORKOUTS` array with those colors. A `theme` object exposes `theme.accent`. The selection is persisted and applied across the top bar, nav, buttons, and cards.

---

# Known Issues / Technical Debt

* **One enormous `src/App.jsx` (~3,000+ lines).** Constants, business logic, the coach engine, and all six views are interleaved in a single file with ~25 `useState` hooks. It is hard to read, test, and extend; it should be split into modules (constants, coach engine, hooks, and one file per view/component).
* **Stale duplicate `App.jsx` at the repo root.** It diverges from `src/App.jsx` (orange-only, no `DrillInstructions`) and is not used by the build. It should be deleted to avoid confusion.
* **Theme/accent scope inconsistency in `App()`.** Parts of the Home view and Home coach modal reference `theme.accent`/`accentColor`, while nearby code still uses `C.orange`. The theming feature appears only partially wired into the main component, so this must be verified end-to-end to ensure `theme`/`accentColor`/`setAccentColor` are in scope wherever used and the app renders without a runtime error.
* **`Analytics` is imported but never rendered**, so Vercel analytics is effectively dead.
* **Easily tampered data / limits.** All XP, `isPro`, and coach-question limits live in `localStorage`; the anti-exploit guards only prevent accidental double-claims, not deliberate edits. Not safe as a basis for real payments.
* **No tests, linting, CI, or error boundaries.** A single render error blanks the screen.
* **Date handling mixes local `Date` and ISO string slicing**, which can cause streak / "days ago" drift across timezones and DST.
* **Always-visible `RESET` button** in the top bar can wipe all data with no confirmation.
* **Magic constants** (reach factor `1.335`, `0.32"/week`, rim `120"`) are scattered without a single source of truth.

---

# Future Roadmap

## Short-term improvements

* Verify and fix the theme/accent scoping so the app renders reliably; finish wiring the theme through every view.
* Delete the root `App.jsx` duplicate.
* Render `<Analytics/>` so tracking works.
* Add an error boundary and guard `RESET` behind a confirmation.

## Medium-term improvements

* Modularize `src/App.jsx` into constants, coach engine, hooks, and per-view component files.
* Add ESLint, Vitest unit tests for the math/coach utilities, and a basic CI pipeline.
* Introduce real accounts + cloud sync (e.g. Supabase/Firebase) to enable cross-device data and make XP/Pro tamper-resistant.
* Wire up Stripe for the existing $4.99/mo Pro flow (currently demo-only).
* Add reminders / push notifications to reinforce the streak mechanic.

## Long-term improvements

* Replace the rule-based coach with a genuine LLM-backed coach gated behind Pro.
* Add real jump measurement (video-based estimation or wearable import) instead of manual entry.
* Expand programs and personalization based on logged performance trends.

---

# Current Product Direction

Dunk Lab is primarily a **dunk tracking and training platform with structured workouts, not yet a fully personalized AI-generated training system.** The "AI Coach" today is a thoughtful rule-based engine that turns the user's own data into motivational, contextual feedback — it does not generate bespoke training plans. The product's strength is its clear gap-to-dunk framing, structured progression, and gamified consistency loop.

## Pro philosophy

The Pro tier is built around **structured progression** through three escalating phases, rather than random workouts:

* **Foundation (Weeks 1–2):** Build a reactive-strength base. Emphasis on form over intensity, establishing movement quality and tendon readiness.
* **Overload (Weeks 3–4):** Increase volume and load as the body adapts. Heavier lifts and faster, more demanding plyometrics.
* **Peak (Weeks 5–6):** Maximum intensity with dunk attempts and benchmark testing, converting the built strength into explosive vertical output.

Each phase is gated so users complete the previous one first, reinforcing the core message that progressive, structured training (paired with recovery, gym splits, and weekly accountability) produces real vertical gains where random training does not.
