// ── Firebase Configuration ────────────────────────────────────────────────────
// Follow the README to create a free Firebase project, then paste your config here.
// Until this is filled in, the app works fully — only community sharing and
// sync rooms are disabled.

window.FIREBASE_CONFIG = null;  // Replace null with your config object (see README)

// Example (replace with your actual values from the Firebase console):
// window.FIREBASE_CONFIG = {
//   apiKey:            "AIzaSy...",
//   authDomain:        "your-project.firebaseapp.com",
//   databaseURL:       "https://your-project-default-rtdb.firebaseio.com",
//   projectId:         "your-project",
//   storageBucket:     "your-project.appspot.com",
//   messagingSenderId: "123456789",
//   appId:             "1:123456789:web:abc123",
// };

window.FIREBASE_ENABLED = false;

(function () {
  if (!window.FIREBASE_CONFIG) return;
  try {
    firebase.initializeApp(window.FIREBASE_CONFIG);
    window.FIREBASE_ENABLED = true;
    console.log('[Firebase] Connected');
  } catch (e) {
    console.warn('[Firebase] Init failed:', e.message);
  }
})();
