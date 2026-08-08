// ── Wild Rep — Core Logic ─────────────────────────────────────────────────────

let wrState = {
  phase: 'setup',       // 'setup' | 'active' | 'complete'
  exercises: {},        // { bolt: '', flame: '', vortex: '', burst: '', joker: '' }
  mode: 'solo',         // 'solo' | 'partner'
  workoutName: '',
  partnerNames: ['You', 'Partner'],
  deck: [],
  idx: 0,
  flipped: false,
  timerStart: null,
  timerEl: null,
  timerInterval: null,
  timestamps: [],       // [{ symbol, value, elapsed, player }]
  currentPlayer: 0,
  swipeState: {},       // { bolt: swipeIdx, ... }
};

// ── Init ──────────────────────────────────────────────────────────────────────

function wrInit() {
  WR_SYMBOLS.forEach(s => { wrState.exercises[s.key] = ''; wrState.swipeState[s.key] = 0; });
  wrState.exercises.joker = '500m Row';
  wrState.swipeState.joker = 0;
  wrRender();
}

function wrRender() {
  const root = document.getElementById('wr-root');
  if (!root) return;
  if (wrState.phase === 'setup')    root.innerHTML = wrSetupHTML();
  if (wrState.phase === 'active')   root.innerHTML = wrActiveHTML();
  if (wrState.phase === 'complete') root.innerHTML = wrCompleteHTML();
}

// ── Setup Screen ──────────────────────────────────────────────────────────────

function wrSetupHTML() {
  const hasHistory = wrGetHistory().length > 0;
  const replayBanner = wrState._replayTarget ? `
    <div class="wr-replay-banner">
      🎯 Beat your time: <strong>${wrFormatTime(wrState._replayTarget)}</strong>
      <button onclick="wrState._replayTarget=null;wrState._replayDate=null;wrRender()">✕</button>
    </div>` : '';

  return `
    <div class="wr-setup">
      <div class="wr-setup-topbar">
        <div class="wr-logo">
          <span class="wr-logo-wild">WILD</span><span class="wr-logo-rep">REP</span>
        </div>
        ${hasHistory ? `<button class="wr-history-btn" onclick="wrShowHistory()">History</button>` : ''}
      </div>
      ${replayBanner}

      <div class="wr-mode-toggle">
        <button class="wr-mode-btn ${wrState.mode === 'solo' ? 'active' : ''}" onclick="wrSetMode('solo')">Solo</button>
        <button class="wr-mode-btn ${wrState.mode === 'partner' ? 'active' : ''}" onclick="wrSetMode('partner')">Partner</button>
      </div>

      ${wrState.mode === 'partner' ? `
      <div class="wr-partner-names">
        <input class="wr-name-input" type="text" placeholder="Your name" value="${wrState.partnerNames[0]}"
          oninput="wrState.partnerNames[0] = this.value" />
        <input class="wr-name-input" type="text" placeholder="Partner name" value="${wrState.partnerNames[1]}"
          oninput="wrState.partnerNames[1] = this.value" />
      </div>` : ''}

      <div class="wr-symbol-list">
        ${WR_SYMBOLS.map(s => wrSymbolRowHTML(s)).join('')}
        ${wrJokerRowHTML()}
      </div>

      <button class="wr-start-btn" onclick="wrStart()">Start</button>
      <div id="wr-auth-bar" class="wr-auth-bar"></div>
    </div>
  `;
}

function wrSymbolRowHTML(s) {
  const swipeIdx = wrState.swipeState[s.key];
  const isSwiping = wrState._swiping === s.key;
  return `
    <div class="wr-symbol-row">
      <div class="wr-symbol-icon">
        <img src="${s.img}" alt="${s.label}" />
      </div>
      <div class="wr-input-wrap">
        ${isSwiping ? `
          <div class="wr-swipe-card">
            <button class="wr-swipe-nav" onclick="wrSwipePrev('${s.key}')">‹</button>
            <span class="wr-swipe-name">${WR_EXERCISES[swipeIdx % WR_EXERCISES.length]}</span>
            <button class="wr-swipe-nav" onclick="wrSwipeNext('${s.key}')">›</button>
          </div>
          <div class="wr-swipe-actions">
            <button class="wr-swipe-pick" onclick="wrSwipePick('${s.key}')">Use this</button>
            <button class="wr-swipe-cancel" onclick="wrSwipeCancel('${s.key}')">✕</button>
          </div>
        ` : `
          <input class="wr-ex-input" type="text" placeholder="${s.label} exercise…"
            value="${wrState.exercises[s.key]}"
            oninput="wrState.exercises['${s.key}'] = this.value" />
          <button class="wr-shuffle-btn" onclick="wrSwipeStart('${s.key}')" title="Suggest exercise">⟳</button>
        `}
      </div>
    </div>
  `;
}

function wrJokerRowHTML() {
  const isSwiping = wrState._swiping === 'joker';
  const swipeIdx = wrState.swipeState.joker || 0;
  return `
    <div class="wr-symbol-row">
      <div class="wr-symbol-icon">
        <img src="img/joker.png" alt="Joker" />
      </div>
      <div class="wr-input-wrap">
        ${isSwiping ? `
          <div class="wr-swipe-card">
            <button class="wr-swipe-nav" onclick="wrJokerSwipePrev()">‹</button>
            <span class="wr-swipe-name">${WR_JOKER_EXERCISES[swipeIdx % WR_JOKER_EXERCISES.length]}</span>
            <button class="wr-swipe-nav" onclick="wrJokerSwipeNext()">›</button>
          </div>
          <div class="wr-swipe-actions">
            <button class="wr-swipe-pick" onclick="wrJokerSwipePick()">Use this</button>
            <button class="wr-swipe-cancel" onclick="wrSwipeCancel('joker')">✕</button>
          </div>
        ` : `
          <input class="wr-ex-input" type="text" placeholder="Joker exercise…"
            value="${wrState.exercises.joker}"
            oninput="wrState.exercises.joker = this.value" />
          <button class="wr-shuffle-btn" onclick="wrJokerSwipeStart()" title="Suggest exercise">⟳</button>
        `}
      </div>
    </div>
  `;
}

function wrJokerSwipeStart() {
  wrState._swiping = 'joker';
  wrState.swipeState.joker = WR_JOKER_EXERCISES.indexOf(wrState.exercises.joker);
  if (wrState.swipeState.joker < 0) wrState.swipeState.joker = 0;
  wrRender();
}
function wrJokerSwipeNext() {
  wrState.swipeState.joker = (wrState.swipeState.joker + 1) % WR_JOKER_EXERCISES.length;
  wrRender();
}
function wrJokerSwipePrev() {
  wrState.swipeState.joker = (wrState.swipeState.joker - 1 + WR_JOKER_EXERCISES.length) % WR_JOKER_EXERCISES.length;
  wrRender();
}
function wrJokerSwipePick() {
  wrState.exercises.joker = WR_JOKER_EXERCISES[wrState.swipeState.joker % WR_JOKER_EXERCISES.length];
  wrState._swiping = null;
  wrRender();
}

// ── Swipe ─────────────────────────────────────────────────────────────────────

function wrSwipeStart(key) {
  wrState._swiping = key;
  wrState.swipeState[key] = Math.floor(Math.random() * WR_EXERCISES.length);
  wrRender();
}
function wrSwipeNext(key) {
  wrState.swipeState[key] = (wrState.swipeState[key] + 1) % WR_EXERCISES.length;
  wrRender();
}
function wrSwipePrev(key) {
  wrState.swipeState[key] = (wrState.swipeState[key] - 1 + WR_EXERCISES.length) % WR_EXERCISES.length;
  wrRender();
}
function wrSwipePick(key) {
  wrState.exercises[key] = WR_EXERCISES[wrState.swipeState[key] % WR_EXERCISES.length];
  wrState._swiping = null;
  wrRender();
}
function wrSwipeCancel(key) {
  wrState._swiping = null;
  wrRender();
}

// ── Mode ──────────────────────────────────────────────────────────────────────

function wrSetMode(mode) {
  wrState.mode = mode;
  wrRender();
}

// ── Start ─────────────────────────────────────────────────────────────────────

function wrStart() {
  const missing = WR_SYMBOLS.filter(s => !wrState.exercises[s.key].trim());
  if (missing.length) {
    alert(`Add an exercise for: ${missing.map(s => s.label).join(', ')}`);
    return;
  }
  wrState._replayParentId = null;
  wrState.workoutName = wrGenerateName();
  wrState.deck = wrBuildDeck(wrState.mode);
  wrState.idx = 0;
  wrState.flipped = false;
  wrState.timestamps = [];
  wrState.currentPlayer = 0;
  wrState.timerStart = null;
  wrState.phase = 'active';
  wrRender();
}

// ── Timer ─────────────────────────────────────────────────────────────────────

function wrStartTimer() {
  wrState.timerInterval = setInterval(() => {
    const el = document.getElementById('wr-timer');
    if (el) el.textContent = wrFormatTime(Date.now() - wrState.timerStart);
  }, 1000);
}

function wrStopTimer() {
  clearInterval(wrState.timerInterval);
  wrState.timerInterval = null;
}

function wrFormatTime(ms) {
  const s = Math.floor(ms / 1000);
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
}

// ── Active Screen ─────────────────────────────────────────────────────────────

function wrActiveHTML() {
  const card = wrState.deck[wrState.idx];
  const remaining = wrState.deck.length - wrState.idx - 1;
  const playerName = wrState.mode === 'partner' ? wrState.partnerNames[wrState.currentPlayer] : null;

  let symbolObj, color, svgIcon, repLine, exercise;

  if (card.type === 'joker') {
    color = WR_JOKER_COLOR;
    svgIcon = `<img src="img/joker.png" alt="Joker" style="width:100%;height:100%;object-fit:contain" />`;
    repLine = 'WILD';
    exercise = wrState.exercises.joker || '500m Row';
  } else {
    symbolObj = WR_SYMBOLS.find(s => s.key === card.symbol);
    color = symbolObj.color;
    svgIcon = `<img src="${symbolObj.img}" alt="${symbolObj.label}" style="width:100%;height:100%;object-fit:contain" />`;
    repLine = `${card.value} reps`;
    exercise = wrState.exercises[card.symbol] || symbolObj.label;
  }

  const cornerSVG = card.type === 'joker'
    ? `<img src="img/joker.png" alt="Joker" style="width:36px;height:36px;object-fit:contain" />`
    : `<img src="${symbolObj.img}" alt="${symbolObj ? symbolObj.label : ''}" style="width:36px;height:36px;object-fit:contain" />`;

  return `
    <div class="wr-active">

      <div class="wr-top-bar">
        <div class="wr-progress">${wrState.idx + 1} / ${wrState.deck.length}</div>
        <button class="wr-end-btn" onclick="wrEnd()">End</button>
      </div>

      ${playerName ? `<div class="wr-player-tag" style="color:${color}">${playerName}'s turn</div>` : ''}

      <div class="wr-timer-block">
        <span class="wr-timer" id="wr-timer">${wrState.timerStart ? wrFormatTime(Date.now() - wrState.timerStart) : '00:00'}</span>
        ${wrState._replayTarget ? `<div class="wr-target-time">🎯 ${wrFormatTime(wrState._replayTarget)}</div>` : ''}
      </div>

      <div class="wr-stage">
        <div class="wr-card ${wrState.flipped ? 'flipped' : ''}" id="wr-card" onclick="wrFlip()">
          <div class="wr-card-inner">

            <div class="wr-card-back">
              <div class="wr-back-logo">WILD REP</div>
              <div class="wr-back-name">${wrState.workoutName}</div>
            </div>

            <div class="wr-card-front" style="border-color:${color}">
              <div class="wr-card-top-row">
                <div class="wr-corner wr-corner-tl" style="color:${color}">
                  ${cornerSVG}
                  ${card.type !== 'joker' ? `<div class="wr-corner-val">${card.value}</div>` : ''}
                </div>
                ${playerName ? `<div class="wr-card-player-name" style="color:${color}">${playerName}</div>` : '<div></div>'}
              </div>

              <div class="wr-card-center">
                <div class="wr-card-ex" style="color:${color}">${exercise}</div>
              </div>

              <div class="wr-corner wr-corner-br" style="color:${color}">
                ${cornerSVG}
                ${card.type !== 'joker' ? `<div class="wr-corner-val">${card.value}</div>` : ''}
              </div>
            </div>

          </div>
        </div>
        <div class="wr-tap-hint">${!wrState.flipped ? 'Tap to flip' : 'Tap to continue'}</div>
      </div>

      <div class="wr-remaining">${remaining} card${remaining !== 1 ? 's' : ''} remaining</div>
    </div>
  `;
}

// ── Flip ──────────────────────────────────────────────────────────────────────

function wrFlip() {
  if (!wrState.flipped) {
    // Start timer on first flip
    if (!wrState.timerStart) {
      wrState.timerStart = Date.now();
      wrStartTimer();
    }
    wrState.flipped = true;
    const el = document.getElementById('wr-card');
    if (el) el.classList.add('flipped');
    setTimeout(() => wrRender(), 520);
  } else {
    // Log timestamp
    const card = wrState.deck[wrState.idx];
    wrState.timestamps.push({
      symbol: card.type === 'joker' ? 'joker' : card.symbol,
      value: card.type === 'joker' ? 0 : card.value,
      elapsed: Date.now() - wrState.timerStart,
      player: wrState.currentPlayer,
    });

    if (wrState.idx >= wrState.deck.length - 1) {
      wrStopTimer();
      wrState.phase = 'complete';
      wrState._finalTime = Date.now() - wrState.timerStart;
      wrSaveToHistory();
      wrRender();
      return;
    }

    wrState.idx++;
    wrState.flipped = false;
    if (wrState.mode === 'partner') {
      wrState.currentPlayer = wrState.currentPlayer === 0 ? 1 : 0;
    }
    wrRender();
  }
}

function wrEnd() {
  if (!confirm('End workout early?')) return;
  wrStopTimer();
  wrState.phase = 'setup';
  wrRender();
}

// ── Complete Screen ───────────────────────────────────────────────────────────

function wrCompleteHTML() {
  const total = wrState._finalTime;
  const breakdown = wrBreakdown();
  const target = wrState._replayTarget;
  const beat = target && total < target;
  const diff = target ? Math.abs(total - target) : null;

  let resultBadge = '';
  if (target) {
    resultBadge = beat
      ? `<div class="wr-result-badge wr-result-win">🏆 Beat it by ${wrFormatTime(diff)}</div>`
      : `<div class="wr-result-badge wr-result-loss">${wrFormatTime(diff)} off your target</div>`;
  }

  return `
    <div class="wr-complete">
      <div class="wr-complete-logo">
        <span class="wr-logo-wild">WILD</span><span class="wr-logo-rep">REP</span>
      </div>
      <div class="wr-complete-name">${wrState.workoutName}</div>
      <div class="wr-complete-time">${wrFormatTime(total)}</div>
      <div class="wr-complete-label">Total Time</div>
      ${resultBadge}

      <div class="wr-breakdown">
        ${breakdown.map(b => `
          <div class="wr-breakdown-row">
            <div class="wr-breakdown-icon" style="border-color:${b.color}; background:${b.color}22">
              <img src="${WR_SYMBOLS.find(s=>s.key===b.key)?.img||''}" alt="${b.label}" style="width:100%;height:100%;object-fit:contain" />
            </div>
            <div class="wr-breakdown-info">
              <div class="wr-breakdown-ex">${b.exercise}</div>
              <div class="wr-breakdown-stats">${b.totalReps} reps · ${b.repsPerMin} reps/min</div>
            </div>
          </div>
        `).join('')}
      </div>

      <button class="wr-start-btn" style="margin-top:32px" onclick="wrReset()">Done</button>
    </div>
  `;
}

function wrBreakdown() {
  return WR_SYMBOLS.map(s => {
    const flips = wrState.timestamps.filter(t => t.symbol === s.key);
    const totalReps = flips.reduce((sum, t) => sum + t.value, 0);
    const timeSpentMs = flips.length > 1
      ? flips[flips.length - 1].elapsed - flips[0].elapsed
      : wrState._finalTime;
    const repsPerMin = timeSpentMs > 0
      ? Math.round((totalReps / timeSpentMs) * 60000)
      : 0;
    return {
      ...s,
      exercise: wrState.exercises[s.key],
      totalReps,
      repsPerMin,
    };
  });
}

function wrReset() {
  wrState.phase = 'setup';
  wrState.idx = 0;
  wrState.flipped = false;
  wrState.timestamps = [];
  wrState._finalTime = null;
  wrRender();
}
