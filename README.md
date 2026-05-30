# Dunk Lab

A vertical jump training app with gamification, workout tracking, and AI coaching.

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   The app will open automatically at `http://localhost:3000`

## Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
Dunklab/
├── index.html          # HTML entry point
├── package.json        # Dependencies and scripts
├── vite.config.js      # Vite configuration
├── src/
│   ├── main.jsx        # React entry point
│   ├── App.jsx         # Main application component
│   └── index.css       # Global styles
└── App.jsx.jsx         # Original single-file export (can be deleted)
```

## Features

- **Workout Tracking:** Log jump training, strength, and speed workouts
- **Vertical Progress:** Track your vertical leap over time with charts
- **XP & Ranks:** Earn XP through workouts and challenges, unlock ranks
- **AI Coach:** Personalized coaching messages based on your progress
- **Pro Program:** 6-week structured training program (upgrade available)
- **Streak System:** Track daily training consistency
- **Badges:** Unlock achievements for milestones

## Tech Stack

- React 18
- Vite 5
- Vanilla CSS (no framework)
- LocalStorage for data persistence
