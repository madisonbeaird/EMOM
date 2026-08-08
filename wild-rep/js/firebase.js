// ── Wild Rep — Firebase ───────────────────────────────────────────────────────

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged }
  from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, collection, addDoc, query, where, getDocs, orderBy }
  from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";
import { firebaseConfig } from './firebase-config.js';

const app  = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db   = getFirestore(app);

// ── Auth ──────────────────────────────────────────────────────────────────────

export { auth, db, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged };
export { doc, setDoc, getDoc, collection, addDoc, query, where, getDocs, orderBy };

// ── Current user helper ───────────────────────────────────────────────────────

export function currentUser() {
  return auth.currentUser;
}

// ── User profile ──────────────────────────────────────────────────────────────

export async function ensureUserProfile(user) {
  const ref = doc(db, 'users', user.uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    await setDoc(ref, {
      uid:         user.uid,
      displayName: user.displayName || user.email,
      email:       user.email,
      createdAt:   new Date().toISOString(),
    });
  }
  return (await getDoc(ref)).data();
}

// ── Save workout ──────────────────────────────────────────────────────────────

export async function saveWorkoutToCloud(record) {
  const user = currentUser();
  if (!user) return null;
  const ref = await addDoc(collection(db, 'workouts'), {
    ...record,
    uid:       user.uid,
    createdAt: new Date().toISOString(),
  });
  return ref.id;
}

// ── Fetch user workouts ───────────────────────────────────────────────────────

export async function fetchMyWorkouts() {
  const user = currentUser();
  if (!user) return [];
  const q = query(
    collection(db, 'workouts'),
    where('uid', '==', user.uid),
    orderBy('createdAt', 'desc')
  );
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}
