// Exercise database — CrossFit-focused with broad equipment coverage
// muscles = primary muscle group(s) used, for split-based filtering
const EXERCISES = [

  // ── Bodyweight / Gymnastics ───────────────────────────────────────────────
  { id: 'air_squats',          name: 'Air Squats',               equipment: [],                          reps: 20, category: 'legs',      unit: 'reps', muscles: ['legs'] },
  { id: 'jump_squats',         name: 'Jump Squats',              equipment: [],                          reps: 15, category: 'legs',      unit: 'reps', muscles: ['legs'] },
  { id: 'broad_jumps',         name: 'Broad Jumps',              equipment: [],                          reps: 8,  category: 'legs',      unit: 'reps', muscles: ['legs'] },
  { id: 'lunges',              name: 'Lunges',                   equipment: [],                          reps: 16, category: 'legs',      unit: 'reps', muscles: ['legs'] },
  { id: 'reverse_lunges',      name: 'Reverse Lunges',           equipment: [],                          reps: 16, category: 'legs',      unit: 'reps', muscles: ['legs'] },
  { id: 'glute_bridge',        name: 'Glute Bridges',            equipment: [],                          reps: 20, category: 'legs',      unit: 'reps', muscles: ['legs'] },
  { id: 'single_leg_rdl',      name: 'Single Leg RDL',           equipment: [],                          reps: 10, category: 'legs',      unit: 'reps', muscles: ['legs'] },
  { id: 'calf_raises',         name: 'Calf Raises',              equipment: [],                          reps: 25, category: 'legs',      unit: 'reps', muscles: ['legs'] },
  { id: 'pistol_squat',        name: 'Pistol Squats',            equipment: [],                          reps: 8,  category: 'legs',      unit: 'reps', muscles: ['legs'] },
  { id: 'step_ups',            name: 'Step-ups',                 equipment: [],                          reps: 16, category: 'legs',      unit: 'reps', muscles: ['legs'] },

  { id: 'pushups',             name: 'Push-ups',                 equipment: [],                          reps: 15, category: 'push',      unit: 'reps', muscles: ['chest', 'triceps'] },
  { id: 'diamond_pushups',     name: 'Diamond Push-ups',         equipment: [],                          reps: 12, category: 'push',      unit: 'reps', muscles: ['triceps', 'chest'] },
  { id: 'pike_pushups',        name: 'Pike Push-ups',            equipment: [],                          reps: 12, category: 'push',      unit: 'reps', muscles: ['shoulders'] },
  { id: 'hspu',                name: 'Handstand Push-ups',       equipment: [],                          reps: 8,  category: 'push',      unit: 'reps', muscles: ['shoulders', 'triceps'] },
  { id: 'handstand_hold',      name: 'Handstand Hold',           equipment: [],                          reps: 30, category: 'push',      unit: 'sec',  muscles: ['shoulders'] },
  { id: 'tricep_dips',         name: 'Tricep Dips',              equipment: [],                          reps: 15, category: 'push',      unit: 'reps', muscles: ['triceps', 'chest'] },

  { id: 'pullups',             name: 'Pull-ups',                 equipment: ['pullup_bar'],              reps: 8,  category: 'pull',      unit: 'reps', muscles: ['back'] },
  { id: 'chinups',             name: 'Chin-ups',                 equipment: ['pullup_bar'],              reps: 8,  category: 'pull',      unit: 'reps', muscles: ['biceps', 'back'] },
  { id: 'kipping_pullups',     name: 'Kipping Pull-ups',         equipment: ['pullup_bar'],              reps: 10, category: 'pull',      unit: 'reps', muscles: ['back'] },
  { id: 'chest_to_bar',        name: 'Chest-to-Bar Pull-ups',    equipment: ['pullup_bar'],              reps: 7,  category: 'pull',      unit: 'reps', muscles: ['back'] },
  { id: 'bar_muscle_up',       name: 'Bar Muscle-ups',           equipment: ['pullup_bar'],              reps: 5,  category: 'pull',      unit: 'reps', muscles: ['back', 'triceps'] },
  { id: 'inverted_row',        name: 'Inverted Rows',            equipment: ['pullup_bar'],              reps: 12, category: 'pull',      unit: 'reps', muscles: ['back'] },
  { id: 'toes_to_bar',         name: 'Toes to Bar',              equipment: ['pullup_bar'],              reps: 10, category: 'core',      unit: 'reps', muscles: ['core'] },
  { id: 'hanging_knee_raise',  name: 'Hanging Knee Raises',      equipment: ['pullup_bar'],              reps: 15, category: 'core',      unit: 'reps', muscles: ['core'] },
  { id: 'l_sit_hang',          name: 'L-Sit Hang',               equipment: ['pullup_bar'],              reps: 20, category: 'core',      unit: 'sec',  muscles: ['core'] },

  { id: 'burpees',             name: 'Burpees',                  equipment: [],                          reps: 10, category: 'cardio',    unit: 'reps', muscles: ['full_body'] },
  { id: 'burpee_pullup',       name: 'Burpee Pull-ups',          equipment: ['pullup_bar'],              reps: 7,  category: 'cardio',    unit: 'reps', muscles: ['full_body'] },
  { id: 'burpee_box_jump',     name: 'Burpee Box Jumps',         equipment: ['box'],                     reps: 8,  category: 'cardio',    unit: 'reps', muscles: ['full_body'] },
  { id: 'mountain_climbers',   name: 'Mountain Climbers',        equipment: [],                          reps: 20, category: 'cardio',    unit: 'reps', muscles: ['core', 'full_body'] },
  { id: 'jumping_jacks',       name: 'Jumping Jacks',            equipment: [],                          reps: 30, category: 'cardio',    unit: 'reps', muscles: ['full_body'] },
  { id: 'high_knees',          name: 'High Knees',               equipment: [],                          reps: 30, category: 'cardio',    unit: 'reps', muscles: ['full_body'] },
  { id: 'speed_skaters',       name: 'Speed Skaters',            equipment: [],                          reps: 20, category: 'cardio',    unit: 'reps', muscles: ['legs'] },
  { id: 'lateral_shuffle',     name: 'Lateral Shuffles',         equipment: [],                          reps: 20, category: 'cardio',    unit: 'reps', muscles: ['legs'] },
  { id: 'inchworm',            name: 'Inchworms',                equipment: [],                          reps: 10, category: 'full_body', unit: 'reps', muscles: ['full_body'] },

  { id: 'sit_ups',             name: 'Sit-ups',                  equipment: [],                          reps: 20, category: 'core',      unit: 'reps', muscles: ['core'] },
  { id: 'ghd_situps',          name: 'GHD Sit-ups',              equipment: [],                          reps: 15, category: 'core',      unit: 'reps', muscles: ['core'] },
  { id: 'v_ups',               name: 'V-ups',                    equipment: [],                          reps: 15, category: 'core',      unit: 'reps', muscles: ['core'] },
  { id: 'flutter_kicks',       name: 'Flutter Kicks',            equipment: [],                          reps: 30, category: 'core',      unit: 'reps', muscles: ['core'] },
  { id: 'plank',               name: 'Plank Hold',               equipment: [],                          reps: 45, category: 'core',      unit: 'sec',  muscles: ['core'] },
  { id: 'hollow_body',         name: 'Hollow Body Hold',         equipment: [],                          reps: 30, category: 'core',      unit: 'sec',  muscles: ['core'] },
  { id: 'superman_hold',       name: 'Superman Hold',            equipment: [],                          reps: 30, category: 'core',      unit: 'sec',  muscles: ['back', 'core'] },
  { id: 'russian_twist',       name: 'Russian Twists',           equipment: [],                          reps: 20, category: 'core',      unit: 'reps', muscles: ['core'] },
  { id: 'ab_mat_situps',       name: 'AbMat Sit-ups',            equipment: [],                          reps: 20, category: 'core',      unit: 'reps', muscles: ['core'] },

  // ── Box ───────────────────────────────────────────────────────────────────
  { id: 'box_jumps',           name: 'Box Jumps',                equipment: ['box'],                     reps: 15, category: 'legs',      unit: 'reps', muscles: ['legs'] },
  { id: 'box_jump_overs',      name: 'Box Jump Overs',           equipment: ['box'],                     reps: 12, category: 'cardio',    unit: 'reps', muscles: ['legs'] },
  { id: 'box_step_ups',        name: 'Box Step-ups',             equipment: ['box'],                     reps: 16, category: 'legs',      unit: 'reps', muscles: ['legs'] },
  { id: 'box_dips',            name: 'Box Dips',                 equipment: ['box'],                     reps: 15, category: 'push',      unit: 'reps', muscles: ['triceps'] },
  { id: 'depth_jumps',         name: 'Depth Jumps',              equipment: ['box'],                     reps: 8,  category: 'legs',      unit: 'reps', muscles: ['legs'] },

  // ── Jump Rope ─────────────────────────────────────────────────────────────
  { id: 'double_unders',       name: 'Double Unders',            equipment: ['jump_rope'],               reps: 50, category: 'cardio',    unit: 'reps', muscles: ['full_body'] },
  { id: 'single_unders',       name: 'Single Unders',            equipment: ['jump_rope'],               reps: 100,category: 'cardio',    unit: 'reps', muscles: ['full_body'] },
  { id: 'triple_unders',       name: 'Triple Unders',            equipment: ['jump_rope'],               reps: 20, category: 'cardio',    unit: 'reps', muscles: ['full_body'] },

  // ── Rings ─────────────────────────────────────────────────────────────────
  { id: 'ring_muscle_up',      name: 'Ring Muscle-ups',          equipment: ['rings'],                   reps: 5,  category: 'pull',      unit: 'reps', muscles: ['back', 'triceps'] },
  { id: 'ring_dips',           name: 'Ring Dips',                equipment: ['rings'],                   reps: 10, category: 'push',      unit: 'reps', muscles: ['chest', 'triceps'] },
  { id: 'ring_rows',           name: 'Ring Rows',                equipment: ['rings'],                   reps: 12, category: 'pull',      unit: 'reps', muscles: ['back'] },
  { id: 'ring_pushups',        name: 'Ring Push-ups',            equipment: ['rings'],                   reps: 12, category: 'push',      unit: 'reps', muscles: ['chest'] },
  { id: 'ring_support_hold',   name: 'Ring Support Hold',        equipment: ['rings'],                   reps: 20, category: 'core',      unit: 'sec',  muscles: ['shoulders', 'core'] },
  { id: 'false_grip_rows',     name: 'False Grip Ring Rows',     equipment: ['rings'],                   reps: 8,  category: 'pull',      unit: 'reps', muscles: ['back', 'biceps'] },

  // ── Dumbbells ─────────────────────────────────────────────────────────────
  { id: 'db_snatch',           name: 'DB Snatch',                equipment: ['dumbbells'],               reps: 10, category: 'full_body', unit: 'reps', muscles: ['full_body'] },
  { id: 'db_clean',            name: 'DB Power Clean',           equipment: ['dumbbells'],               reps: 10, category: 'full_body', unit: 'reps', muscles: ['full_body'] },
  { id: 'db_clean_jerk',       name: 'DB Clean and Jerk',        equipment: ['dumbbells'],               reps: 8,  category: 'full_body', unit: 'reps', muscles: ['full_body'] },
  { id: 'db_thruster',         name: 'DB Thrusters',             equipment: ['dumbbells'],               reps: 10, category: 'full_body', unit: 'reps', muscles: ['full_body'] },
  { id: 'db_chest_press',      name: 'DB Chest Press',           equipment: ['dumbbells'],               reps: 12, category: 'push',      unit: 'reps', muscles: ['chest'] },
  { id: 'db_shoulder_press',   name: 'DB Shoulder Press',        equipment: ['dumbbells'],               reps: 12, category: 'push',      unit: 'reps', muscles: ['shoulders'] },
  { id: 'db_push_press',       name: 'DB Push Press',            equipment: ['dumbbells'],               reps: 10, category: 'push',      unit: 'reps', muscles: ['shoulders'] },
  { id: 'db_row',              name: 'DB Rows',                  equipment: ['dumbbells'],               reps: 12, category: 'pull',      unit: 'reps', muscles: ['back'] },
  { id: 'renegade_row',        name: 'Renegade Rows',            equipment: ['dumbbells'],               reps: 10, category: 'pull',      unit: 'reps', muscles: ['back', 'core'] },
  { id: 'db_rdl',              name: 'DB Romanian Deadlift',     equipment: ['dumbbells'],               reps: 12, category: 'legs',      unit: 'reps', muscles: ['legs'] },
  { id: 'db_lunge',            name: 'DB Lunges',                equipment: ['dumbbells'],               reps: 12, category: 'legs',      unit: 'reps', muscles: ['legs'] },
  { id: 'db_step_up',          name: 'DB Step-ups',              equipment: ['dumbbells'],               reps: 12, category: 'legs',      unit: 'reps', muscles: ['legs'] },
  { id: 'goblet_squat',        name: 'Goblet Squats',            equipment: ['dumbbells', 'kettlebell'], reps: 15, category: 'legs',      unit: 'reps', muscles: ['legs'] },
  { id: 'db_swing',            name: 'DB Swings',                equipment: ['dumbbells'],               reps: 15, category: 'cardio',    unit: 'reps', muscles: ['full_body'] },
  { id: 'bicep_curl',          name: 'Bicep Curls',              equipment: ['dumbbells'],               reps: 12, category: 'pull',      unit: 'reps', muscles: ['biceps'] },
  { id: 'hammer_curl',         name: 'Hammer Curls',             equipment: ['dumbbells'],               reps: 12, category: 'pull',      unit: 'reps', muscles: ['biceps'] },
  { id: 'tricep_ext',          name: 'Tricep Extensions',        equipment: ['dumbbells'],               reps: 12, category: 'push',      unit: 'reps', muscles: ['triceps'] },
  { id: 'lateral_raise',       name: 'Lateral Raises',           equipment: ['dumbbells'],               reps: 15, category: 'push',      unit: 'reps', muscles: ['shoulders'] },
  { id: 'db_fly',              name: 'DB Flyes',                 equipment: ['dumbbells'],               reps: 12, category: 'push',      unit: 'reps', muscles: ['chest'] },
  { id: 'db_box_step_up',      name: 'DB Box Step-ups',          equipment: ['dumbbells', 'box'],        reps: 12, category: 'legs',      unit: 'reps', muscles: ['legs'] },

  // ── Barbell ───────────────────────────────────────────────────────────────
  { id: 'power_clean',         name: 'Power Cleans',             equipment: ['barbell'],                 reps: 5,  category: 'full_body', unit: 'reps', muscles: ['full_body'] },
  { id: 'hang_power_clean',    name: 'Hang Power Clean',         equipment: ['barbell'],                 reps: 5,  category: 'full_body', unit: 'reps', muscles: ['full_body'] },
  { id: 'squat_clean',         name: 'Squat Clean',              equipment: ['barbell'],                 reps: 5,  category: 'full_body', unit: 'reps', muscles: ['full_body'] },
  { id: 'clean_jerk',          name: 'Clean and Jerk',           equipment: ['barbell'],                 reps: 3,  category: 'full_body', unit: 'reps', muscles: ['full_body'] },
  { id: 'power_snatch',        name: 'Power Snatch',             equipment: ['barbell'],                 reps: 5,  category: 'full_body', unit: 'reps', muscles: ['full_body'] },
  { id: 'hang_power_snatch',   name: 'Hang Power Snatch',        equipment: ['barbell'],                 reps: 5,  category: 'full_body', unit: 'reps', muscles: ['full_body'] },
  { id: 'snatch',              name: 'Snatch',                   equipment: ['barbell'],                 reps: 3,  category: 'full_body', unit: 'reps', muscles: ['full_body'] },
  { id: 'thruster',            name: 'Thrusters',                equipment: ['barbell'],                 reps: 7,  category: 'full_body', unit: 'reps', muscles: ['full_body'] },
  { id: 'push_jerk',           name: 'Push Jerk',                equipment: ['barbell'],                 reps: 5,  category: 'push',      unit: 'reps', muscles: ['shoulders', 'triceps'] },
  { id: 'split_jerk',          name: 'Split Jerk',               equipment: ['barbell'],                 reps: 5,  category: 'push',      unit: 'reps', muscles: ['shoulders'] },
  { id: 'push_press',          name: 'Push Press',               equipment: ['barbell'],                 reps: 8,  category: 'push',      unit: 'reps', muscles: ['shoulders'] },
  { id: 'strict_press',        name: 'Strict Press',             equipment: ['barbell'],                 reps: 8,  category: 'push',      unit: 'reps', muscles: ['shoulders'] },
  { id: 'back_squat',          name: 'Back Squat',               equipment: ['barbell'],                 reps: 8,  category: 'legs',      unit: 'reps', muscles: ['legs'] },
  { id: 'front_squat',         name: 'Front Squat',              equipment: ['barbell'],                 reps: 8,  category: 'legs',      unit: 'reps', muscles: ['legs'] },
  { id: 'overhead_squat',      name: 'Overhead Squat',           equipment: ['barbell'],                 reps: 8,  category: 'legs',      unit: 'reps', muscles: ['legs', 'shoulders'] },
  { id: 'deadlift',            name: 'Deadlifts',                equipment: ['barbell'],                 reps: 5,  category: 'legs',      unit: 'reps', muscles: ['legs', 'back'] },
  { id: 'sumo_deadlift',       name: 'Sumo Deadlift',            equipment: ['barbell'],                 reps: 5,  category: 'legs',      unit: 'reps', muscles: ['legs'] },
  { id: 'sdhp',                name: 'Sumo DL High Pull',        equipment: ['barbell'],                 reps: 10, category: 'full_body', unit: 'reps', muscles: ['full_body'] },
  { id: 'barbell_row',         name: 'Barbell Rows',             equipment: ['barbell'],                 reps: 10, category: 'pull',      unit: 'reps', muscles: ['back'] },
  { id: 'bench_press',         name: 'Bench Press',              equipment: ['barbell'],                 reps: 10, category: 'push',      unit: 'reps', muscles: ['chest'] },
  { id: 'barbell_lunge',       name: 'Barbell Lunges',           equipment: ['barbell'],                 reps: 12, category: 'legs',      unit: 'reps', muscles: ['legs'] },
  { id: 'barbell_rdl',         name: 'Romanian Deadlift',        equipment: ['barbell'],                 reps: 10, category: 'legs',      unit: 'reps', muscles: ['legs'] },
  { id: 'good_morning',        name: 'Good Mornings',            equipment: ['barbell'],                 reps: 10, category: 'legs',      unit: 'reps', muscles: ['legs', 'back'] },
  { id: 'barbell_box_squat',   name: 'Box Squats',               equipment: ['barbell', 'box'],          reps: 8,  category: 'legs',      unit: 'reps', muscles: ['legs'] },

  // ── Kettlebell ────────────────────────────────────────────────────────────
  { id: 'kb_swing',            name: 'KB Swings',                equipment: ['kettlebell'],              reps: 20, category: 'cardio',    unit: 'reps', muscles: ['full_body'] },
  { id: 'kb_american_swing',   name: 'KB American Swings',       equipment: ['kettlebell'],              reps: 15, category: 'cardio',    unit: 'reps', muscles: ['full_body'] },
  { id: 'kb_snatch',           name: 'KB Snatch',                equipment: ['kettlebell'],              reps: 8,  category: 'full_body', unit: 'reps', muscles: ['full_body'] },
  { id: 'kb_clean',            name: 'KB Clean',                 equipment: ['kettlebell'],              reps: 10, category: 'full_body', unit: 'reps', muscles: ['full_body'] },
  { id: 'kb_clean_press',      name: 'KB Clean and Press',       equipment: ['kettlebell'],              reps: 8,  category: 'full_body', unit: 'reps', muscles: ['full_body', 'shoulders'] },
  { id: 'kb_thruster',         name: 'KB Thruster',              equipment: ['kettlebell'],              reps: 10, category: 'full_body', unit: 'reps', muscles: ['full_body'] },
  { id: 'kb_goblet_squat',     name: 'KB Goblet Squat',          equipment: ['kettlebell'],              reps: 15, category: 'legs',      unit: 'reps', muscles: ['legs'] },
  { id: 'kb_rdl',              name: 'KB Romanian Deadlift',     equipment: ['kettlebell'],              reps: 12, category: 'legs',      unit: 'reps', muscles: ['legs'] },
  { id: 'kb_deadlift',         name: 'KB Deadlift',              equipment: ['kettlebell'],              reps: 15, category: 'legs',      unit: 'reps', muscles: ['legs'] },
  { id: 'kb_row',              name: 'KB Row',                   equipment: ['kettlebell'],              reps: 12, category: 'pull',      unit: 'reps', muscles: ['back'] },
  { id: 'kb_press',            name: 'KB Press',                 equipment: ['kettlebell'],              reps: 10, category: 'push',      unit: 'reps', muscles: ['shoulders'] },
  { id: 'kb_push_press',       name: 'KB Push Press',            equipment: ['kettlebell'],              reps: 10, category: 'push',      unit: 'reps', muscles: ['shoulders'] },
  { id: 'kb_windmill',         name: 'KB Windmill',              equipment: ['kettlebell'],              reps: 8,  category: 'core',      unit: 'reps', muscles: ['core', 'shoulders'] },
  { id: 'kb_halo',             name: 'KB Halo',                  equipment: ['kettlebell'],              reps: 10, category: 'core',      unit: 'reps', muscles: ['shoulders', 'core'] },
  { id: 'kb_tgu',              name: 'KB Turkish Get-up',        equipment: ['kettlebell'],              reps: 5,  category: 'full_body', unit: 'reps', muscles: ['full_body'] },
  { id: 'kb_figure_8',         name: 'KB Figure 8',              equipment: ['kettlebell'],              reps: 15, category: 'core',      unit: 'reps', muscles: ['core'] },
  { id: 'kb_lunge',            name: 'KB Lunges',                equipment: ['kettlebell'],              reps: 12, category: 'legs',      unit: 'reps', muscles: ['legs'] },
  { id: 'kb_suitcase_carry',   name: 'KB Suitcase Carry',        equipment: ['kettlebell'],              reps: 40, category: 'core',      unit: 'sec',  muscles: ['core'] },

  // ── Resistance Bands ─────────────────────────────────────────────────────
  { id: 'band_squat',          name: 'Banded Squats',            equipment: ['bands'],                   reps: 20, category: 'legs',      unit: 'reps', muscles: ['legs'] },
  { id: 'band_deadlift',       name: 'Banded Deadlifts',         equipment: ['bands'],                   reps: 15, category: 'legs',      unit: 'reps', muscles: ['legs'] },
  { id: 'band_lateral_walk',   name: 'Lateral Band Walks',       equipment: ['bands'],                   reps: 20, category: 'legs',      unit: 'reps', muscles: ['legs'] },
  { id: 'band_row',            name: 'Banded Rows',              equipment: ['bands'],                   reps: 15, category: 'pull',      unit: 'reps', muscles: ['back'] },
  { id: 'band_pull_apart',     name: 'Band Pull-Aparts',         equipment: ['bands'],                   reps: 20, category: 'pull',      unit: 'reps', muscles: ['shoulders', 'back'] },
  { id: 'band_press',          name: 'Banded Chest Press',       equipment: ['bands'],                   reps: 15, category: 'push',      unit: 'reps', muscles: ['chest'] },
  { id: 'band_bicep_curl',     name: 'Banded Bicep Curls',       equipment: ['bands'],                   reps: 15, category: 'pull',      unit: 'reps', muscles: ['biceps'] },
  { id: 'band_tricep_push',    name: 'Banded Tricep Pushdown',   equipment: ['bands'],                   reps: 15, category: 'push',      unit: 'reps', muscles: ['triceps'] },
  { id: 'band_face_pull',      name: 'Band Face Pulls',          equipment: ['bands'],                   reps: 20, category: 'pull',      unit: 'reps', muscles: ['shoulders', 'back'] },
  { id: 'band_good_morning',   name: 'Banded Good Mornings',     equipment: ['bands'],                   reps: 15, category: 'legs',      unit: 'reps', muscles: ['legs', 'back'] },
];

// Splits — each defines which muscle groups are targeted
const SPLITS = [
  { id: 'push',           label: 'Push',              desc: 'Chest, shoulders, triceps', muscles: ['chest', 'shoulders', 'triceps'] },
  { id: 'pull',           label: 'Pull',              desc: 'Back, biceps',              muscles: ['back', 'biceps'] },
  { id: 'legs',           label: 'Legs',              desc: 'Quads, hamstrings, glutes', muscles: ['legs'] },
  { id: 'core',           label: 'Core',              desc: 'Abs, obliques, stability',  muscles: ['core'] },
  { id: 'chest',          label: 'Chest',             desc: 'Chest focused',             muscles: ['chest'] },
  { id: 'back',           label: 'Back',              desc: 'Back focused',              muscles: ['back'] },
  { id: 'shoulders',      label: 'Shoulders',         desc: 'Deltoids, traps',           muscles: ['shoulders'] },
  { id: 'biceps',         label: 'Biceps',            desc: 'Biceps focused',            muscles: ['biceps'] },
  { id: 'triceps',        label: 'Triceps',           desc: 'Triceps focused',           muscles: ['triceps'] },
  { id: 'back_shoulders', label: 'Back & Shoulders',  desc: 'Pull + press combo',        muscles: ['back', 'shoulders'] },
  { id: 'chest_triceps',  label: 'Chest & Triceps',   desc: 'Classic push day',          muscles: ['chest', 'triceps'] },
  { id: 'back_biceps',    label: 'Back & Biceps',     desc: 'Classic pull day',          muscles: ['back', 'biceps'] },
  { id: 'legs_core',      label: 'Legs & Core',       desc: 'Lower body + stability',    muscles: ['legs', 'core'] },
  { id: 'upper',          label: 'Upper Body',        desc: 'Full upper body',           muscles: ['chest', 'back', 'shoulders', 'biceps', 'triceps'] },
  { id: 'full_body',      label: 'Full Body',         desc: 'Everything',                muscles: ['legs', 'chest', 'back', 'shoulders', 'biceps', 'triceps', 'core', 'full_body'] },
];

const EQUIPMENT_OPTIONS = [
  { id: 'dumbbells',  label: 'Dumbbells'        },
  { id: 'barbell',    label: 'Barbell'           },
  { id: 'kettlebell', label: 'Kettlebell'        },
  { id: 'bands',      label: 'Bands'             },
  { id: 'pullup_bar', label: 'Pull-up Bar'       },
  { id: 'rings',      label: 'Rings'             },
  { id: 'box',        label: 'Box'               },
  { id: 'jump_rope',  label: 'Jump Rope'         },
];

// Filter exercises available for the selected equipment (bodyweight always included)
function getAvailableExercises(selectedEquipment) {
  return EXERCISES.filter(ex =>
    ex.equipment.length === 0 ||
    ex.equipment.some(eq => selectedEquipment.includes(eq))
  );
}

// Generate a balanced EMOM set of `count` unique exercises
function generateEmomWorkout(selectedEquipment, count) {
  const available = getAvailableExercises(selectedEquipment);
  const sequence   = ['legs', 'push', 'core', 'pull', 'cardio', 'full_body', 'legs', 'push', 'core', 'pull'];
  const pool       = {};
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

// Filter exercises by split (muscle groups) + equipment
function getExercisesForSplit(splitId, selectedEquipment) {
  const split = SPLITS.find(s => s.id === splitId);
  if (!split) return getAvailableExercises(selectedEquipment);
  const available = getAvailableExercises(selectedEquipment);
  return available.filter(ex =>
    ex.muscles && ex.muscles.some(m => split.muscles.includes(m))
  );
}

// Generate a superset workout for a given split
// Tries to pair exercises targeting different muscles within the split
function generateSupersetWorkout(splitId, selectedEquipment) {
  const pool  = getExercisesForSplit(splitId, selectedEquipment);
  const split = SPLITS.find(s => s.id === splitId);
  const targetMuscles = split ? [...split.muscles] : ['full_body'];

  const workout = [];
  const used    = new Set();
  const NUM_PAIRS = 4;

  for (let i = 0; i < NUM_PAIRS; i++) {
    // Pick exercise A from first half of muscle list, B from second (creates contrast)
    const midpoint = Math.ceil(targetMuscles.length / 2);
    const musclesA = targetMuscles.slice(0, midpoint);
    const musclesB = targetMuscles.slice(midpoint) || musclesA;

    let poolA = pool.filter(ex => !used.has(ex.id) && ex.muscles.some(m => musclesA.includes(m)));
    let poolB = pool.filter(ex => !used.has(ex.id) && ex.muscles.some(m => musclesB.includes(m)));

    // Fall back to full pool if too narrow
    if (poolA.length === 0) poolA = pool.filter(ex => !used.has(ex.id));
    if (poolB.length === 0) poolB = pool.filter(ex => !used.has(ex.id));
    if (poolA.length === 0 || poolB.length === 0) break;

    const a = poolA[Math.floor(Math.random() * poolA.length)];
    used.add(a.id);
    // Make sure B is different from A
    poolB = poolB.filter(ex => ex.id !== a.id);
    if (poolB.length === 0) poolB = pool.filter(ex => !used.has(ex.id));
    if (poolB.length === 0) break;

    const b = poolB[Math.floor(Math.random() * poolB.length)];
    used.add(b.id);

    workout.push({
      id: `ss_${i}`,
      exerciseA: { ...a, sets: 3 },
      exerciseB: { ...b, sets: 3 },
      restSeconds: 60,
    });
  }
  return workout;
}

// Returns all exercises in the same category (excluding the current one)
// Sorted deterministically so repeated swipes cycle through every option
function getAlternatives(exercise, selectedEquipment) {
  return getAvailableExercises(selectedEquipment)
    .filter(ex => ex.category === exercise.category && ex.id !== exercise.id)
    .sort((a, b) => a.id.localeCompare(b.id));
}
