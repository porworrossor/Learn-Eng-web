// ========================================
// LingoPath Assessment Scoring Engine
// ========================================

import { CONFIG, getCEFRLevel } from '../config.js';

// Score placement test answers and generate diagnostic report
export function scorePlacementTest(answers, questions) {
  const sectionScores = {};
  const difficultyScores = {};
  let totalCorrect = 0;
  let totalQuestions = 0;

  // Process each section
  for (const [section, sectionAnswers] of Object.entries(answers)) {
    const sectionQuestions = questions[section] || [];
    let correct = 0;
    let total = 0;
    const byDifficulty = {};

    if (section === 'writing') {
      // Writing scored differently
      sectionAnswers.forEach((answer, idx) => {
        const q = sectionQuestions[idx];
        if (!q || !answer) return;
        const score = scoreWritingResponse(answer, q);
        correct += score.normalizedScore;
        total += 1;
        
        const diff = q.difficulty;
        if (!byDifficulty[diff]) byDifficulty[diff] = { correct: 0, total: 0 };
        byDifficulty[diff].correct += score.normalizedScore;
        byDifficulty[diff].total += 1;
      });
    } else {
      // Multiple choice and comprehension questions
      sectionQuestions.forEach((q) => {
        if (q.type === 'reading-comprehension' || q.type === 'listening-comprehension') {
          // Has sub-questions
          const subQuestions = q.questions;
          subQuestions.forEach((sq, sqIdx) => {
            const answerKey = q.id + '_' + sqIdx;
            const userAnswer = sectionAnswers[answerKey];
            const isCorrect = userAnswer === sq.correct;
            if (isCorrect) correct++;
            total++;
            
            const diff = q.difficulty;
            if (!byDifficulty[diff]) byDifficulty[diff] = { correct: 0, total: 0 };
            if (isCorrect) byDifficulty[diff].correct++;
            byDifficulty[diff].total++;
          });
        } else {
          const userAnswer = sectionAnswers[q.id];
          const isCorrect = userAnswer === q.correct;
          if (isCorrect) correct++;
          total++;
          
          const diff = q.difficulty;
          if (!byDifficulty[diff]) byDifficulty[diff] = { correct: 0, total: 0 };
          if (isCorrect) byDifficulty[diff].correct++;
          byDifficulty[diff].total++;
        }
      });
    }

    sectionScores[section] = {
      correct,
      total,
      percentage: total > 0 ? Math.round((correct / total) * 100) : 0,
      byDifficulty
    };

    totalCorrect += correct;
    totalQuestions += total;

    // Merge difficulty scores
    for (const [diff, counts] of Object.entries(byDifficulty)) {
      if (!difficultyScores[diff]) difficultyScores[diff] = { correct: 0, total: 0 };
      difficultyScores[diff].correct += counts.correct;
      difficultyScores[diff].total += counts.total;
    }
  }

  // Calculate estimated CEFR levels
  const skillLevels = calculateSkillLevels(sectionScores, difficultyScores);
  const overallLevel = calculateOverallLevel(skillLevels, difficultyScores);

  return {
    overall: {
      level: overallLevel,
      levelName: CONFIG.CEFR_NAMES[overallLevel],
      totalCorrect,
      totalQuestions,
      percentage: totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0
    },
    skills: skillLevels,
    sections: sectionScores,
    strengths: identifyStrengths(skillLevels),
    weaknesses: identifyWeaknesses(skillLevels),
    confidence: calculateConfidence(totalQuestions),
    recommendations: generateRecommendations(skillLevels, overallLevel),
    scoredAt: Date.now()
  };
}

function calculateSkillLevels(sectionScores, difficultyScores) {
  const skills = {};
  
  // Map sections to skills
  const sectionSkillMap = {
    grammar: ['grammar', 'vocabulary'],
    reading: ['reading'],
    listening: ['listening'],
    writing: ['writing']
  };

  // For each section, estimate the CEFR level
  for (const [section, scores] of Object.entries(sectionScores)) {
    const mappedSkills = sectionSkillMap[section] || [section];
    const level = estimateLevelFromScores(scores);
    
    mappedSkills.forEach(skill => {
      skills[skill] = {
        level,
        levelName: CONFIG.CEFR_NAMES[level],
        percentage: scores.percentage,
        numeric: CONFIG.CEFR_NUMERIC[level]
      };
    });
  }

  // If speaking wasn't tested, estimate from other skills
  if (!skills.speaking) {
    const avgNumeric = Object.values(skills).reduce((sum, s) => sum + s.numeric, 0) / Object.values(skills).length;
    // Speaking is typically slightly lower when not practiced
    const speakingNumeric = Math.max(1, Math.round(avgNumeric - 0.5));
    const speakingLevel = getCEFRLevel(speakingNumeric);
    skills.speaking = {
      level: speakingLevel,
      levelName: CONFIG.CEFR_NAMES[speakingLevel],
      percentage: null,
      numeric: speakingNumeric,
      estimated: true
    };
  }

  return skills;
}

function estimateLevelFromScores(scores) {
  const { byDifficulty, percentage } = scores;
  
  // Calculate weighted score based on difficulty levels answered correctly
  let highestMastered = 'A1';
  const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  
  for (const level of levels) {
    if (byDifficulty[level]) {
      const levelScore = byDifficulty[level].total > 0 
        ? byDifficulty[level].correct / byDifficulty[level].total 
        : 0;
      
      // Need at least 60% at a level to consider it mastered
      if (levelScore >= 0.6) {
        highestMastered = level;
      } else {
        break; // Stop if they didn't master this level
      }
    }
  }

  // Also consider overall percentage as a sanity check
  if (percentage < 30) return 'A1';
  if (percentage < 45) return 'A2';
  
  return highestMastered;
}

function calculateOverallLevel(skillLevels, difficultyScores) {
  const numerics = Object.values(skillLevels).map(s => s.numeric);
  if (numerics.length === 0) return 'A1';
  
  // Weighted average (reading and grammar slightly more reliable than estimated speaking)
  let totalWeight = 0;
  let weightedSum = 0;
  
  for (const [skill, data] of Object.entries(skillLevels)) {
    const weight = data.estimated ? 0.5 : 1;
    weightedSum += data.numeric * weight;
    totalWeight += weight;
  }

  const avg = totalWeight > 0 ? weightedSum / totalWeight : 1;
  return getCEFRLevel(avg);
}

function identifyStrengths(skillLevels) {
  const entries = Object.entries(skillLevels)
    .filter(([, data]) => !data.estimated)
    .sort(([, a], [, b]) => b.numeric - a.numeric);
  
  if (entries.length === 0) return [];
  
  const highest = entries[0][1].numeric;
  return entries
    .filter(([, data]) => data.numeric >= highest)
    .map(([skill]) => ({
      skill,
      name: CONFIG.SKILL_NAMES[skill],
      level: skillLevels[skill].level
    }));
}

function identifyWeaknesses(skillLevels) {
  const entries = Object.entries(skillLevels)
    .sort(([, a], [, b]) => a.numeric - b.numeric);
  
  if (entries.length === 0) return [];
  
  const lowest = entries[0][1].numeric;
  return entries
    .filter(([, data]) => data.numeric <= lowest)
    .map(([skill]) => ({
      skill,
      name: CONFIG.SKILL_NAMES[skill],
      level: skillLevels[skill].level
    }));
}

function calculateConfidence(totalQuestions) {
  if (totalQuestions >= 30) return { level: 'high', description: 'Based on a comprehensive assessment' };
  if (totalQuestions >= 15) return { level: 'moderate', description: 'Based on a reasonable number of questions' };
  return { level: 'low', description: 'Based on limited evidence — consider retaking with more questions' };
}

function generateRecommendations(skillLevels, overallLevel) {
  const recommendations = [];
  const weaknesses = identifyWeaknesses(skillLevels);
  const strengths = identifyStrengths(skillLevels);

  if (weaknesses.length > 0) {
    weaknesses.forEach(w => {
      recommendations.push({
        type: 'weakness',
        message: `Focus on improving your ${w.name} skills (currently ${w.level})`
      });
    });
  }

  if (strengths.length > 0) {
    strengths.forEach(s => {
      recommendations.push({
        type: 'strength',
        message: `Your ${s.name} is strong at ${s.level} — use it to support other skills`
      });
    });
  }

  const overallNumeric = CONFIG.CEFR_NUMERIC[overallLevel];
  if (overallNumeric < 6) {
    const nextLevel = getCEFRLevel(overallNumeric + 1);
    recommendations.push({
      type: 'goal',
      message: `Your recommended next target: ${nextLevel} (${CONFIG.CEFR_NAMES[nextLevel]})`
    });
  }

  return recommendations;
}

function scoreWritingResponse(text, question) {
  if (!text || text.trim().length === 0) {
    return { normalizedScore: 0, feedback: 'No response provided.' };
  }

  const words = text.trim().split(/\s+/).length;
  const minWords = question.minWords || 20;
  
  let score = 0;
  let maxScore = 4;
  const feedback = [];

  // Word count check
  if (words >= minWords) {
    score += 1;
    feedback.push('✓ Adequate length');
  } else {
    feedback.push(`✗ Too short (${words} words, minimum ${minWords})`);
  }

  // Basic grammar indicators (simple heuristic checks)
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  if (sentences.length >= 2) {
    score += 1;
    feedback.push('✓ Multiple sentences used');
  } else {
    feedback.push('✗ Try to write more complete sentences');
  }

  // Vocabulary variety
  const uniqueWords = new Set(text.toLowerCase().match(/\b[a-z]+\b/g) || []);
  const vocabRatio = uniqueWords.size / Math.max(words, 1);
  if (vocabRatio > 0.5) {
    score += 1;
    feedback.push('✓ Good vocabulary variety');
  } else {
    feedback.push('✗ Try to use more varied vocabulary');
  }

  // Relevance (very basic — checks for any words from the prompt)
  const promptWords = new Set(question.prompt.toLowerCase().match(/\b[a-z]+\b/g) || []);
  const responseWords = new Set(text.toLowerCase().match(/\b[a-z]+\b/g) || []);
  const overlap = [...responseWords].filter(w => promptWords.has(w) && w.length > 3).length;
  if (overlap >= 2) {
    score += 1;
    feedback.push('✓ Response appears relevant to the prompt');
  } else {
    feedback.push('✗ Make sure your response addresses the prompt');
  }

  return {
    normalizedScore: score / maxScore,
    score,
    maxScore,
    feedback,
    wordCount: words
  };
}
