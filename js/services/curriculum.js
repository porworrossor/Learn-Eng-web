// ========================================
// LingoPath Curriculum Management Service
// ========================================

import { Store } from '../store.js';
import { generateDemoCurriculum, DEMO_LESSONS } from '../data/demo-lessons.js';

export const CurriculumService = {
  getCurriculum() {
    let curriculum = Store.getCurriculum();
    if (!curriculum) {
      // Default initial curriculum if none created yet
      const placement = Store.getPlacement();
      const goal = Store.getGoal();
      const currentLevel = placement?.overall?.level || 'A2';
      const targetLevel = goal?.targetLevel || 'B2';
      curriculum = generateDemoCurriculum(currentLevel, targetLevel);
      Store.setCurriculum(curriculum);
    }
    return curriculum;
  },

  generate(currentLevel, targetLevel, interests = [], dailyMinutes = 30) {
    const curriculum = generateDemoCurriculum(currentLevel, targetLevel);
    // Enrich with user preferences
    curriculum.interests = interests;
    curriculum.dailyMinutes = dailyMinutes;
    Store.setCurriculum(curriculum);
    return curriculum;
  },

  getAllLessons() {
    const curr = this.getCurriculum();
    const lessons = [];
    if (!curr || !curr.stages) return lessons;

    curr.stages.forEach(stage => {
      stage.modules.forEach(module => {
        module.lessons.forEach(lesson => {
          lessons.push({
            ...lesson,
            stageId: stage.id,
            stageNumber: stage.number,
            stageTitle: stage.title,
            moduleId: module.id,
            moduleTitle: module.title,
            moduleSkill: module.skill,
            level: module.level
          });
        });
      });
    });
    return lessons;
  },

  getNextLesson() {
    const all = this.getAllLessons();
    const progress = Store.getProgress();
    const completed = new Set(progress.completedLessons || []);

    // First look for any lesson that has interactive demo content
    const uncompletedWithDemo = all.find(l => !completed.has(l.id) && DEMO_LESSONS[l.id]);
    if (uncompletedWithDemo) return uncompletedWithDemo;

    // Otherwise return next uncompleted
    const nextUncompleted = all.find(l => !completed.has(l.id));
    return nextUncompleted || all[0];
  },

  getLessonById(lessonId) {
    // Check in DEMO_LESSONS first
    if (DEMO_LESSONS[lessonId]) {
      return DEMO_LESSONS[lessonId];
    }
    // Check in generated curriculum
    const all = this.getAllLessons();
    const found = all.find(l => l.id === lessonId);
    if (found) {
      // If no custom content, provide synthetic lesson based on title
      return {
        id: found.id,
        title: found.title,
        level: found.level,
        skill: found.moduleSkill || 'grammar',
        duration: found.duration || 15,
        objectives: [
          `Master key patterns for: ${found.title}`,
          `Apply practical usage in everyday scenarios`,
          `Check comprehension through interactive exercises`
        ],
        content: {
          explanation: `
            <h4>Overview: ${found.title}</h4>
            <p>This module focuses on developing competence in <strong>${found.title}</strong> at the ${found.level} CEFR level.</p>
            <div class="example-box">
              <p><strong>Core Concept:</strong> Clear, natural expression tailored for real-world English communication.</p>
            </div>
            <h4>Key Structures to Remember</h4>
            <ul>
              <li>Always check context and register (formal vs informal).</li>
              <li>Practice saying sentences aloud to improve rhythm and fluency.</li>
            </ul>
          `,
          examples: [
            {
              situation: 'Work & Daily Context',
              dialog: 'A: "Could you clarify the deadline for this task?"\nB: "Sure, let\'s aim for Friday afternoon."'
            }
          ]
        },
        activities: [
          {
            id: found.id + '-act1',
            type: 'multiple-choice',
            question: `Which option demonstrates the most natural usage of "${found.title}"?`,
            options: [
              'I have thoroughly reviewed the provided materials.',
              'I am review the materials yesterday.',
              'Materials was review by myself quickly.',
              'I reviewing all materials now already.'
            ],
            correct: 0,
            explanation: 'The first option uses correct tense, subject-verb agreement, and natural adverb placement.'
          },
          {
            id: found.id + '-act2',
            type: 'fill-blank',
            question: 'Complete the sentence: "To make consistent progress, I ___ English for 20 minutes every single day."',
            blanks: ['practice'],
            explanation: '"practice" (or "practise") in the present simple expresses a regular habit or routine.'
          }
        ]
      };
    }
    return DEMO_LESSONS['a2-greetings'];
  },

  calculateProgress() {
    const all = this.getAllLessons();
    const progress = Store.getProgress();
    const completed = progress.completedLessons || [];
    const total = all.length;
    const count = completed.length;
    const percentage = total > 0 ? Math.round((count / total) * 100) : 0;

    return {
      total,
      completed: count,
      percentage,
      remaining: Math.max(0, total - count)
    };
  }
};
