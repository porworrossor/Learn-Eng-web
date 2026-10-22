// ========================================
// LingoPath Goal Selection Page
// ========================================

import { CONFIG, getCEFRNumeric } from '../config.js';
import { Store } from '../store.js';
import { CurriculumService } from '../services/curriculum.js';
import { Router } from '../router.js';
import { Toast } from '../components/toast.js';

export function renderGoalSelection(container) {
  const placement = Store.getPlacement();
  const currentLevel = placement?.overall?.level || 'A2';
  const currentNum = getCEFRNumeric(currentLevel);

  let state = {
    targetLevel: currentNum < 6 ? CONFIG.CEFR_LEVELS[currentNum] : 'C2',
    dailyMinutes: 30,
    preferredDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    prioritySkill: 'speaking',
    selectedInterests: ['Everyday Life', 'Travel & Culture', 'Science & Technology'],
    explanationLanguage: 'th-en'
  };

  function render() {
    const targetNum = getCEFRNumeric(state.targetLevel);
    const levelsDiff = Math.max(1, targetNum - currentNum + 1);
    const estimatedWeeks = Math.round((levelsDiff * 45) / (state.dailyMinutes / 30));

    container.innerHTML = `
      <div class="page-container page-container--narrow">
        <div style="text-align: center; margin-bottom: var(--space-8);">
          <span class="badge badge--primary" style="margin-bottom: var(--space-2);">Step 2 of 2</span>
          <h1 style="font-size: var(--text-3xl); font-weight: var(--font-bold); color: var(--color-neutral-900);">
            Design Your Learning Path
          </h1>
          <p style="color: var(--color-neutral-500); font-size: var(--text-base); margin-top: 4px;">
            Your current diagnosed level is <strong class="badge badge--${currentLevel.toLowerCase()}">${currentLevel}</strong>. Where would you like to go?
          </p>
        </div>

        <div class="card" style="padding: var(--space-6); margin-bottom: var(--space-6);">
          <!-- Target Level Selection -->
          <div style="margin-bottom: var(--space-6);">
            <label class="form-label" style="font-size: 15px; font-weight: 600; margin-bottom: 8px;">
              Select Target CEFR Level:
            </label>
            <div style="display: grid; grid-template-columns: repeat(6, 1fr); gap: 8px;">
              ${CONFIG.CEFR_LEVELS.map(lvl => {
                const isCurrent = lvl === currentLevel;
                const isSelected = lvl === state.targetLevel;
                const isLower = getCEFRNumeric(lvl) < currentNum;
                return `
                  <button type="button" class="btn ${isSelected ? 'btn--primary' : 'btn--outline'} level-btn" 
                          data-level="${lvl}" 
                          ${isLower ? 'disabled style="opacity: 0.4;"' : ''}
                          style="flex-direction: column; padding: 12px 4px; height: auto;">
                    <span style="font-size: 16px; font-weight: bold;">${lvl}</span>
                    <span style="font-size: 10px; margin-top: 2px;">${CONFIG.CEFR_NAMES[lvl].split(' ')[0]}</span>
                    ${isCurrent ? '<span style="font-size: 9px; color: var(--color-primary-600); font-weight: bold; margin-top: 2px;">(Current)</span>' : ''}
                  </button>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Daily Study Commitment -->
          <div style="margin-bottom: var(--space-6);">
            <label class="form-label" style="font-size: 15px; font-weight: 600; margin-bottom: 8px;">
              Daily Study Commitment:
            </label>
            <div class="grid-4">
              ${CONFIG.STUDY_TIME_OPTIONS.map(mins => `
                <button type="button" class="btn ${state.dailyMinutes === mins ? 'btn--primary' : 'btn--outline'} time-btn" data-time="${mins}">
                  ${mins} mins/day
                </button>
              `).join('')}
            </div>
          </div>

          <!-- Priority Skill -->
          <div style="margin-bottom: var(--space-6);">
            <label class="form-label" style="font-size: 15px; font-weight: 600; margin-bottom: 8px;">
              Primary Learning Focus:
            </label>
            <div class="grid-2">
              ${[
                { id: 'speaking', label: '🗣️ Speaking & Conversation', desc: 'Confidence, fluency, everyday social & work talk' },
                { id: 'writing', label: '✍️ Writing & Formal Style', desc: 'Emails, essays, reports, and clear syntax' },
                { id: 'reading', label: '📖 Academic & Business Reading', desc: 'Articles, research papers, professional texts' },
                { id: 'listening', label: '🎧 Listening & Pronunciation', desc: 'Accents, fast natural speech, lectures' }
              ].map(f => `
                <button type="button" class="card skill-focus-btn ${state.prioritySkill === f.id ? 'border-primary' : ''}" data-skill="${f.id}" style="padding: 12px; text-align: left; cursor: pointer; transition: all 0.2s; border: 2px solid ${state.prioritySkill === f.id ? 'var(--color-primary-500)' : 'var(--color-neutral-150)'}; background: ${state.prioritySkill === f.id ? 'var(--color-primary-50)' : 'var(--color-neutral-0)'};">
                  <div style="font-weight: 600; font-size: 14px;">${f.label}</div>
                  <div style="font-size: 12px; color: var(--color-neutral-500); margin-top: 2px;">${f.desc}</div>
                </button>
              `).join('')}
            </div>
          </div>

          <!-- Topics / Interests -->
          <div style="margin-bottom: var(--space-6);">
            <label class="form-label" style="font-size: 15px; font-weight: 600; margin-bottom: 8px;">
              Topics & Interests (Personalizes your lesson examples):
            </label>
            <div style="display: flex; flex-wrap: wrap; gap: 8px;">
              ${CONFIG.INTERESTS.map(topic => {
                const isChecked = state.selectedInterests.includes(topic);
                return `
                  <button type="button" class="btn btn--sm ${isChecked ? 'btn--primary' : 'btn--outline'} topic-btn" data-topic="${topic}">
                    ${isChecked ? '✓ ' : ''}${topic}
                  </button>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Explanation Language -->
          <div style="margin-bottom: var(--space-6);">
            <label class="form-label" style="font-size: 15px; font-weight: 600; margin-bottom: 8px;">
              Preferred Lesson Language:
            </label>
            <div class="grid-3">
              ${Object.entries(CONFIG.EXPLANATION_LANGUAGES).map(([key, label]) => `
                <button type="button" class="btn ${state.explanationLanguage === key ? 'btn--primary' : 'btn--outline'} lang-btn" data-lang="${key}">
                  ${label}
                </button>
              `).join('')}
            </div>
          </div>

          <!-- Estimated Roadmap Projection -->
          <div class="alert alert--info" style="margin-bottom: var(--space-6);">
            <div class="alert__title">Estimated Learning Roadmap</div>
            <div class="alert__desc">
              Progressing from <strong>${currentLevel}</strong> to <strong>${state.targetLevel}</strong> at <strong>${state.dailyMinutes} mins/day</strong> will take approximately <strong>${estimatedWeeks} weeks</strong> across <strong>${levelsDiff} stages</strong>.
              <div style="font-size: 11px; margin-top: 4px; color: var(--color-neutral-500);">*Estimate for planning purposes; rate of mastery depends on active practice and retention.</div>
            </div>
          </div>

          <button type="button" class="btn btn--primary btn--full btn--lg" id="generate-path-btn">
            Generate My Personalized Curriculum & Start Learning →
          </button>
        </div>
      </div>
    `;

    bindEvents();
  }

  function bindEvents() {
    container.querySelectorAll('.level-btn').forEach(btn => {
      btn.onclick = () => {
        state.targetLevel = btn.dataset.level;
        render();
      };
    });

    container.querySelectorAll('.time-btn').forEach(btn => {
      btn.onclick = () => {
        state.dailyMinutes = parseInt(btn.dataset.time, 10);
        render();
      };
    });

    container.querySelectorAll('.skill-focus-btn').forEach(btn => {
      btn.onclick = () => {
        state.prioritySkill = btn.dataset.skill;
        render();
      };
    });

    container.querySelectorAll('.topic-btn').forEach(btn => {
      btn.onclick = () => {
        const t = btn.dataset.topic;
        if (state.selectedInterests.includes(t)) {
          state.selectedInterests = state.selectedInterests.filter(x => x !== t);
        } else {
          state.selectedInterests.push(t);
        }
        render();
      };
    });

    container.querySelectorAll('.lang-btn').forEach(btn => {
      btn.onclick = () => {
        state.explanationLanguage = btn.dataset.lang;
        render();
      };
    });

    const submitBtn = document.getElementById('generate-path-btn');
    if (submitBtn) {
      submitBtn.onclick = () => {
        // Save goal
        Store.setGoal({
          currentLevel,
          targetLevel: state.targetLevel,
          dailyMinutes: state.dailyMinutes,
          preferredDays: state.preferredDays,
          prioritySkill: state.prioritySkill,
          interests: state.selectedInterests,
          explanationLanguage: state.explanationLanguage,
          createdAt: Date.now()
        });

        // Update profile
        const profile = Store.getProfile();
        profile.targetLevel = state.targetLevel;
        profile.studyTimePerDay = state.dailyMinutes;
        profile.interests = state.selectedInterests;
        profile.explanationLanguage = state.explanationLanguage;
        Store.setProfile(profile);

        // Generate curriculum
        CurriculumService.generate(currentLevel, state.targetLevel, state.selectedInterests, state.dailyMinutes);

        Toast.success('Personalized curriculum generated! Welcome to your learning path.');
        Router.navigate('/dashboard');
      };
    }
  }

  render();
}
