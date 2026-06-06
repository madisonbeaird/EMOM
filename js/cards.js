// ── Deck of Cards Workout ─────────────────────────────────────────────────────

const DC_SUITS = [
  { key: 'spades',   symbol: '♠', label: 'Spades',   red: false },
  { key: 'hearts',   symbol: '♥', label: 'Hearts',   red: true  },
  { key: 'diamonds', symbol: '♦', label: 'Diamonds', red: true  },
  { key: 'clubs',    symbol: '♣', label: 'Clubs',    red: false },
];

const DC_RANKS = [
  { label: 'A', value: 1  },
  { label: '2', value: 2  },
  { label: '3', value: 3  },
  { label: '4', value: 4  },
  { label: '5', value: 5  },
  { label: '6', value: 6  },
  { label: '7', value: 7  },
  { label: '8', value: 8  },
  { label: '9', value: 9  },
  { label: '10', value: 10 },
  { label: 'J', value: 11 },
  { label: 'Q', value: 12 },
  { label: 'K', value: 13 },
];

let dcExercises = { spades: '', hearts: '', diamonds: '', clubs: '' };
let dcDeck      = [];
let dcIdx       = 0;
let dcFlipped   = false;
let dcPhase     = 'setup'; // 'setup' | 'active' | 'complete'

// ── Render ────────────────────────────────────────────────────────────────────

function renderCardsTab() {
  const pane = document.getElementById('tab-cards');
  if (dcPhase === 'active')   { pane.innerHTML = renderDcActive();   attachDcFlip(); return; }
  if (dcPhase === 'complete') { pane.innerHTML = renderDcComplete(); return; }
  pane.innerHTML = renderDcSetup();
  attachDcSearch();
}

function renderDcSetup() {
  return `
    <div class="section-header">
      <h2>Deck of Cards</h2>
      <span class="section-sub">Assign an exercise to each suit</span>
    </div>

    <div class="dc-suit-list">
      ${DC_SUITS.map(s => `
        <div class="dc-suit-row">
          <span class="dc-suit-sym ${s.red ? 'red' : ''}">${s.symbol}</span>
          <div class="dc-suit-input-wrap" id="dc-wrap-${s.key}">
            <input class="text-input dc-ex-input"
                   id="dc-input-${s.key}"
                   type="text"
                   placeholder="${s.label} exercise…"
                   value="${dcExercises[s.key]}"
                   autocomplete="off"
                   oninput="dcFilterExercises('${s.key}')" />
            <div class="dc-suggestions" id="dc-sugg-${s.key}"></div>
          </div>
        </div>
      `).join('')}
    </div>

    <div style="margin-top:8px">
      <div class="dc-value-note">A=1 · 2–10 face value · J=11 · Q=12 · K=13</div>
    </div>

    <button class="btn-primary btn-lg" style="margin-top:24px" onclick="dcStart()">
      Shuffle &amp; Start
    </button>
  `;
}

function renderDcActive() {
  const card     = dcDeck[dcIdx];
  const suit     = DC_SUITS.find(s => s.key === card.suit);
  const exercise = dcExercises[card.suit] || suit.label;
  const remaining = dcDeck.length - dcIdx - 1;

  return `
    <div class="dc-screen">
      <div class="dc-header">
        <div>
          <div class="timer-round-label">Card ${dcIdx + 1} of ${dcDeck.length}</div>
          <div class="timer-ex-counter">${remaining} remaining</div>
        </div>
        <button class="text-btn" onclick="dcStop()">End</button>
      </div>

      <div class="dc-stage">
        <div class="dc-card ${dcFlipped ? 'flipped' : ''}" id="dc-card" onclick="dcFlipCard()">
          <div class="dc-card-inner">

            <div class="dc-card-back">
              <div class="dc-back-pattern">
                <span>EMOM</span>
              </div>
            </div>

            <div class="dc-card-front ${suit.red ? 'red' : ''}">
              <div class="dc-corner dc-corner-tl">
                <div class="dc-corner-rank">${card.rank.label}</div>
                <div class="dc-corner-suit">${suit.symbol}</div>
              </div>
              <div class="dc-card-center">
                <div class="dc-center-suit">${suit.symbol}</div>
                <div class="dc-center-value">${card.rank.value} reps</div>
                <div class="dc-center-ex">${exercise}</div>
              </div>
              <div class="dc-corner dc-corner-br">
                <div class="dc-corner-rank">${card.rank.label}</div>
                <div class="dc-corner-suit">${suit.symbol}</div>
              </div>
            </div>

          </div>
        </div>

        ${dcFlipped ? '' : `<div class="dc-tap-hint">Tap to reveal</div>`}
      </div>
    </div>
  `;
}

function renderDcComplete() {
  return `
    <div class="complete-screen">
      <div class="complete-icon">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </div>
      <h2 class="complete-title">Deck Complete!</h2>
      <p class="complete-sub">You made it through all 52 cards.</p>
      <button class="btn-primary btn-lg" style="margin-top:32px" onclick="dcReset()">
        New Game
      </button>
    </div>
  `;
}

// ── Actions ───────────────────────────────────────────────────────────────────

function dcStart() {
  const missing = DC_SUITS.filter(s => !dcExercises[s.key].trim());
  if (missing.length > 0) {
    showToast(`Add an exercise for ${missing.map(s => s.label).join(', ')}`);
    return;
  }

  dcDeck    = dcBuildShuffledDeck();
  dcIdx     = 0;
  dcFlipped = false;
  dcPhase   = 'active';
  renderCardsTab();
}

function dcStop() {
  dcPhase = 'setup';
  renderCardsTab();
}

function dcReset() {
  dcPhase = 'setup';
  renderCardsTab();
}

function attachDcFlip() {
  // tap handled by onclick in HTML
}

function dcFlipCard() {
  if (dcFlipped) { dcNext(); return; }
  dcFlipped = true;
  const cardEl = document.getElementById('dc-card');
  if (cardEl) cardEl.classList.add('flipped');

  // Render next button after flip transition ends
  setTimeout(() => {
    const pane = document.getElementById('tab-cards');
    if (pane && dcPhase === 'active') pane.innerHTML = renderDcActive();
  }, 520);
}

function dcNext() {
  if (dcIdx >= dcDeck.length - 1) {
    dcPhase = 'complete';
    renderCardsTab();
    return;
  }
  dcIdx++;
  dcFlipped = false;
  renderCardsTab();
}

// ── Deck building ─────────────────────────────────────────────────────────────

function dcBuildShuffledDeck() {
  const deck = [];
  DC_SUITS.forEach(suit => {
    DC_RANKS.forEach(rank => {
      deck.push({ suit: suit.key, rank });
    });
  });
  // Fisher-Yates
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

// ── Exercise search/suggest ───────────────────────────────────────────────────

function attachDcSearch() {
  DC_SUITS.forEach(s => {
    const input = document.getElementById(`dc-input-${s.key}`);
    if (!input) return;
    input.addEventListener('blur', () => {
      setTimeout(() => {
        const sugg = document.getElementById(`dc-sugg-${s.key}`);
        if (sugg) sugg.innerHTML = '';
      }, 200);
    });
  });
}

function dcFilterExercises(suitKey) {
  const input = document.getElementById(`dc-input-${suitKey}`);
  const sugg  = document.getElementById(`dc-sugg-${suitKey}`);
  if (!input || !sugg) return;

  const q = input.value.trim().toLowerCase();
  dcExercises[suitKey] = input.value;

  if (!q) { sugg.innerHTML = ''; return; }

  const matches = EXERCISES
    .filter(e => e.name.toLowerCase().includes(q))
    .slice(0, 6);

  sugg.innerHTML = matches.map(e => `
    <button class="dc-sugg-item" onmousedown="dcSelectEx('${suitKey}', ${JSON.stringify(e.name)})">
      ${e.name}
    </button>
  `).join('');
}

function dcSelectEx(suitKey, name) {
  dcExercises[suitKey] = name;
  const input = document.getElementById(`dc-input-${suitKey}`);
  if (input) input.value = name;
  const sugg = document.getElementById(`dc-sugg-${suitKey}`);
  if (sugg) sugg.innerHTML = '';
}
