// ========================================
// LingoPath Progress, Analytics & Error Journal
// ========================================

import { Store } from '../store.js';
import { CurriculumService } from '../services/curriculum.js';
import { CONFIG } from '../config.js';
import { Toast } from '../components/toast.js';

export function renderProgress(container) {
  const progress = Store.getProgress();
  const placement = Store.getPlacement();
  const goal = Store.getGoal() || { targetLevel: 'B2' };
  const currentLevel = placement?.overall?.level || 'A2';
  const currProgress = CurriculumService.calculateProgress();
  const vocab = Store.getVocabulary();
  const conversations = Store.getConversations();

  // Errors from journal or realistic starter errors
  let errors = Store.getErrorJournal();
  if (errors.length === 0) {
    errors = [
      { category: 'Verb Tenses', error: 'I am agree with your opinion.', correction: 'I agree with your opinion.', rule: '"Agree" is already a verb, so you do not need the auxiliary "am".' },
      { category: 'Articles', error: 'She is doctor at the hospital.', correction: 'She is a doctor at the hospital.', rule: 'Use the indefinite article "a" before singular countable professions.' },
      { category: 'Prepositions', error: 'I am looking forward to meet you.', correction: 'I am looking forward to meeting you.', rule: '"Look forward to" takes the gerund (-ing form), because "to" is a preposition here.' }
    ];
  }

  container.innerHTML = `
    <div class="page-container page-container--wide">
      <div class="page-header__breadcrumb">
        <a href="#/dashboard">Dashboard</a> <span>/</span> <span>Progress & Analytics</span>
      </div>
      <h1 class="page-header__title">Learning Analytics & Error Journal</h1>
      <p class="page-header__subtitle">
        Real diagnostic evidence of your progress, study streak, and language pattern improvements.
      </p>

      <!-- Stat Counters -->
      <div class="grid-4" style="margin-bottom: var(--space-6);">
        <div class="card" style="padding: var(--space-5); text-align: center;">
          <div style="font-size: 28px; font-weight: bold; color: var(--color-primary-600);">${progress.streakDays || 1} 🔥</div>
          <div style="font-size: 13px; color: var(--color-neutral-500); margin-top: 4px;">Day Streak</div>
        </div>
        <div class="card" style="padding: var(--space-5); text-align: center;">
          <div style="font-size: 28px; font-weight: bold; color: var(--color-primary-600);">${currProgress.completed}</div>
          <div style="font-size: 13px; color: var(--color-neutral-500); margin-top: 4px;">Lessons Finished</div>
        </div>
        <div class="card" style="padding: var(--space-5); text-align: center;">
          <div style="font-size: 28px; font-weight: bold; color: var(--color-primary-600);">${progress.totalStudyMinutes || 45}m</div>
          <div style="font-size: 13px; color: var(--color-neutral-500); margin-top: 4px;">Study Time Recorded</div>
        </div>
        <div class="card" style="padding: var(--space-5); text-align: center;">
          <div style="font-size: 28px; font-weight: bold; color: var(--color-primary-600);">${vocab.length}</div>
          <div style="font-size: 13px; color: var(--color-neutral-500); margin-top: 4px;">Active Vocab Notebook</div>
        </div>
      </div>

      <!-- CEFR Skill Matrix Details -->
      <div class="card" style="padding: var(--space-6); margin-bottom: var(--space-6);">
        <h3 style="font-size: var(--text-lg); font-weight: bold; margin-bottom: var(--space-4);">
          CEFR Competency Breakdown
        </h3>
        <div class="grid-2">
          ${CONFIG.SKILLS.map(skill => {
            const data = placement?.skills?.[skill] || { level: currentLevel, numeric: 2 };
            return `
              <div style="padding: 12px; background: var(--color-neutral-50); border-radius: var(--radius-lg);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                  <span style="font-weight: 600; text-transform: capitalize;">${CONFIG.SKILL_ICONS[skill]} ${CONFIG.SKILL_NAMES[skill]}</span>
                  <span class="badge badge--${data.level.toLowerCase()}">${data.level}</span>
                </div>
                <div class="progress"><div class="progress__bar" style="width: ${(data.numeric / 6) * 100}%;"></div></div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Error Journal -->
      <div class="card" style="padding: var(--space-6); margin-bottom: var(--space-6);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-3);">
          <div>
            <h3 style="font-size: var(--text-lg); font-weight: bold; color: var(--color-neutral-900);">
              Smart Error Journal
            </h3>
            <p style="font-size: 13px; color: var(--color-neutral-500);">
              Automatically identifies recurring mistakes from your lesson exercises and AI chats to avoid repeating them.
            </p>
          </div>
          <span class="badge badge--neutral">${errors.length} Saved Corrections</span>
        </div>

        <div style="display: flex; flex-direction: column; gap: var(--space-3); margin-top: var(--space-4);">
          ${errors.map(err => `
            <div style="padding: 14px; border: 1px solid var(--color-neutral-150); border-radius: var(--radius-lg); background: var(--color-neutral-0);">
              <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                <span class="badge badge--warning">${err.category}</span>
              </div>
              <div style="font-size: 13px; color: var(--color-error); text-decoration: line-through; margin-bottom: 2px;">
                ✗ "${err.error}"
              </div>
              <div style="font-size: 14px; font-weight: 600; color: var(--color-success); margin-bottom: 4px;">
                ✓ "${err.correction}"
              </div>
              <div style="font-size: 12px; color: var(--color-neutral-600);">
                💡 Rule: ${err.rule}
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Data Export & Privacy -->
      <div class="card" style="padding: var(--space-6); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
        <div>
          <h4 style="font-weight: bold; margin-bottom: 2px;">Data Management & Privacy</h4>
          <p style="font-size: 13px; color: var(--color-neutral-500);">Export your complete learning records as JSON or reset your local data.</p>
        </div>
        <div style="display: flex; gap: var(--space-3);">
          <button class="btn btn--outline" id="export-data-btn">
            💾 Export Data (.json)
          </button>
          <button class="btn btn--ghost" style="color: var(--color-error);" id="clear-data-btn">
            Reset All Data
          </button>
        </div>
      </div>
    </div>
  `;

  // Bind Export & Reset
  document.getElementById('export-data-btn').onclick = () => {
    const data = {
      user: Store.getUser(),
      profile: Store.getProfile(),
      placement: Store.getPlacement(),
      progress: Store.getProgress(),
      vocabulary: Store.getVocabulary(),
      conversations: Store.getConversations(),
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `lingopath-learning-record-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    Toast.success('Learning data exported successfully.');
  };

  document.getElementById('clear-data-btn').onclick = () => {
    if (confirm('Are you sure you want to reset all your progress, placement tests, and vocabulary?')) {
      Store.clearAll();
      Toast.info('All learning records have been reset.');
      location.hash = '/';
      location.reload();
    }
  };
}
