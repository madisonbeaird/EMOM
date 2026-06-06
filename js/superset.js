// ── Superset Tab ─────────────────────────────────────────────────────────────
let ssEquipment   = [];
let ssSplits      = [];
let ssNumPairs    = 4;      // how many supersets to generate
let ssWorkout     = [];
let ssRunning     = false;
let ssPairIdx     = 0;
let ssSetIdx      = 0;
let ssPhase       = 'A';   // 'A' | 'B' | 'rest'
let ssIsCustom    = false;
let ssCustomDraft = [];

// ── Render ────────────────────────────────────────────────────────────────────

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

      <p class="label" style="margin-top:24px">Number of Supersets</p>
      <div class="duration-row">
        <button class="round-btn" onclick="ssChangePairs(-1)">−</button>
        <span class="duration-val">${ssNumPairs}</span>
        <button class="round-btn" onclick="ssChangePairs(1)">+</button>
      </div>

      <div class="btn-row" style="margin-top:28px">
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
  const splitLabel = ssSplits.length
    ? ssSplits.map(id => MUSCLE_GROUPS.find(g => g.id === id)?.label).join(' + ')
    : 'Custom';
  return `
    <div class="workout-preview">
      <div class="preview-header">
        <div>
          <p class="preview-label">${ssIsCustom ? 'Custom' : splitLabel} Superset</p>
          <p class="preview-sub">${ssWorkout.length} supersets</p>
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
    </div>
  `;
}

// ── Active Workout — no timers ────────────────────────────────────────────────

function renderSupersetActive() {
  const ss = ssWorkout[ssPairIdx];

  // Rest screen between sets — no countdown, just a prompt
  if (ssPhase === 'rest') {
    return `
      <div class="ss-active-screen">
        <div class="ss-active-meta">
          <span class="timer-progress-label">
            Superset ${ssPairIdx + 1} / ${ssWorkout.length} &bull; Set ${ssSetIdx} done
          </span>
          <button class="text-btn" onclick="ssStop()">End</button>
        </div>

        <div class="ss-rest-block">
          <div class="ss-rest-label">Rest</div>
          <div class="ss-rest-sub">Take as long as you need</div>
        </div>

        <div class="ss-next-preview">
          Up next &mdash; <strong>${ss.exerciseA.name}</strong>
        </div>

        <div class="ss-active-controls">
          <button class="btn-primary btn-lg" onclick="ssNextSet()">Next Set</button>
        </div>
      </div>
    `;
  }

  const ex         = ssPhase === 'A' ? ss.exerciseA : ss.exerciseB;
  const isLastPhase = ssPhase === 'B';
  const nextLabel  = ssPhase === 'A'
    ? ss.exerciseB.name
    : (ssSetIdx + 1 < ss.exerciseA.sets ? 'Rest' : (ssPairIdx + 1 < ssWorkout.length ? `Superset ${ssPairIdx + 2}` : 'Finish'));

  return `
    <div class="ss-active-screen">
      <div class="ss-active-meta">
        <div>
          <div class="timer-round-label">Superset ${ssPairIdx + 1} / ${ssWorkout.length}</div>
          <div class="timer-ex-counter">Set ${ssSetIdx + 1} of ${ss.exerciseA.sets}</div>
        </div>
        <button class="text-btn" onclick="ssStop()">End</button>
      </div>

      <div class="ss-phase-badge phase-${ssPhase.toLowerCase()}">${ssPhase}</div>

      <div class="ss-exercise-block">
        <div class="ss-exercise-name">${ex.name}</div>
        <div class="ss-exercise-reps">${ex.reps} ${ex.unit || 'reps'}</div>
      </div>

      <div class="timer-next">Up next: <strong>${nextLabel}</strong></div>

      <div class="ss-active-controls">
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

function ssChangePairs(delta) {
  ssNumPairs = Math.max(1, Math.min(10, ssNumPairs + delta));
  renderSupersetTab();
}

function ssGenerate() {
  if (ssSplits.length === 0) { showToast('Select at least one muscle group'); return; }
  ssWorkout = generateSupersetWorkout(ssSplits, ssEquipment, ssNumPairs);
  ssIsCustom = false;
  if (ssWorkout.length === 0) { showToast('No exercises found — try adding equipment'); return; }
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

function ssSaveCurrent() {
  const splitLabel = ssSplits.length
    ? ssSplits.map(id => MUSCLE_GROUPS.find(g => g.id === id)?.label).join(' + ')
    : 'Custom';
  saveWorkout({
    name: `${splitLabel} Superset`,
    type: 'superset',
    equipment: [...ssEquipment],
    splits: [...ssSplits],
    numPairs: ssNumPairs,
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
    exerciseA: { ...pool[0], sets: 4 },
    exerciseB: { ...pool[Math.min(1, pool.length - 1)], sets: 4 },
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

function ssApplyCustom() {
  if (ssCustomDraft.length === 0) { showToast('Add at least one pair'); return; }
  ssWorkout  = ssCustomDraft.map(p => ({ ...p }));
  ssNumPairs = ssWorkout.length;
  ssIsCustom = true;
  ssCancelCustom();
  renderSupersetTab();
}

// ── Active Workout Logic ──────────────────────────────────────────────────────

function ssStart() {
  ssPairIdx = 0;
  ssSetIdx  = 0;
  ssPhase   = 'A';
  ssRunning = true;
  renderSupersetTab();
}

function ssDone() {
  if (ssPhase === 'A') {
    ssPhase = 'B';
    renderSupersetTab();
    return;
  }

  // Completed B — end of this A+B pair for this set
  ssSetIdx++;
  const ss = ssWorkout[ssPairIdx];

  if (ssSetIdx >= ss.exerciseA.sets) {
    // All sets done for this superset — move to next
    ssPairIdx++;
    ssSetIdx = 0;
    if (ssPairIdx >= ssWorkout.length) {
      ssComplete();
      return;
    }
  }

  // Show rest screen between sets
  ssPhase = 'rest';
  renderSupersetTab();
}

function ssNextSet() {
  ssPhase = 'A';
  renderSupersetTab();
}

function ssStop() {
  ssRunning = false;
  ssPhase   = 'A';
  renderSupersetTab();
}

function ssComplete() {
  ssRunning = false;

  const splitLabel = ssSplits.length
    ? ssSplits.map(id => MUSCLE_GROUPS.find(g => g.id === id)?.label).join(' + ')
    : 'Custom';
  logWorkout({
    name: ssIsCustom ? 'Custom Superset' : `${splitLabel} Superset`,
    type: 'superset',
    pairs: ssWorkout.length,
    splits: [...ssSplits],
  });

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
  ssNumPairs  = workout.numPairs || workout.exercises.length;
  ssIsCustom  = true;
  switchTab('superset');
  renderSupersetTab();
}
