// Exercise database
const EXERCISES = [
  // Bodyweight
  { id: 'burpees',           name: 'Burpees',              equipment: [],              reps: 10, category: 'cardio',    unit: 'reps' },
  { id: 'pushups',           name: 'Push-ups',             equipment: [],              reps: 15, category: 'push',      unit: 'reps' },
  { id: 'air_squats',        name: 'Air Squats',           equipment: [],              reps: 20, category: 'legs',      unit: 'reps' },
  { id: 'mountain_climbers', name: 'Mountain Climbers',    equipment: [],              reps: 20, category: 'cardio',    unit: 'reps' },
  { id: 'jumping_jacks',     name: 'Jumping Jacks',        equipment: [],              reps: 30, category: 'cardio',    unit: 'reps' },
  { id: 'high_knees',        name: 'High Knees',           equipment: [],              reps: 30, category: 'cardio',    unit: 'reps' },
  { id: 'plank',             name: 'Plank Hold',           equipment: [],              reps: 40, category: 'core',      unit: 'sec'  },
  { id: 'sit_ups',           name: 'Sit-ups',              equipment: [],              reps: 20, category: 'core',      unit: 'reps' },
  { id: 'lunges',            name: 'Lunges',               equipment: [],              reps: 16, category: 'legs',      unit: 'reps' },
  { id: 'jump_squats',       name: 'Jump Squats',          equipment: [],              reps: 15, category: 'legs',      unit: 'reps' },
  { id: 'pike_pushups',      name: 'Pike Push-ups',        equipment: [],              reps: 12, category: 'push',      unit: 'reps' },
  { id: 'tricep_dips',       name: 'Tricep Dips',          equipment: [],              reps: 15, category: 'push',      unit: 'reps' },
  { id: 'v_ups',             name: 'V-ups',                equipment: [],              reps: 15, category: 'core',      unit: 'reps' },
  { id: 'flutter_kicks',     name: 'Flutter Kicks',        equipment: [],              reps: 30, category: 'core',      unit: 'reps' },
  { id: 'speed_skaters',     name: 'Speed Skaters',        equipment: [],              reps: 20, category: 'cardio',    unit: 'reps' },
  { id: 'inchworm',          name: 'Inchworms',            equipment: [],              reps: 10, category: 'full_body', unit: 'reps' },
  { id: 'glute_bridge',      name: 'Glute Bridges',        equipment: [],              reps: 20, category: 'legs',      unit: 'reps' },
  { id: 'calf_raises',       name: 'Calf Raises',          equipment: [],              reps: 25, category: 'legs',      unit: 'reps' },
  { id: 'diamond_pushups',   name: 'Diamond Push-ups',     equipment: [],              reps: 12, category: 'push',      unit: 'reps' },
  { id: 'hollow_body',       name: 'Hollow Body Hold',     equipment: [],              reps: 30, category: 'core',      unit: 'sec'  },
  { id: 'broad_jump',        name: 'Broad Jumps',          equipment: [],              reps: 8,  category: 'legs',      unit: 'reps' },
  { id: 'lateral_shuffle',   name: 'Lateral Shuffles',     equipment: [],              reps: 20, category: 'cardio',    unit: 'reps' },

  // Dumbbells
  { id: 'db_chest_press',    name: 'DB Chest Press',       equipment: ['dumbbells'],   reps: 12, category: 'push',      unit: 'reps' },
  { id: 'db_row',            name: 'DB Rows',              equipment: ['dumbbells'],   reps: 12, category: 'pull',      unit: 'reps' },
  { id: 'goblet_squat',      name: 'Goblet Squats',        equipment: ['dumbbells', 'kettlebell'], reps: 15, category: 'legs', unit: 'reps' },
  { id: 'db_lunge',          name: 'DB Lunges',            equipment: ['dumbbells'],   reps: 12, category: 'legs',      unit: 'reps' },
  { id: 'db_shoulder_press', name: 'DB Shoulder Press',    equipment: ['dumbbells'],   reps: 12, category: 'push',      unit: 'reps' },
  { id: 'bicep_curl',        name: 'Bicep Curls',          equipment: ['dumbbells'],   reps: 12, category: 'pull',      unit: 'reps' },
  { id: 'tricep_ext',        name: 'Tricep Extensions',    equipment: ['dumbbells'],   reps: 12, category: 'push',      unit: 'reps' },
  { id: 'rdl_db',            name: 'Romanian Deadlift',    equipment: ['dumbbells', 'barbell', 'kettlebell'], reps: 12, category: 'legs', unit: 'reps' },
  { id: 'db_thruster',       name: 'DB Thrusters',         equipment: ['dumbbells'],   reps: 10, category: 'full_body', unit: 'reps' },
  { id: 'renegade_row',      name: 'Renegade Rows',        equipment: ['dumbbells'],   reps: 10, category: 'pull',      unit: 'reps' },
  { id: 'lateral_raise',     name: 'Lateral Raises',       equipment: ['dumbbells'],   reps: 15, category: 'push',      unit: 'reps' },
  { id: 'db_swing',          name: 'DB Swings',            equipment: ['dumbbells'],   reps: 15, category: 'cardio',    unit: 'reps' },
  { id: 'db_clean',          name: 'DB Power Cleans',      equipment: ['dumbbells'],   reps: 10, category: 'full_body', unit: 'reps' },
  { id: 'db_snatch',         name: 'DB Snatch',            equipment: ['dumbbells'],   reps: 8,  category: 'full_body', unit: 'reps' },
  { id: 'db_fly',            name: 'DB Flyes',             equipment: ['dumbbells'],   reps: 12, category: 'push',      unit: 'reps' },
  { id: 'hammer_curl',       name: 'Hammer Curls',         equipment: ['dumbbells'],   reps: 12, category: 'pull',      unit: 'reps' },
  { id: 'db_step_up',        name: 'DB Step-ups',          equipment: ['dumbbells'],   reps: 12, category: 'legs',      unit: 'reps' },

  // Barbell
  { id: 'deadlift',          name: 'Deadlifts',            equipment: ['barbell'],     reps: 5,  category: 'legs',      unit: 'reps' },
  { id: 'back_squat',        name: 'Back Squat',           equipment: ['barbell'],     reps: 8,  category: 'legs',      unit: 'reps' },
  { id: 'front_squat',       name: 'Front Squat',          equipment: ['barbell'],     reps: 8,  category: 'legs',      unit: 'reps' },
  { id: 'power_clean',       name: 'Power Cleans',         equipment: ['barbell'],     reps: 5,  category: 'full_body', unit: 'reps' },
  { id: 'barbell_row',       name: 'Barbell Rows',         equipment: ['barbell'],     reps: 10, category: 'pull',      unit: 'reps' },
  { id: 'bench_press',       name: 'Bench Press',          equipment: ['barbell'],     reps: 10, category: 'push',      unit: 'reps' },
  { id: 'ohp',               name: 'Overhead Press',       equipment: ['barbell'],     reps: 8,  category: 'push',      unit: 'reps' },
  { id: 'hang_clean',        name: 'Hang Power Clean',     equipment: ['barbell'],     reps: 5,  category: 'full_body', unit: 'reps' },
  { id: 'barbell_lunge',     name: 'Barbell Lunges',       equipment: ['barbell'],     reps: 12, category: 'legs',      unit: 'reps' },
  { id: 'push_press',        name: 'Push Press',           equipment: ['barbell'],     reps: 8,  category: 'push',      unit: 'reps' },

  // Kettlebell
  { id: 'kb_swing',          name: 'KB Swings',            equipment: ['kettlebell'],  reps: 20, category: 'cardio',    unit: 'reps' },
  { id: 'kb_clean_press',    name: 'KB Clean and Press',   equipment: ['kettlebell'],  reps: 8,  category: 'full_body', unit: 'reps' },
  { id: 'kb_snatch',         name: 'KB Snatch',            equipment: ['kettlebell'],  reps: 8,  category: 'full_body', unit: 'reps' },
  { id: 'kb_row',            name: 'KB Row',               equipment: ['kettlebell'],  reps: 12, category: 'pull',      unit: 'reps' },
  { id: 'kb_deadlift',       name: 'KB Deadlift',          equipment: ['kettlebell'],  reps: 15, category: 'legs',      unit: 'reps' },
  { id: 'kb_windmill',       name: 'KB Windmill',          equipment: ['kettlebell'],  reps: 8,  category: 'core',      unit: 'reps' },
  { id: 'kb_goblet',         name: 'KB Goblet Squat',      equipment: ['kettlebell'],  reps: 15, category: 'legs',      unit: 'reps' },
  { id: 'kb_halo',           name: 'KB Halo',              equipment: ['kettlebell'],  reps: 10, category: 'core',      unit: 'reps' },

  // Resistance Bands
  { id: 'band_squat',        name: 'Banded Squats',        equipment: ['bands'],       reps: 20, category: 'legs',      unit: 'reps' },
  { id: 'band_row',          name: 'Banded Rows',          equipment: ['bands'],       reps: 15, category: 'pull',      unit: 'reps' },
  { id: 'band_press',        name: 'Banded Chest Press',   equipment: ['bands'],       reps: 15, category: 'push',      unit: 'reps' },
  { id: 'band_pull_apart',   name: 'Band Pull-Aparts',     equipment: ['bands'],       reps: 20, category: 'pull',      unit: 'reps' },
  { id: 'band_lateral_walk', name: 'Lateral Band Walks',   equipment: ['bands'],       reps: 20, category: 'legs',      unit: 'reps' },
  { id: 'band_deadlift',     name: 'Banded Deadlifts',     equipment: ['bands'],       reps: 15, category: 'legs',      unit: 'reps' },
  { id: 'band_bicep_curl',   name: 'Banded Bicep Curls',   equipment: ['bands'],       reps: 15, category: 'pull',      unit: 'reps' },
  { id: 'band_tricep_ext',   name: 'Banded Tricep Pushdown', equipment: ['bands'],     reps: 15, category: 'push',      unit: 'reps' },

  // Pull-up Bar
  { id: 'pullups',           name: 'Pull-ups',             equipment: ['pullup_bar'],  reps: 8,  category: 'pull',      unit: 'reps' },
  { id: 'chinups',           name: 'Chin-ups',             equipment: ['pullup_bar'],  reps: 8,  category: 'pull',      unit: 'reps' },
  { id: 'hanging_knee_raise',name: 'Hanging Knee Raises',  equipment: ['pullup_bar'],  reps: 15, category: 'core',      unit: 'reps' },
  { id: 'toes_to_bar',       name: 'Toes to Bar',          equipment: ['pullup_bar'],  reps: 10, category: 'core',      unit: 'reps' },
  { id: 'bar_muscle_up',     name: 'Bar Muscle-ups',       equipment: ['pullup_bar'],  reps: 5,  category: 'pull',      unit: 'reps' },
  { id: 'inverted_row',      name: 'Inverted Rows',        equipment: ['pullup_bar'],  reps: 12, category: 'pull',      unit: 'reps' },
  { id: 'l_sit_hang',        name: 'L-Sit Hang',           equipment: ['pullup_bar'],  reps: 20, category: 'core',      unit: 'sec'  },
];

const EQUIPMENT_OPTIONS = [
  { id: 'dumbbells',   label: 'Dumbbells'       },
  { id: 'barbell',     label: 'Barbell'         },
  { id: 'kettlebell',  label: 'Kettlebell'      },
  { id: 'bands',       label: 'Resistance Bands'},
  { id: 'pullup_bar',  label: 'Pull-up Bar'     },
];

// Filter exercises by selected equipment (bodyweight always included)
function getAvailableExercises(selectedEquipment) {
  return EXERCISES.filter(ex =>
    ex.equipment.length === 0 ||
    ex.equipment.some(eq => selectedEquipment.includes(eq))
  );
}

// Generate a balanced EMOM workout — returns `exercisesPerRound` unique exercises
// that will be repeated for `rounds` rounds (total = exercisesPerRound × rounds minutes)
function generateEmomWorkout(selectedEquipment, exercisesPerRound) {
  const available = getAvailableExercises(selectedEquipment);
  const categories = ['legs', 'push', 'core', 'pull', 'cardio', 'full_body'];
  const pool = {};
  categories.forEach(c => { pool[c] = available.filter(ex => ex.category === c); });

  // Cycle through categories to get a balanced set
  const sequence = ['legs', 'push', 'core', 'pull', 'cardio', 'full_body', 'legs', 'push', 'core', 'pull'];
  const exercises = [];
  const used = new Set();

  for (let i = 0; i < exercisesPerRound; i++) {
    const cat = sequence[i % sequence.length];
    let candidates = (pool[cat] || []).filter(ex => !used.has(ex.id));
    if (candidates.length === 0) {
      candidates = available.filter(ex => !used.has(ex.id));
    }
    if (candidates.length === 0) {
      used.clear();
      candidates = available;
    }
    const ex = candidates[Math.floor(Math.random() * candidates.length)];
    used.add(ex.id);
    exercises.push({ ...ex });
  }
  return exercises;
}

// Generate a balanced superset workout (pairs of exercises)
function generateSupersetWorkout(selectedEquipment) {
  const available = getAvailableExercises(selectedEquipment);
  const pairs = [
    ['push', 'pull'],
    ['legs', 'core'],
    ['push', 'legs'],
    ['pull', 'core'],
  ];
  const workout = [];
  const used = new Set();

  pairs.forEach(([catA, catB]) => {
    const poolA = available.filter(ex => ex.category === catA && !used.has(ex.id));
    const poolB = available.filter(ex => ex.category === catB && !used.has(ex.id));
    if (poolA.length && poolB.length) {
      const a = poolA[Math.floor(Math.random() * poolA.length)];
      const b = poolB[Math.floor(Math.random() * poolB.length)];
      used.add(a.id);
      used.add(b.id);
      workout.push({
        id: `ss_${workout.length}`,
        exerciseA: { ...a, sets: 3 },
        exerciseB: { ...b, sets: 3 },
        restSeconds: 60,
      });
    }
  });
  return workout;
}

// Get alternative exercises for a given exercise (same category, different id)
function getAlternatives(exercise, selectedEquipment) {
  return getAvailableExercises(selectedEquipment).filter(
    ex => ex.category === exercise.category && ex.id !== exercise.id
  );
}
