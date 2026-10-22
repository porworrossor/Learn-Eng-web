// ========================================
// LingoPath Automated Test Suite
// ========================================

import { scorePlacementTest } from '../js/services/assessment.js';
import { generateDemoCurriculum } from '../js/data/demo-lessons.js';
import { Store } from '../js/store.js';
import { CONFIG, getCEFRLevel, getCEFRNumeric } from '../js/config.js';
import { PLACEMENT_QUESTIONS } from '../js/data/placement-questions.js';

export function runAllTests() {
  const results = [];

  function test(name, fn) {
    try {
      fn();
      results.push({ name, passed: true });
    } catch (err) {
      results.push({ name, passed: false, error: err.message });
    }
  }

  function assert(condition, message) {
    if (!condition) {
      throw new Error(message || 'Assertion failed');
    }
  }

  function assertEqual(actual, expected, message) {
    if (actual !== expected) {
      throw new Error(`${message || 'Failed'}: Expected [${expected}], got [${actual}]`);
    }
  }

  // --- Test Suite 1: CEFR Configuration & Mapping ---
  test('CEFR numeric mapping and level conversions', () => {
    assertEqual(getCEFRNumeric('A1'), 1, 'A1 numeric should be 1');
    assertEqual(getCEFRNumeric('B2'), 4, 'B2 numeric should be 4');
    assertEqual(getCEFRNumeric('C2'), 6, 'C2 numeric should be 6');
    assertEqual(getCEFRLevel(1), 'A1', '1 should map to A1');
    assertEqual(getCEFRLevel(3.8), 'B2', '3.8 should round to B2');
    assertEqual(getCEFRLevel(6), 'C2', '6 should map to C2');
  });

  // --- Test Suite 2: Placement Assessment Scoring ---
  test('Placement test scoring calculates overall and skill levels', () => {
    // Mock answers for all A1 questions correct, higher difficulty incorrect
    const mockAnswers = {
      grammar: {
        g1: 1, g2: 1, g3: 1, g4: 1, // A1 correct
        g5: 0, g6: 0, g7: 0, g8: 0  // wrong
      },
      reading: {},
      listening: {},
      writing: ['I wake up in the morning. I eat toast. I work in an office. In the evening I read books and sleep.']
    };

    const report = scorePlacementTest(mockAnswers, PLACEMENT_QUESTIONS);
    assert(report !== null, 'Report should be generated');
    assert(report.overall !== undefined, 'Report must contain overall level');
    assert(report.skills.grammar !== undefined, 'Report must contain grammar skill');
    assert(report.skills.reading !== undefined, 'Report must contain reading skill');
    assert(report.skills.writing !== undefined, 'Report must contain writing skill');
    assert(Array.isArray(report.recommendations), 'Report must contain recommendations array');
  });

  // --- Test Suite 3: Personalized Curriculum Generation ---
  test('Curriculum generator creates valid hierarchy from A2 to B2', () => {
    const curriculum = generateDemoCurriculum('A2', 'B2');
    assert(curriculum.stages.length >= 3, 'A2 to B2 path must span at least 3 stages (A2, B1, B2)');
    assertEqual(curriculum.currentLevel, 'A2', 'Current level should match');
    assertEqual(curriculum.targetLevel, 'B2', 'Target level should match');

    // Verify Stage -> Module -> Lesson structure
    curriculum.stages.forEach(stage => {
      assert(stage.modules.length > 0, `Stage ${stage.title} must have modules`);
      stage.modules.forEach(mod => {
        assert(mod.lessons.length > 0, `Module ${mod.title} must contain lessons`);
        assert(Array.isArray(mod.objectives), `Module ${mod.title} must have objectives`);
      });
    });
  });

  // --- Test Suite 4: State Store & Streak Logic ---
  test('Store lesson completion and study streak recording', () => {
    const initialProgress = Store.getProgress();
    Store.markLessonComplete('test-lesson-123', 90);

    const updated = Store.getProgress();
    assert(updated.completedLessons.includes('test-lesson-123'), 'Completed lesson must be recorded');
    assertEqual(updated.lessonScores['test-lesson-123'].score, 90, 'Lesson score should be stored accurately');
    assert(updated.streakDays >= 1, 'Study streak should be at least 1 day');
  });

  // --- Test Suite 5: SM-2 Spaced Repetition Logic ---
  test('Spaced repetition algorithm updates review interval and status', () => {
    const testVocab = {
      word: 'Resilience',
      meaning: 'Capacity to recover quickly from difficulties.',
      cefr: 'B2'
    };
    Store.addVocabularyItem(testVocab);
    const vocabList = Store.getVocabulary();
    const item = vocabList.find(v => v.word === 'Resilience');
    assert(item !== undefined, 'Vocabulary item should be added to store');

    // Quality 4 (Easy)
    Store.updateVocabularyReview(item.id, 4);
    const reviewed = Store.getVocabulary().find(v => v.id === item.id);
    assertEqual(reviewed.reviewCount, 1, 'Review count should increment to 1');
    assertEqual(reviewed.interval, 1, 'First interval should be 1 day');

    // Quality 4 second review
    Store.updateVocabularyReview(item.id, 4);
    const reviewed2 = Store.getVocabulary().find(v => v.id === item.id);
    assertEqual(reviewed2.reviewCount, 2, 'Review count should increment to 2');
    assertEqual(reviewed2.interval, 6, 'Second successful interval should be 6 days');
  });

  return results;
}
