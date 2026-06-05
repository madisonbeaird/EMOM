// Web Audio API — generates all sounds with no external files
let _audioCtx = null;

function getAudioCtx() {
  if (!_audioCtx) {
    _audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  // Resume if suspended (required after user interaction on iOS)
  if (_audioCtx.state === 'suspended') {
    _audioCtx.resume();
  }
  return _audioCtx;
}

function playTone(frequency, duration, volume = 0.6, type = 'sine', delay = 0) {
  try {
    const ctx = getAudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = type;
    osc.frequency.setValueAtTime(frequency, ctx.currentTime + delay);

    gain.gain.setValueAtTime(0, ctx.currentTime + delay);
    gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + delay + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + duration);

    osc.start(ctx.currentTime + delay);
    osc.stop(ctx.currentTime + delay + duration + 0.05);
  } catch (e) {
    // Silently fail if audio not available
  }
}

// Called at the start of each minute (exercise begins)
function beepStart() {
  playTone(880, 0.12, 0.5, 'square');
}

// Called at the end of each minute (exercise ends) — two descending tones
function beepEnd() {
  playTone(660, 0.15, 0.6, 'square', 0);
  playTone(440, 0.25, 0.6, 'square', 0.18);
}

// Short tick for 3-2-1 countdown
function beepCountdown() {
  playTone(660, 0.07, 0.35, 'sine');
}

// Final beep — workout complete
function beepComplete() {
  playTone(880, 0.1,  0.6, 'square', 0);
  playTone(1100, 0.1, 0.6, 'square', 0.15);
  playTone(1320, 0.3, 0.6, 'square', 0.30);
}

// Unlock audio on first user interaction (required by iOS Safari)
function unlockAudio() {
  try {
    const ctx = getAudioCtx();
    const buf = ctx.createBuffer(1, 1, 22050);
    const src = ctx.createBufferSource();
    src.buffer = buf;
    src.connect(ctx.destination);
    src.start(0);
  } catch (e) {}
}

document.addEventListener('touchstart', unlockAudio, { once: true });
document.addEventListener('click', unlockAudio, { once: true });
