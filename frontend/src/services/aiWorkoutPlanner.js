const DEFAULT_DURATION_MINUTES = 60;

const SPLIT_LIBRARY = {
  ABC: [
    {
      code: 'A',
      label: 'Push dominante',
      primary: ['peito', 'ombros', 'bracos'],
      secondary: ['abdomen']
    },
    {
      code: 'B',
      label: 'Pull dominante',
      primary: ['costas', 'bracos'],
      secondary: ['abdomen', 'ombros']
    },
    {
      code: 'C',
      label: 'Lower + core',
      primary: ['pernas', 'abdomen'],
      secondary: ['costas']
    }
  ],
  ABCD: [
    {
      code: 'A',
      label: 'Peito + triceps',
      primary: ['peito', 'bracos'],
      secondary: ['ombros']
    },
    {
      code: 'B',
      label: 'Costas + biceps',
      primary: ['costas', 'bracos'],
      secondary: ['abdomen']
    },
    {
      code: 'C',
      label: 'Lower completo',
      primary: ['pernas'],
      secondary: ['abdomen']
    },
    {
      code: 'D',
      label: 'Ombros + core',
      primary: ['ombros', 'abdomen'],
      secondary: ['peito']
    }
  ],
  ABCDE: [
    {
      code: 'A',
      label: 'Peito',
      primary: ['peito'],
      secondary: ['bracos', 'ombros']
    },
    {
      code: 'B',
      label: 'Costas',
      primary: ['costas'],
      secondary: ['bracos', 'abdomen']
    },
    {
      code: 'C',
      label: 'Pernas',
      primary: ['pernas'],
      secondary: ['abdomen']
    },
    {
      code: 'D',
      label: 'Ombros',
      primary: ['ombros'],
      secondary: ['peito']
    },
    {
      code: 'E',
      label: 'Bracos + core',
      primary: ['bracos', 'abdomen'],
      secondary: ['costas']
    }
  ],
  UPPER_LOWER: [
    {
      code: 'UPPER',
      label: 'Superior',
      primary: ['peito', 'costas', 'ombros', 'bracos'],
      secondary: ['abdomen']
    },
    {
      code: 'LOWER',
      label: 'Inferior',
      primary: ['pernas', 'abdomen'],
      secondary: ['costas']
    }
  ],
  FULL_BODY: [
    {
      code: 'FULL',
      label: 'Full body',
      primary: ['peito', 'costas', 'ombros', 'pernas', 'bracos'],
      secondary: ['abdomen']
    }
  ]
};

const PROFILE_LIBRARY = {
  DEFINITION: {
    label: 'Seco / Definicao',
    setDeltaCompound: -1,
    setDeltaIsolation: 0,
    repDelta: 2,
    restDelta: -15,
    isolationBonus: 8,
    compoundBonus: -4
  },
  HYPERTROPHY: {
    label: 'Hipertrofia Bruta',
    setDeltaCompound: 0,
    setDeltaIsolation: 1,
    repDelta: 0,
    restDelta: 0,
    isolationBonus: 10,
    compoundBonus: 10
  },
  STRENGTH: {
    label: 'Forca Atletica',
    setDeltaCompound: 1,
    setDeltaIsolation: -1,
    repDelta: -3,
    restDelta: 25,
    isolationBonus: -8,
    compoundBonus: 24
  }
};

const COMPOUND_KEYWORDS = [
  'agach',
  'supino',
  'remada',
  'levantamento',
  'terra',
  'press',
  'puxada',
  'chin up',
  'row',
  'leg press',
  'thrust',
  'desenvolvimento'
];

const ISOLATION_KEYWORDS = [
  'rosca',
  'triceps',
  'biceps',
  'extens',
  'elevac',
  'crucifixo',
  'crossover',
  'pulley',
  'abd',
  'calf'
];

const POWER_KEYWORDS = ['snatch', 'clean', 'jump', 'explosive', 'explosivo'];
const UNILATERAL_KEYWORDS = ['unilateral', 'single', 'alternating', 'split'];

const WARMUP_REPS = 20;

const normalizeText = (value) => {
  if (!value) return '';
  return String(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
};

const canonicalCategory = (category) => {
  const c = normalizeText(category);

  if (c.includes('peit') || c.includes('chest')) return 'peito';
  if (c.includes('cost') || c.includes('back')) return 'costas';
  if (c.includes('ombr') || c.includes('shoulder')) return 'ombros';
  if (c.includes('bra') || c.includes('tricep') || c.includes('bicep') || c.includes('arm')) return 'bracos';
  if (c.includes('pern') || c.includes('leg') || c.includes('quad') || c.includes('glute')) return 'pernas';
  if (c.includes('abd') || c.includes('core')) return 'abdomen';
  if (c.includes('card')) return 'cardio';
  return 'outros';
};

const hash = (value) => {
  const text = String(value || '');
  let h = 0;
  for (let i = 0; i < text.length; i += 1) {
    h = (h << 5) - h + text.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
};

const inferTags = (exercise) => {
  const normalizedName = normalizeText(exercise.name);

  const isCompound = COMPOUND_KEYWORDS.some((keyword) => normalizedName.includes(keyword));
  const isIsolation = ISOLATION_KEYWORDS.some((keyword) => normalizedName.includes(keyword));
  const isPower = POWER_KEYWORDS.some((keyword) => normalizedName.includes(keyword));
  const isUnilateral = UNILATERAL_KEYWORDS.some((keyword) => normalizedName.includes(keyword));

  return {
    isCompound,
    isIsolation,
    isPower,
    isUnilateral
  };
};

const parseDurationToMinutes = (rawValue) => {
  const source = normalizeText(rawValue).replace(/\s+/g, '');
  if (!source) return DEFAULT_DURATION_MINUTES;

  const compactHour = source.match(/^(\d+)h(\d{1,2})$/);
  if (compactHour) {
    const hours = Number.parseInt(compactHour[1], 10) || 0;
    const minutes = Number.parseInt(compactHour[2], 10) || 0;
    return clampDuration(hours * 60 + minutes);
  }

  const hourMatch = source.match(/(\d+)h/);
  const minuteMatch = source.match(/(\d+)m/);

  if (hourMatch || minuteMatch) {
    const hours = hourMatch ? Number.parseInt(hourMatch[1], 10) : 0;
    const minutes = minuteMatch ? Number.parseInt(minuteMatch[1], 10) : 0;
    return clampDuration(hours * 60 + minutes);
  }

  const numeric = Number.parseInt(source, 10);
  if (!Number.isNaN(numeric)) {
    return clampDuration(numeric);
  }

  return DEFAULT_DURATION_MINUTES;
};

const clampDuration = (minutes) => {
  if (!minutes || Number.isNaN(minutes)) return DEFAULT_DURATION_MINUTES;
  return Math.max(30, Math.min(120, minutes));
};

const estimateExerciseTimeMinutes = (sets, restSeconds, isCompound) => {
  const workSeconds = isCompound ? 48 : 38;
  const transitionSeconds = isCompound ? 70 : 50;
  const effort = sets * workSeconds;
  const rest = Math.max(0, sets - 1) * restSeconds;
  return (effort + rest + transitionSeconds) / 60;
};

const defineSetPrescription = ({
  isCompound,
  isIsolation,
  isPower,
  durationMinutes,
  slotIndex,
  totalSlots,
  profile
}) => {
  const longSession = durationMinutes >= 75;
  const shortSession = durationMinutes <= 45;

  let sets = isCompound ? 4 : 3;
  let reps = isCompound ? 10 : 12;
  let rest = isCompound ? 90 : 60;

  if (shortSession) {
    sets = isCompound ? 3 : 2;
    rest = isCompound ? 75 : 45;
  }

  if (longSession) {
    sets = isCompound ? 4 : 3;
    rest = isCompound ? 95 : 60;
  }

  const wave = slotIndex % 3;
  if (isPower) {
    reps = 6;
    rest = Math.max(rest, 105);
  } else if (isCompound) {
    reps = wave === 0 ? 8 : wave === 1 ? 10 : 12;
  } else if (isIsolation) {
    reps = wave === 0 ? 12 : wave === 1 ? 15 : 10;
  }

  if (slotIndex === totalSlots - 1 && !isCompound) {
    reps += 2;
    rest = Math.max(30, rest - 15);
  }

  if (profile) {
    sets += isCompound ? profile.setDeltaCompound : profile.setDeltaIsolation;
    reps += profile.repDelta;
    rest += profile.restDelta;
  }

  sets = Math.max(2, Math.min(6, sets));
  reps = Math.max(4, Math.min(20, reps));
  rest = Math.max(30, Math.min(150, rest));

  return { sets, reps, rest_time: rest };
};

const targetExerciseCount = (durationMinutes, splitLength) => {
  let base = 6;
  if (durationMinutes <= 40) base = 4;
  else if (durationMinutes <= 50) base = 5;
  else if (durationMinutes <= 65) base = 6;
  else if (durationMinutes <= 85) base = 7;
  else base = 8;

  if (splitLength >= 5) base += 1;
  if (splitLength <= 2) base += 1;

  return Math.max(4, Math.min(10, base));
};

const buildWorkoutName = (splitKey, template, index) => {
  if (splitKey === 'FULL_BODY') {
    return 'IA TRAINING | Full Body Inteligente';
  }

  if (splitKey === 'UPPER_LOWER') {
    return `IA TRAINING | ${template.label}`;
  }

  return `IA TRAINING ${template.code} | ${template.label}`;
};

const ensureUniqueByName = (items) => {
  const names = new Set();
  return items.filter((item) => {
    const key = normalizeText(item.name);
    if (names.has(key)) return false;
    names.add(key);
    return true;
  });
};

const scoreCandidate = ({
  exercise,
  template,
  slotIndex,
  usedEquipments,
  usedExerciseIds,
  fatigueIndex,
  seed,
  profile
}) => {
  const normalizedCategory = canonicalCategory(exercise.category);
  const tags = inferTags(exercise);
  const equipmentKey = normalizeText(exercise.equipment);
  const randomBoost = hash(`${seed}-${exercise.id}-${slotIndex}`) % 17;

  let score = 0;

  if (template.primary.includes(normalizedCategory)) score += 130;
  if (template.secondary.includes(normalizedCategory)) score += 70;

  if (slotIndex < 2 && tags.isCompound) score += 40;
  if (slotIndex >= 2 && tags.isIsolation) score += 15;
  if (profile) {
    if (tags.isCompound) score += profile.compoundBonus;
    if (tags.isIsolation) score += profile.isolationBonus;
  }

  if (!usedEquipments.has(equipmentKey)) score += 14;
  if (usedExerciseIds.has(exercise.id)) score -= 60;

  if (tags.isUnilateral && slotIndex > 0) score += 8;
  if (tags.isPower && slotIndex === 0) score += 16;

  score -= fatigueIndex * 8;
  score += randomBoost;

  return { score, tags };
};

const pickWarmupExercise = (exercisesByCategory, template, seed) => {
  const warmupPools = [...template.primary, ...template.secondary];

  for (const cat of warmupPools) {
    const list = exercisesByCategory.get(cat) || [];
    if (list.length > 0) {
      const selected = list[hash(`${seed}-warmup-${cat}`) % list.length];
      return selected;
    }
  }

  const fallbackList = exercisesByCategory.get('pernas') || [];
  return fallbackList[0] || null;
};

const buildWorkoutDescription = ({ includeWarmup, durationMinutes, splitLabel, splitKey }) => {
  const warmupLine = includeWarmup
    ? 'Primeiro exercicio reservado para aquecimento tecnico.'
    : 'Sem bloco de aquecimento automatico.';

  return [
    `Plano IA ${splitKey} - ${splitLabel}.`,
    `Sessao alvo: ${durationMinutes} minutos.`,
    warmupLine,
    'Modelo usa distribuicao de volume, alternancia de intensidade e diversidade de equipamento.'
  ].join(' ');
};

const createWorkoutPlan = ({
  splitKey,
  durationMinutes,
  includeWarmup,
  profileKey,
  exercisesDatabase,
  userSeed
}) => {
  const templates = SPLIT_LIBRARY[splitKey] || SPLIT_LIBRARY.ABC;
  const profile = PROFILE_LIBRARY[profileKey] || PROFILE_LIBRARY.HYPERTROPHY;
  const targetCount = targetExerciseCount(durationMinutes, templates.length);

  const exercisesByCategory = new Map();
  exercisesDatabase.forEach((exercise) => {
    const cat = canonicalCategory(exercise.category);
    if (!exercisesByCategory.has(cat)) {
      exercisesByCategory.set(cat, []);
    }
    exercisesByCategory.get(cat).push(exercise);
  });

  const usedExerciseIdsGlobal = new Set();

  const workouts = templates.map((template, templateIndex) => {
    const name = buildWorkoutName(splitKey, template, templateIndex);
    const description = buildWorkoutDescription({
      includeWarmup,
      durationMinutes,
      splitLabel: template.label,
      splitKey
    });

    const usedEquipments = new Set();
    const picked = [];
    let estimatedTime = 0;

    if (includeWarmup) {
      const warmup = pickWarmupExercise(exercisesByCategory, template, `${userSeed}-${template.code}`);
      if (warmup) {
        picked.push({
          name: warmup.name,
          sets: 2,
          reps: WARMUP_REPS,
          rest_time: 30
        });
        usedExerciseIdsGlobal.add(warmup.id);
        usedEquipments.add(normalizeText(warmup.equipment));
        estimatedTime += estimateExerciseTimeMinutes(2, 30, false);
      }
    }

    const maxExercises = includeWarmup ? targetCount + 1 : targetCount;

    for (let slotIndex = picked.length; slotIndex < maxExercises; slotIndex += 1) {
      const candidates = [];

      exercisesDatabase.forEach((exercise) => {
        const exerciseCategory = canonicalCategory(exercise.category);
        const inTarget = template.primary.includes(exerciseCategory) || template.secondary.includes(exerciseCategory);
        if (!inTarget) return;

        const fatigueIndex = slotIndex / maxExercises;
        const { score, tags } = scoreCandidate({
          exercise,
          template,
          slotIndex,
          usedEquipments,
          usedExerciseIds: usedExerciseIdsGlobal,
          fatigueIndex,
          seed: `${userSeed}-${template.code}`,
          profile
        });

        if (score > 0) {
          candidates.push({ exercise, score, tags });
        }
      });

      candidates.sort((a, b) => b.score - a.score);
      const best = candidates[0];
      if (!best) break;

      const prescription = defineSetPrescription({
        ...best.tags,
        durationMinutes,
        slotIndex,
        totalSlots: maxExercises,
        profile
      });

      const extraMinutes = estimateExerciseTimeMinutes(
        prescription.sets,
        prescription.rest_time,
        best.tags.isCompound
      );

      const upperTimeLimit = durationMinutes * 1.08;
      if (estimatedTime + extraMinutes > upperTimeLimit && picked.length >= 4) {
        continue;
      }

      picked.push({
        name: best.exercise.name,
        sets: prescription.sets,
        reps: prescription.reps,
        rest_time: prescription.rest_time
      });

      estimatedTime += extraMinutes;
      usedExerciseIdsGlobal.add(best.exercise.id);
      usedEquipments.add(normalizeText(best.exercise.equipment));
    }

    return {
      name,
      description,
      estimatedMinutes: Math.round(estimatedTime),
      exercises: ensureUniqueByName(picked)
    };
  });

  return workouts.filter((workout) => workout.exercises.length > 0);
};

export {
  SPLIT_LIBRARY,
  PROFILE_LIBRARY,
  canonicalCategory,
  parseDurationToMinutes,
  createWorkoutPlan
};
