// ========================================
// LingoPath Configuration
// ========================================

export const CONFIG = {
  APP_NAME: 'LingoPath',
  APP_TAGLINE: 'Your English journey, built around you.',
  VERSION: '1.0.0',
  
  // CEFR Levels
  CEFR_LEVELS: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
  
  CEFR_NAMES: {
    A1: 'Beginner',
    A2: 'Elementary',
    B1: 'Intermediate',
    B2: 'Upper Intermediate',
    C1: 'Advanced',
    C2: 'Proficient'
  },

  CEFR_COLORS: {
    A1: '#8B5CF6',
    A2: '#6366F1',
    B1: '#3B82F6',
    B2: '#0EA5E9',
    C1: '#14B8A6',
    C2: '#10B981'
  },

  // Skills
  SKILLS: ['reading', 'listening', 'writing', 'speaking', 'grammar', 'vocabulary'],
  
  SKILL_NAMES: {
    reading: 'Reading',
    listening: 'Listening',
    writing: 'Writing',
    speaking: 'Speaking',
    grammar: 'Grammar',
    vocabulary: 'Vocabulary'
  },
  
  SKILL_ICONS: {
    reading: '📖',
    listening: '🎧',
    writing: '✍️',
    speaking: '🗣️',
    grammar: '📝',
    vocabulary: '📚'
  },

  // Study time options (minutes)
  STUDY_TIME_OPTIONS: [15, 30, 45, 60],
  
  // Topic interests
  INTERESTS: [
    'Science & Technology',
    'Travel & Culture',
    'Entertainment & Media',
    'Business & Career',
    'Everyday Life',
    'Sports & Health',
    'Art & Music',
    'Food & Cooking',
    'Nature & Environment',
    'History & Politics'
  ],

  // Correction styles
  CORRECTION_STYLES: {
    gentle: { name: 'Gentle', desc: 'Correct only important mistakes' },
    balanced: { name: 'Balanced', desc: 'Correct recurring errors and unnatural expressions' },
    detailed: { name: 'Detailed', desc: 'Provide comprehensive feedback' }
  },

  // Explanation languages  
  EXPLANATION_LANGUAGES: {
    en: 'English only',
    'th-en': 'Thai with gradual English',
    th: 'Thai (ภาษาไทย)'
  },

  // CEFR level numeric mapping for calculations
  CEFR_NUMERIC: {
    A1: 1, A2: 2, B1: 3, B2: 4, C1: 5, C2: 6
  },

  // localStorage keys prefix
  STORAGE_PREFIX: 'lp_',

  // Demo mode flag
  DEMO_MODE: true,

  // AI API configuration (for future integration)
  AI_API_URL: '',
  AI_API_KEY: '',
};

export function getCEFRLevel(numericValue) {
  const rounded = Math.round(Math.max(1, Math.min(6, numericValue)));
  return CONFIG.CEFR_LEVELS[rounded - 1];
}

export function getCEFRNumeric(level) {
  return CONFIG.CEFR_NUMERIC[level] || 1;
}

export function getCEFRColor(level) {
  return CONFIG.CEFR_COLORS[level] || '#6B7280';
}

export function getCEFRBadgeClass(level) {
  return `badge--${level.toLowerCase()}`;
}
