# EMOM Workout App

A mobile-first workout app for EMOM and Superset training. Designed for iPhone Safari, hosted on GitHub Pages.

## Features

- **EMOM** — 60-second timer per exercise, beep alerts, swipe to swap exercises, +/- reps
- **Superset** — sets & reps format, rest timer, adjustable pairs
- **Custom workouts** — build your own and save them
- **Saved tab** — local saved workouts + community sharing (requires Firebase)
- **Sync** — host or join a room with a 6-character code so everyone trains in time (requires Firebase)
- **4 color themes** — Slate, Blue, Green, Crimson

---

## Deploy to GitHub Pages

### Step 1 — Create the repository

1. Go to [github.com](https://github.com) and sign in
2. Click **+** → **New repository**
3. Name it `emom` (or anything you like)
4. Leave it **Public**, skip the README option, click **Create repository**

### Step 2 — Push the code

Open a terminal in the project folder and run:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/emom.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

### Step 3 — Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages** (left sidebar)
3. Under **Source**, select **Deploy from a branch**
4. Choose **main** branch, **/ (root)** folder → click **Save**
5. After ~60 seconds, your site is live at:
   `https://YOUR_USERNAME.github.io/emom/`

### Step 4 — Open in iPhone Safari

Navigate to your GitHub Pages URL in Safari. To add it to your home screen:

1. Tap the **Share** button (box with arrow)
2. Tap **Add to Home Screen**
3. The app opens full-screen with no browser chrome

---

## Enable Community Sharing & Sync (Firebase)

The app works fully without Firebase — only the community workout library and sync rooms need it.

### Step 1 — Create a Firebase project

1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. Click **Add project** → give it a name → click through the setup
3. In the project dashboard, click **Realtime Database** (left sidebar)
4. Click **Create Database** → choose a region → start in **test mode** (you can tighten rules later)

### Step 2 — Get your config

1. In the Firebase project, click the gear icon → **Project settings**
2. Scroll to **Your apps** → click the **</>** (web) icon
3. Register the app, then copy the `firebaseConfig` object shown

### Step 3 — Add the config to the app

Open `firebase-config.js` and replace `null` with your config:

```js
window.FIREBASE_CONFIG = {
  apiKey:            "AIzaSy...",
  authDomain:        "your-project.firebaseapp.com",
  databaseURL:       "https://your-project-default-rtdb.firebaseio.com",
  projectId:         "your-project",
  storageBucket:     "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId:             "1:123456789:web:abc123",
};
```

Commit and push the change — Firebase will be live on your next GitHub Pages deploy.

### Recommended Database Rules

In the Firebase console under **Realtime Database → Rules**, paste:

```json
{
  "rules": {
    "community_workouts": {
      ".read": true,
      ".write": true
    },
    "sync_rooms": {
      "$roomCode": {
        ".read": true,
        ".write": true
      }
    }
  }
}
```

---

## File Structure

```
index.html           Main HTML
firebase-config.js   Firebase credentials (fill in to enable sync/community)
css/
  styles.css         All styles — dark theme with CSS variable theming
js/
  data.js            Exercise database and workout generator
  audio.js           Web Audio API beeps (no audio files needed)
  storage.js         localStorage + Firebase community workouts
  sync.js            Firebase real-time sync rooms
  emom.js            EMOM tab logic
  superset.js        Superset tab logic
  app.js             Navigation, themes, saved tab, sync tab, toasts
```
