// ========================================
// LingoPath Learning Dashboard Page
// ========================================

import { Store } from '../store.js';
import { CurriculumService } from '../services/curriculum.js';
import { CONFIG } from '../config.js';
import { Router } from '../router.js';

export function renderDashboard(container) {
  const user = Store.getUser() || { name: 'Learner' };
  const profile = Store.getProfile();
  const placement = Store.getPlacement();
  const goal = Store.getGoal() || { targetLevel: 'B2', dailyMinutes: 30 };
  const currentLevel = placement?.overall?.level || profile.currentLevel || 'A2';
  const targetLevel = goal.targetLevel || 'B2';
  const progress = Store.getProgress();

  const nextLesson = CurriculumService.getNextLesson();
  const currProgress = CurriculumService.calculateProgress();
  const dueVocab = Store.getDueVocabulary();

  // Daily plan tasks
  const todayTasks = [
    { id: 't1', title: `Core Lesson: ${nextLesson?.title || 'Interactive Practice'}`, duration: 15, path: `/lesson/${nextLesson?.id || 'a2-greetings'}`, done: (progress.completedLessons || []).includes(nextLesson?.id) },
    { id: 't2', title: 'AI Conversation Practice (5 min)', duration: 5, path: '/conversation', done: (Store.getConversations() || []).length > 0 },
    { id: 't3', title: `Vocabulary Spaced Review (${dueVocab.length} due)`, duration: 5, path: '/vocabulary', done: dueVocab.length === 0 }
  ];

  const skills = placement?.skills || {
    reading: { level: currentLevel, numeric: 2 },
    listening: { level: currentLevel, numeric: 2 },
    writing: { level: currentLevel, numeric: 2 },
    speaking: { level: currentLevel, numeric: 2 },
    grammar: { level: currentLevel, numeric: 2 },
    vocabulary: { level: currentLevel, numeric: 2 }
  };

  container.innerHTML = `
    <div class="page-container page-container--wide">
      <!-- Welcome Hero -->
      <div class="dashboard-welcome">
        <div class="dashboard-welcome__content">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
            <span class="badge badge--${currentLevel.toLowerCase()}">Current: ${currentLevel}</span>
            <span style="color: var(--color-neutral-400);">➔</span>
            <span class="badge badge--${targetLevel.toLowerCase()}">Target: ${targetLevel}</span>
          </div>
          <h1 class="dashboard-welcome__greeting">
            Welcome back, ${user.name}! 👋
          </h1>
          <p class="dashboard-welcome__message">
            Your personalized learning path is active. You have completed <strong>${currProgress.completed}</strong> of <strong>${currProgress.total}</strong> lessons (${currProgress.percentage}%).
          </p>
        </div>

        <div class="dashboard-welcome__stats">
          <div class="dashboard-welcome__stat">
            <div class="dashboard-welcome__stat-value">${progress.streakDays || 1} 🔥</div>
            <div class="dashboard-welcome__stat-label">Day Streak</div>
          </div>
          <div class="dashboard-welcome__stat">
            <div class="dashboard-welcome__stat-value">${progress.totalStudyMinutes || 45}m</div>
            <div class="dashboard-welcome__stat-label">Study Time</div>
          </div>
          <div class="dashboard-welcome__stat">
            <div class="dashboard-welcome__stat-value">${dueVocab.length}</div>
            <div class="dashboard-welcome__stat-label">Words Due</div>
          </div>
        </div>
      </div>

      <!-- Continue Learning Banner -->
      <div class="dashboard-continue">
        <div class="dashboard-continue__icon">🎯</div>
        <div class="dashboard-continue__info">
          <div style="font-size: 11px; text-transform: uppercase; font-weight: bold; color: var(--color-primary-600); letter-spacing: 0.05em;">
            Next Recommended Lesson
          </div>
          <div class="dashboard-continue__title">
            ${nextLesson ? nextLesson.title : 'Greetings & Introductions'}
          </div>
          <div class="dashboard-continue__meta">
            ${nextLesson?.level || currentLevel} Level &bull; ~${nextLesson?.duration || 15} mins &bull; Interactive Exercises & Mastery Check
          </div>
        </div>
        <a href="#/lesson/${nextLesson?.id || 'a2-greetings'}" class="btn btn--primary btn--lg">
          Continue Learning →
        </a>
      </div>

      <div class="grid-3" style="margin-bottom: var(--space-8);">
        <!-- Daily Study Plan -->
        <div class="card" style="padding: var(--space-6); grid-column: span 2;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
            <h3 style="font-size: var(--text-lg); font-weight: var(--font-bold); color: var(--color-neutral-900);">
              Today's Study Plan (${goal.dailyMinutes} mins goal)
            </h3>
            <span class="badge badge--neutral">3 Recommended Tasks</span>
          </div>

          <div style="display: flex; flex-direction: column; gap: var(--space-3);">
            ${todayTasks.map(task => `
              <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; border: 1px solid var(--color-neutral-150); border-radius: var(--radius-lg); background: ${task.done ? 'var(--color-success-light)' : 'var(--color-neutral-0)'};">
                <div style="display: flex; align-items: center; gap: 12px;">
                  <span style="font-size: 18px;">${task.done ? '✅' : '⚪'}</span>
                  <div>
                    <div style="font-weight: 600; font-size: 14px; text-decoration: ${task.done ? 'line-through' : 'none'};">${task.title}</div>
                    <div style="font-size: 12px; color: var(--color-neutral-500);">${task.duration} minutes estimated</div>
                  </div>
                </div>
                <a href="#${task.path}" class="btn btn--sm ${task.done ? 'btn--ghost' : 'btn--secondary'}">
                  ${task.done ? 'Review' : 'Start'}
                </a>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Quick Launch Cards -->
        <div style="display: flex; flex-direction: column; gap: var(--space-4);">
          <div class="card" style="padding: var(--space-5);">
            <div style="font-size: 24px; margin-bottom: 8px;">💬</div>
            <h4 style="font-weight: bold; margin-bottom: 4px;">AI English Tutor</h4>
            <p style="font-size: 12px; color: var(--color-neutral-500); margin-bottom: 12px;">
              Practice natural conversations, job interviews, or exam speaking prompts.
            </p>
            <a href="#/conversation" class="btn btn--secondary btn--sm btn--full">Open Conversation →</a>
          </div>

          <div class="card" style="padding: var(--space-5);">
            <div style="font-size: 24px; margin-bottom: 8px;">📚</div>
            <h4 style="font-weight: bold; margin-bottom: 4px;">Vocabulary Notebook</h4>
            <p style="font-size: 12px; color: var(--color-neutral-500); margin-bottom: 12px;">
              Smart spaced repetition review with Thai explanations & audio pronunciation.
            </p>
            <a href="#/vocabulary" class="btn btn--secondary btn--sm btn--full">Review Notebook →</a>
          </div>
        </div>
      </div>

      <!-- Skill Breakdown -->
      <div class="card" style="padding: var(--space-6); margin-bottom: var(--space-8);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-5);">
          <div>
            <h3 style="font-size: var(--text-lg); font-weight: var(--font-bold); color: var(--color-neutral-900);">
              Skill Proficiency Matrix (CEFR)
            </h3>
            <p style="font-size: 13px; color: var(--color-neutral-500);">
              Independent proficiency levels for each core competency.
            </p>
          </div>
          <a href="#/progress" class="btn btn--ghost btn--sm">Full Analytics →</a>
        </div>

        <div class="grid-3">
          ${CONFIG.SKILLS.map(skill => {
            const data = skills[skill] || { level: currentLevel, numeric: 2 };
            return `
              <div style="padding: 14px; border: 1px solid var(--color-neutral-150); border-radius: var(--radius-lg); background: var(--color-neutral-50);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                  <span style="font-weight: 600; text-transform: capitalize;">${CONFIG.SKILL_ICONS[skill]} ${CONFIG.SKILL_NAMES[skill]}</span>
                  <span class="badge badge--${data.level.toLowerCase()}">${data.level}</span>
                </div>
                <div class="progress">
                  <div class="progress__bar" style="width: ${(data.numeric / 6) * 100}%;"></div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    </div>
  `;
}
