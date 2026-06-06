// ── Home Tab — history + weekly schedule ─────────────────────────────────────

const HISTORY_KEY  = 'emom_history';
const SCHEDULE_KEY = 'emom_schedule';
const MAX_HISTORY  = 40;
const DAYS         = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

// ── History ───────────────────────────────────────────────────────────────────

function getHistory() {
  try { return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]'); } catch { return []; }
}

function logWorkout(entry) {
  const history = getHistory();
  history.unshift({ id: `h_${Date.now()}`, completedAt: Date.now(), ...entry });
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, MAX_HISTORY)));
}

// ── Schedule ──────────────────────────────────────────────────────────────────

function getSchedule() {
  try {
    const s = JSON.parse(localStorage.getItem(SCHEDULE_KEY));
    return Array.isArray(s) && s.length === 7 ? s : Array(7).fill(null);
  } catch { return Array(7).fill(null); }
}

function setScheduleDay(dayIndex, entry) {
  const s = getSchedule();
  s[dayIndex] = entry;
  localStorage.setItem(SCHEDULE_KEY, JSON.stringify(s));
}

// ── Render ────────────────────────────────────────────────────────────────────

let _editingDay = null;

function renderHomeTab() {
  const pane    = document.getElementById('tab-home');
  const history = getHistory();
  const schedule = getSchedule();
  const now     = new Date();
  // getDay(): 0=Sun,1=Mon… convert to 0=Mon,6=Sun
  const todayIdx = (now.getDay() + 6) % 7;

  pane.innerHTML = `
    <div class="home-header">
      <div class="home-date">${formatDay(now)}</div>
      <div class="home-date-full">${formatFullDate(now)}</div>
    </div>

    <div class="home-section">
      <div class="home-section-hd">
        <span class="label">This Week</span>
        <button class="text-btn" onclick="homeEditDay(${todayIdx})">+ Schedule</button>
      </div>
      <div class="week-grid">
        ${DAYS.map((day, i) => {
          const entry   = schedule[i];
          const isToday = i === todayIdx;
          return `
            <button class="day-cell ${isToday ? 'today' : ''} ${entry ? 'filled' : ''}"
                    onclick="homeEditDay(${i})">
              <span class="day-label">${day}</span>
              ${entry
                ? `<span class="day-workout-name">${entry.name}</span>`
                : `<span class="day-empty">+</span>`
              }
            </button>
          `;
        }).join('')}
      </div>

      ${(() => {
        const todayEntry = schedule[todayIdx];
        if (!todayEntry) return '';
        return `
          <div class="today-banner">
            <div class="today-banner-info">
              <span class="today-banner-label">Today</span>
              <span class="today-banner-name">${todayEntry.name}</span>
            </div>
            ${todayEntry.workoutId ? `
              <button class="btn-secondary sm" onclick="homeStartScheduled('${todayEntry.workoutId}')">
                Start
              </button>
            ` : ''}
          </div>
        `;
      })()}
    </div>

    <div class="home-section">
      <div class="home-section-hd">
        <span class="label">Recent Workouts</span>
        ${history.length > 0 ? `<span class="label" style="color:var(--text-3)">${history.length} total</span>` : ''}
      </div>

      ${history.length === 0
        ? `<p class="empty-msg">Complete your first workout and it will appear here.</p>`
        : `<div class="history-list">
            ${history.slice(0, 10).map(h => `
              <div class="history-item" data-id="${h.id}">
                <div class="history-item-track">
                  <div class="history-dot ${h.type === 'emom' ? 'dot-emom' : 'dot-ss'}"></div>
                  <div class="history-info">
                    <div class="history-name">${h.name}</div>
                    <div class="history-meta">
                      ${h.type === 'emom' ? 'EMOM' : 'Superset'}
                      ${h.totalMinutes ? ` &bull; ${h.totalMinutes} min` : ''}
                      ${h.pairs ? ` &bull; ${h.pairs} pairs` : ''}
                      &bull; ${formatRelDate(h.completedAt)}
                    </div>
                  </div>
                </div>
                <button class="history-delete-btn" onclick="deleteHistoryEntry('${h.id}')">Delete</button>
              </div>
            `).join('')}
           </div>`
      }
    </div>

    ${renderScheduleModal()}
  `;

  attachHistorySwipe();
}

function renderScheduleModal() {
  return `
    <div class="modal-backdrop" id="schedule-modal" style="display:none">
      <div class="modal">
        <div class="modal-header">
          <h3 id="sched-title">Schedule</h3>
          <button class="icon-btn" onclick="homeCloseSchedule()">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        <div class="modal-body" id="sched-body"></div>
        <div class="modal-footer">
          <button class="btn-secondary" onclick="homeCloseSchedule()">Close</button>
        </div>
      </div>
    </div>
  `;
}

function homeEditDay(dayIndex) {
  _editingDay = dayIndex;
  const modal = document.getElementById('schedule-modal');
  if (!modal) return;

  const title   = document.getElementById('sched-title');
  const body    = document.getElementById('sched-body');
  const saved   = getSavedWorkouts();
  const current = getSchedule()[dayIndex];

  title.textContent = DAYS[dayIndex];

  body.innerHTML = `
    ${current ? `
      <div class="schedule-current">
        <div>
          <span class="label" style="margin:0">Scheduled</span>
          <div class="schedule-current-name">${current.name}</div>
        </div>
        <button class="text-btn danger-text" onclick="homeClearDay(${dayIndex})">Remove</button>
      </div>
    ` : ''}

    <p class="label" style="margin-top:${current ? 20 : 0}px">Saved Workouts</p>
    ${saved.length === 0
      ? '<p class="empty-msg">Save a workout first to schedule it.</p>'
      : `<div class="schedule-workout-list">
          ${saved.map(w => `
            <button class="schedule-workout-item ${current?.workoutId === w.id ? 'active' : ''}"
                    onclick="homeAssignDay(${dayIndex}, '${w.id}')">
              <span class="schedule-workout-name">${w.name}</span>
              <span class="search-item-cat">${w.type === 'emom' ? 'EMOM' : 'Superset'}</span>
            </button>
          `).join('')}
         </div>`
    }

    <p class="label" style="margin-top:20px">Custom Note</p>
    <div style="display:flex;gap:8px">
      <input class="text-input" id="sched-note" type="text"
             placeholder="Rest Day, Active Recovery…"
             value="${current && !current.workoutId ? current.name : ''}" />
      <button class="btn-secondary sm" onclick="homeAssignNote(${dayIndex})">Set</button>
    </div>
  `;

  modal.style.display = 'flex';
}

function homeAssignDay(dayIndex, workoutId) {
  const workout = getSavedWorkouts().find(w => w.id === workoutId);
  if (!workout) return;
  setScheduleDay(dayIndex, { name: workout.name, type: workout.type, workoutId });
  homeCloseSchedule();
  renderHomeTab();
}

function homeAssignNote(dayIndex) {
  const val = document.getElementById('sched-note')?.value.trim();
  if (!val) { showToast('Enter a note first'); return; }
  setScheduleDay(dayIndex, { name: val, type: 'note' });
  homeCloseSchedule();
  renderHomeTab();
}

function homeClearDay(dayIndex) {
  setScheduleDay(dayIndex, null);
  homeCloseSchedule();
  renderHomeTab();
}

function homeCloseSchedule() {
  const modal = document.getElementById('schedule-modal');
  if (modal) modal.style.display = 'none';
}

function homeStartScheduled(workoutId) {
  const workout = getSavedWorkouts().find(w => w.id === workoutId);
  if (!workout) { showToast('Workout not found'); return; }
  if (workout.type === 'emom')      emomLoadWorkout(workout);
  else if (workout.type === 'superset') ssLoadWorkout(workout);
}

function deleteHistoryEntry(id) {
  let history = getHistory().filter(h => h.id !== id);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  renderHomeTab();
}

function attachHistorySwipe() {
  document.querySelectorAll('.history-item').forEach(item => {
    let startX = 0;
    let startY = 0;
    let swiping = false;

    item.addEventListener('touchstart', e => {
      startX  = e.touches[0].clientX;
      startY  = e.touches[0].clientY;
      swiping = false;
    }, { passive: true });

    item.addEventListener('touchmove', e => {
      const dx = e.touches[0].clientX - startX;
      const dy = e.touches[0].clientY - startY;
      if (!swiping && Math.abs(dy) > Math.abs(dx)) return; // vertical scroll wins
      swiping = true;
      if (dx < 0) {
        const clamped = Math.max(dx, -80);
        item.querySelector('.history-item-track').style.transform = `translateX(${clamped}px)`;
      }
    }, { passive: true });

    item.addEventListener('touchend', e => {
      if (!swiping) return;
      const dx = e.changedTouches[0].clientX - startX;
      const track = item.querySelector('.history-item-track');
      if (dx < -40) {
        track.style.transform = 'translateX(-80px)';
        item.classList.add('swiped');
      } else {
        track.style.transform = '';
        item.classList.remove('swiped');
      }
    });
  });
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatDay(d) {
  return d.toLocaleDateString('en-US', { weekday: 'long' });
}

function formatFullDate(d) {
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

function formatRelDate(ts) {
  const days = Math.floor((Date.now() - ts) / 86400000);
  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 7)  return `${days}d ago`;
  return new Date(ts).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}
