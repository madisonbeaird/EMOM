// ── Superset Tab ─────────────────────────────────────────────────────────────
let ssEquipment   = [];
let ssSplits      = [];
let ssNumPairs    = 4;
let ssWorkout     = [];
let ssRunning     = false;
let ssPairIdx     = 0;
let ssPhase       = 'A';    // 'A' | 'B'  (internal only — not shown to user)
let ssProgressA   = [];     // sets of first exercise completed per superset
let ssProgressB   = [];     // sets of second exercise completed per superset
let ssIsCustom    = false;
let ssCustomDraft = [];

function fillPct(done, total) {
  return (total > 0 && done > 0) ? Math.min(100, Math.round((done / total) * 100)) : 0;
}

function updateTubeFill(id, done, total) {
  const el = document.getElementById(id);
  if (el) el.style.width = `${fillPct(done, total)}%`;
}

// ── Render ────────────────────────────────────────────────────────────────────

function renderSupersetTab() {
  const pane = document.getElementById('tab-superset');
  pane.innerHTML = `
    <div class="section-header"><h2>Superset</h2></div>
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

      <div class="exercise-card" id="card-ss-a-${i}" data-index="${i}" data-subtype="A" data-type="ss">
        <div class="card-inner">
          <div class="card-num">${(i * 2) + 1}</div>
          <div class="card-body">
            <div class="card-name">${ss.exerciseA.name}</div>
            <div class="card-reps-row">
              <button class="rep-btn" onclick="ssAdjustSets(${i},-1)">−</button>
              <span class="card-reps" id="ss-sets-a-${i}">${ss.exerciseA.sets} sets</span>
              <button class="rep-btn" onclick="ssAdjustSets(${i},1)">+</button>
              &nbsp;
              <button class="rep-btn" onclick="ssAdjustReps(${i},'A',-1)">−</button>
              <span class="card-reps" id="ss-reps-a-${i}">${ss.exerciseA.reps} ${ss.exerciseA.unit||'reps'}</span>
              <button class="rep-btn" onclick="ssAdjustReps(${i},'A',1)">+</button>
            </div>
          </div>
          <div class="card-swipe-hint">swipe</div>
        </div>
      </div>

      <div class="superset-divider">+</div>

      <div class="exercise-card" id="card-ss-b-${i}" data-index="${i}" data-subtype="B" data-type="ss">
        <div class="card-inner">
          <div class="card-num">${(i * 2) + 2}</div>
          <div class="card-body">
            <div class="card-name">${ss.exerciseB.name}</div>
            <div class="card-reps-row">
              <button class="rep-btn" onclick="ssAdjustSets(${i},-1)">−</button>
              <span class="card-reps" id="ss-sets-b-${i}">${ss.exerciseB.sets} sets</span>
              <button class="rep-btn" onclick="ssAdjustSets(${i},1)">+</button>
              &nbsp;
              <button class="rep-btn" onclick="ssAdjustReps(${i},'B',-1)">−</button>
              <span class="card-reps" id="ss-reps-b-${i}">${ss.exerciseB.reps} ${ss.exerciseB.unit||'reps'}</span>
              <button class="rep-btn" onclick="ssAdjustReps(${i},'B',1)">+</button>
            </div>
          </div>
          <div class="card-swipe-hint">swipe</div>
        </div>
      </div>
    </div>
  `;
}

// ── Active Workout — full scrollable list, fill-text progress ─────────────────

function isPairComplete(i) {
  if (!ssWorkout[i]) return false;
  const s = ssWorkout[i].exerciseA.sets;
  return ssProgressA[i] >= s && ssProgressB[i] >= s;
}

function renderSupersetActive() {
  const ss     = ssWorkout[ssPairIdx];
  const setNum = ssPhase === 'A'
    ? ssProgressA[ssPairIdx] + 1
    : ssProgressB[ssPairIdx] + 1;

  return `
    <div class="ss-live-screen">
      <div class="ss-live-header">
        <div>
          <div class="timer-round-label">Superset ${ssPairIdx + 1} / ${ssWorkout.length}</div>
          <div class="timer-ex-counter">Set ${setNum} of ${ss.exerciseA.sets}</div>
        </div>
        <button class="text-btn" onclick="ssStop()">End</button>
      </div>

      <div class="ss-live-list">
        ${ssWorkout.map((pair, i) => `
          <div class="ss-live-pair ${i === ssPairIdx ? 'current' : ''} ${isPairComplete(i) ? 'done' : ''}"
               id="ss-live-pair-${i}">
            <div class="ss-live-label">Superset ${i + 1}</div>

            <div class="ss-live-exercise ${i === ssPairIdx && ssPhase === 'A' ? 'active' : ''}"
                 id="ss-live-ex-a-${i}">
              <div class="ss-tube-fill" id="ss-fill-a-${i}" style="width:${fillPct(ssProgressA[i], pair.exerciseA.sets)}%"></div>
              <div class="ss-live-ex-info">
                <span class="ss-live-name">${pair.exerciseA.name}</span>
                <span class="ss-live-detail">${pair.exerciseA.reps} ${pair.exerciseA.unit||'reps'}</span>
              </div>
              <span class="ss-live-count" id="ss-live-count-a-${i}">${ssProgressA[i]}/${pair.exerciseA.sets}</span>
            </div>

            <div class="ss-live-exercise ${i === ssPairIdx && ssPhase === 'B' ? 'active' : ''}"
                 id="ss-live-ex-b-${i}">
              <div class="ss-tube-fill" id="ss-fill-b-${i}" style="width:${fillPct(ssProgressB[i], pair.exerciseB.sets)}%"></div>
              <div class="ss-live-ex-info">
                <span class="ss-live-name">${pair.exerciseB.name}</span>
                <span class="ss-live-detail">${pair.exerciseB.reps} ${pair.exerciseB.unit||'reps'}</span>
              </div>
              <span class="ss-live-count" id="ss-live-count-b-${i}">${ssProgressB[i]}/${pair.exerciseB.sets}</span>
            </div>
          </div>
        `).join('')}
      </div>

      <div class="ss-live-footer">
        <button class="btn-primary btn-lg" onclick="ssDone()">Done</button>
      </div>
    </div>
  `;
}

// Update in place — no scroll reset
function updateSupersetDisplay() {
  const ss     = ssWorkout[ssPairIdx];
  const setNum = ssPhase === 'A'
    ? ssProgressA[ssPairIdx] + 1
    : ssProgressB[ssPairIdx] + 1;

  // Header
  const rl = document.querySelector('.timer-round-label');
  const ec = document.querySelector('.timer-ex-counter');
  if (rl) rl.textContent = `Superset ${ssPairIdx + 1} / ${ssWorkout.length}`;
  if (ec) ec.textContent = `Set ${setNum} of ${ss.exerciseA.sets}`;

  ssWorkout.forEach((pair, i) => {
    // Tube fill widths
    updateTubeFill(`ss-fill-a-${i}`, ssProgressA[i], pair.exerciseA.sets);
    updateTubeFill(`ss-fill-b-${i}`, ssProgressB[i], pair.exerciseB.sets);

    // Set counts
    const cA = document.getElementById(`ss-live-count-a-${i}`);
    const cB = document.getElementById(`ss-live-count-b-${i}`);
    if (cA) cA.textContent = `${ssProgressA[i]}/${pair.exerciseA.sets}`;
    if (cB) cB.textContent = `${ssProgressB[i]}/${pair.exerciseB.sets}`;

    // Active row highlight
    const exA = document.getElementById(`ss-live-ex-a-${i}`);
    const exB = document.getElementById(`ss-live-ex-b-${i}`);
    if (exA) exA.className = `ss-live-exercise${i === ssPairIdx && ssPhase === 'A' ? ' active' : ''}`;
    if (exB) exB.className = `ss-live-exercise${i === ssPairIdx && ssPhase === 'B' ? ' active' : ''}`;

    // Pair border + opacity
    const pairEl = document.getElementById(`ss-live-pair-${i}`);
    if (pairEl) {
      pairEl.className = [
        'ss-live-pair',
        i === ssPairIdx ? 'current' : '',
        isPairComplete(i) ? 'done' : '',
      ].filter(Boolean).join(' ');
    }
  });

  // Scroll current into view
  const cur = document.getElementById(`ss-live-pair-${ssPairIdx}`);
  if (cur) cur.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
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
        ${getAvailableExercises(ssEquipment).map(ex =>
          `<option value="${ex.id}" ${pair.exerciseA.id === ex.id ? 'selected' : ''}>${ex.name}</option>`
        ).join('')}
      </select>
      <select class="select-input" onchange="ssCustomSetExercise(${i},'B',this.value)">
        ${getAvailableExercises(ssEquipment).map(ex =>
          `<option value="${ex.id}" ${pair.exerciseB.id === ex.id ? 'selected' : ''}>${ex.name}</option>`
        ).join('')}
      </select>
      <div class="draft-controls" style="margin-top:8px">
        <span class="label" style="margin:0;font-size:11px">Sets:</span>
        <button class="rep-btn" onclick="ssCustomAdjustSets(${i},-1)">−</button>
        <span id="ss-draft-sets-${i}">${pair.exerciseA.sets}</span>
        <button class="rep-btn" onclick="ssCustomAdjustSets(${i},1)">+</button>
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
  ssWorkout = []; ssIsCustom = false; ssCustomDraft = [];
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
  document.getElementById('ss-custom-modal').style.display = 'flex';
}

function ssCancelCustom() {
  document.getElementById('ss-custom-modal').style.display = 'none';
}

function ssCustomAddPair() {
  const pool = getAvailableExercises(ssEquipment);
  if (pool.length < 2) { showToast('Select equipment first'); return; }
  ssCustomDraft.push({
    id: `custom_ss_${ssCustomDraft.length}`,
    exerciseA: { ...pool[0], sets: 4 },
    exerciseB: { ...pool[Math.min(1, pool.length - 1)], sets: 4 },
  });
  document.getElementById('ss-draft-list').innerHTML = renderSsDraftList();
}

function ssCustomRemovePair(i) {
  ssCustomDraft.splice(i, 1);
  document.getElementById('ss-draft-list').innerHTML = renderSsDraftList();
}

function ssCustomSetExercise(pairIdx, side, exerciseId) {
  const ex = EXERCISES.find(e => e.id === exerciseId);
  if (!ex) return;
  const pair = ssCustomDraft[pairIdx];
  if (side === 'A') pair.exerciseA = { ...ex, sets: pair.exerciseA.sets };
  else              pair.exerciseB = { ...ex, sets: pair.exerciseB.sets };
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
  ssWorkout = ssCustomDraft.map(p => ({ ...p }));
  ssNumPairs = ssWorkout.length;
  ssIsCustom = true;
  ssCancelCustom();
  renderSupersetTab();
}

// ── Active Workout Logic ──────────────────────────────────────────────────────

function ssStart() {
  ssPairIdx   = 0;
  ssPhase     = 'A';
  ssProgressA = new Array(ssWorkout.length).fill(0);
  ssProgressB = new Array(ssWorkout.length).fill(0);
  ssRunning   = true;
  renderSupersetTab();
}

function ssDone() {
  if (ssPhase === 'A') {
    ssProgressA[ssPairIdx]++;
    ssPhase = 'B';
    updateSupersetDisplay();
    return;
  }

  ssProgressB[ssPairIdx]++;
  const totalSets = ssWorkout[ssPairIdx].exerciseA.sets;

  if (ssProgressB[ssPairIdx] >= totalSets) {
    // Superset complete — move to next
    ssPairIdx++;
    ssPhase = 'A';
    if (ssPairIdx >= ssWorkout.length) { ssComplete(); return; }
  } else {
    ssPhase = 'A';
  }

  updateSupersetDisplay();
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
  document.getElementById('tab-superset').innerHTML = `
    <div class="complete-screen">
      <div class="complete-icon">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </div>
      <h2 class="complete-title">Workout Complete</h2>
      <p class="complete-sub">${ssWorkout.length} supersets finished</p>
      <button class="btn-primary btn-lg" style="margin-top:40px" onclick="ssReset()">New Workout</button>
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
