// ── App entry point — routing, theme, navigation, saved, sync UI ─────────────

let currentTab  = 'home';
let currentTheme = 'default';

// ── Init ──────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('emom_theme');
  if (savedTheme) {
    currentTheme = savedTheme;
    applyTheme(savedTheme);
    markThemeBtn(savedTheme);
  }

  const onboarded = localStorage.getItem('emom_onboarded');
  if (onboarded) {
    showApp();
    switchTab('home');
  }
});

// ── Onboarding ─────────────────────────────────────────────────────────────────

function selectTheme(theme) {
  currentTheme = theme;
  applyTheme(theme);
  markThemeBtn(theme);
}

function markThemeBtn(theme) {
  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.theme === theme);
  });
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('emom_theme', theme);
}

function enterApp() {
  localStorage.setItem('emom_onboarded', '1');
  showApp();
}

function showApp() {
  document.getElementById('onboarding').classList.remove('active');
  document.getElementById('app').classList.add('active');
  switchTab('emom');
}

// ── Navigation ─────────────────────────────────────────────────────────────────

function switchTab(tab) {
  currentTab = tab;

  document.querySelectorAll('.tab-pane').forEach(pane => {
    pane.classList.toggle('active', pane.id === `tab-${tab}`);
  });
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tab);
  });

  if (tab === 'home')          renderHomeTab();
  else if (tab === 'emom')     renderEmomTab();
  else if (tab === 'superset') renderSupersetTab();
  else if (tab === 'saved')    renderSavedTab();
  else if (tab === 'sync')     renderSyncTab();
}

// ── Settings ──────────────────────────────────────────────────────────────────

function toggleSettings() {
  const existing = document.getElementById('settings-panel');
  if (existing) {
    existing.remove();
    return;
  }

  const panel = document.createElement('div');
  panel.id = 'settings-panel';
  panel.className = 'settings-panel';
  panel.innerHTML = `
    <div class="settings-header">
      <span>Settings</span>
      <button class="icon-btn" onclick="toggleSettings()">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
    </div>
    <div class="settings-body">
      <p class="label">Color Theme</p>
      <div class="theme-grid compact">
        <button class="theme-btn ${currentTheme === 'default' ? 'active' : ''}" data-theme="default" onclick="changeTheme('default')">
          <div class="theme-preview theme-preview--default"></div><span>Slate</span>
        </button>
        <button class="theme-btn ${currentTheme === 'blue' ? 'active' : ''}" data-theme="blue" onclick="changeTheme('blue')">
          <div class="theme-preview theme-preview--blue"></div><span>Blue</span>
        </button>
        <button class="theme-btn ${currentTheme === 'green' ? 'active' : ''}" data-theme="green" onclick="changeTheme('green')">
          <div class="theme-preview theme-preview--green"></div><span>Green</span>
        </button>
        <button class="theme-btn ${currentTheme === 'crimson' ? 'active' : ''}" data-theme="crimson" onclick="changeTheme('crimson')">
          <div class="theme-preview theme-preview--crimson"></div><span>Crimson</span>
        </button>
      </div>
    </div>
  `;
  document.getElementById('app').appendChild(panel);
}

function changeTheme(theme) {
  currentTheme = theme;
  applyTheme(theme);
  document.querySelectorAll('#settings-panel .theme-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.theme === theme);
  });
}

// ── Saved Tab ──────────────────────────────────────────────────────────────────

let communityUnsub = null;
let communityWorkouts = [];

function renderSavedTab() {
  const pane = document.getElementById('tab-saved');
  const local = getSavedWorkouts();

  pane.innerHTML = `
    <div class="section-header">
      <h2>Saved</h2>
      <span class="section-sub">Your workouts</span>
    </div>

    ${local.length === 0 ? '<p class="empty-msg" style="margin-top:24px">No saved workouts yet. Generate or build a workout and tap Save.</p>' : ''}

    <div class="saved-list">
      ${local.map(w => renderSavedCard(w, false)).join('')}
    </div>

    <div class="section-header" style="margin-top:32px">
      <h2>Community</h2>
      <span class="section-sub">${window.FIREBASE_ENABLED ? 'Shared workouts' : 'Requires Firebase setup'}</span>
    </div>

    <div id="community-list">
      ${window.FIREBASE_ENABLED
        ? '<p class="empty-msg">Loading...</p>'
        : `<div class="info-box">
            Community sharing requires Firebase. See the README for setup instructions.
           </div>`
      }
    </div>
  `;

  if (window.FIREBASE_ENABLED) {
    if (communityUnsub) unsubscribeCommunity(communityUnsub);
    communityUnsub = subscribeToCommunity(workouts => {
      communityWorkouts = workouts;
      const el = document.getElementById('community-list');
      if (el) {
        el.innerHTML = workouts.length
          ? workouts.map(w => renderSavedCard(w, true)).join('')
          : '<p class="empty-msg">No community workouts yet. Be the first to share one!</p>';
      }
    });
  }
}

function renderSavedCard(w, isCommunity) {
  return `
    <div class="saved-card">
      <div class="saved-card-info">
        <div class="saved-card-name">${w.name || 'Unnamed'}</div>
        <div class="saved-card-meta">
          ${w.type === 'emom' ? 'EMOM' : 'Superset'}
          ${w.totalMinutes ? ' &bull; ' + w.totalMinutes + ' min' : ''}
          ${w.exercises ? ' &bull; ' + (Array.isArray(w.exercises) ? w.exercises.length : '?') + ' exercises' : ''}
        </div>
      </div>
      <div class="saved-card-actions">
        <button class="btn-secondary sm" onclick="loadSavedWorkout('${w.id}', ${isCommunity})">Load</button>
        ${!isCommunity ? `<button class="text-btn danger-text" onclick="confirmDelete('${w.id}')">Delete</button>` : ''}
        ${!isCommunity && window.FIREBASE_ENABLED ? `<button class="text-btn" onclick="shareWorkout('${w.id}')">Share</button>` : ''}
      </div>
    </div>
  `;
}

function loadSavedWorkout(id, isCommunity) {
  let workout = null;
  if (isCommunity) {
    workout = communityWorkouts.find(w => w.id === id);
  } else {
    workout = getSavedWorkouts().find(w => w.id === id);
  }
  if (!workout) return;

  if (workout.type === 'emom') emomLoadWorkout(workout);
  else ssLoadWorkout(workout);
}

function confirmDelete(id) {
  if (confirm('Delete this workout?')) {
    deleteWorkout(id);
    renderSavedTab();
  }
}

function shareWorkout(id) {
  const workout = getSavedWorkouts().find(w => w.id === id);
  if (!workout) return;
  publishToCommunity(workout)
    .then(() => showToast('Shared to community'))
    .catch(e => showToast('Share failed: ' + e.message));
}

// ── Sync Tab ───────────────────────────────────────────────────────────────────

function renderSyncTab() {
  const pane = document.getElementById('tab-sync');
  const state = getSyncStateLabel();

  if (state === 'hosting') {
    pane.innerHTML = renderSyncHosting();
    return;
  }
  if (state === 'joined') {
    pane.innerHTML = renderSyncJoined();
    return;
  }

  pane.innerHTML = `
    <div class="section-header">
      <h2>Sync</h2>
      <span class="section-sub">Work out in time with others</span>
    </div>

    ${!window.FIREBASE_ENABLED ? `
      <div class="info-box" style="margin-top:16px">
        Sync requires Firebase setup. Follow the README instructions to enable it.
      </div>
    ` : ''}

    <div class="sync-options">
      <div class="sync-card">
        <div class="sync-card-title">Host a Room</div>
        <p class="sync-card-desc">Start a workout and share a code so others can join and follow your timer.</p>
        <button class="btn-primary" onclick="syncHost()" ${!window.FIREBASE_ENABLED ? 'disabled' : ''}>
          Host Room
        </button>
      </div>

      <div class="sync-divider">or</div>

      <div class="sync-card">
        <div class="sync-card-title">Join a Room</div>
        <p class="sync-card-desc">Enter a 6-character code from the host to sync your timer.</p>
        <input class="text-input" id="join-code-input" type="text"
               placeholder="Room code" maxlength="6"
               style="text-transform:uppercase;letter-spacing:4px;font-size:20px;text-align:center" />
        <button class="btn-primary" style="margin-top:12px" onclick="syncJoin()" ${!window.FIREBASE_ENABLED ? 'disabled' : ''}>
          Join Room
        </button>
      </div>
    </div>
  `;
}

function renderSyncHosting() {
  const code = getCurrentRoomCode();
  return `
    <div class="section-header">
      <h2>Hosting</h2>
      <span class="section-sub">Room active</span>
    </div>
    <div class="sync-room-display">
      <p class="label">Room Code</p>
      <div class="room-code">${code}</div>
      <p class="sync-hint">Share this code with friends. Start the workout from the EMOM tab.</p>
    </div>
    <button class="btn-secondary" style="margin-top:24px" onclick="endSync()">End Room</button>
  `;
}

function renderSyncJoined() {
  const code = getCurrentRoomCode();
  return `
    <div class="section-header">
      <h2>Synced</h2>
      <span class="section-sub">Connected to ${code}</span>
    </div>
    <div class="sync-room-display">
      <p class="sync-hint">You are synced to room <strong>${code}</strong>. The EMOM tab mirrors the host's timer.</p>
    </div>
    <button class="btn-secondary" style="margin-top:24px" onclick="leaveSync()">Leave Room</button>
  `;
}

function syncHost() {
  if (emomWorkout.length === 0) {
    showToast('Generate or create an EMOM workout first');
    switchTab('emom');
    return;
  }
  hostRoom(
    { exercises: emomWorkout, totalMinutes: emomMinutes },
    result => {
      if (result.error) { showToast(result.error); return; }
      renderSyncTab();
      showToast(`Room ${result.roomCode} created`);
    }
  );
}

function syncJoin() {
  const input = document.getElementById('join-code-input');
  const code = (input?.value || '').trim().toUpperCase();
  if (code.length !== 6) {
    showToast('Enter a 6-character room code');
    return;
  }

  joinRoom(code, result => {
    if (result.error) { showToast(result.error); return; }
    if (result.type === 'joined') {
      renderSyncTab();
      showToast(`Joined room ${code}`);
      if (result.data && result.data.workout) {
        emomStartSynced(result.data.workout, result.data.currentExercise, result.data.timerValue);
        switchTab('emom');
      }
    }
    if (result.type === 'update') {
      emomSyncUpdate(result.data);
    }
    if (result.type === 'room_closed') {
      showToast('Room was closed by the host');
      renderSyncTab();
    }
  });
}

function endSync() {
  leaveRoom();
  renderSyncTab();
}

function leaveSync() {
  leaveRoom();
  renderSyncTab();
}

// ── Toast ─────────────────────────────────────────────────────────────────────

function showToast(message) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);

  requestAnimationFrame(() => toast.classList.add('visible'));
  setTimeout(() => {
    toast.classList.remove('visible');
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

// Keep screen awake during workouts using the Wake Lock API
let wakeLock = null;

async function requestWakeLock() {
  if ('wakeLock' in navigator) {
    try {
      wakeLock = await navigator.wakeLock.request('screen');
    } catch (e) {}
  }
}

async function releaseWakeLock() {
  if (wakeLock) {
    await wakeLock.release();
    wakeLock = null;
  }
}

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible' && (emomRunning || ssRunning)) {
    requestWakeLock();
  }
});
