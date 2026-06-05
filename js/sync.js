// Real-time workout sync via Firebase Realtime Database
// One user hosts, others join with a 6-character room code.
// The host writes timer state every second; clients read and mirror it.

const SyncState = {
  IDLE:    'idle',
  HOSTING: 'hosting',
  JOINED:  'joined',
};

let syncState    = SyncState.IDLE;
let roomCode     = null;
let roomRef      = null;
let isHost       = false;
let onSyncUpdate = null;   // callback(data) fired when remote state changes

function generateRoomCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

function getSyncDb() {
  if (typeof firebase !== 'undefined' && window.FIREBASE_ENABLED) {
    try { return firebase.database(); } catch (e) {}
  }
  return null;
}

// ── Host ─────────────────────────────────────────────────────────────────────

function hostRoom(workout, callback) {
  const db = getSyncDb();
  if (!db) {
    callback({ error: 'Firebase not configured. Add your Firebase credentials to firebase-config.js to use sync.' });
    return;
  }

  roomCode = generateRoomCode();
  isHost = true;
  onSyncUpdate = callback;

  roomRef = db.ref(`sync_rooms/${roomCode}`);
  roomRef.set({
    state: 'waiting',
    currentExercise: 0,
    timerValue: 60,
    workout: workout,
    hostAlive: firebase.database.ServerValue.TIMESTAMP,
  });

  // Remove room when host disconnects
  roomRef.onDisconnect().remove();

  syncState = SyncState.HOSTING;
  callback({ type: 'hosted', roomCode });
}

// Host pushes timer state
function pushTimerState(data) {
  if (!roomRef || !isHost) return;
  roomRef.update({
    state: data.state,
    currentExercise: data.currentExercise,
    timerValue: data.timerValue,
    hostAlive: firebase.database.ServerValue.TIMESTAMP,
  });
}

// ── Join ─────────────────────────────────────────────────────────────────────

function joinRoom(code, callback) {
  const db = getSyncDb();
  if (!db) {
    callback({ error: 'Firebase not configured. Add your Firebase credentials to firebase-config.js to use sync.' });
    return;
  }

  roomCode = code.toUpperCase().trim();
  isHost = false;
  onSyncUpdate = callback;

  roomRef = db.ref(`sync_rooms/${roomCode}`);
  roomRef.once('value', snap => {
    if (!snap.exists()) {
      callback({ error: `Room "${roomCode}" not found. Check the code and try again.` });
      roomRef = null;
      return;
    }

    syncState = SyncState.JOINED;
    callback({ type: 'joined', roomCode, data: snap.val() });

    // Listen for live updates
    roomRef.on('value', snap => {
      if (!snap.exists()) {
        callback({ type: 'room_closed' });
        leaveRoom();
        return;
      }
      callback({ type: 'update', data: snap.val() });
    });
  });
}

// ── Leave ─────────────────────────────────────────────────────────────────────

function leaveRoom() {
  if (roomRef) {
    if (isHost) roomRef.remove();
    else roomRef.off();
  }
  roomRef = null;
  roomCode = null;
  isHost = false;
  syncState = SyncState.IDLE;
  onSyncUpdate = null;
}

function getCurrentRoomCode() { return roomCode; }
function getSyncStateLabel()  { return syncState; }
function getIsHost()          { return isHost; }
