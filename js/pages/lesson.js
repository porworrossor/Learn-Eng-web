// ========================================
// LingoPath Interactive Lesson Player
// ========================================

import { CurriculumService } from '../services/curriculum.js';
import { Store } from '../store.js';
import { SpeechService } from '../services/speech.js';
import { Toast } from '../components/toast.js';
import { Router } from '../router.js';

export function renderLesson(container, params = {}) {
  const lessonId = params.id || Router.getParams()[1] || 'a2-greetings';
  const lesson = CurriculumService.getLessonById(lessonId);

  let state = {
    step: 'explanation', // 'explanation' | 'activities' | 'summary'
    activityIdx: 0,
    answers: {},
    scores: {},
    feedbacks: {}
  };

  function render() {
    if (state.step === 'explanation') {
      renderExplanation();
    } else if (state.step === 'activities') {
      renderActivity();
    } else if (state.step === 'summary') {
      renderSummary();
    }
  }

  function renderExplanation() {
    const isCompleted = (Store.getProgress().completedLessons || []).includes(lesson.id);

    container.innerHTML = `
      <div class="page-container page-container--narrow">
        <div class="page-header__breadcrumb">
          <a href="#/curriculum">Curriculum</a> <span>/</span> <span>${lesson.title}</span>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
          <span class="badge badge--${lesson.level.toLowerCase()}">${lesson.level} Level &bull; ${lesson.skill || 'English'}</span>
          <span style="font-size: 13px; color: var(--color-neutral-500);">⏱️ ${lesson.duration || 15} minutes</span>
        </div>

        <h1 class="page-header__title" style="margin-bottom: var(--space-4);">${lesson.title}</h1>

        <!-- Objectives -->
        <div class="card" style="padding: var(--space-5); margin-bottom: var(--space-6); background: var(--color-neutral-50);">
          <h4 style="font-size: 14px; font-weight: bold; margin-bottom: var(--space-2); color: var(--color-neutral-800);">
            🎯 Learning Objectives:
          </h4>
          <ul style="padding-left: 20px; font-size: 14px; color: var(--color-neutral-600); line-height: 1.6;">
            ${(lesson.objectives || []).map(obj => `<li>${obj}</li>`).join('')}
          </ul>
        </div>

        <!-- Concept Explanation -->
        <div class="card" style="padding: var(--space-6); margin-bottom: var(--space-6); line-height: 1.7;">
          ${lesson.content?.explanation || '<p>Review and practice key structures.</p>'}

          ${lesson.content?.examples ? `
            <div style="margin-top: var(--space-6); border-top: 1px solid var(--color-neutral-150); padding-top: var(--space-5);">
              <h4 style="font-size: 15px; font-weight: bold; margin-bottom: var(--space-3);">Examples in Context:</h4>
              <div style="display: flex; flex-direction: column; gap: var(--space-4);">
                ${lesson.content.examples.map((ex, i) => `
                  <div style="padding: var(--space-4); background: var(--color-neutral-50); border-radius: var(--radius-lg); border-left: 3px solid var(--color-primary-400);">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                      <strong style="font-size: 13px; color: var(--color-neutral-700);">${ex.situation || 'Dialogue'}</strong>
                      <button class="btn btn--ghost btn--sm play-ex-btn" data-text="${encodeURIComponent(ex.dialog)}">
                        🔊 Listen
                      </button>
                    </div>
                    <div style="font-size: 14px; color: var(--color-neutral-800); white-space: pre-line;">${ex.dialog}</div>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center;">
          <a href="#/curriculum" class="btn btn--ghost">← Back to Curriculum</a>
          <button class="btn btn--primary btn--lg" id="start-practice-btn">
            Start Practice Exercises (${lesson.activities?.length || 2}) →
          </button>
        </div>
      </div>
    `;

    // Listen audio buttons
    container.querySelectorAll('.play-ex-btn').forEach(btn => {
      btn.onclick = () => {
        const text = decodeURIComponent(btn.dataset.text);
        SpeechService.speak(text);
      };
    });

    const startBtn = document.getElementById('start-practice-btn');
    if (startBtn) {
      startBtn.onclick = () => {
        state.step = 'activities';
        state.activityIdx = 0;
        render();
      };
    }
  }

  function renderActivity() {
    const activities = lesson.activities || [];
    const act = activities[state.activityIdx];
    const isAnswered = state.feedbacks[act.id] !== undefined;
    const feedback = state.feedbacks[act.id];

    container.innerHTML = `
      <div class="page-container page-container--narrow">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
          <span style="font-size: 13px; color: var(--color-neutral-500);">Exercise ${state.activityIdx + 1} of ${activities.length}</span>
          <span class="badge badge--neutral">${act.type}</span>
        </div>

        <div class="progress" style="margin-bottom: var(--space-6);">
          <div class="progress__bar" style="width: ${((state.activityIdx) / activities.length) * 100}%;"></div>
        </div>

        <div class="question-card">
          <h3 class="question-card__text">${act.question}</h3>

          ${act.type === 'multiple-choice' ? `
            <div class="question-card__options">
              ${act.options.map((opt, idx) => {
                const isSelected = state.answers[act.id] === idx;
                let btnClass = 'btn--outline';
                if (isAnswered) {
                  if (idx === act.correct) btnClass = 'btn--success';
                  else if (isSelected) btnClass = 'btn--error';
                } else if (isSelected) {
                  btnClass = 'btn--primary';
                }
                return `
                  <button class="btn ${btnClass} act-opt-btn" data-idx="${idx}" ${isAnswered ? 'disabled' : ''} style="text-align: left; justify-content: flex-start; padding: 12px 16px;">
                    <span style="font-weight: bold; margin-right: 8px;">${String.fromCharCode(65 + idx)}.</span>
                    <span>${opt}</span>
                  </button>
                `;
              }).join('')}
            </div>
          ` : `
            <div style="margin-bottom: var(--space-4);">
              <input type="text" id="blank-input" class="form-input" style="width: 100%; max-width: 300px;" placeholder="Type your answer here..." ${isAnswered ? 'disabled' : ''} value="${state.answers[act.id] || ''}" />
            </div>
          `}

          ${isAnswered ? `
            <div class="question-card__feedback ${feedback.correct ? 'question-card__feedback--correct' : 'question-card__feedback--incorrect'} animate-fade-in">
              <div style="font-weight: bold; margin-bottom: 4px;">
                ${feedback.correct ? '✓ Excellent work!' : '✗ Not quite correct'}
              </div>
              <div>${act.explanation}</div>
            </div>
          ` : ''}

          <div class="question-card__actions">
            ${!isAnswered ? `
              <button class="btn btn--primary btn--full" id="check-answer-btn">
                Check Answer
              </button>
            ` : `
              <button class="btn btn--primary btn--full" id="next-activity-btn">
                ${state.activityIdx < activities.length - 1 ? 'Next Exercise →' : 'Complete Lesson & View Summary →'}
              </button>
            `}
          </div>
        </div>
      </div>
    `;

    bindActivityEvents(act);
  }

  function bindActivityEvents(act) {
    if (act.type === 'multiple-choice') {
      container.querySelectorAll('.act-opt-btn').forEach(btn => {
        btn.onclick = () => {
          state.answers[act.id] = parseInt(btn.dataset.idx, 10);
          render();
        };
      });
    } else {
      const input = document.getElementById('blank-input');
      if (input) {
        input.oninput = () => {
          state.answers[act.id] = input.value.trim();
        };
      }
    }

    const checkBtn = document.getElementById('check-answer-btn');
    if (checkBtn) {
      checkBtn.onclick = () => {
        let isCorrect = false;
        if (act.type === 'multiple-choice') {
          if (state.answers[act.id] === undefined) {
            Toast.warning('Please select an option first.');
            return;
          }
          isCorrect = state.answers[act.id] === act.correct;
        } else {
          const val = (state.answers[act.id] || '').toLowerCase().trim();
          if (!val) {
            Toast.warning('Please enter an answer.');
            return;
          }
          const validBlanks = (act.blanks || []).map(b => b.toLowerCase().trim());
          isCorrect = validBlanks.includes(val);
        }

        state.feedbacks[act.id] = { correct: isCorrect };
        state.scores[act.id] = isCorrect ? 1 : 0;
        render();
      };
    }

    const nextBtn = document.getElementById('next-activity-btn');
    if (nextBtn) {
      nextBtn.onclick = () => {
        const activities = lesson.activities || [];
        if (state.activityIdx < activities.length - 1) {
          state.activityIdx++;
          render();
        } else {
          finishLesson();
        }
      };
    }
  }

  function finishLesson() {
    const activities = lesson.activities || [];
    const total = activities.length;
    const earned = Object.values(state.scores).reduce((sum, s) => sum + s, 0);
    const scorePct = total > 0 ? Math.round((earned / total) * 100) : 100;

    Store.markLessonComplete(lesson.id, scorePct);

    // Add study minutes
    const progress = Store.getProgress();
    progress.totalStudyMinutes = (progress.totalStudyMinutes || 0) + (lesson.duration || 15);
    Store.setProgress(progress);

    state.step = 'summary';
    render();
  }

  function renderSummary() {
    const activities = lesson.activities || [];
    const earned = Object.values(state.scores).reduce((sum, s) => sum + s, 0);
    const scorePct = activities.length > 0 ? Math.round((earned / activities.length) * 100) : 100;

    container.innerHTML = `
      <div class="page-container page-container--narrow">
        <div style="text-align: center; padding: var(--space-8) 0;">
          <div style="font-size: 56px; margin-bottom: var(--space-3);">🎉</div>
          <h1 style="font-size: var(--text-3xl); font-weight: var(--font-bold); color: var(--color-neutral-900); margin-bottom: var(--space-2);">
            Lesson Completed!
          </h1>
          <p style="color: var(--color-neutral-500); font-size: var(--text-base); margin-bottom: var(--space-6);">
            You have mastered: <strong>${lesson.title}</strong>
          </p>

          <div class="card" style="padding: var(--space-6); max-width: 420px; margin: 0 auto var(--space-8); text-align: left;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-3);">
              <span style="font-weight: 600;">Exercise Accuracy:</span>
              <span class="badge ${scorePct >= 70 ? 'badge--success' : 'badge--warning'}" style="font-size: 16px;">
                ${scorePct}% (${earned}/${activities.length})
              </span>
            </div>
            <div class="progress" style="margin-bottom: var(--space-4);">
              <div class="progress__bar" style="width: ${scorePct}%;"></div>
            </div>
            <div style="font-size: 13px; color: var(--color-neutral-600); line-height: 1.6;">
              ✓ Time recorded: <strong>+${lesson.duration || 15} minutes</strong><br>
              ✓ Streak maintained: <strong>${Store.getProgress().streakDays} days</strong><br>
              ✓ Progress saved to your learning path.
            </div>
          </div>

          <div style="display: flex; gap: var(--space-4); justify-content: center;">
            <a href="#/curriculum" class="btn btn--outline btn--lg">
              View Learning Path
            </a>
            <a href="#/dashboard" class="btn btn--primary btn--lg">
              Return to Dashboard →
            </a>
          </div>
        </div>
      </div>
    `;
  }

  render();
}
