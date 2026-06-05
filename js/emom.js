// ── EMOM Tab ─────────────────────────────────────────────────────────────────
// State
let emomEquipment   = [];
let emomWorkout     = [];         // array of exercise objects
let emomMinutes     = 20;
let emomRunning     = false;
let emomPaused      = false;
let emomCurrentIdx  = 0;
let emomTimerVal    = 60;
let emomTimerHandle = null;
let emomStartTime   = null;
let emomTotalElapsed = 0;
let emomIsCustom    = false;
let emomCustomDraft = [];         // exercises being built in custom mode

// Touch swipe state per card
const swipeState = {};

// ── Render ────────────────────────────────────────────────────────────────────

function renderEmomTab() {
  const pane = document.getElementById('tab-emom');
  pane.innerHTML = `
    <div class="section-header">
      <h2>EMOM</h2>
      <span class="section-sub">Every Minute On the Minute</span>
    </div>

    ${emomWorkout.length === 0 ? renderEmomSetup() : (emomRunning || emomPaused ? renderEmomTimer() : renderEmomWorkoutPreview())}
  `;
  attachEmomEvents();
}

function renderEmomSetup() {
  return `
    <div class="setup-block">
      <p class="label">Select Equipment</p>
      <div class="equipment-grid">
        ${EQUIPMENT_OPTIONS.map(eq => `
          <button class="eq-chip ${emomEquipment.includes(eq.id) ? 'active' : ''}"
                  data-eq="${eq.id}" onclick="emomToggleEquipment('${eq.id}')">
            ${eq.label}
          </button>
        `).join('')}
      </div>

      <p class="label" style="margin-top:24px">Duration</p>
      <div class="duration-row">
        <button class="round-btn" onclick="emomChangeDuration(-5)">-5</button>
        <span class="duration-val">${emomMinutes} min</span>
        <button class="round-btn" onclick="emomChangeDuration(5)">+5</button>
      </div>

      <div class="btn-row" style="margin-top:32px">
        <button class="btn-primary" onclick="emomGenerate()">Generate Workout</button>
        <button class="btn-secondary" onclick="emomOpenCustom()">Custom</button>
      </div>
    </div>
  `;
}

function renderEmomWorkoutPreview() {
  return `
    <div class="workout-preview">
      <div class="preview-header">
        <div>
          <p class="preview-label">${emomIsCustom ? 'Custom Workout' : 'Suggested Workout'}</p>
          <p class="preview-sub">${emomWorkout.length} exercises &bull; ${emomMinutes} min</p>
        </div>
        <div class="preview-actions">
          <button class="text-btn" onclick="emomSaveCurrent()">Save</button>
          <button class="text-btn" onclick="emomReset()">Reset</button>
        </div>
      </div>

      <div class="exercise-list" id="emom-exercise-list">
        ${emomWorkout.map((ex, i) => renderExerciseCard(ex, i, 'emom')).join('')}
      </div>

      <button class="btn-primary btn-lg" style="margin-top:24px" onclick="emomStart()">
        Start Workout
      </button>
    </div>

    ${renderCustomModal()}
  `;
}

function renderExerciseCard(ex, index, type) {
  return `
    <div class="exercise-card" id="card-${type}-${index}"
         data-index="${index}" data-type="${type}">
      <div class="card-inner">
        <div class="card-num">${String(index + 1).padStart(2, '0')}</div>
        <div class="card-body">
          <div class="card-name">${ex.name}</div>
          <div class="card-reps-row">
            <button class="rep-btn" onclick="${type}AdjustReps(${index}, -1)">−</button>
            <span class="card-reps" id="${type}-reps-${index}">${ex.reps} ${ex.unit || 'reps'}</span>
            <button class="rep-btn" onclick="${type}AdjustReps(${index}, 1)">+</button>
          </div>
        </div>
        <div class="card-swipe-hint">swipe</div>
      </div>
      <div class="swipe-track"></div>
    </div>
  `;
}

function renderEmomTimer() {
  const ex = emomWorkout[emomCurrentIdx];
  const next = emomWorkout[emomCurrentIdx + 1];
  const progress = (60 - emomTimerVal) / 60;
  const circumference = 2 * Math.PI * 52;
  const offset = circumference * (1 - progress);

  return `
    <div class="timer-screen">
      <div class="timer-meta">
        <span class="timer-progress-label">
          ${emomCurrentIdx + 1} / ${emomWorkout.length}
        </span>
        <button class="text-btn" onclick="emomStop()">End</button>
      </div>

      <div class="timer-ring-wrap">
        <svg class="timer-ring" viewBox="0 0 120 120">
          <circle class="ring-bg" cx="60" cy="60" r="52"/>
          <circle class="ring-fg" cx="60" cy="60" r="52"
            stroke-dasharray="${circumference}"
            stroke-dashoffset="${offset}"
            style="transition: stroke-dashoffset 1s linear;"
          />
        </svg>
        <div class="timer-center">
          <div class="timer-seconds">${emomTimerVal}</div>
          <div class="timer-sec-label">sec</div>
        </div>
      </div>

      <div class="timer-exercise">
        <div class="timer-ex-name">${ex.name}</div>
        <div class="timer-ex-reps">${ex.reps} ${ex.unit || 'reps'}</div>
      </div>

      ${next ? `<div class="timer-next">Up next: <strong>${next.name}</strong></div>` : '<div class="timer-next">Last exercise</div>'}

      <div class="timer-controls">
        <button class="btn-secondary" onclick="emomTogglePause()">
          ${emomPaused ? 'Resume' : 'Pause'}
        </button>
      </div>
    </div>
  `;
}

function renderCustomModal() {
  return `
    <div class="modal-backdrop" id="custom-modal" style="display:none">
      <div class="modal">
        <div class="modal-header">
          <h3>Custom Workout</h3>
          <button class="icon-btn" onclick="emomCloseCustom()">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div class="modal-body">
          <p class="label">Workout Name</p>
          <input class="text-input" id="custom-name" type="text" placeholder="My Workout" />

          <p class="label" style="margin-top:16px">Exercises</p>
          <div id="custom-draft-list">
            ${emomCustomDraft.map((ex, i) => `
              <div class="draft-item">
                <span class="draft-name">${ex.name}</span>
                <div class="draft-controls">
                  <button class="rep-btn" onclick="emomCustomAdjustReps(${i}, -1)">−</button>
                  <span id="draft-reps-${i}">${ex.reps}</span>
                  <button class="rep-btn" onclick="emomCustomAdjustReps(${i}, 1)">+</button>
                  <button class="rep-btn danger" onclick="emomCustomRemove(${i})">×</button>
                </div>
              </div>
            `).join('')}
          </div>

          <p class="label" style="margin-top:16px">Add Exercise</p>
          <input class="text-input" id="exercise-search" type="text" placeholder="Search..."
                 oninput="emomFilterSearch(this.value)" />
          <div class="search-results" id="exercise-search-results">
            ${renderSearchResults('')}
          </div>
        </div>

        <div class="modal-footer">
          <button class="btn-secondary" onclick="emomCloseCustom()">Cancel</button>
          <button class="btn-primary" onclick="emomApplyCustom()">Use Workout</button>
        </div>
      </div>
    </div>
  `;
}

function renderSearchResults(query) {
  const pool = getAvailableExercises(emomEquipment.length ? emomEquipment : []);
  const results = query
    ? pool.filter(ex => ex.name.toLowerCase().includes(query.toLowerCase()))
    : pool.slice(0, 12);

  return results.map(ex => `
    <button class="search-item" onclick="emomCustomAdd('${ex.id}')">
      ${ex.name} <span class="search-item-cat">${ex.category}</span>
    </button>
  `).join('') || '<p class="empty-msg">No matches</p>';
}

// ── Actions ───────────────────────────────────────────────────────────────────

function emomToggleEquipment(id) {
  if (emomEquipment.includes(id)) {
    emomEquipment = emomEquipment.filter(e => e !== id);
  } else {
    emomEquipment.push(id);
  }
  renderEmomTab();
}

function emomChangeDuration(delta) {
  emomMinutes = Math.max(5, Math.min(60, emomMinutes + delta));
  renderEmomTab();
}

function emomGenerate() {
  emomWorkout  = generateEmomWorkout(emomEquipment, emomMinutes);
  emomIsCustom = false;
  renderEmomTab();
}

function emomReset() {
  emomWorkout = [];
  emomIsCustom = false;
  emomCustomDraft = [];
  renderEmomTab();
}

function emomAdjustReps(index, delta) {
  const ex = emomWorkout[index];
  ex.reps = Math.max(1, ex.reps + delta);
  const el = document.getElementById(`emom-reps-${index}`);
  if (el) el.textContent = `${ex.reps} ${ex.unit || 'reps'}`;
}

function emomSaveCurrent() {
  const name = emomIsCustom
    ? (document.getElementById('custom-name')?.value || 'Custom EMOM')
    : `EMOM ${emomMinutes}min`;

  saveWorkout({
    name,
    type: 'emom',
    equipment: [...emomEquipment],
    exercises: emomWorkout.map(ex => ({ ...ex })),
    totalMinutes: emomMinutes,
  });
  showToast('Workout saved');
}

// ── Custom Workout Builder ────────────────────────────────────────────────────

function emomOpenCustom() {
  emomCustomDraft = [];
  renderEmomTab();
  const modal = document.getElementById('custom-modal');
  if (modal) modal.style.display = 'flex';
}

function emomCloseCustom() {
  const modal = document.getElementById('custom-modal');
  if (modal) modal.style.display = 'none';
}

function emomFilterSearch(q) {
  const el = document.getElementById('exercise-search-results');
  if (el) el.innerHTML = renderSearchResults(q);
}

function emomCustomAdd(exerciseId) {
  const ex = EXERCISES.find(e => e.id === exerciseId);
  if (!ex) return;
  emomCustomDraft.push({ ...ex });
  const el = document.getElementById('custom-draft-list');
  if (el) el.innerHTML = emomCustomDraft.map((e, i) => `
    <div class="draft-item">
      <span class="draft-name">${e.name}</span>
      <div class="draft-controls">
        <button class="rep-btn" onclick="emomCustomAdjustReps(${i}, -1)">−</button>
        <span id="draft-reps-${i}">${e.reps}</span>
        <button class="rep-btn" onclick="emomCustomAdjustReps(${i}, 1)">+</button>
        <button class="rep-btn danger" onclick="emomCustomRemove(${i})">×</button>
      </div>
    </div>
  `).join('');
}

function emomCustomAdjustReps(i, delta) {
  emomCustomDraft[i].reps = Math.max(1, emomCustomDraft[i].reps + delta);
  const el = document.getElementById(`draft-reps-${i}`);
  if (el) el.textContent = emomCustomDraft[i].reps;
}

function emomCustomRemove(i) {
  emomCustomDraft.splice(i, 1);
  const el = document.getElementById('custom-draft-list');
  if (el) el.innerHTML = emomCustomDraft.map((e, idx) => `
    <div class="draft-item">
      <span class="draft-name">${e.name}</span>
      <div class="draft-controls">
        <button class="rep-btn" onclick="emomCustomAdjustReps(${idx}, -1)">−</button>
        <span id="draft-reps-${idx}">${e.reps}</span>
        <button class="rep-btn" onclick="emomCustomAdjustReps(${idx}, 1)">+</button>
        <button class="rep-btn danger" onclick="emomCustomRemove(${idx})">×</button>
      </div>
    </div>
  `).join('');
}

function emomApplyCustom() {
  if (emomCustomDraft.length === 0) {
    showToast('Add at least one exercise');
    return;
  }
  emomWorkout  = [...emomCustomDraft];
  emomMinutes  = emomWorkout.length;
  emomIsCustom = true;
  emomCloseCustom();
  renderEmomTab();
}

// ── Timer ─────────────────────────────────────────────────────────────────────

function emomStart(startFrom = 0) {
  emomCurrentIdx = startFrom;
  emomTimerVal   = 60;
  emomRunning    = true;
  emomPaused     = false;
  renderEmomTab();
  beepStart();
  emomTick();
}

function emomTick() {
  if (emomTimerHandle) clearInterval(emomTimerHandle);
  emomTimerHandle = setInterval(() => {
    if (emomPaused) return;
    emomTimerVal--;

    // Countdown beeps
    if (emomTimerVal <= 3 && emomTimerVal > 0) {
      beepCountdown();
    }

    // Update sync if hosting
    if (getSyncStateLabel() === 'hosting' && getIsHost()) {
      pushTimerState({
        state: 'active',
        currentExercise: emomCurrentIdx,
        timerValue: emomTimerVal,
      });
    }

    if (emomTimerVal <= 0) {
      beepEnd();
      emomCurrentIdx++;

      if (emomCurrentIdx >= emomWorkout.length) {
        emomComplete();
        return;
      }

      emomTimerVal = 60;
      beepStart();
    }

    updateTimerDisplay();
  }, 1000);
}

function updateTimerDisplay() {
  const secondsEl = document.querySelector('.timer-seconds');
  const progressLabel = document.querySelector('.timer-progress-label');
  const ringFg = document.querySelector('.ring-fg');
  const exName = document.querySelector('.timer-ex-name');
  const exReps = document.querySelector('.timer-ex-reps');
  const nextEl = document.querySelector('.timer-next');

  if (!secondsEl) return;

  const ex = emomWorkout[emomCurrentIdx];
  const next = emomWorkout[emomCurrentIdx + 1];
  const circumference = 2 * Math.PI * 52;
  const progress = (60 - emomTimerVal) / 60;

  secondsEl.textContent = emomTimerVal;
  if (progressLabel) progressLabel.textContent = `${emomCurrentIdx + 1} / ${emomWorkout.length}`;
  if (ringFg) ringFg.style.strokeDashoffset = circumference * (1 - progress);
  if (exName) exName.textContent = ex.name;
  if (exReps) exReps.textContent = `${ex.reps} ${ex.unit || 'reps'}`;
  if (nextEl) {
    nextEl.innerHTML = next
      ? `Up next: <strong>${next.name}</strong>`
      : 'Last exercise';
  }
}

function emomTogglePause() {
  emomPaused = !emomPaused;
  const btn = document.querySelector('.timer-controls .btn-secondary');
  if (btn) btn.textContent = emomPaused ? 'Resume' : 'Pause';
}

function emomStop() {
  clearInterval(emomTimerHandle);
  emomRunning = false;
  emomPaused  = false;
  if (getSyncStateLabel() === 'hosting') leaveRoom();
  renderEmomTab();
}

function emomComplete() {
  clearInterval(emomTimerHandle);
  emomRunning = false;
  if (getSyncStateLabel() === 'hosting') {
    pushTimerState({ state: 'complete', currentExercise: emomCurrentIdx, timerValue: 0 });
  }
  beepComplete();

  const pane = document.getElementById('tab-emom');
  pane.innerHTML = `
    <div class="complete-screen">
      <div class="complete-icon">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </div>
      <h2 class="complete-title">Workout Complete</h2>
      <p class="complete-sub">${emomWorkout.length} exercises &bull; ${emomMinutes} min</p>
      <button class="btn-primary btn-lg" style="margin-top:40px" onclick="emomReset()">
        New Workout
      </button>
    </div>
  `;
}

// ── Swipe gestures on exercise cards ─────────────────────────────────────────

function attachEmomEvents() {
  document.querySelectorAll('.exercise-card[data-type="emom"]').forEach(card => {
    const index = parseInt(card.dataset.index);
    attachSwipe(card, index, 'emom', emomWorkout, emomEquipment);
  });
}

function attachSwipe(card, index, type, workoutArr, equipment) {
  let startX = 0;
  let currentX = 0;

  card.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
    currentX = startX;
    card.style.transition = 'none';
  }, { passive: true });

  card.addEventListener('touchmove', e => {
    currentX = e.touches[0].clientX;
    const dx = currentX - startX;
    card.querySelector('.card-inner').style.transform = `translateX(${dx}px)`;
  }, { passive: true });

  card.addEventListener('touchend', () => {
    const dx = currentX - startX;
    const inner = card.querySelector('.card-inner');
    inner.style.transition = 'transform 0.25s ease';

    if (Math.abs(dx) > 60) {
      // Swap to an alternative exercise
      const alts = getAlternatives(workoutArr[index], equipment);
      if (alts.length > 0) {
        const alt = alts[Math.floor(Math.random() * alts.length)];
        workoutArr[index] = { ...alt };
        inner.style.transform = `translateX(${dx > 0 ? '120%' : '-120%'})`;
        setTimeout(() => {
          if (type === 'emom') renderEmomTab();
          else if (type === 'superset') renderSupersetTab();
        }, 200);
      } else {
        inner.style.transform = 'translateX(0)';
      }
    } else {
      inner.style.transform = 'translateX(0)';
    }
  });
}

// Load a saved workout into the EMOM tab
function emomLoadWorkout(workout) {
  emomWorkout   = workout.exercises.map(ex => ({ ...ex }));
  emomMinutes   = workout.totalMinutes || workout.exercises.length;
  emomEquipment = workout.equipment || [];
  emomIsCustom  = true;
  switchTab('emom');
  renderEmomTab();
}

// Called by sync join to mirror host's workout
function emomStartSynced(workout, startIdx, timerVal) {
  emomWorkout    = workout.exercises.map(ex => ({ ...ex }));
  emomMinutes    = workout.totalMinutes || workout.exercises.length;
  emomCurrentIdx = startIdx || 0;
  emomTimerVal   = timerVal || 60;
  emomRunning    = true;
  emomPaused     = false;
  renderEmomTab();
}

function emomSyncUpdate(data) {
  if (!emomRunning) return;
  emomCurrentIdx = data.currentExercise;
  emomTimerVal   = data.timerValue;
  if (data.state === 'complete') {
    emomComplete();
    return;
  }
  updateTimerDisplay();
}
