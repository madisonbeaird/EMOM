// ── EMOM Tab ─────────────────────────────────────────────────────────────────
// A workout is N exercises repeated for R rounds.
// Total time = N × R minutes.  Each minute = one exercise.

let emomEquipment        = [];
let emomExercises        = [];   // the unique exercise set (e.g. 5 exercises)
let emomRounds           = 5;    // how many times to repeat the set
let emomExercisesPerRound = 5;   // how many exercises in the set

// Timer state
let emomRunning     = false;
let emomPaused      = false;
let emomTimerVal    = 60;
let emomTimerHandle = null;
let emomCurrentRound = 0;        // 0-indexed
let emomCurrentExIdx = 0;        // 0-indexed position within the exercise set

let emomIsCustom    = false;
let emomCustomDraft = [];

// Convenience: total minutes
function emomTotalMinutes() { return emomExercises.length * emomRounds; }

// ── Render ────────────────────────────────────────────────────────────────────

function renderEmomTab() {
  const pane = document.getElementById('tab-emom');
  const running = emomRunning || emomPaused;
  pane.innerHTML = `
    <div class="section-header">
      <h2>EMOM</h2>
      <span class="section-sub">Every Minute On the Minute</span>
    </div>
    ${emomExercises.length === 0 ? renderEmomSetup() : (running ? renderEmomTimer() : renderEmomWorkoutPreview())}
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

      <p class="label" style="margin-top:24px">Exercises per Round</p>
      <div class="duration-row">
        <button class="round-btn" onclick="emomChangeExercises(-1)">−</button>
        <span class="duration-val">${emomExercisesPerRound}</span>
        <button class="round-btn" onclick="emomChangeExercises(1)">+</button>
      </div>

      <p class="label" style="margin-top:20px">Rounds</p>
      <div class="duration-row">
        <button class="round-btn" onclick="emomChangeRounds(-1)">−</button>
        <span class="duration-val">${emomRounds}</span>
        <button class="round-btn" onclick="emomChangeRounds(1)">+</button>
      </div>

      <div class="total-time-pill">${emomExercisesPerRound * emomRounds} min total</div>

      <div class="btn-row" style="margin-top:28px">
        <button class="btn-primary" onclick="emomGenerate()">Generate Workout</button>
        <button class="btn-secondary" onclick="emomOpenCustom()">Custom</button>
      </div>
    </div>
  `;
}

function renderEmomWorkoutPreview() {
  const total = emomTotalMinutes();
  return `
    <div class="workout-preview">
      <div class="preview-header">
        <div>
          <p class="preview-label">${emomIsCustom ? 'Custom Workout' : 'Suggested Workout'}</p>
          <p class="preview-sub">
            ${emomExercises.length} exercises &times; ${emomRounds} rounds &bull; ${total} min
          </p>
        </div>
        <div class="preview-actions">
          <button class="text-btn" onclick="emomSaveCurrent()">Save</button>
          <button class="text-btn" onclick="emomReset()">Reset</button>
        </div>
      </div>

      <div class="rounds-badge">${emomRounds} &times;</div>

      <div class="exercise-list" id="emom-exercise-list">
        ${emomExercises.map((ex, i) => renderExerciseCard(ex, i, 'emom')).join('')}
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
    </div>
  `;
}

function renderEmomTimer() {
  const ex = emomExercises[emomCurrentExIdx];
  const nextExIdx = (emomCurrentExIdx + 1) % emomExercises.length;
  const nextRound = emomCurrentExIdx + 1 >= emomExercises.length ? emomCurrentRound + 1 : emomCurrentRound;
  const isLastEx  = emomCurrentRound >= emomRounds - 1 && emomCurrentExIdx >= emomExercises.length - 1;
  const circumference = 2 * Math.PI * 52;
  const offset = circumference * (emomTimerVal / 60);

  return `
    <div class="timer-screen">
      <div class="timer-meta">
        <div class="timer-round-info">
          <span class="timer-round-label">Round ${emomCurrentRound + 1} / ${emomRounds}</span>
          <span class="timer-ex-counter">${emomCurrentExIdx + 1} / ${emomExercises.length}</span>
        </div>
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

      ${isLastEx
        ? '<div class="timer-next">Last exercise</div>'
        : `<div class="timer-next">Up next: <strong>${emomExercises[nextExIdx].name}</strong>${nextRound > emomCurrentRound ? ' &mdash; Round ' + (nextRound + 1) : ''}</div>`
      }

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

          <div style="display:flex;gap:16px;margin-top:16px;align-items:flex-end">
            <div style="flex:1">
              <p class="label">Rounds</p>
              <div class="duration-row" style="margin-top:0">
                <button class="round-btn sm" onclick="emomCustomChangeRounds(-1)">−</button>
                <span class="duration-val" id="custom-rounds-val" style="font-size:20px">${emomRounds}</span>
                <button class="round-btn sm" onclick="emomCustomChangeRounds(1)">+</button>
              </div>
            </div>
            <div style="flex:1">
              <p class="label" id="custom-total-label">Total: ${emomCustomDraft.length * emomRounds} min</p>
            </div>
          </div>

          <p class="label" style="margin-top:16px">Exercises</p>
          <div id="custom-draft-list">${renderDraftList()}</div>

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

function renderDraftList() {
  if (emomCustomDraft.length === 0) return '<p class="empty-msg">No exercises yet.</p>';
  return emomCustomDraft.map((ex, i) => `
    <div class="draft-item">
      <span class="draft-name">${ex.name}</span>
      <div class="draft-controls">
        <button class="rep-btn" onclick="emomCustomAdjustReps(${i}, -1)">−</button>
        <span id="draft-reps-${i}">${ex.reps}</span>
        <button class="rep-btn" onclick="emomCustomAdjustReps(${i}, 1)">+</button>
        <button class="rep-btn danger" onclick="emomCustomRemove(${i})">×</button>
      </div>
    </div>
  `).join('');
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

// ── Setup Actions ─────────────────────────────────────────────────────────────

function emomToggleEquipment(id) {
  if (emomEquipment.includes(id)) emomEquipment = emomEquipment.filter(e => e !== id);
  else emomEquipment.push(id);
  renderEmomTab();
}

function emomChangeExercises(delta) {
  emomExercisesPerRound = Math.max(1, Math.min(10, emomExercisesPerRound + delta));
  renderEmomTab();
}

function emomChangeRounds(delta) {
  emomRounds = Math.max(1, Math.min(20, emomRounds + delta));
  renderEmomTab();
}

function emomGenerate() {
  emomExercises = generateEmomWorkout(emomEquipment, emomExercisesPerRound);
  emomIsCustom  = false;
  renderEmomTab();
}

function emomReset() {
  emomExercises   = [];
  emomIsCustom    = false;
  emomCustomDraft = [];
  renderEmomTab();
}

function emomAdjustReps(index, delta) {
  emomExercises[index].reps = Math.max(1, emomExercises[index].reps + delta);
  const el = document.getElementById(`emom-reps-${index}`);
  if (el) el.textContent = `${emomExercises[index].reps} ${emomExercises[index].unit || 'reps'}`;
}

function emomSaveCurrent() {
  saveWorkout({
    name: emomIsCustom
      ? (document.getElementById('custom-name')?.value || 'Custom EMOM')
      : `EMOM ${emomExercises.length}x${emomRounds}`,
    type: 'emom',
    equipment: [...emomEquipment],
    exercises: emomExercises.map(ex => ({ ...ex })),
    rounds: emomRounds,
    exercisesPerRound: emomExercises.length,
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

function emomCustomChangeRounds(delta) {
  emomRounds = Math.max(1, Math.min(20, emomRounds + delta));
  const el = document.getElementById('custom-rounds-val');
  if (el) el.textContent = emomRounds;
  const label = document.getElementById('custom-total-label');
  if (label) label.textContent = `Total: ${emomCustomDraft.length * emomRounds} min`;
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
  if (el) el.innerHTML = renderDraftList();
  const label = document.getElementById('custom-total-label');
  if (label) label.textContent = `Total: ${emomCustomDraft.length * emomRounds} min`;
}

function emomCustomAdjustReps(i, delta) {
  emomCustomDraft[i].reps = Math.max(1, emomCustomDraft[i].reps + delta);
  const el = document.getElementById(`draft-reps-${i}`);
  if (el) el.textContent = emomCustomDraft[i].reps;
}

function emomCustomRemove(i) {
  emomCustomDraft.splice(i, 1);
  const el = document.getElementById('custom-draft-list');
  if (el) el.innerHTML = renderDraftList();
  const label = document.getElementById('custom-total-label');
  if (label) label.textContent = `Total: ${emomCustomDraft.length * emomRounds} min`;
}

function emomApplyCustom() {
  if (emomCustomDraft.length === 0) { showToast('Add at least one exercise'); return; }
  emomExercises        = [...emomCustomDraft];
  emomExercisesPerRound = emomExercises.length;
  emomIsCustom          = true;
  emomCloseCustom();
  renderEmomTab();
}

// ── Timer ─────────────────────────────────────────────────────────────────────

function emomStart() {
  emomCurrentRound  = 0;
  emomCurrentExIdx  = 0;
  emomTimerVal      = 60;
  emomRunning       = true;
  emomPaused        = false;
  requestWakeLock();
  renderEmomTab();
  beepStart();
  emomTick();
}

function emomTick() {
  if (emomTimerHandle) clearInterval(emomTimerHandle);
  emomTimerHandle = setInterval(() => {
    if (emomPaused) return;
    emomTimerVal--;

    if (emomTimerVal <= 3 && emomTimerVal > 0) beepCountdown();

    if (getSyncStateLabel() === 'hosting' && getIsHost()) {
      pushTimerState({
        state: 'active',
        currentRound: emomCurrentRound,
        currentExIdx: emomCurrentExIdx,
        timerValue: emomTimerVal,
      });
    }

    if (emomTimerVal <= 0) {
      beepEnd();
      emomAdvance();
      return;
    }

    updateTimerDisplay();
  }, 1000);
}

function emomAdvance() {
  emomCurrentExIdx++;
  if (emomCurrentExIdx >= emomExercises.length) {
    emomCurrentExIdx = 0;
    emomCurrentRound++;
  }

  if (emomCurrentRound >= emomRounds) {
    emomComplete();
    return;
  }

  emomTimerVal = 60;
  beepStart();
  updateTimerDisplay();
}

function updateTimerDisplay() {
  const secondsEl    = document.querySelector('.timer-seconds');
  const roundLabel   = document.querySelector('.timer-round-label');
  const exCounter    = document.querySelector('.timer-ex-counter');
  const ringFg       = document.querySelector('.ring-fg');
  const exName       = document.querySelector('.timer-ex-name');
  const exReps       = document.querySelector('.timer-ex-reps');
  const nextEl       = document.querySelector('.timer-next');

  if (!secondsEl) return;

  const ex = emomExercises[emomCurrentExIdx];
  const nextExIdx = (emomCurrentExIdx + 1) % emomExercises.length;
  const nextRound = emomCurrentExIdx + 1 >= emomExercises.length ? emomCurrentRound + 1 : emomCurrentRound;
  const isLastEx  = emomCurrentRound >= emomRounds - 1 && emomCurrentExIdx >= emomExercises.length - 1;
  const circumference = 2 * Math.PI * 52;

  secondsEl.textContent = emomTimerVal;
  if (roundLabel) roundLabel.textContent = `Round ${emomCurrentRound + 1} / ${emomRounds}`;
  if (exCounter)  exCounter.textContent  = `${emomCurrentExIdx + 1} / ${emomExercises.length}`;
  if (ringFg)     ringFg.style.strokeDashoffset = circumference * (emomTimerVal / 60);
  if (exName)     exName.textContent = ex.name;
  if (exReps)     exReps.textContent = `${ex.reps} ${ex.unit || 'reps'}`;
  if (nextEl) {
    nextEl.innerHTML = isLastEx
      ? 'Last exercise'
      : `Up next: <strong>${emomExercises[nextExIdx].name}</strong>${nextRound > emomCurrentRound ? ' &mdash; Round ' + (nextRound + 1) : ''}`;
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
  releaseWakeLock();
  if (getSyncStateLabel() === 'hosting') leaveRoom();
  renderEmomTab();
}

function emomComplete() {
  clearInterval(emomTimerHandle);
  emomRunning = false;
  releaseWakeLock();
  if (getSyncStateLabel() === 'hosting') {
    pushTimerState({ state: 'complete', currentRound: emomRounds, currentExIdx: 0, timerValue: 0 });
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
      <p class="complete-sub">${emomExercises.length} exercises &times; ${emomRounds} rounds &bull; ${emomTotalMinutes()} min</p>
      <button class="btn-primary btn-lg" style="margin-top:40px" onclick="emomReset()">
        New Workout
      </button>
    </div>
  `;
}

// ── Swipe gestures ────────────────────────────────────────────────────────────

function attachEmomEvents() {
  document.querySelectorAll('.exercise-card[data-type="emom"]').forEach(card => {
    const index = parseInt(card.dataset.index);
    attachSwipe(card, index, 'emom', emomExercises, emomEquipment);
  });
}

function attachSwipe(card, index, type, exerciseArr, equipment) {
  let startX = 0;
  let currentX = 0;

  card.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
    currentX = startX;
    card.style.transition = 'none';
  }, { passive: true });

  card.addEventListener('touchmove', e => {
    currentX = e.touches[0].clientX;
    card.querySelector('.card-inner').style.transform = `translateX(${currentX - startX}px)`;
  }, { passive: true });

  card.addEventListener('touchend', () => {
    const dx = currentX - startX;
    const inner = card.querySelector('.card-inner');
    inner.style.transition = 'transform 0.25s ease';

    if (Math.abs(dx) > 60) {
      const alts = getAlternatives(exerciseArr[index], equipment);
      if (alts.length > 0) {
        exerciseArr[index] = { ...alts[Math.floor(Math.random() * alts.length)] };
        inner.style.transform = `translateX(${dx > 0 ? '120%' : '-120%'})`;
        setTimeout(() => {
          if (type === 'emom') renderEmomTab();
          else renderSupersetTab();
        }, 200);
      } else {
        inner.style.transform = 'translateX(0)';
      }
    } else {
      inner.style.transform = 'translateX(0)';
    }
  });
}

// ── Load / Sync ───────────────────────────────────────────────────────────────

function emomLoadWorkout(workout) {
  emomExercises         = workout.exercises.map(ex => ({ ...ex }));
  emomRounds            = workout.rounds || 5;
  emomExercisesPerRound = emomExercises.length;
  emomEquipment         = workout.equipment || [];
  emomIsCustom          = true;
  switchTab('emom');
  renderEmomTab();
}

function emomStartSynced(workout, round, exIdx, timerVal) {
  emomExercises         = workout.exercises.map(ex => ({ ...ex }));
  emomRounds            = workout.rounds || 5;
  emomExercisesPerRound = emomExercises.length;
  emomCurrentRound      = round  || 0;
  emomCurrentExIdx      = exIdx  || 0;
  emomTimerVal          = timerVal || 60;
  emomRunning           = true;
  emomPaused            = false;
  renderEmomTab();
}

function emomSyncUpdate(data) {
  if (!emomRunning) return;
  if (data.state === 'complete') { emomComplete(); return; }
  emomCurrentRound = data.currentRound || 0;
  emomCurrentExIdx = data.currentExIdx || 0;
  emomTimerVal     = data.timerValue;
  updateTimerDisplay();
}
