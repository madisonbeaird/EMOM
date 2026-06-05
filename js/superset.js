// ── Superset Tab ─────────────────────────────────────────────────────────────
let ssEquipment   = [];
let ssSplits      = [];     // selected muscle group ids (multi-select)
let ssWorkout     = [];
let ssRunning     = false;
let ssPairIdx     = 0;
let ssSetIdx      = 0;
let ssPhase       = 'A';
let ssRestVal     = 0;
let ssRestHandle  = null;
let ssIsCustom    = false;
let ssCustomDraft = [];

function renderSupersetTab() {
  const pane = document.getElementById('tab-superset');
  pane.innerHTML = `
    <div class="section-header">
      <h2>Superset</h2>
    </div>
    ${ssWorkout.length === 0 ? renderSupersetSetup() : (ssRunning ? renderSupersetActive() : renderSupersetPreview())}
  `;
  attachSupersetEvents();
}

// ── Setup ─────────────────────────────────────────────────────────────────────

function renderSupersetSetup() {
  return `
    <div class="setup-block">
      <p class="label">Select Equipment</p>
      <div class="equipment-grid">
        ${EQUIPMENT_OPTIONS.map(eq => `
          <button class="eq-chip ${ssEquipment.includes(eq.id) ? 'active' : ''}"
                  data-eq="${eq.id}" onclick="ssToggleEquipment('${eq.id}')">
            ${eq.label}
          </button>
        `).join('')}
      </div>

      <p class="label" style="margin-top:24px">Select Muscle Groups</p>
      <p class="split-hint">Pick one or more to build your split</p>
      <div class="muscle-grid">
        ${MUSCLE_GROUPS.map(g => `
          <button class="muscle-chip ${ssSplits.includes(g.id) ? 'active' : ''}"
                  onclick="ssToggleMuscle('${g.id}')">
            ${g.label}
          </button>
        `).join('')}
      </div>

      ${ssSplits.length > 0 ? `
        <div class="selected-split-label">
          ${ssSplits.map(id => MUSCLE_GROUPS.find(g => g.id === id)?.label).join(' + ')}
        </div>
      ` : ''}

      <div class="btn-row" style="margin-top:24px">
        <button class="btn-primary" onclick="ssGenerate()" ${ssSplits.length === 0 ? 'disabled' : ''}>
          Generate Workout
        </button>
        <button class="btn-secondary" onclick="ssOpenCustom()">Custom</button>
      </div>
    </div>
  `;
}

// ── Preview ───────────────────────────────────────────────────────────────────

function renderSupersetPreview() {
  const splitLabel = ssSplits.length ? ssSplits.map(id => MUSCLE_GROUPS.find(g => g.id === id)?.label).join(' + ') : 'Custom';
  return `
    <div class="workout-preview">
      <div class="preview-header">
        <div>
          <p class="preview-label">${ssIsCustom ? 'Custom' : (ssSplits.map(id => MUSCLE_GROUPS.find(g=>g.id===id)?.label).join(' + '))} Superset</p>
          <p class="preview-sub">${ssWorkout.length} pairs</p>
        </div>
        <div class="preview-actions">
          <button class="text-btn" onclick="ssSaveCurrent()">Save</button>
          <button class="text-btn" onclick="ssReset()">Reset</button>
        </div>
      </div>

      <div class="superset-list" id="superset-list">
        ${ssWorkout.map((ss, i) => renderSupersetCard(ss, i)).join('')}
      </div>

      <button class="btn-primary btn-lg" style="margin-top:24px" onclick="ssStart()">
        Start Workout
      </button>
    </div>

    ${renderSsCustomModal()}
  `;
}

function renderSupersetCard(ss, i) {
  return `
    <div class="superset-card">
      <div class="superset-label">Superset ${i + 1}</div>

      <div class="exercise-card" id="card-ss-a-${i}"
           data-index="${i}" data-subtype="A" data-type="ss">
        <div class="card-inner">
          <div class="card-num">A</div>
          <div class="card-body">
            <div class="card-name">${ss.exerciseA.name}</div>
            <div class="card-reps-row">
              <button class="rep-btn" onclick="ssAdjustSets(${i}, -1)">−</button>
              <span class="card-reps" id="ss-sets-a-${i}">${ss.exerciseA.sets} sets</span>
              <button class="rep-btn" onclick="ssAdjustSets(${i}, 1)">+</button>
              &nbsp;
              <button class="rep-btn" onclick="ssAdjustReps(${i}, 'A', -1)">−</button>
              <span class="card-reps" id="ss-reps-a-${i}">${ss.exerciseA.reps} ${ss.exerciseA.unit || 'reps'}</span>
              <button class="rep-btn" onclick="ssAdjustReps(${i}, 'A', 1)">+</button>
            </div>
          </div>
          <div class="card-swipe-hint">swipe</div>
        </div>
      </div>

      <div class="superset-divider">+</div>

      <div class="exercise-card" id="card-ss-b-${i}"
           data-index="${i}" data-subtype="B" data-type="ss">
        <div class="card-inner">
          <div class="card-num">B</div>
          <div class="card-body">
            <div class="card-name">${ss.exerciseB.name}</div>
            <div class="card-reps-row">
              <button class="rep-btn" onclick="ssAdjustSets(${i}, -1)">−</button>
              <span class="card-reps" id="ss-sets-b-${i}">${ss.exerciseB.sets} sets</span>
              <button class="rep-btn" onclick="ssAdjustSets(${i}, 1)">+</button>
              &nbsp;
              <button class="rep-btn" onclick="ssAdjustReps(${i}, 'B', -1)">−</button>
              <span class="card-reps" id="ss-reps-b-${i}">${ss.exerciseB.reps} ${ss.exerciseB.unit || 'reps'}</span>
              <button class="rep-btn" onclick="ssAdjustReps(${i}, 'B', 1)">+</button>
            </div>
          </div>
          <div class="card-swipe-hint">swipe</div>
        </div>
      </div>

      <div class="rest-row">
        <span class="label">Rest between sets</span>
        <div class="duration-row" style="margin-top:0">
          <button class="round-btn sm" onclick="ssAdjustRest(${i}, -15)">-15</button>
          <span id="ss-rest-${i}">${ss.restSeconds}s</span>
          <button class="round-btn sm" onclick="ssAdjustRest(${i}, 15)">+15</button>
        </div>
      </div>
    </div>
  `;
}

// ── Active ────────────────────────────────────────────────────────────────────

function renderSupersetActive() {
  const ss = ssWorkout[ssPairIdx];

  if (ssPhase === 'rest') {
    const circ = 2 * Math.PI * 52;
    return `
      <div class="timer-screen">
        <div class="timer-meta">
          <span class="timer-progress-label">Rest — Set ${ssSetIdx} of ${ss.exerciseA.sets}</span>
          <button class="text-btn" onclick="ssStop()">End</button>
        </div>
        <div class="timer-ring-wrap">
          <svg class="timer-ring" viewBox="0 0 120 120">
            <circle class="ring-bg" cx="60" cy="60" r="52"/>
            <circle class="ring-fg" cx="60" cy="60" r="52"
              stroke-dasharray="${circ}"
              stroke-dashoffset="${circ * (1 - ssRestVal / ss.restSeconds)}"
              style="transition: stroke-dashoffset 1s linear;"
            />
          </svg>
          <div class="timer-center">
            <div class="timer-seconds">${ssRestVal}</div>
            <div class="timer-sec-label">rest</div>
          </div>
        </div>
        <div class="timer-exercise">
          <div class="timer-ex-name">Recovery</div>
          <div class="timer-ex-reps">Next: ${ss.exerciseA.name}</div>
        </div>
        <div class="timer-controls">
          <button class="btn-secondary" onclick="ssSkipRest()">Skip Rest</button>
        </div>
      </div>
    `;
  }

  const ex = ssPhase === 'A' ? ss.exerciseA : ss.exerciseB;
  const nextLabel = ssPhase === 'A' ? ss.exerciseB.name : `Rest ${ss.restSeconds}s`;

  return `
    <div class="timer-screen">
      <div class="timer-meta">
        <span class="timer-progress-label">
          Pair ${ssPairIdx + 1}/${ssWorkout.length} &bull; Set ${ssSetIdx + 1}/${ss.exerciseA.sets}
        </span>
        <button class="text-btn" onclick="ssStop()">End</button>
      </div>

      <div class="ss-phase-badge phase-${ssPhase.toLowerCase()}">${ssPhase}</div>

      <div class="ss-active-exercise">
        <div class="timer-ex-name">${ex.name}</div>
        <div class="timer-ex-reps">${ex.reps} ${ex.unit || 'reps'}</div>
      </div>

      <div class="timer-next">Up next: <strong>${nextLabel}</strong></div>

      <div class="timer-controls">
        <button class="btn-primary btn-lg" onclick="ssDone()">Done</button>
      </div>
    </div>
  `;
}

// ── Custom Modal ──────────────────────────────────────────────────────────────

function renderSsCustomModal() {
  return `
    <div class="modal-backdrop" id="ss-custom-modal" style="display:none">
      <div class="modal">
        <div class="modal-header">
          <h3>Custom Superset</h3>
          <button class="icon-btn" onclick="ssCancelCustom()">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        <div class="modal-body">
          <p class="label">Pairs</p>
          <div id="ss-draft-list">${renderSsDraftList()}</div>
          <button class="btn-secondary" style="margin-top:12px;width:100%" onclick="ssCustomAddPair()">
            + Add Pair
          </button>
        </div>
        <div class="modal-footer">
          <button class="btn-secondary" onclick="ssCancelCustom()">Cancel</button>
          <button class="btn-primary" onclick="ssApplyCustom()">Use Workout</button>
        </div>
      </div>
    </div>
  `;
}

function renderSsDraftList() {
  if (ssCustomDraft.length === 0) return '<p class="empty-msg">No pairs yet. Tap Add Pair to begin.</p>';
  return ssCustomDraft.map((pair, i) => `
    <div class="draft-pair">
      <div class="draft-pair-header">
        <span>Pair ${i + 1}</span>
        <button class="rep-btn danger" onclick="ssCustomRemovePair(${i})">×</button>
      </div>
      <select class="select-input" onchange="ssCustomSetExercise(${i},'A',this.value)">
        ${getAvailableExercises(ssEquipment).map(ex => `
          <option value="${ex.id}" ${pair.exerciseA.id === ex.id ? 'selected' : ''}>${ex.name}</option>
        `).join('')}
      </select>
      <select class="select-input" onchange="ssCustomSetExercise(${i},'B',this.value)">
        ${getAvailableExercises(ssEquipment).map(ex => `
          <option value="${ex.id}" ${pair.exerciseB.id === ex.id ? 'selected' : ''}>${ex.name}</option>
        `).join('')}
      </select>
      <div class="draft-controls" style="margin-top:8px">
        <span class="label" style="margin:0;font-size:11px">Sets:</span>
        <button class="rep-btn" onclick="ssCustomAdjustSets(${i}, -1)">−</button>
        <span id="ss-draft-sets-${i}">${pair.exerciseA.sets}</span>
        <button class="rep-btn" onclick="ssCustomAdjustSets(${i}, 1)">+</button>
        <span class="label" style="margin:0 0 0 12px;font-size:11px">Rest:</span>
        <button class="rep-btn" onclick="ssCustomAdjustRest(${i}, -15)">−</button>
        <span id="ss-draft-rest-${i}">${pair.restSeconds}s</span>
        <button class="rep-btn" onclick="ssCustomAdjustRest(${i}, 15)">+</button>
      </div>
    </div>
  `).join('');
}

// ── Setup Actions ─────────────────────────────────────────────────────────────

function ssToggleEquipment(id) {
  if (ssEquipment.includes(id)) ssEquipment = ssEquipment.filter(e => e !== id);
  else ssEquipment.push(id);
  renderSupersetTab();
}

function ssToggleMuscle(id) {
  if (ssSplits.includes(id)) ssSplits = ssSplits.filter(m => m !== id);
  else ssSplits.push(id);
  renderSupersetTab();
}

function ssGenerate() {
  if (ssSplits.length === 0) { showToast('Select at least one muscle group'); return; }
  ssWorkout  = generateSupersetWorkout(ssSplits, ssEquipment);
  ssIsCustom = false;
  if (ssWorkout.length === 0) {
    showToast('No exercises found — try adding equipment');
    return;
  }
  renderSupersetTab();
}

function ssReset() {
  ssWorkout     = [];
  ssIsCustom    = false;
  ssCustomDraft = [];
  renderSupersetTab();
}

function ssAdjustReps(i, side, delta) {
  const ex = side === 'A' ? ssWorkout[i].exerciseA : ssWorkout[i].exerciseB;
  ex.reps = Math.max(1, ex.reps + delta);
  const el = document.getElementById(`ss-reps-${side.toLowerCase()}-${i}`);
  if (el) el.textContent = `${ex.reps} ${ex.unit || 'reps'}`;
}

function ssAdjustSets(i, delta) {
  const sets = Math.max(1, ssWorkout[i].exerciseA.sets + delta);
  ssWorkout[i].exerciseA.sets = sets;
  ssWorkout[i].exerciseB.sets = sets;
  ['a','b'].forEach(s => {
    const el = document.getElementById(`ss-sets-${s}-${i}`);
    if (el) el.textContent = `${sets} sets`;
  });
}

function ssAdjustRest(i, delta) {
  ssWorkout[i].restSeconds = Math.max(0, ssWorkout[i].restSeconds + delta);
  const el = document.getElementById(`ss-rest-${i}`);
  if (el) el.textContent = `${ssWorkout[i].restSeconds}s`;
}

function ssSaveCurrent() {
  const splitLabel = ssSplits.length
    ? ssSplits.map(id => MUSCLE_GROUPS.find(g => g.id === id)?.label).join(' + ')
    : 'Custom';
  saveWorkout({
    name: `${splitLabel} Superset`,
    type: 'superset',
    equipment: [...ssEquipment],
    splits: [...ssSplits],
    exercises: ssWorkout,
  });
  showToast('Workout saved');
}

// ── Custom ────────────────────────────────────────────────────────────────────

function ssOpenCustom() {
  ssCustomDraft = [];
  renderSupersetTab();
  const modal = document.getElementById('ss-custom-modal');
  if (modal) modal.style.display = 'flex';
}

function ssCancelCustom() {
  const modal = document.getElementById('ss-custom-modal');
  if (modal) modal.style.display = 'none';
}

function ssCustomAddPair() {
  const pool = getAvailableExercises(ssEquipment);
  if (pool.length < 2) { showToast('Select equipment first'); return; }
  ssCustomDraft.push({
    id: `custom_ss_${ssCustomDraft.length}`,
    exerciseA: { ...pool[0], sets: 3 },
    exerciseB: { ...pool[Math.min(1, pool.length - 1)], sets: 3 },
    restSeconds: 60,
  });
  const el = document.getElementById('ss-draft-list');
  if (el) el.innerHTML = renderSsDraftList();
}

function ssCustomRemovePair(i) {
  ssCustomDraft.splice(i, 1);
  const el = document.getElementById('ss-draft-list');
  if (el) el.innerHTML = renderSsDraftList();
}

function ssCustomSetExercise(pairIdx, side, exerciseId) {
  const ex = EXERCISES.find(e => e.id === exerciseId);
  if (!ex) return;
  const pair = ssCustomDraft[pairIdx];
  const sets = pair.exerciseA.sets;
  if (side === 'A') pair.exerciseA = { ...ex, sets };
  else              pair.exerciseB = { ...ex, sets };
}

function ssCustomAdjustSets(i, delta) {
  const sets = Math.max(1, ssCustomDraft[i].exerciseA.sets + delta);
  ssCustomDraft[i].exerciseA.sets = sets;
  ssCustomDraft[i].exerciseB.sets = sets;
  const el = document.getElementById(`ss-draft-sets-${i}`);
  if (el) el.textContent = sets;
}

function ssCustomAdjustRest(i, delta) {
  ssCustomDraft[i].restSeconds = Math.max(0, ssCustomDraft[i].restSeconds + delta);
  const el = document.getElementById(`ss-draft-rest-${i}`);
  if (el) el.textContent = `${ssCustomDraft[i].restSeconds}s`;
}

function ssApplyCustom() {
  if (ssCustomDraft.length === 0) { showToast('Add at least one pair'); return; }
  ssWorkout  = ssCustomDraft.map(p => ({ ...p }));
  ssIsCustom = true;
  ssCancelCustom();
  renderSupersetTab();
}

// ── Active Workout ────────────────────────────────────────────────────────────

function ssStart() {
  ssPairIdx = 0;
  ssSetIdx  = 0;
  ssPhase   = 'A';
  ssRunning = true;
  renderSupersetTab();
  beepStart();
}

function ssDone() {
  const ss = ssWorkout[ssPairIdx];
  if (ssPhase === 'A') {
    ssPhase = 'B';
    beepStart();
    renderSupersetTab();
    return;
  }

  ssSetIdx++;
  if (ssSetIdx >= ss.exerciseA.sets) {
    ssPairIdx++;
    ssSetIdx = 0;
    if (ssPairIdx >= ssWorkout.length) { ssComplete(); return; }
  }

  if (ss.restSeconds > 0) {
    ssPhase   = 'rest';
    ssRestVal = ss.restSeconds;
    renderSupersetTab();
    ssRestHandle = setInterval(() => {
      ssRestVal--;
      const el   = document.querySelector('.timer-seconds');
      const ring = document.querySelector('.ring-fg');
      if (el)   el.textContent = ssRestVal;
      if (ring) {
        const circ = 2 * Math.PI * 52;
        ring.style.strokeDashoffset = circ * (1 - ssRestVal / ss.restSeconds);
      }
      if (ssRestVal <= 3 && ssRestVal > 0) beepCountdown();
      if (ssRestVal <= 0) {
        clearInterval(ssRestHandle);
        ssPhase = 'A';
        beepStart();
        renderSupersetTab();
      }
    }, 1000);
  } else {
    ssPhase = 'A';
    beepStart();
    renderSupersetTab();
  }
}

function ssSkipRest() {
  clearInterval(ssRestHandle);
  ssPhase = 'A';
  renderSupersetTab();
}

function ssStop() {
  clearInterval(ssRestHandle);
  ssRunning = false;
  ssPhase   = 'A';
  renderSupersetTab();
}

function ssComplete() {
  clearInterval(ssRestHandle);
  ssRunning = false;
  beepComplete();
  const pane = document.getElementById('tab-superset');
  pane.innerHTML = `
    <div class="complete-screen">
      <div class="complete-icon">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </div>
      <h2 class="complete-title">Workout Complete</h2>
      <p class="complete-sub">${ssWorkout.length} supersets finished</p>
      <button class="btn-primary btn-lg" style="margin-top:40px" onclick="ssReset()">
        New Workout
      </button>
    </div>
  `;
}

// ── Swipe ─────────────────────────────────────────────────────────────────────

function attachSupersetEvents() {
  document.querySelectorAll('.exercise-card[data-type="ss"]').forEach(card => {
    const index   = parseInt(card.dataset.index);
    const subtype = card.dataset.subtype;
    const proxyArr = new Proxy(
      ssWorkout.map(ss => subtype === 'A' ? ss.exerciseA : ss.exerciseB),
      {
        set(target, prop, value) {
          target[prop] = value;
          const i = parseInt(prop);
          if (!isNaN(i)) {
            if (subtype === 'A') ssWorkout[i].exerciseA = value;
            else                 ssWorkout[i].exerciseB = value;
          }
          return true;
        }
      }
    );
    attachSwipe(card, index, 'ss_' + subtype, proxyArr, ssEquipment);
  });
}

function ssLoadWorkout(workout) {
  ssWorkout   = workout.exercises;
  ssEquipment = workout.equipment || [];
  ssSplits    = workout.splits || (workout.split ? [workout.split] : []);
  ssIsCustom  = true;
  switchTab('superset');
  renderSupersetTab();
}
