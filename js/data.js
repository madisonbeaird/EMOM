// ── Exercise Database ────────────────────────────────────────────────────────
// muscles[] drives superset split filtering
// category drives EMOM workout generation
const EXERCISES = [

  // ── Bodyweight ───────────────────────────────────────────────────────────
  { id: 'air_squats',         name: 'Air Squats',              equipment: [],          reps: 20, category: 'legs',      unit: 'reps', muscles: ['legs'] },
  { id: 'jump_squats',        name: 'Jump Squats',             equipment: [],          reps: 15, category: 'legs',      unit: 'reps', muscles: ['legs'] },
  { id: 'lunges',             name: 'Lunges',                  equipment: [],          reps: 16, category: 'legs',      unit: 'reps', muscles: ['legs'] },
  { id: 'reverse_lunges',     name: 'Reverse Lunges',          equipment: [],          reps: 16, category: 'legs',      unit: 'reps', muscles: ['legs'] },
  { id: 'glute_bridge',       name: 'Glute Bridges',           equipment: [],          reps: 20, category: 'legs',      unit: 'reps', muscles: ['legs'] },
  { id: 'single_leg_rdl',     name: 'Single Leg RDL',          equipment: [],          reps: 10, category: 'legs',      unit: 'reps', muscles: ['legs'] },
  { id: 'calf_raises',        name: 'Calf Raises',             equipment: [],          reps: 25, category: 'legs',      unit: 'reps', muscles: ['legs'] },
  { id: 'pistol_squat',       name: 'Pistol Squats',           equipment: [],          reps: 8,  category: 'legs',      unit: 'reps', muscles: ['legs'] },
  { id: 'broad_jumps',        name: 'Broad Jumps',             equipment: [],          reps: 8,  category: 'legs',      unit: 'reps', muscles: ['legs'] },
  { id: 'step_ups',           name: 'Step-ups',                equipment: [],          reps: 16, category: 'legs',      unit: 'reps', muscles: ['legs'] },

  { id: 'pushups',            name: 'Push-ups',                equipment: [],          reps: 15, category: 'push',      unit: 'reps', muscles: ['chest', 'triceps'] },
  { id: 'diamond_pushups',    name: 'Diamond Push-ups',        equipment: [],          reps: 12, category: 'push',      unit: 'reps', muscles: ['triceps'] },
  { id: 'wide_pushups',       name: 'Wide Push-ups',           equipment: [],          reps: 15, category: 'push',      unit: 'reps', muscles: ['chest'] },
  { id: 'decline_pushups',    name: 'Decline Push-ups',        equipment: [],          reps: 12, category: 'push',      unit: 'reps', muscles: ['chest'] },
  { id: 'pike_pushups',       name: 'Pike Push-ups',           equipment: [],          reps: 12, category: 'push',      unit: 'reps', muscles: ['shoulders'] },
  { id: 'hspu',               name: 'Handstand Push-ups',      equipment: [],          reps: 8,  category: 'push',      unit: 'reps', muscles: ['shoulders', 'triceps'] },
  { id: 'tricep_dips',        name: 'Tricep Dips',             equipment: [],          reps: 15, category: 'push',      unit: 'reps', muscles: ['triceps'] },

  { id: 'pullups',            name: 'Pull-ups',                equipment: ['pullup_bar'], reps: 8,  category: 'pull',  unit: 'reps', muscles: ['back'] },
  { id: 'chinups',            name: 'Chin-ups',                equipment: ['pullup_bar'], reps: 8,  category: 'pull',  unit: 'reps', muscles: ['biceps', 'back'] },
  { id: 'inverted_row',       name: 'Inverted Rows',           equipment: ['pullup_bar'], reps: 12, category: 'pull',  unit: 'reps', muscles: ['back'] },
  { id: 'toes_to_bar',        name: 'Toes to Bar',             equipment: ['pullup_bar'], reps: 10, category: 'core',  unit: 'reps', muscles: ['core'] },
  { id: 'hanging_knee_raise', name: 'Hanging Knee Raises',     equipment: ['pullup_bar'], reps: 15, category: 'core',  unit: 'reps', muscles: ['core'] },
  { id: 'kipping_pullups',    name: 'Kipping Pull-ups',        equipment: ['pullup_bar'], reps: 10, category: 'pull',  unit: 'reps', muscles: ['back'] },
  { id: 'chest_to_bar',       name: 'Chest-to-Bar Pull-ups',   equipment: ['pullup_bar'], reps: 7,  category: 'pull',  unit: 'reps', muscles: ['back'] },
  { id: 'bar_muscle_up',      name: 'Bar Muscle-ups',          equipment: ['pullup_bar'], reps: 5,  category: 'pull',  unit: 'reps', muscles: ['back', 'triceps'] },

  { id: 'burpees',            name: 'Burpees',                 equipment: [],          reps: 10, category: 'cardio',    unit: 'reps', muscles: ['full_body'] },
  { id: 'burpee_pullup',      name: 'Burpee Pull-ups',         equipment: ['pullup_bar'], reps: 7, category: 'cardio', unit: 'reps', muscles: ['full_body'] },
  { id: 'mountain_climbers',  name: 'Mountain Climbers',       equipment: [],          reps: 20, category: 'cardio',    unit: 'reps', muscles: ['core', 'full_body'] },
  { id: 'jumping_jacks',      name: 'Jumping Jacks',           equipment: [],          reps: 30, category: 'cardio',    unit: 'reps', muscles: ['full_body'] },
  { id: 'high_knees',         name: 'High Knees',              equipment: [],          reps: 30, category: 'cardio',    unit: 'reps', muscles: ['full_body'] },
  { id: 'speed_skaters',      name: 'Speed Skaters',           equipment: [],          reps: 20, category: 'cardio',    unit: 'reps', muscles: ['legs'] },
  { id: 'inchworm',           name: 'Inchworms',               equipment: [],          reps: 10, category: 'full_body', unit: 'reps', muscles: ['full_body'] },

  { id: 'sit_ups',            name: 'Sit-ups',                 equipment: [],          reps: 20, category: 'core',      unit: 'reps', muscles: ['core'] },
  { id: 'v_ups',              name: 'V-ups',                   equipment: [],          reps: 15, category: 'core',      unit: 'reps', muscles: ['core'] },
  { id: 'flutter_kicks',      name: 'Flutter Kicks',           equipment: [],          reps: 30, category: 'core',      unit: 'reps', muscles: ['core'] },
  { id: 'plank',              name: 'Plank Hold',              equipment: [],          reps: 45, category: 'core',      unit: 'sec',  muscles: ['core'] },
  { id: 'hollow_body',        name: 'Hollow Body Hold',        equipment: [],          reps: 30, category: 'core',      unit: 'sec',  muscles: ['core'] },
  { id: 'russian_twist',      name: 'Russian Twists',          equipment: [],          reps: 20, category: 'core',      unit: 'reps', muscles: ['core'] },
  { id: 'leg_raise',          name: 'Leg Raises',              equipment: [],          reps: 15, category: 'core',      unit: 'reps', muscles: ['core'] },
  { id: 'bicycle_crunch',     name: 'Bicycle Crunches',        equipment: [],          reps: 20, category: 'core',      unit: 'reps', muscles: ['core'] },
  { id: 'ab_mat_situps',      name: 'AbMat Sit-ups',           equipment: [],          reps: 20, category: 'core',      unit: 'reps', muscles: ['core'] },
  { id: 'ghd_situps',         name: 'GHD Sit-ups',             equipment: [],          reps: 15, category: 'core',      unit: 'reps', muscles: ['core'] },

  // ── Box ───────────────────────────────────────────────────────────────────
  { id: 'box_jumps',          name: 'Box Jumps',               equipment: ['box'],     reps: 15, category: 'legs',      unit: 'reps', muscles: ['legs'] },
  { id: 'box_jump_overs',     name: 'Box Jump Overs',          equipment: ['box'],     reps: 12, category: 'cardio',    unit: 'reps', muscles: ['legs'] },
  { id: 'box_step_ups',       name: 'Box Step-ups',            equipment: ['box'],     reps: 16, category: 'legs',      unit: 'reps', muscles: ['legs'] },
  { id: 'depth_jumps',        name: 'Depth Jumps',             equipment: ['box'],     reps: 8,  category: 'legs',      unit: 'reps', muscles: ['legs'] },

  // ── Jump Rope ─────────────────────────────────────────────────────────────
  { id: 'double_unders',      name: 'Double Unders',           equipment: ['jump_rope'], reps: 50, category: 'cardio', unit: 'reps', muscles: ['full_body'] },
  { id: 'single_unders',      name: 'Single Unders',           equipment: ['jump_rope'], reps: 100,category: 'cardio', unit: 'reps', muscles: ['full_body'] },

  // ── Rings ─────────────────────────────────────────────────────────────────
  { id: 'ring_muscle_up',     name: 'Ring Muscle-ups',         equipment: ['rings'],   reps: 5,  category: 'pull',      unit: 'reps', muscles: ['back', 'triceps'] },
  { id: 'ring_dips',          name: 'Ring Dips',               equipment: ['rings'],   reps: 10, category: 'push',      unit: 'reps', muscles: ['chest', 'triceps'] },
  { id: 'ring_rows',          name: 'Ring Rows',               equipment: ['rings'],   reps: 12, category: 'pull',      unit: 'reps', muscles: ['back'] },
  { id: 'ring_pushups',       name: 'Ring Push-ups',           equipment: ['rings'],   reps: 12, category: 'push',      unit: 'reps', muscles: ['chest'] },

  // ── Dumbbells — Chest ─────────────────────────────────────────────────────
  { id: 'db_flat_press',      name: 'DB Flat Press',           equipment: ['dumbbells'], reps: 12, category: 'push',   unit: 'reps', muscles: ['chest'] },
  { id: 'db_incline_press',   name: 'DB Incline Press',        equipment: ['dumbbells'], reps: 12, category: 'push',   unit: 'reps', muscles: ['chest'] },
  { id: 'db_decline_press',   name: 'DB Decline Press',        equipment: ['dumbbells'], reps: 12, category: 'push',   unit: 'reps', muscles: ['chest'] },
  { id: 'db_flat_fly',        name: 'DB Flat Fly',             equipment: ['dumbbells'], reps: 12, category: 'push',   unit: 'reps', muscles: ['chest'] },
  { id: 'db_incline_fly',     name: 'DB Incline Fly',          equipment: ['dumbbells'], reps: 12, category: 'push',   unit: 'reps', muscles: ['chest'] },
  { id: 'db_pullover',        name: 'DB Pullover',             equipment: ['dumbbells'], reps: 12, category: 'push',   unit: 'reps', muscles: ['chest', 'back'] },

  // ── Dumbbells — Back ──────────────────────────────────────────────────────
  { id: 'db_single_row',      name: 'Single Arm DB Row',       equipment: ['dumbbells'], reps: 12, category: 'pull',   unit: 'reps', muscles: ['back'] },
  { id: 'db_chest_row',       name: 'Chest-Supported DB Row',  equipment: ['dumbbells'], reps: 12, category: 'pull',   unit: 'reps', muscles: ['back'] },
  { id: 'renegade_row',       name: 'Renegade Rows',           equipment: ['dumbbells'], reps: 10, category: 'pull',   unit: 'reps', muscles: ['back', 'core'] },
  { id: 'db_incline_row',     name: 'Incline DB Row',          equipment: ['dumbbells'], reps: 12, category: 'pull',   unit: 'reps', muscles: ['back'] },

  // ── Dumbbells — Shoulders ─────────────────────────────────────────────────
  { id: 'db_shoulder_press',  name: 'DB Shoulder Press',       equipment: ['dumbbells'], reps: 12, category: 'push',   unit: 'reps', muscles: ['shoulders'] },
  { id: 'db_arnold_press',    name: 'Arnold Press',            equipment: ['dumbbells'], reps: 12, category: 'push',   unit: 'reps', muscles: ['shoulders'] },
  { id: 'db_lateral_raise',   name: 'DB Lateral Raise',        equipment: ['dumbbells'], reps: 15, category: 'push',   unit: 'reps', muscles: ['shoulders'] },
  { id: 'db_front_raise',     name: 'DB Front Raise',          equipment: ['dumbbells'], reps: 12, category: 'push',   unit: 'reps', muscles: ['shoulders'] },
  { id: 'db_rear_delt_fly',   name: 'DB Rear Delt Fly',        equipment: ['dumbbells'], reps: 15, category: 'pull',   unit: 'reps', muscles: ['shoulders'] },
  { id: 'db_upright_row',     name: 'DB Upright Row',          equipment: ['dumbbells'], reps: 12, category: 'pull',   unit: 'reps', muscles: ['shoulders', 'traps'] },
  { id: 'db_shrug',           name: 'DB Shrugs',               equipment: ['dumbbells'], reps: 15, category: 'pull',   unit: 'reps', muscles: ['traps'] },

  // ── Dumbbells — Biceps ────────────────────────────────────────────────────
  { id: 'db_bicep_curl',      name: 'DB Bicep Curl',           equipment: ['dumbbells'], reps: 12, category: 'pull',   unit: 'reps', muscles: ['biceps'] },
  { id: 'db_hammer_curl',     name: 'DB Hammer Curl',          equipment: ['dumbbells'], reps: 12, category: 'pull',   unit: 'reps', muscles: ['biceps'] },
  { id: 'db_concentration',   name: 'Concentration Curl',      equipment: ['dumbbells'], reps: 12, category: 'pull',   unit: 'reps', muscles: ['biceps'] },
  { id: 'db_incline_curl',    name: 'Incline DB Curl',         equipment: ['dumbbells'], reps: 12, category: 'pull',   unit: 'reps', muscles: ['biceps'] },
  { id: 'db_zottman_curl',    name: 'Zottman Curl',            equipment: ['dumbbells'], reps: 10, category: 'pull',   unit: 'reps', muscles: ['biceps'] },
  { id: 'db_spider_curl',     name: 'DB Spider Curl',          equipment: ['dumbbells'], reps: 12, category: 'pull',   unit: 'reps', muscles: ['biceps'] },

  // ── Dumbbells — Triceps ───────────────────────────────────────────────────
  { id: 'db_overhead_ext',    name: 'DB Overhead Extension',   equipment: ['dumbbells'], reps: 12, category: 'push',   unit: 'reps', muscles: ['triceps'] },
  { id: 'db_kickback',        name: 'DB Tricep Kickback',      equipment: ['dumbbells'], reps: 12, category: 'push',   unit: 'reps', muscles: ['triceps'] },
  { id: 'db_skull_crusher',   name: 'DB Skull Crusher',        equipment: ['dumbbells'], reps: 12, category: 'push',   unit: 'reps', muscles: ['triceps'] },
  { id: 'db_close_press',     name: 'DB Close Grip Press',     equipment: ['dumbbells'], reps: 12, category: 'push',   unit: 'reps', muscles: ['triceps', 'chest'] },

  // ── Dumbbells — Legs ──────────────────────────────────────────────────────
  { id: 'goblet_squat',       name: 'Goblet Squat',            equipment: ['dumbbells', 'kettlebell'], reps: 15, category: 'legs', unit: 'reps', muscles: ['legs'] },
  { id: 'db_rdl',             name: 'DB Romanian Deadlift',    equipment: ['dumbbells'], reps: 12, category: 'legs',   unit: 'reps', muscles: ['legs'] },
  { id: 'db_lunge',           name: 'DB Lunges',               equipment: ['dumbbells'], reps: 12, category: 'legs',   unit: 'reps', muscles: ['legs'] },
  { id: 'db_bulgarian',       name: 'Bulgarian Split Squat',   equipment: ['dumbbells'], reps: 10, category: 'legs',   unit: 'reps', muscles: ['legs'] },
  { id: 'db_step_up',         name: 'DB Step-ups',             equipment: ['dumbbells'], reps: 12, category: 'legs',   unit: 'reps', muscles: ['legs'] },
  { id: 'db_hip_thrust',      name: 'DB Hip Thrust',           equipment: ['dumbbells'], reps: 15, category: 'legs',   unit: 'reps', muscles: ['legs'] },
  { id: 'db_sumo_squat',      name: 'DB Sumo Squat',           equipment: ['dumbbells'], reps: 15, category: 'legs',   unit: 'reps', muscles: ['legs'] },
  { id: 'db_calf_raise',      name: 'DB Calf Raise',           equipment: ['dumbbells'], reps: 20, category: 'legs',   unit: 'reps', muscles: ['legs'] },
  { id: 'db_stiff_rdl',       name: 'DB Stiff Leg Deadlift',   equipment: ['dumbbells'], reps: 12, category: 'legs',   unit: 'reps', muscles: ['legs'] },

  // ── Dumbbells — Core ──────────────────────────────────────────────────────
  { id: 'db_side_bend',       name: 'DB Side Bend',            equipment: ['dumbbells'], reps: 15, category: 'core',   unit: 'reps', muscles: ['core'] },
  { id: 'db_russian_twist',   name: 'DB Russian Twist',        equipment: ['dumbbells'], reps: 20, category: 'core',   unit: 'reps', muscles: ['core'] },
  { id: 'db_woodchop',        name: 'DB Woodchop',             equipment: ['dumbbells'], reps: 12, category: 'core',   unit: 'reps', muscles: ['core'] },

  // ── Barbell — Chest ───────────────────────────────────────────────────────
  { id: 'bb_flat_bench',      name: 'Flat Bench Press',        equipment: ['barbell'],  reps: 10, category: 'push',    unit: 'reps', muscles: ['chest'] },
  { id: 'bb_incline_bench',   name: 'Incline Bench Press',     equipment: ['barbell'],  reps: 10, category: 'push',    unit: 'reps', muscles: ['chest'] },
  { id: 'bb_decline_bench',   name: 'Decline Bench Press',     equipment: ['barbell'],  reps: 10, category: 'push',    unit: 'reps', muscles: ['chest'] },
  { id: 'bb_close_grip',      name: 'Close Grip Bench Press',  equipment: ['barbell'],  reps: 10, category: 'push',    unit: 'reps', muscles: ['triceps', 'chest'] },

  // ── Barbell — Back ────────────────────────────────────────────────────────
  { id: 'bb_bent_row',        name: 'Bent Over Row',           equipment: ['barbell'],  reps: 10, category: 'pull',    unit: 'reps', muscles: ['back'] },
  { id: 'bb_underhand_row',   name: 'Underhand Barbell Row',   equipment: ['barbell'],  reps: 10, category: 'pull',    unit: 'reps', muscles: ['back', 'biceps'] },
  { id: 'bb_deadlift',        name: 'Deadlift',                equipment: ['barbell'],  reps: 5,  category: 'legs',    unit: 'reps', muscles: ['back', 'legs'] },
  { id: 'bb_rdl',             name: 'Romanian Deadlift',       equipment: ['barbell'],  reps: 10, category: 'legs',    unit: 'reps', muscles: ['legs', 'back'] },
  { id: 'bb_rack_pull',       name: 'Rack Pull',               equipment: ['barbell'],  reps: 8,  category: 'pull',    unit: 'reps', muscles: ['back'] },
  { id: 'bb_good_morning',    name: 'Good Mornings',           equipment: ['barbell'],  reps: 10, category: 'legs',    unit: 'reps', muscles: ['legs', 'back'] },

  // ── Barbell — Shoulders ───────────────────────────────────────────────────
  { id: 'bb_ohp',             name: 'Overhead Press',          equipment: ['barbell'],  reps: 8,  category: 'push',    unit: 'reps', muscles: ['shoulders'] },
  { id: 'bb_push_press',      name: 'Push Press',              equipment: ['barbell'],  reps: 8,  category: 'push',    unit: 'reps', muscles: ['shoulders'] },
  { id: 'bb_upright_row',     name: 'Barbell Upright Row',     equipment: ['barbell'],  reps: 12, category: 'pull',    unit: 'reps', muscles: ['shoulders', 'traps'] },
  { id: 'bb_shrug',           name: 'Barbell Shrug',           equipment: ['barbell'],  reps: 15, category: 'pull',    unit: 'reps', muscles: ['traps'] },

  // ── Barbell — Biceps ──────────────────────────────────────────────────────
  { id: 'bb_curl',            name: 'Barbell Curl',            equipment: ['barbell'],  reps: 12, category: 'pull',    unit: 'reps', muscles: ['biceps'] },
  { id: 'bb_reverse_curl',    name: 'Reverse Barbell Curl',    equipment: ['barbell'],  reps: 12, category: 'pull',    unit: 'reps', muscles: ['biceps'] },
  { id: 'bb_wide_curl',       name: 'Wide Grip Barbell Curl',  equipment: ['barbell'],  reps: 12, category: 'pull',    unit: 'reps', muscles: ['biceps'] },
  { id: 'bb_preacher_curl',   name: 'Barbell Preacher Curl',   equipment: ['barbell'],  reps: 12, category: 'pull',    unit: 'reps', muscles: ['biceps'] },

  // ── Barbell — Triceps ─────────────────────────────────────────────────────
  { id: 'bb_skull_crusher',   name: 'Barbell Skull Crusher',   equipment: ['barbell'],  reps: 12, category: 'push',    unit: 'reps', muscles: ['triceps'] },
  { id: 'bb_overhead_ext',    name: 'Barbell Overhead Ext',    equipment: ['barbell'],  reps: 12, category: 'push',    unit: 'reps', muscles: ['triceps'] },

  // ── Barbell — Legs ────────────────────────────────────────────────────────
  { id: 'bb_back_squat',      name: 'Back Squat',              equipment: ['barbell'],  reps: 8,  category: 'legs',    unit: 'reps', muscles: ['legs'] },
  { id: 'bb_front_squat',     name: 'Front Squat',             equipment: ['barbell'],  reps: 8,  category: 'legs',    unit: 'reps', muscles: ['legs'] },
  { id: 'bb_lunge',           name: 'Barbell Lunge',           equipment: ['barbell'],  reps: 12, category: 'legs',    unit: 'reps', muscles: ['legs'] },
  { id: 'bb_hip_thrust',      name: 'Barbell Hip Thrust',      equipment: ['barbell'],  reps: 12, category: 'legs',    unit: 'reps', muscles: ['legs'] },
  { id: 'bb_calf_raise',      name: 'Barbell Calf Raise',      equipment: ['barbell'],  reps: 20, category: 'legs',    unit: 'reps', muscles: ['legs'] },
  { id: 'bb_sumo_deadlift',   name: 'Sumo Deadlift',           equipment: ['barbell'],  reps: 8,  category: 'legs',    unit: 'reps', muscles: ['legs'] },

  // ── Cables — Chest ────────────────────────────────────────────────────────
  { id: 'cable_fly',          name: 'Cable Fly',               equipment: ['cables'],   reps: 15, category: 'push',    unit: 'reps', muscles: ['chest'] },
  { id: 'cable_crossover',    name: 'Cable Crossover',         equipment: ['cables'],   reps: 15, category: 'push',    unit: 'reps', muscles: ['chest'] },
  { id: 'cable_incline_fly',  name: 'Low-to-High Cable Fly',   equipment: ['cables'],   reps: 15, category: 'push',    unit: 'reps', muscles: ['chest'] },
  { id: 'cable_decline_fly',  name: 'High-to-Low Cable Fly',   equipment: ['cables'],   reps: 15, category: 'push',    unit: 'reps', muscles: ['chest'] },
  { id: 'cable_chest_press',  name: 'Cable Chest Press',       equipment: ['cables'],   reps: 12, category: 'push',    unit: 'reps', muscles: ['chest'] },

  // ── Cables — Back ─────────────────────────────────────────────────────────
  { id: 'lat_pulldown',       name: 'Lat Pulldown',            equipment: ['cables'],   reps: 12, category: 'pull',    unit: 'reps', muscles: ['back'] },
  { id: 'wide_pulldown',      name: 'Wide Grip Pulldown',      equipment: ['cables'],   reps: 12, category: 'pull',    unit: 'reps', muscles: ['back'] },
  { id: 'close_pulldown',     name: 'Close Grip Pulldown',     equipment: ['cables'],   reps: 12, category: 'pull',    unit: 'reps', muscles: ['back'] },
  { id: 'cable_row',          name: 'Seated Cable Row',        equipment: ['cables'],   reps: 12, category: 'pull',    unit: 'reps', muscles: ['back'] },
  { id: 'cable_wide_row',     name: 'Wide Grip Cable Row',     equipment: ['cables'],   reps: 12, category: 'pull',    unit: 'reps', muscles: ['back'] },
  { id: 'cable_single_row',   name: 'Single Arm Cable Row',    equipment: ['cables'],   reps: 12, category: 'pull',    unit: 'reps', muscles: ['back'] },
  { id: 'straight_arm_pull',  name: 'Straight Arm Pulldown',   equipment: ['cables'],   reps: 15, category: 'pull',    unit: 'reps', muscles: ['back'] },

  // ── Cables — Shoulders ────────────────────────────────────────────────────
  { id: 'cable_lateral',      name: 'Cable Lateral Raise',     equipment: ['cables'],   reps: 15, category: 'push',    unit: 'reps', muscles: ['shoulders'] },
  { id: 'cable_front_raise',  name: 'Cable Front Raise',       equipment: ['cables'],   reps: 12, category: 'push',    unit: 'reps', muscles: ['shoulders'] },
  { id: 'cable_face_pull',    name: 'Cable Face Pull',         equipment: ['cables'],   reps: 15, category: 'pull',    unit: 'reps', muscles: ['shoulders'] },
  { id: 'cable_rear_delt',    name: 'Cable Rear Delt Fly',     equipment: ['cables'],   reps: 15, category: 'pull',    unit: 'reps', muscles: ['shoulders'] },
  { id: 'cable_upright_row',  name: 'Cable Upright Row',       equipment: ['cables'],   reps: 12, category: 'pull',    unit: 'reps', muscles: ['shoulders', 'traps'] },

  // ── Cables — Biceps ───────────────────────────────────────────────────────
  { id: 'cable_curl',         name: 'Cable Bicep Curl',        equipment: ['cables'],   reps: 15, category: 'pull',    unit: 'reps', muscles: ['biceps'] },
  { id: 'cable_hammer_curl',  name: 'Cable Hammer Curl',       equipment: ['cables'],   reps: 12, category: 'pull',    unit: 'reps', muscles: ['biceps'] },
  { id: 'cable_preacher',     name: 'Cable Preacher Curl',     equipment: ['cables'],   reps: 12, category: 'pull',    unit: 'reps', muscles: ['biceps'] },
  { id: 'cable_high_curl',    name: 'High Cable Curl',         equipment: ['cables'],   reps: 12, category: 'pull',    unit: 'reps', muscles: ['biceps'] },
  { id: 'cable_single_curl',  name: 'Single Arm Cable Curl',   equipment: ['cables'],   reps: 12, category: 'pull',    unit: 'reps', muscles: ['biceps'] },

  // ── Cables — Triceps ──────────────────────────────────────────────────────
  { id: 'cable_pushdown_rope',name: 'Rope Tricep Pushdown',    equipment: ['cables'],   reps: 15, category: 'push',    unit: 'reps', muscles: ['triceps'] },
  { id: 'cable_pushdown_bar', name: 'Bar Tricep Pushdown',     equipment: ['cables'],   reps: 15, category: 'push',    unit: 'reps', muscles: ['triceps'] },
  { id: 'cable_overhead_tri', name: 'Cable Overhead Extension',equipment: ['cables'],   reps: 12, category: 'push',    unit: 'reps', muscles: ['triceps'] },
  { id: 'cable_kickback',     name: 'Cable Tricep Kickback',   equipment: ['cables'],   reps: 12, category: 'push',    unit: 'reps', muscles: ['triceps'] },
  { id: 'cable_single_tri',   name: 'Single Arm Pushdown',     equipment: ['cables'],   reps: 12, category: 'push',    unit: 'reps', muscles: ['triceps'] },

  // ── Cables — Legs ─────────────────────────────────────────────────────────
  { id: 'cable_pull_through', name: 'Cable Pull-Through',      equipment: ['cables'],   reps: 15, category: 'legs',    unit: 'reps', muscles: ['legs'] },
  { id: 'cable_kickback_leg', name: 'Cable Glute Kickback',    equipment: ['cables'],   reps: 15, category: 'legs',    unit: 'reps', muscles: ['legs'] },
  { id: 'cable_leg_curl',     name: 'Cable Leg Curl',          equipment: ['cables'],   reps: 12, category: 'legs',    unit: 'reps', muscles: ['legs'] },
  { id: 'cable_abduction',    name: 'Cable Hip Abduction',     equipment: ['cables'],   reps: 15, category: 'legs',    unit: 'reps', muscles: ['legs'] },
  { id: 'cable_squat',        name: 'Cable Squat',             equipment: ['cables'],   reps: 15, category: 'legs',    unit: 'reps', muscles: ['legs'] },

  // ── Cables — Core ─────────────────────────────────────────────────────────
  { id: 'cable_crunch',       name: 'Cable Crunch',            equipment: ['cables'],   reps: 20, category: 'core',    unit: 'reps', muscles: ['core'] },
  { id: 'cable_woodchop',     name: 'Cable Woodchop',          equipment: ['cables'],   reps: 15, category: 'core',    unit: 'reps', muscles: ['core'] },
  { id: 'pallof_press',       name: 'Pallof Press',            equipment: ['cables'],   reps: 15, category: 'core',    unit: 'reps', muscles: ['core'] },
  { id: 'cable_oblique',      name: 'Cable Oblique Crunch',    equipment: ['cables'],   reps: 15, category: 'core',    unit: 'reps', muscles: ['core'] },

  // ── Kettlebell ────────────────────────────────────────────────────────────
  { id: 'kb_swing',           name: 'KB Swings',               equipment: ['kettlebell'], reps: 20, category: 'cardio',unit: 'reps', muscles: ['full_body'] },
  { id: 'kb_snatch',          name: 'KB Snatch',               equipment: ['kettlebell'], reps: 8,  category: 'full_body',unit:'reps', muscles: ['full_body'] },
  { id: 'kb_clean_press',     name: 'KB Clean and Press',      equipment: ['kettlebell'], reps: 8,  category: 'full_body',unit:'reps', muscles: ['shoulders', 'full_body'] },
  { id: 'kb_goblet_squat',    name: 'KB Goblet Squat',         equipment: ['kettlebell'], reps: 15, category: 'legs',  unit: 'reps', muscles: ['legs'] },
  { id: 'kb_rdl',             name: 'KB Romanian Deadlift',    equipment: ['kettlebell'], reps: 12, category: 'legs',  unit: 'reps', muscles: ['legs'] },
  { id: 'kb_press',           name: 'KB Press',                equipment: ['kettlebell'], reps: 10, category: 'push',  unit: 'reps', muscles: ['shoulders'] },
  { id: 'kb_row',             name: 'KB Row',                  equipment: ['kettlebell'], reps: 12, category: 'pull',  unit: 'reps', muscles: ['back'] },
  { id: 'kb_tgu',             name: 'KB Turkish Get-up',       equipment: ['kettlebell'], reps: 5,  category: 'full_body',unit:'reps', muscles: ['full_body'] },
  { id: 'kb_halo',            name: 'KB Halo',                 equipment: ['kettlebell'], reps: 10, category: 'core',  unit: 'reps', muscles: ['shoulders', 'core'] },
  { id: 'kb_windmill',        name: 'KB Windmill',             equipment: ['kettlebell'], reps: 8,  category: 'core',  unit: 'reps', muscles: ['core'] },
  { id: 'kb_lunge',           name: 'KB Lunges',               equipment: ['kettlebell'], reps: 12, category: 'legs',  unit: 'reps', muscles: ['legs'] },

  // ── Resistance Bands ─────────────────────────────────────────────────────
  { id: 'band_squat',         name: 'Banded Squats',           equipment: ['bands'],    reps: 20, category: 'legs',    unit: 'reps', muscles: ['legs'] },
  { id: 'band_deadlift',      name: 'Banded Deadlifts',        equipment: ['bands'],    reps: 15, category: 'legs',    unit: 'reps', muscles: ['legs'] },
  { id: 'band_lateral_walk',  name: 'Lateral Band Walks',      equipment: ['bands'],    reps: 20, category: 'legs',    unit: 'reps', muscles: ['legs'] },
  { id: 'band_row',           name: 'Banded Rows',             equipment: ['bands'],    reps: 15, category: 'pull',    unit: 'reps', muscles: ['back'] },
  { id: 'band_pull_apart',    name: 'Band Pull-Aparts',        equipment: ['bands'],    reps: 20, category: 'pull',    unit: 'reps', muscles: ['shoulders', 'back'] },
  { id: 'band_press',         name: 'Banded Chest Press',      equipment: ['bands'],    reps: 15, category: 'push',    unit: 'reps', muscles: ['chest'] },
  { id: 'band_bicep_curl',    name: 'Banded Bicep Curl',       equipment: ['bands'],    reps: 15, category: 'pull',    unit: 'reps', muscles: ['biceps'] },
  { id: 'band_tricep_push',   name: 'Banded Tricep Pushdown',  equipment: ['bands'],    reps: 15, category: 'push',    unit: 'reps', muscles: ['triceps'] },
  { id: 'band_face_pull',     name: 'Band Face Pulls',         equipment: ['bands'],    reps: 20, category: 'pull',    unit: 'reps', muscles: ['shoulders'] },
  { id: 'band_hip_thrust',    name: 'Banded Hip Thrust',       equipment: ['bands'],    reps: 15, category: 'legs',    unit: 'reps', muscles: ['legs'] },

  // ── CrossFit / Olympic ────────────────────────────────────────────────────
  { id: 'power_clean',        name: 'Power Clean',             equipment: ['barbell'],  reps: 5,  category: 'full_body',unit:'reps', muscles: ['full_body'] },
  { id: 'hang_power_clean',   name: 'Hang Power Clean',        equipment: ['barbell'],  reps: 5,  category: 'full_body',unit:'reps', muscles: ['full_body'] },
  { id: 'clean_jerk',         name: 'Clean and Jerk',          equipment: ['barbell'],  reps: 3,  category: 'full_body',unit:'reps', muscles: ['full_body'] },
  { id: 'power_snatch',       name: 'Power Snatch',            equipment: ['barbell'],  reps: 5,  category: 'full_body',unit:'reps', muscles: ['full_body'] },
  { id: 'thruster',           name: 'Thrusters',               equipment: ['barbell'],  reps: 7,  category: 'full_body',unit:'reps', muscles: ['full_body'] },
  { id: 'push_jerk',          name: 'Push Jerk',               equipment: ['barbell'],  reps: 5,  category: 'push',    unit: 'reps', muscles: ['shoulders', 'triceps'] },
  { id: 'sdhp',               name: 'Sumo DL High Pull',       equipment: ['barbell'],  reps: 10, category: 'full_body',unit:'reps', muscles: ['full_body'] },
  { id: 'db_snatch',          name: 'DB Snatch',               equipment: ['dumbbells'],reps: 10, category: 'full_body',unit:'reps', muscles: ['full_body'] },
  { id: 'db_thruster',        name: 'DB Thrusters',            equipment: ['dumbbells'],reps: 10, category: 'full_body',unit:'reps', muscles: ['full_body'] },
  { id: 'kb_american_swing',  name: 'KB American Swing',       equipment: ['kettlebell'],reps:15, category: 'cardio',  unit: 'reps', muscles: ['full_body'] },
  { id: 'burpee_pullup',      name: 'Burpee Pull-ups',         equipment: ['pullup_bar'],reps: 7, category: 'cardio',  unit: 'reps', muscles: ['full_body'] },
];

// ── Muscle Groups (for superset split selection — multi-select) ──────────────
const MUSCLE_GROUPS = [
  { id: 'chest',     label: 'Chest',     muscles: ['chest'] },
  { id: 'back',      label: 'Back',      muscles: ['back'] },
  { id: 'shoulders', label: 'Shoulders', muscles: ['shoulders'] },
  { id: 'biceps',    label: 'Biceps',    muscles: ['biceps'] },
  { id: 'triceps',   label: 'Triceps',   muscles: ['triceps'] },
  { id: 'legs',      label: 'Legs',      muscles: ['legs'] },
  { id: 'core',      label: 'Core',      muscles: ['core'] },
];

// Keep SPLITS as an alias so saved workouts still work
const SPLITS = MUSCLE_GROUPS;

const EQUIPMENT_OPTIONS = [
  { id: 'dumbbells',  label: 'Dumbbells'   },
  { id: 'barbell',    label: 'Barbell'     },
  { id: 'cables',     label: 'Cables'      },
  { id: 'kettlebell', label: 'Kettlebell'  },
  { id: 'bands',      label: 'Bands'       },
  { id: 'pullup_bar', label: 'Pull-up Bar' },
  { id: 'rings',      label: 'Rings'       },
  { id: 'box',        label: 'Box'         },
  { id: 'jump_rope',  label: 'Jump Rope'   },
];

// Filter exercises available for the selected equipment (bodyweight always included)
function getAvailableExercises(selectedEquipment) {
  return EXERCISES.filter(ex =>
    ex.equipment.length === 0 ||
    ex.equipment.some(eq => selectedEquipment.includes(eq))
  );
}

// Filter exercises for selected muscle groups + equipment (for superset)
function getExercisesForMuscles(selectedMuscleIds, selectedEquipment) {
  const targetMuscles = selectedMuscleIds.flatMap(id =>
    MUSCLE_GROUPS.find(g => g.id === id)?.muscles || []
  );
  const available = getAvailableExercises(selectedEquipment);
  return available.filter(ex =>
    ex.muscles && ex.muscles.some(m => targetMuscles.includes(m))
  );
}

// Generate a balanced EMOM set — CrossFit-style
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

// Generate superset workout for selected muscle groups
// Pairs exercises across the selected groups so each set hits different muscles
function generateSupersetWorkout(selectedMuscleIds, selectedEquipment) {
  const pool = getExercisesForMuscles(selectedMuscleIds, selectedEquipment);
  const used = new Set();

  // Build per-muscle pools
  const byMuscle = {};
  selectedMuscleIds.forEach(id => {
    const muscles = MUSCLE_GROUPS.find(g => g.id === id)?.muscles || [];
    byMuscle[id] = pool.filter(ex => ex.muscles.some(m => muscles.includes(m)));
  });

  const workout = [];
  const NUM_PAIRS = 4;

  for (let i = 0; i < NUM_PAIRS; i++) {
    // Cycle through muscle groups for A and B so pairs contrast each other
    const idxA = i % selectedMuscleIds.length;
    const idxB = (i + 1) % selectedMuscleIds.length;
    const muscleA = selectedMuscleIds[idxA];
    const muscleB = selectedMuscleIds[idxB];

    let pickA = (byMuscle[muscleA] || pool).filter(ex => !used.has(ex.id));
    if (!pickA.length) pickA = pool.filter(ex => !used.has(ex.id));
    if (!pickA.length) break;

    const a = pickA[Math.floor(Math.random() * pickA.length)];
    used.add(a.id);

    let pickB = (byMuscle[muscleB] || pool).filter(ex => !used.has(ex.id) && ex.id !== a.id);
    if (!pickB.length) pickB = pool.filter(ex => !used.has(ex.id) && ex.id !== a.id);
    if (!pickB.length) break;

    const b = pickB[Math.floor(Math.random() * pickB.length)];
    used.add(b.id);

    workout.push({
      id: `ss_${i}`,
      exerciseA: { ...a, sets: 4 },
      exerciseB: { ...b, sets: 4 },
      restSeconds: 60,
    });
  }
  return workout;
}

// All alternatives for swipe cycling (same muscle group, sorted for consistent order)
function getAlternatives(exercise, selectedEquipment) {
  return getAvailableExercises(selectedEquipment)
    .filter(ex => {
      if (ex.id === exercise.id) return false;
      return ex.muscles && exercise.muscles &&
        ex.muscles.some(m => exercise.muscles.includes(m));
    })
    .sort((a, b) => a.id.localeCompare(b.id));
}
