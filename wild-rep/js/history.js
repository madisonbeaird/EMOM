// ── Wild Rep — History ────────────────────────────────────────────────────────

const WR_HISTORY_KEY = 'wr_history';

function wrSaveToHistory() {
  const record = {
    id: Date.now(),
    date: new Date().toISOString(),
    mode: wrState.mode,
    workoutName: wrState.workoutName,
    partnerNames: [...wrState.partnerNames],
    exercises: { ...wrState.exercises },
    totalTime: wrState._finalTime,
    parentId: wrState._replayParentId || null,  // links to the original workout
    timestamps: [...wrState.timestamps],
    breakdown: wrBreakdown().map(b => ({
      key: b.key,
      exercise: b.exercise,
      color: b.color,
      totalReps: b.totalReps,
      repsPerMin: b.repsPerMin,
    })),
  };

  const history = wrGetHistory();
  history.unshift(record);
  localStorage.setItem(WR_HISTORY_KEY, JSON.stringify(history.slice(0, 100)));
}

function wrGetHistory() {
  try {
    return JSON.parse(localStorage.getItem(WR_HISTORY_KEY)) || [];
  } catch { return []; }
}

// ── History Screen ────────────────────────────────────────────────────────────

function wrHistoryHTML() {
  const history = wrGetHistory();

  // Group: parents first (no parentId), then attach children
  const parents = history.filter(r => !r.parentId);
  const children = history.filter(r => r.parentId);

  const groups = parents.map(p => ({
    parent: p,
    children: children.filter(c => c.parentId === p.id)
      .sort((a, b) => a.date.localeCompare(b.date)),
  }));

  return `
    <div class="wr-history">
      <div class="wr-history-header">
        <button class="wr-back-btn" onclick="wrShowHome()">‹ Back</button>
        <span class="wr-history-title">History</span>
        <span></span>
      </div>

      ${groups.length === 0 ? `
        <div class="wr-history-empty">
          <p>No workouts yet.</p>
          <p>Complete a workout to see it here.</p>
        </div>
      ` : groups.map(g => wrHistoryGroupHTML(g)).join('')}
    </div>
  `;
}

function wrHistoryGroupHTML({ parent, children }) {
  const exercises = WR_SYMBOLS.map(s => `
    <div class="wr-history-ex-row">
      <img src="${s.img}" style="width:20px;height:20px;object-fit:contain" />
      <span style="color:${s.color}">${parent.exercises[s.key] || s.label}</span>
    </div>
  `).join('') + `
    <div class="wr-history-ex-row">
      <img src="img/joker.png" style="width:20px;height:20px;object-fit:contain" />
      <span style="color:${WR_JOKER_COLOR}">${parent.exercises.joker || '500m Row'}</span>
    </div>
  `;

  const p1 = (parent.partnerNames && parent.partnerNames[0]) || '';
  const p2 = (parent.partnerNames && parent.partnerNames[1]) || '';
  const nameFields = parent.mode === 'partner' ? `
    <div class="wr-history-name-fields">
      <input class="wr-name-input" type="text" placeholder="Name 1" value="${p1}"
        oninput="wrHistoryUpdateName(${parent.id}, 0, this.value)" />
      <input class="wr-name-input" type="text" placeholder="Name 2" value="${p2}"
        oninput="wrHistoryUpdateName(${parent.id}, 1, this.value)" />
    </div>
  ` : '';

  return `
    <div class="wr-history-group" id="hg-${parent.id}">

      <div class="wr-history-row wr-history-parent" id="hr-${parent.id}">
        <div class="wr-history-main">
          <button class="wr-expand-btn" onclick="wrToggleExpand(${parent.id})">▾</button>
          <div class="wr-history-info">
            <span class="wr-history-workout-name">${parent.workoutName || 'Workout'}</span>
            ${children.length > 0 ? `<span class="wr-history-sep">·</span><span class="wr-history-attempts">${children.length + 1} attempts</span>` : ''}
          </div>
          <button class="wr-start-from-hist-btn" onclick="wrStartFromHistory(${parent.id}, ${parent.id})">Start ›</button>
        </div>
        <div class="wr-history-detail" id="hd-${parent.id}" style="display:none">
          ${exercises}
          ${nameFields}
        </div>
      </div>

      ${children.map((c, i) => wrHistoryChildHTML(c, parent, i)).join('')}

    </div>
  `;
}

function wrHistoryChildHTML(child, parent, idx) {
  const diff = child.totalTime - parent.totalTime;
  const better = diff < 0;
  const diffStr = (better ? '−' : '+') + wrFormatTime(Math.abs(diff));
  const diffColor = better ? '#00e676' : '#ff5252';

  const names = child.mode === 'partner' && child.partnerNames
    ? child.partnerNames.filter(Boolean).join(' & ')
    : 'Solo';

  const dateStr = new Date(child.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return `
    <div class="wr-history-child" id="hr-${child.id}">
      <div class="wr-history-main">
        <div class="wr-history-child-line"></div>
        <div class="wr-history-info">
          <span class="wr-history-date">${dateStr}</span>
          <span class="wr-history-sep">·</span>
          <span class="wr-history-names">${names}</span>
          <span class="wr-history-sep">·</span>
          <span class="wr-history-time">${wrFormatTime(child.totalTime)}</span>
          <span class="wr-history-diff" style="color:${diffColor}">${diffStr}</span>
        </div>
      </div>
    </div>
  `;
}

function wrDateNames(r) {
  const dateStr = new Date(r.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const names = r.mode === 'partner' && r.partnerNames
    ? r.partnerNames.filter(Boolean).join(' & ')
    : 'Solo';
  return `
    <span class="wr-history-date">${dateStr}</span>
    <span class="wr-history-sep">·</span>
    <span class="wr-history-names">${names}</span>
  `;
}

function wrToggleExpand(id) {
  const detail = document.getElementById(`hd-${id}`);
  const btn = document.querySelector(`#hr-${id} .wr-expand-btn`);
  if (!detail) return;
  const open = detail.style.display !== 'none';
  detail.style.display = open ? 'none' : 'block';
  btn.textContent = open ? '▾' : '▴';
}

function wrShowHistory() {
  const root = document.getElementById('wr-root');
  root.innerHTML = wrHistoryHTML();
}

function wrShowHome() {
  wrState.phase = 'setup';
  wrRender();
}

// Editable names cache (id -> [name1, name2])
const wrHistoryNames = {};

function wrHistoryUpdateName(id, idx, val) {
  if (!wrHistoryNames[id]) {
    const history = wrGetHistory();
    const r = history.find(r => r.id === id);
    wrHistoryNames[id] = r ? [...(r.partnerNames || ['', ''])] : ['', ''];
  }
  wrHistoryNames[id][idx] = val;
}

function wrStartFromHistory(recordId, parentId) {
  const history = wrGetHistory();
  const record = history.find(r => r.id === recordId);
  if (!record) return;

  WR_SYMBOLS.forEach(s => {
    wrState.exercises[s.key] = record.exercises[s.key] || '';
  });
  wrState.exercises.joker = record.exercises.joker || '500m Row';
  wrState.mode = record.mode;
  wrState.partnerNames = wrHistoryNames[parentId] || [...(record.partnerNames || ['You', 'Partner'])];
  wrState._replayTarget = record.totalTime;
  wrState._replayParentId = parentId;  // so the new save links back to the parent

  wrState.deck = wrBuildDeck(wrState.mode);
  wrState.idx = 0;
  wrState.flipped = false;
  wrState.timestamps = [];
  wrState.currentPlayer = 0;
  wrState.timerStart = null;
  wrState.phase = 'active';
  wrRender();
}
