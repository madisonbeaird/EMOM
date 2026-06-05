// Saved workouts — localStorage (local) + Firebase (community)
const STORAGE_KEY = 'emom_saved_workouts';

function getSavedWorkouts() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveWorkout(workout) {
  const saved = getSavedWorkouts();
  const entry = {
    ...workout,
    id: workout.id || `local_${Date.now()}`,
    savedAt: Date.now(),
    isLocal: true,
  };
  const existing = saved.findIndex(w => w.id === entry.id);
  if (existing >= 0) {
    saved[existing] = entry;
  } else {
    saved.unshift(entry);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
  return entry;
}

function deleteWorkout(id) {
  const saved = getSavedWorkouts().filter(w => w.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
}

// ── Firebase community workouts ──────────────────────────────────────────────

let _db = null;

function getFirebaseDb() {
  if (_db) return _db;
  if (typeof firebase !== 'undefined' && window.FIREBASE_ENABLED) {
    try {
      _db = firebase.database();
    } catch (e) {
      _db = null;
    }
  }
  return _db;
}

function publishToCommunity(workout) {
  const db = getFirebaseDb();
  if (!db) return Promise.reject(new Error('Firebase not configured'));

  const entry = {
    name: workout.name,
    type: workout.type,
    equipment: workout.equipment || [],
    exercises: workout.exercises,
    totalMinutes: workout.totalMinutes || null,
    publishedAt: firebase.database.ServerValue.TIMESTAMP,
  };
  return db.ref('community_workouts').push(entry);
}

function subscribeToCommunity(callback) {
  const db = getFirebaseDb();
  if (!db) return null;

  const ref = db.ref('community_workouts').orderByChild('publishedAt').limitToLast(50);
  ref.on('value', snap => {
    const workouts = [];
    snap.forEach(child => {
      workouts.unshift({ id: child.key, ...child.val(), isCommunity: true });
    });
    callback(workouts);
  });
  return ref;
}

function unsubscribeCommunity(ref) {
  if (ref) ref.off();
}
