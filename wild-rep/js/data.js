// ── Wild Rep — Exercise List ──────────────────────────────────────────────────
// Compound / functional movements only — no isolation work

const WR_EXERCISES = [
  'Barbell Squats',
  'Front Squats',
  'Deadlifts',
  'Romanian Deadlifts',
  'Sumo Deadlifts',
  'Bulgarian Split Squats',
  'Walking Lunges',
  'Barbell Reverse Lunges',
  'Hack Squats',
  'Barbell Overhead Press',
  'Push Press',
  'Push Jerk',
  'Bench Press',
  'Incline Bench Press',
  'Close-Grip Bench Press',
  'Dips',
  'Push-ups',
  'Pull-ups',
  'Chin-ups',
  'Chest-to-Bar Pull-ups',
  'Barbell Rows',
  'Pendlay Rows',
  'Dumbbell Rows',
  'Power Cleans',
  'Hang Power Cleans',
  'Power Snatches',
  'Thrusters',
  'Clean and Jerk',
  'Sumo DL High Pull',
  'KB Swings',
  'KB Goblet Squat',
  'KB Clean and Press',
  'KB Snatch',
  'KB Turkish Get-up',
  'Box Jumps',
  'Burpees',
  'Toes to Bar',
  'Ring Dips',
  'Ring Rows',
  'Inverted Rows',
];

// ── Symbols ───────────────────────────────────────────────────────────────────

const WR_SYMBOLS = [
  { key: 'bolt',   label: 'Bolt',   color: '#ff6b00', img: 'img/bolt.png'   },
  { key: 'flame',  label: 'Flame',  color: '#00e676', img: 'img/flame.png'  },
  { key: 'vortex', label: 'Vortex', color: '#ffd600', img: 'img/vortex.png' },
  { key: 'burst',  label: 'Burst',  color: '#00b0ff', img: 'img/burst.png'  },
];

const WR_JOKER_COLOR = '#9333ea';

// ── Workout Names ─────────────────────────────────────────────────────────────

const WR_WORKOUT_NAMES = [
  'Beef Tornado', 'Ass Blaster', 'Sweaty Goblin', 'Dumpster Fire', 'Chaos Biscuit',
  'Butt Destroyer', 'Soggy Noodle', 'Hot Garbage', 'Dizzy Penguin', 'Thigh Burner',
  'Funky Vulture', 'Sweaty Balls', 'Crispy Hamstrings', 'Nasty Business', 'Damp Wizard',
  'Soggy Fart', 'Angry Muffin', 'Filthy Animal', 'Swamp Donkey', 'Trash Panda',
  'Crusty Legend', 'Savage Cabbage', 'Wobbly Titan', 'Cheeky Bastard', 'Smashed Potato',
  'Feral Beast', 'Dank Goblin', 'Absolute Unit', 'Crusty Goblin', 'Spicy Regret',
  'Chafed Legend', 'Dirty Rascal', 'Donut Chaser', 'Hell Stew', 'Humble Dumpling',
  'Smelly Champion', 'Broken Biscuit', 'Noodle Goblin', 'Wet Socks', 'Soggy Biscuit',
  'Pain Goblin', 'Crispy Rat', 'Sweaty Wizard', 'Funky Chicken', 'Limp Noodle',
  'Rotten Gains', 'Musty Legend', 'Cursed Potato', 'Turd Burglar', 'Goblin Mode',
  'Crusty Taint', 'Sweaty Crack', 'Soggy Ballsack', 'Butt Nugget', 'Rancid Legend',
  'Crusty Swamp', 'Flaming Butthole', 'Sweaty Arsehole', 'Damp Thong', 'Stinky Goblin',
  'Crusty Thong', 'Wet Fart', 'Shart Machine', 'Funky Taint', 'Ripe Legend',
  'Cheesy Goblin', 'Stale Crack', 'Moist Disaster', 'Damp Legend', 'Sweaty Taint',
  'Soggy Thong', 'Musty Goblin', 'Rotten Biscuit', 'Crusty Disaster', 'Stinky Wizard',
  'Fart Goblin', 'Sweaty Disaster', 'Damp Goblin', 'Crusty Swamprat', 'Soggy Legend',
  'Ripe Disaster', 'Funky Disaster', 'Wet Legend', 'Swamp Crack', 'Cheesy Disaster',
  'Rancid Goblin', 'Soggy Disaster', 'Crusty Wizard', 'Funky Swamp', 'Moist Goblin',
  'Stale Goblin', 'Rotten Legend', 'Fart Wizard', 'Sweaty Swamp', 'Damp Disaster',
  'Soggy Wizard', 'Musty Disaster', 'Ripe Goblin', 'Crusty Ballsack', 'Stinky Legend',
  'Wet Goblin', 'Funky Legend',
];

function wrGenerateName() {
  return WR_WORKOUT_NAMES[Math.floor(Math.random() * WR_WORKOUT_NAMES.length)];
}

// ── Joker Exercises ───────────────────────────────────────────────────────────

const WR_JOKER_EXERCISES = [
  // Row
  '250m Row',
  '500m Row',
  '750m Row',
  '1,000m Row',
  '2,000m Row',

  // Assault Bike
  '10 Cal Assault Bike',
  '15 Cal Assault Bike',
  '20 Cal Assault Bike',
  '30 Cal Assault Bike',
  '40 Cal Assault Bike',

  // Ski
  '250m Ski',
  '500m Ski',
  '750m Ski',
  '1,000m Ski',
  '2,000m Ski',

  // Run
  '100m Run',
  '200m Run',
  '400m Run',
  '800m Run',
  '1,000m Run',
  '1 Mile Run',
  '2km Run',
  '5km Run',

  // Jump Rope
  '50 Single-Unders',
  '100 Single-Unders',
  '50 Double-Unders',
  '100 Double-Unders',
  '150 Double-Unders',
  '200 Double-Unders',

  // Sled
  'Sled Push',
  'Sled Pull',
];

// ── Deck ──────────────────────────────────────────────────────────────────────
// Solo:    6–12 per symbol (7 cards × 4 symbols) + 2 jokers = 30 total (~252 reps)
// Partner: 5–15 per symbol (11 cards × 4 symbols) + 2 jokers = 46 total (~440 reps)

function wrBuildDeck(mode) {
  const min = mode === 'partner' ? 5 : 6;
  const max = mode === 'partner' ? 15 : 12;

  const deck = [];
  WR_SYMBOLS.forEach(sym => {
    for (let v = min; v <= max; v++) {
      deck.push({ type: 'card', symbol: sym.key, value: v });
    }
  });
  deck.push({ type: 'joker' });
  deck.push({ type: 'joker' });

  // Fisher-Yates shuffle
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}
