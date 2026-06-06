// ── Exercise Database ────────────────────────────────────────────────────────
// muscles[] → superset split filtering
// category  → EMOM workout generation
const EXERCISES = [

  // ════════════════════════════════════════════════════════════════════════
  // BODYBUILDING — user's definitive list
  // ════════════════════════════════════════════════════════════════════════

  // ── Chest ─────────────────────────────────────────────────────────────
  { id: 'bench_press',          name: 'Bench Press',                   equipment: ['barbell'],            reps: 10, category: 'push', unit: 'reps', muscles: ['chest'] },
  { id: 'incline_bench_press',  name: 'Incline Bench Press',           equipment: ['barbell'],            reps: 10, category: 'push', unit: 'reps', muscles: ['chest'] },
  { id: 'flat_db_press',        name: 'Flat Dumbbell Press',           equipment: ['dumbbells'],          reps: 12, category: 'push', unit: 'reps', muscles: ['chest'] },
  { id: 'incline_db_press',     name: 'Incline Dumbbell Press',        equipment: ['dumbbells'],          reps: 12, category: 'push', unit: 'reps', muscles: ['chest'] },
  { id: 'pec_deck',             name: 'Pec Deck Machine',              equipment: ['machine'],            reps: 15, category: 'push', unit: 'reps', muscles: ['chest'] },
  { id: 'chest_dips',           name: 'Dips',                          equipment: [],                     reps: 12, category: 'push', unit: 'reps', muscles: ['chest', 'triceps'] },
  { id: 'pushups',              name: 'Push-ups',                      equipment: [],                     reps: 15, category: 'push', unit: 'reps', muscles: ['chest', 'triceps'] },
  { id: 'machine_chest_press',  name: 'Machine Chest Press',           equipment: ['machine'],            reps: 12, category: 'push', unit: 'reps', muscles: ['chest'] },
  { id: 'decline_press',        name: 'Decline Press',                 equipment: ['barbell'],            reps: 10, category: 'push', unit: 'reps', muscles: ['chest'] },

  // ── Triceps ───────────────────────────────────────────────────────────
  { id: 'cable_pushdowns',      name: 'Cable Pushdowns',               equipment: ['cables'],             reps: 15, category: 'push', unit: 'reps', muscles: ['triceps'] },
  { id: 'db_skull_crusher',     name: 'Dumbbell Skull Crushers',       equipment: ['dumbbells'],          reps: 12, category: 'push', unit: 'reps', muscles: ['triceps'] },
  { id: 'close_grip_bench',     name: 'Close-Grip Bench Press',        equipment: ['barbell'],            reps: 10, category: 'push', unit: 'reps', muscles: ['triceps', 'chest'] },
  { id: 'cable_overhead_tri',   name: 'Cable Overhead Triceps Ext',    equipment: ['cables'],             reps: 12, category: 'push', unit: 'reps', muscles: ['triceps'] },
  { id: 'db_overhead_tri',      name: 'Dumbbell Overhead Triceps Ext', equipment: ['dumbbells'],          reps: 12, category: 'push', unit: 'reps', muscles: ['triceps'] },
  { id: 'bench_dips',           name: 'Bench Dips',                    equipment: [],                     reps: 15, category: 'push', unit: 'reps', muscles: ['triceps', 'chest'] },

  // ── Shoulders ─────────────────────────────────────────────────────────
  { id: 'db_shoulder_press',    name: 'Dumbbell Shoulder Press',       equipment: ['dumbbells'],          reps: 12, category: 'push', unit: 'reps', muscles: ['shoulders'] },
  { id: 'barbell_ohp',          name: 'Barbell Overhead Press',        equipment: ['barbell'],            reps: 10, category: 'push', unit: 'reps', muscles: ['shoulders'] },
  { id: 'lateral_raises',       name: 'Lateral Raises',                equipment: ['dumbbells'],          reps: 15, category: 'push', unit: 'reps', muscles: ['shoulders'] },
  { id: 'cable_lateral',        name: 'Cable Lateral Raises',          equipment: ['cables'],             reps: 15, category: 'push', unit: 'reps', muscles: ['shoulders'] },
  { id: 'front_raises',         name: 'Front Raises',                  equipment: ['dumbbells'],          reps: 12, category: 'push', unit: 'reps', muscles: ['shoulders'] },
  { id: 'rear_delt_fly',        name: 'Rear Delt Flys',                equipment: ['dumbbells'],          reps: 15, category: 'pull', unit: 'reps', muscles: ['shoulders'] },
  { id: 'arnold_press',         name: 'Arnold Press',                  equipment: ['dumbbells'],          reps: 12, category: 'push', unit: 'reps', muscles: ['shoulders'] },

  // ── Biceps ────────────────────────────────────────────────────────────
  { id: 'db_curls',             name: 'Dumbbell Curls',                equipment: ['dumbbells'],          reps: 12, category: 'pull', unit: 'reps', muscles: ['biceps'] },
  { id: 'hammer_curls',         name: 'Hammer Curls',                  equipment: ['dumbbells'],          reps: 12, category: 'pull', unit: 'reps', muscles: ['biceps'] },
  { id: 'barbell_curls',        name: 'Barbell Curls',                 equipment: ['barbell'],            reps: 10, category: 'pull', unit: 'reps', muscles: ['biceps'] },
  { id: 'cable_curls',          name: 'Cable Curls',                   equipment: ['cables'],             reps: 15, category: 'pull', unit: 'reps', muscles: ['biceps'] },
  { id: 'reverse_curls',        name: 'Reverse Curls',                 equipment: ['barbell'],            reps: 12, category: 'pull', unit: 'reps', muscles: ['biceps'] },

  // ── Legs ──────────────────────────────────────────────────────────────
  { id: 'barbell_squat',        name: 'Barbell Squats',                equipment: ['barbell'],            reps: 8,  category: 'legs', unit: 'reps', muscles: ['legs'] },
  { id: 'smith_squat',          name: 'Smith Machine Squats',          equipment: ['machine'],            reps: 10, category: 'legs', unit: 'reps', muscles: ['legs'] },
  { id: 'deadlifts',            name: 'Deadlifts',                     equipment: ['barbell'],            reps: 5,  category: 'legs', unit: 'reps', muscles: ['legs', 'back'] },
  { id: 'romanian_dl',          name: 'Romanian Deadlifts',            equipment: ['barbell'],            reps: 10, category: 'legs', unit: 'reps', muscles: ['legs'] },
  { id: 'walking_lunges',       name: 'Walking Lunges',                equipment: [],                     reps: 20, category: 'legs', unit: 'reps', muscles: ['legs'] },
  { id: 'reverse_lunges',       name: 'Reverse Lunges',                equipment: [],                     reps: 16, category: 'legs', unit: 'reps', muscles: ['legs'] },
  { id: 'barbell_rev_lunge',    name: 'Barbell Reverse Lunges',        equipment: ['barbell'],            reps: 12, category: 'legs', unit: 'reps', muscles: ['legs'] },
  { id: 'bulgarian_split',      name: 'Bulgarian Split Squats',        equipment: ['dumbbells'],          reps: 10, category: 'legs', unit: 'reps', muscles: ['legs'] },
  { id: 'leg_press',            name: 'Leg Press',                     equipment: ['machine'],            reps: 12, category: 'legs', unit: 'reps', muscles: ['legs'] },
  { id: 'hack_squat',           name: 'Hack Squat',                    equipment: ['machine'],            reps: 12, category: 'legs', unit: 'reps', muscles: ['legs'] },
  { id: 'leg_extension',        name: 'Leg Extensions',                equipment: ['machine'],            reps: 15, category: 'legs', unit: 'reps', muscles: ['legs'] },
  { id: 'hamstring_curl',       name: 'Hamstring Curls',               equipment: ['machine'],            reps: 12, category: 'legs', unit: 'reps', muscles: ['legs'] },
  { id: 'seated_ham_curl',      name: 'Seated Hamstring Curls',        equipment: ['machine'],            reps: 12, category: 'legs', unit: 'reps', muscles: ['legs'] },
  { id: 'hip_thrusts',          name: 'Hip Thrusts',                   equipment: ['barbell'],            reps: 12, category: 'legs', unit: 'reps', muscles: ['legs'] },
  { id: 'glute_bridges',        name: 'Glute Bridges',                 equipment: [],                     reps: 20, category: 'legs', unit: 'reps', muscles: ['legs'] },
  { id: 'calf_raises',          name: 'Calf Raises',                   equipment: [],                     reps: 20, category: 'legs', unit: 'reps', muscles: ['legs'] },
  { id: 'seated_calf_raise',    name: 'Seated Calf Raises',            equipment: ['machine'],            reps: 20, category: 'legs', unit: 'reps', muscles: ['legs'] },
  { id: 'glute_extension',      name: 'Glute Extensions',              equipment: ['machine'],            reps: 15, category: 'legs', unit: 'reps', muscles: ['legs'] },

  // ── Back ──────────────────────────────────────────────────────────────
  { id: 'lat_pulldowns',        name: 'Lat Pulldowns',                 equipment: ['cables'],             reps: 12, category: 'pull', unit: 'reps', muscles: ['back'] },
  { id: 'pullups',              name: 'Pull-ups',                      equipment: ['pullup_bar'],         reps: 8,  category: 'pull', unit: 'reps', muscles: ['back'] },
  { id: 'barbell_rows',         name: 'Barbell Rows',                  equipment: ['barbell'],            reps: 10, category: 'pull', unit: 'reps', muscles: ['back'] },
  { id: 'dumbbell_rows',        name: 'Dumbbell Rows',                 equipment: ['dumbbells'],          reps: 12, category: 'pull', unit: 'reps', muscles: ['back'] },
  { id: 'seated_cable_rows',    name: 'Seated Cable Rows',             equipment: ['cables'],             reps: 12, category: 'pull', unit: 'reps', muscles: ['back'] },

  // ════════════════════════════════════════════════════════════════════════
  // EMOM / CROSSFIT — used by the EMOM tab only (category drives generation)
  // ════════════════════════════════════════════════════════════════════════

  // Bodyweight cardio / gymnastics
  { id: 'burpees',              name: 'Burpees',                       equipment: [],                     reps: 10, category: 'cardio',    unit: 'reps', muscles: ['full_body'] },
  { id: 'mountain_climbers',    name: 'Mountain Climbers',             equipment: [],                     reps: 20, category: 'cardio',    unit: 'reps', muscles: ['core', 'full_body'] },
  { id: 'jumping_jacks',        name: 'Jumping Jacks',                 equipment: [],                     reps: 30, category: 'cardio',    unit: 'reps', muscles: ['full_body'] },
  { id: 'high_knees',           name: 'High Knees',                    equipment: [],                     reps: 30, category: 'cardio',    unit: 'reps', muscles: ['full_body'] },
  { id: 'speed_skaters',        name: 'Speed Skaters',                 equipment: [],                     reps: 20, category: 'cardio',    unit: 'reps', muscles: ['legs'] },
  { id: 'jump_squats',          name: 'Jump Squats',                   equipment: [],                     reps: 15, category: 'legs',      unit: 'reps', muscles: ['legs'] },
  { id: 'broad_jumps',          name: 'Broad Jumps',                   equipment: [],                     reps: 8,  category: 'legs',      unit: 'reps', muscles: ['legs'] },
  { id: 'air_squats',           name: 'Air Squats',                    equipment: [],                     reps: 20, category: 'legs',      unit: 'reps', muscles: ['legs'] },
  { id: 'pistol_squat',         name: 'Pistol Squats',                 equipment: [],                     reps: 8,  category: 'legs',      unit: 'reps', muscles: ['legs'] },

  // Core
  { id: 'sit_ups',              name: 'Sit-ups',                       equipment: [],                     reps: 20, category: 'core',      unit: 'reps', muscles: ['core'] },
  { id: 'v_ups',                name: 'V-ups',                         equipment: [],                     reps: 15, category: 'core',      unit: 'reps', muscles: ['core'] },
  { id: 'plank',                name: 'Plank Hold',                    equipment: [],                     reps: 45, category: 'core',      unit: 'sec',  muscles: ['core'] },
  { id: 'hollow_body',          name: 'Hollow Body Hold',              equipment: [],                     reps: 30, category: 'core',      unit: 'sec',  muscles: ['core'] },
  { id: 'flutter_kicks',        name: 'Flutter Kicks',                 equipment: [],                     reps: 30, category: 'core',      unit: 'reps', muscles: ['core'] },
  { id: 'russian_twist',        name: 'Russian Twists',                equipment: [],                     reps: 20, category: 'core',      unit: 'reps', muscles: ['core'] },
  { id: 'leg_raise',            name: 'Leg Raises',                    equipment: [],                     reps: 15, category: 'core',      unit: 'reps', muscles: ['core'] },
  { id: 'bicycle_crunch',       name: 'Bicycle Crunches',              equipment: [],                     reps: 20, category: 'core',      unit: 'reps', muscles: ['core'] },
  { id: 'toes_to_bar',          name: 'Toes to Bar',                   equipment: ['pullup_bar'],         reps: 10, category: 'core',      unit: 'reps', muscles: ['core'] },
  { id: 'hanging_knee_raise',   name: 'Hanging Knee Raises',           equipment: ['pullup_bar'],         reps: 15, category: 'core',      unit: 'reps', muscles: ['core'] },
  { id: 'cable_crunch',         name: 'Cable Crunch',                  equipment: ['cables'],             reps: 20, category: 'core',      unit: 'reps', muscles: ['core'] },
  { id: 'pallof_press',         name: 'Pallof Press',                  equipment: ['cables'],             reps: 15, category: 'core',      unit: 'reps', muscles: ['core'] },

  // Pull / gymnastics
  { id: 'chinups',              name: 'Chin-ups',                      equipment: ['pullup_bar'],         reps: 8,  category: 'pull',      unit: 'reps', muscles: ['biceps', 'back'] },
  { id: 'kipping_pullups',      name: 'Kipping Pull-ups',              equipment: ['pullup_bar'],         reps: 10, category: 'pull',      unit: 'reps', muscles: ['back'] },
  { id: 'chest_to_bar',         name: 'Chest-to-Bar Pull-ups',         equipment: ['pullup_bar'],         reps: 7,  category: 'pull',      unit: 'reps', muscles: ['back'] },
  { id: 'inverted_row',         name: 'Inverted Rows',                 equipment: ['pullup_bar'],         reps: 12, category: 'pull',      unit: 'reps', muscles: ['back'] },

  // Olympic lifts
  { id: 'power_clean',          name: 'Power Cleans',                  equipment: ['barbell'],            reps: 5,  category: 'full_body', unit: 'reps', muscles: ['back', 'legs'] },
  { id: 'hang_power_clean',     name: 'Hang Power Clean',              equipment: ['barbell'],            reps: 5,  category: 'full_body', unit: 'reps', muscles: ['back', 'legs'] },
  { id: 'clean_jerk',           name: 'Clean and Jerk',                equipment: ['barbell'],            reps: 3,  category: 'full_body', unit: 'reps', muscles: ['back', 'legs', 'shoulders'] },
  { id: 'power_snatch',         name: 'Power Snatch',                  equipment: ['barbell'],            reps: 5,  category: 'full_body', unit: 'reps', muscles: ['back', 'legs', 'shoulders'] },
  { id: 'thruster',             name: 'Thrusters',                     equipment: ['barbell'],            reps: 7,  category: 'full_body', unit: 'reps', muscles: ['legs', 'shoulders'] },
  { id: 'push_jerk',            name: 'Push Jerk',                     equipment: ['barbell'],            reps: 5,  category: 'push',      unit: 'reps', muscles: ['shoulders', 'triceps'] },
  { id: 'sdhp',                 name: 'Sumo DL High Pull',             equipment: ['barbell'],            reps: 10, category: 'full_body', unit: 'reps', muscles: ['back', 'shoulders'] },

  // Kettlebell
  { id: 'kb_swing',             name: 'KB Swings',                     equipment: ['kettlebell'],         reps: 20, category: 'cardio',    unit: 'reps', muscles: ['full_body'] },
  { id: 'kb_snatch',            name: 'KB Snatch',                     equipment: ['kettlebell'],         reps: 8,  category: 'full_body', unit: 'reps', muscles: ['full_body'] },
  { id: 'kb_clean_press',       name: 'KB Clean and Press',            equipment: ['kettlebell'],         reps: 8,  category: 'full_body', unit: 'reps', muscles: ['shoulders', 'full_body'] },
  { id: 'kb_goblet_squat',      name: 'KB Goblet Squat',               equipment: ['kettlebell'],         reps: 15, category: 'legs',      unit: 'reps', muscles: ['legs'] },
  { id: 'kb_rdl',               name: 'KB Romanian Deadlift',          equipment: ['kettlebell'],         reps: 12, category: 'legs',      unit: 'reps', muscles: ['legs'] },
  { id: 'kb_press',             name: 'KB Press',                      equipment: ['kettlebell'],         reps: 10, category: 'push',      unit: 'reps', muscles: ['shoulders'] },
  { id: 'kb_row',               name: 'KB Row',                        equipment: ['kettlebell'],         reps: 12, category: 'pull',      unit: 'reps', muscles: ['back'] },
  { id: 'kb_tgu',               name: 'KB Turkish Get-up',             equipment: ['kettlebell'],         reps: 5,  category: 'full_body', unit: 'reps', muscles: ['full_body'] },
  { id: 'kb_halo',              name: 'KB Halo',                       equipment: ['kettlebell'],         reps: 10, category: 'core',      unit: 'reps', muscles: ['shoulders', 'core'] },

  // Box / Jump Rope
  { id: 'box_jumps',            name: 'Box Jumps',                     equipment: ['box'],                reps: 15, category: 'legs',      unit: 'reps', muscles: ['legs'] },
  { id: 'box_jump_overs',       name: 'Box Jump Overs',                equipment: ['box'],                reps: 12, category: 'cardio',    unit: 'reps', muscles: ['legs'] },
  { id: 'double_unders',        name: 'Double Unders',                 equipment: ['jump_rope'],          reps: 50, category: 'cardio',    unit: 'reps', muscles: ['full_body'] },
  { id: 'single_unders',        name: 'Single Unders',                 equipment: ['jump_rope'],          reps: 100,category: 'cardio',    unit: 'reps', muscles: ['full_body'] },

  // Rings
  { id: 'ring_muscle_up',       name: 'Ring Muscle-ups',               equipment: ['rings'],              reps: 5,  category: 'pull',      unit: 'reps', muscles: ['back', 'triceps'] },
  { id: 'ring_dips',            name: 'Ring Dips',                     equipment: ['rings'],              reps: 10, category: 'push',      unit: 'reps', muscles: ['chest', 'triceps'] },
  { id: 'ring_rows',            name: 'Ring Rows',                     equipment: ['rings'],              reps: 12, category: 'pull',      unit: 'reps', muscles: ['back'] },

  // Bands
  { id: 'band_squat',           name: 'Banded Squats',                 equipment: ['bands'],              reps: 20, category: 'legs',      unit: 'reps', muscles: ['legs'] },
  { id: 'band_deadlift',        name: 'Banded Deadlifts',              equipment: ['bands'],              reps: 15, category: 'legs',      unit: 'reps', muscles: ['legs'] },
  { id: 'band_pull_apart',      name: 'Band Pull-Aparts',              equipment: ['bands'],              reps: 20, category: 'pull',      unit: 'reps', muscles: ['shoulders', 'back'] },
  { id: 'band_face_pull',       name: 'Band Face Pulls',               equipment: ['bands'],              reps: 20, category: 'pull',      unit: 'reps', muscles: ['shoulders'] },
  { id: 'band_lateral_walk',    name: 'Lateral Band Walks',            equipment: ['bands'],              reps: 20, category: 'legs',      unit: 'reps', muscles: ['legs'] },
];

// ── Muscle Groups (Superset — multi-select) ───────────────────────────────────
const MUSCLE_GROUPS = [
  { id: 'chest',     label: 'Chest',     muscles: ['chest'] },
  { id: 'back',      label: 'Back',      muscles: ['back'] },
  { id: 'shoulders', label: 'Shoulders', muscles: ['shoulders'] },
  { id: 'biceps',    label: 'Biceps',    muscles: ['biceps'] },
  { id: 'triceps',   label: 'Triceps',   muscles: ['triceps'] },
  { id: 'legs',      label: 'Legs',      muscles: ['legs'] },
  { id: 'core',      label: 'Core',      muscles: ['core'] },
];

const SPLITS = MUSCLE_GROUPS; // backwards compat for saved workouts

const EQUIPMENT_OPTIONS = [
  { id: 'dumbbells',  label: 'Dumbbells'   },
  { id: 'barbell',    label: 'Barbell'     },
  { id: 'cables',     label: 'Cables'      },
  { id: 'machine',    label: 'Machine'     },
  { id: 'kettlebell', label: 'Kettlebell'  },
  { id: 'bands',      label: 'Bands'       },
  { id: 'pullup_bar', label: 'Pull-up Bar' },
  { id: 'rings',      label: 'Rings'       },
  { id: 'box',        label: 'Box'         },
  { id: 'jump_rope',  label: 'Jump Rope'   },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function getAvailableExercises(selectedEquipment) {
  return EXERCISES.filter(ex =>
    ex.equipment.length === 0 ||
    ex.equipment.some(eq => selectedEquipment.includes(eq))
  );
}

function getExercisesForMuscles(selectedMuscleIds, selectedEquipment) {
  const targetMuscles = selectedMuscleIds.flatMap(id =>
    MUSCLE_GROUPS.find(g => g.id === id)?.muscles || []
  );
  return getAvailableExercises(selectedEquipment).filter(ex =>
    ex.muscles && ex.muscles.some(m => targetMuscles.includes(m))
  );
}

// EMOM: balanced CrossFit-style set
function generateEmomWorkout(selectedEquipment, count) {
  const available = getAvailableExercises(selectedEquipment);
  const sequence  = ['legs', 'push', 'core', 'pull', 'cardio', 'full_body', 'legs', 'push', 'core', 'pull'];
  const pool      = {};
  ['legs','push','core','pull','cardio','full_body'].forEach(c => {
    pool[c] = available.filter(ex => ex.category === c);
  });
  const exercises = [];
  const used      = new Set();
  for (let i = 0; i < count; i++) {
    const cat  = sequence[i % sequence.length];
    let picks  = (pool[cat] || []).filter(ex => !used.has(ex.id));
    if (!picks.length) picks = available.filter(ex => !used.has(ex.id));
    if (!picks.length) { used.clear(); picks = available; }
    const ex = picks[Math.floor(Math.random() * picks.length)];
    used.add(ex.id);
    exercises.push({ ...ex });
  }
  return exercises;
}

// Superset: generates numPairs pairs for selected muscle groups
function generateSupersetWorkout(selectedMuscleIds, selectedEquipment, numPairs = 4) {
  const pool = getExercisesForMuscles(selectedMuscleIds, selectedEquipment);
  const used = new Set();

  const byMuscle = {};
  selectedMuscleIds.forEach(id => {
    const muscles = MUSCLE_GROUPS.find(g => g.id === id)?.muscles || [];
    byMuscle[id]  = pool.filter(ex => ex.muscles.some(m => muscles.includes(m)));
  });

  const workout  = [];
  const NUM_PAIRS = numPairs;

  for (let i = 0; i < NUM_PAIRS; i++) {
    const idxA   = i % selectedMuscleIds.length;
    const idxB   = (i + 1) % selectedMuscleIds.length;
    const mA     = selectedMuscleIds[idxA];
    const mB     = selectedMuscleIds[idxB];

    let pickA = (byMuscle[mA] || pool).filter(ex => !used.has(ex.id));
    if (!pickA.length) pickA = pool.filter(ex => !used.has(ex.id));
    if (!pickA.length) break;

    const a = pickA[Math.floor(Math.random() * pickA.length)];
    used.add(a.id);

    let pickB = (byMuscle[mB] || pool).filter(ex => !used.has(ex.id) && ex.id !== a.id);
    if (!pickB.length) pickB = pool.filter(ex => !used.has(ex.id) && ex.id !== a.id);
    if (!pickB.length) break;

    const b = pickB[Math.floor(Math.random() * pickB.length)];
    used.add(b.id);

    workout.push({ id: `ss_${i}`, exerciseA: { ...a, sets: 4 }, exerciseB: { ...b, sets: 4 }, restSeconds: 60 });
  }
  return workout;
}

// Swipe alternatives: same muscle group, sorted for consistent cycling
function getAlternatives(exercise, selectedEquipment) {
  return getAvailableExercises(selectedEquipment)
    .filter(ex =>
      ex.id !== exercise.id &&
      ex.muscles && exercise.muscles &&
      ex.muscles.some(m => exercise.muscles.includes(m))
    )
    .sort((a, b) => a.id.localeCompare(b.id));
}
