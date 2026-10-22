// ========================================
// LingoPath Placement Test Page
// ========================================

import { PLACEMENT_SECTIONS, PLACEMENT_QUESTIONS } from '../data/placement-questions.js';
import { scorePlacementTest } from '../services/assessment.js';
import { SpeechService } from '../services/speech.js';
import { Store } from '../store.js';
import { Router } from '../router.js';
import { Toast } from '../components/toast.js';

export function renderPlacement(container) {
  let state = {
    phase: 'intro', // 'intro' | 'testing' | 'results'
    currentSectionIdx: 0,
    currentQuestionIdx: 0,
    answers: {
      grammar: {},
      reading: {},
      listening: {},
      writing: []
    },
    speakingText: '',
    speakingMode: 'mic', // 'mic' | 'type'
    isRecording: false,
    results: null
  };

  // Restore saved partial assessment if exists
  const savedState = Store.get('placement_temp');
  if (savedState && savedState.answers) {
    state.answers = savedState.answers;
  }

  function saveTemp() {
    Store.set('placement_temp', { answers: state.answers, currentSectionIdx: state.currentSectionIdx });
  }

  function render() {
    if (state.phase === 'intro') {
      renderIntro();
    } else if (state.phase === 'testing') {
      renderTesting();
    } else if (state.phase === 'results') {
      renderResults();
    }
  }

  function renderIntro() {
    container.innerHTML = `
      <div class="page-container page-container--narrow">
        <div class="placement-section-intro">
          <div class="placement-section-intro__icon">🎯</div>
          <h1 class="placement-section-intro__title">Adaptive CEFR Placement Assessment</h1>
          <p class="placement-section-intro__desc">
            Find out your true English proficiency across Reading, Listening, Writing, and Speaking according to the Common European Framework of Reference (CEFR A1–C2).
          </p>

          <div class="card" style="text-align: left; margin-bottom: var(--space-6); padding: var(--space-6);">
            <h3 style="font-size: var(--text-base); font-weight: var(--font-bold); margin-bottom: var(--space-3);">Assessment Structure:</h3>
            <div style="display: flex; flex-direction: column; gap: var(--space-3);">
              <div style="display: flex; gap: var(--space-3); align-items: center;">
                <span style="font-size: 20px;">📝</span>
                <div>
                  <strong>Grammar & Vocabulary:</strong> Multiple choice & error identification (A1 to C2)
                </div>
              </div>
              <div style="display: flex; gap: var(--space-3); align-items: center;">
                <span style="font-size: 20px;">📖</span>
                <div>
                  <strong>Reading Comprehension:</strong> Short passages and analytical questions
                </div>
              </div>
              <div style="display: flex; gap: var(--space-3); align-items: center;">
                <span style="font-size: 20px;">🎧</span>
                <div>
                  <strong>Listening:</strong> Audio clips with spoken English comprehension
                </div>
              </div>
              <div style="display: flex; gap: var(--space-3); align-items: center;">
                <span style="font-size: 20px;">✍️</span>
                <div>
                  <strong>Writing & Speaking:</strong> Short expression prompt with rubric-based evaluation
                </div>
              </div>
            </div>
          </div>

          <div class="alert alert--info" style="margin-bottom: var(--space-6); text-align: left;">
            <div class="alert__title">Transparent Assessment Notice</div>
            <div class="alert__desc">
              This assessment provides an <em>estimated proficiency</em> for personalized curriculum planning. It is not an official CEFR certificate.
            </div>
          </div>

          <button class="btn btn--primary btn--lg" id="start-test-btn" style="min-width: 220px;">
            Begin Assessment →
          </button>
        </div>
      </div>
    `;

    document.getElementById('start-test-btn').onclick = () => {
      state.phase = 'testing';
      state.currentSectionIdx = 0;
      state.currentQuestionIdx = 0;
      render();
    };
  }

  function renderTesting() {
    const section = PLACEMENT_SECTIONS[state.currentSectionIdx];
    const sectionKey = section.id;
    const questions = PLACEMENT_QUESTIONS[sectionKey] || [];
    const currentQ = questions[state.currentQuestionIdx];

    // Compute overall progress
    const totalQuestions = 
      PLACEMENT_QUESTIONS.grammar.length + 
      PLACEMENT_QUESTIONS.reading.reduce((s, r) => s + r.questions.length, 0) + 
      PLACEMENT_QUESTIONS.listening.reduce((s, l) => s + l.questions.length, 0) + 
      PLACEMENT_QUESTIONS.writing.length;

    let answeredCount = 0;
    answeredCount += Object.keys(state.answers.grammar || {}).length;
    answeredCount += Object.keys(state.answers.reading || {}).length;
    answeredCount += Object.keys(state.answers.listening || {}).length;
    answeredCount += (state.answers.writing || []).filter(Boolean).length;

    const progressPct = Math.round((answeredCount / totalQuestions) * 100);

    container.innerHTML = `
      <div class="page-container page-container--narrow">
        <div class="placement-progress">
          <div class="progress" style="flex: 1;">
            <div class="progress__bar" style="width: ${progressPct}%;"></div>
          </div>
          <div class="placement-progress__info">
            Section ${state.currentSectionIdx + 1} of ${PLACEMENT_SECTIONS.length} (${section.name})
          </div>
        </div>

        <div class="question-card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-3);">
            <span class="question-card__type">${section.name} &bull; ${currentQ.difficulty || 'Level Test'}</span>
            <span class="badge badge--neutral">Q ${state.currentQuestionIdx + 1} of ${questions.length}</span>
          </div>

          ${renderQuestionBody(sectionKey, currentQ)}

          <div class="question-card__actions">
            <button class="btn btn--ghost" id="prev-btn" ${state.currentSectionIdx === 0 && state.currentQuestionIdx === 0 ? 'disabled' : ''}>
              ← Previous
            </button>
            <button class="btn btn--primary" id="next-btn">
              ${isLastQuestion() ? 'Finish & View Diagnostic Report' : 'Next Question →'}
            </button>
          </div>
        </div>
      </div>
    `;

    bindQuestionEvents(sectionKey, currentQ);
  }

  function renderQuestionBody(sectionKey, q) {
    if (sectionKey === 'grammar') {
      const selected = state.answers.grammar[q.id];
      return `
        <h3 class="question-card__text">${q.question}</h3>
        <div class="question-card__options">
          ${q.options.map((opt, idx) => `
            <button class="btn btn--outline option-btn ${selected === idx ? 'btn--primary' : ''}" data-idx="${idx}" style="text-align: left; justify-content: flex-start; padding: 12px 16px;">
              <span style="font-weight: bold; margin-right: 8px;">${String.fromCharCode(65 + idx)}.</span>
              <span>${opt}</span>
            </button>
          `).join('')}
        </div>
      `;
    }

    if (sectionKey === 'reading') {
      return `
        <div class="question-card__passage">
          <div style="font-weight: bold; margin-bottom: 8px;">📄 Reading Passage:</div>
          ${q.passage.replace(/\n/g, '<br><br>')}
        </div>
        <div style="display: flex; flex-direction: column; gap: var(--space-6);">
          ${q.questions.map((sq, sqIdx) => {
            const answerKey = q.id + '_' + sqIdx;
            const selected = state.answers.reading[answerKey];
            return `
              <div style="border-top: 1px solid var(--color-neutral-150); padding-top: var(--space-4);">
                <div style="font-weight: 600; margin-bottom: var(--space-3); color: var(--color-neutral-900);">
                  ${sqIdx + 1}. ${sq.question}
                </div>
                <div class="question-card__options">
                  ${sq.options.map((opt, optIdx) => `
                    <button class="btn btn--outline reading-opt-btn ${selected === optIdx ? 'btn--primary' : ''}" data-sub="${sqIdx}" data-idx="${optIdx}" style="text-align: left; justify-content: flex-start; padding: 10px 14px;">
                      <span style="font-weight: bold; margin-right: 8px;">${String.fromCharCode(65 + optIdx)}.</span>
                      <span>${opt}</span>
                    </button>
                  `).join('')}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `;
    }

    if (sectionKey === 'listening') {
      return `
        <div class="card" style="padding: var(--space-5); margin-bottom: var(--space-6); background: var(--color-neutral-50);">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-3);">
            <div style="display: flex; align-items: center; gap: var(--space-2);">
              <span style="font-size: 24px;">🎧</span>
              <strong>Audio Listening Track</strong>
            </div>
            <button class="btn btn--secondary btn--sm" id="play-audio-btn">
              🔊 Play Audio Aloud
            </button>
          </div>
          <div style="font-size: 13px; color: var(--color-neutral-500); margin-bottom: var(--space-3);">
            Listen to the English speaker. You may also read the audio transcript below:
          </div>
          <details style="background: var(--color-neutral-0); padding: var(--space-3); border-radius: var(--radius-md); border: 1px solid var(--color-neutral-150);">
            <summary style="cursor: pointer; font-size: 13px; color: var(--color-primary-600); font-weight: 500;">
              Show / Hide Audio Transcript
            </summary>
            <div style="margin-top: var(--space-3); font-size: 14px; line-height: 1.6; color: var(--color-neutral-700);">
              ${q.transcript.replace(/\n/g, '<br>')}
            </div>
          </details>
        </div>

        <div style="display: flex; flex-direction: column; gap: var(--space-6);">
          ${q.questions.map((sq, sqIdx) => {
            const answerKey = q.id + '_' + sqIdx;
            const selected = state.answers.listening[answerKey];
            return `
              <div style="border-top: 1px solid var(--color-neutral-150); padding-top: var(--space-4);">
                <div style="font-weight: 600; margin-bottom: var(--space-3); color: var(--color-neutral-900);">
                  ${sqIdx + 1}. ${sq.question}
                </div>
                <div class="question-card__options">
                  ${sq.options.map((opt, optIdx) => `
                    <button class="btn btn--outline listening-opt-btn ${selected === optIdx ? 'btn--primary' : ''}" data-sub="${sqIdx}" data-idx="${optIdx}" style="text-align: left; justify-content: flex-start; padding: 10px 14px;">
                      <span style="font-weight: bold; margin-right: 8px;">${String.fromCharCode(65 + optIdx)}.</span>
                      <span>${opt}</span>
                    </button>
                  `).join('')}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `;
    }

    if (sectionKey === 'writing') {
      const currentWriting = state.answers.writing[state.currentQuestionIdx] || '';
      const words = currentWriting.trim() ? currentWriting.trim().split(/\s+/).length : 0;
      return `
        <h3 class="question-card__text">${q.prompt}</h3>
        <div style="margin-bottom: var(--space-3); font-size: 13px; color: var(--color-neutral-500);">
          Recommended length: <strong>${q.minWords}–${q.maxWords} words</strong> (Current: <span id="word-count-badge">${words}</span> words)
        </div>
        <textarea id="writing-input" class="form-input" style="width: 100%; height: 160px; line-height: 1.6; font-family: var(--font-sans);" placeholder="Write your response in English here...">${currentWriting}</textarea>
        
        <div style="margin-top: var(--space-4); padding: var(--space-3); background: var(--color-neutral-50); border-radius: var(--radius-md); font-size: 12px; color: var(--color-neutral-500);">
          <strong>Grading Criteria:</strong> Task relevance, grammar accuracy, sentence variety, and cohesive transitions.
        </div>
      `;
    }
  }

  function bindQuestionEvents(sectionKey, q) {
    if (sectionKey === 'grammar') {
      const buttons = container.querySelectorAll('.option-btn');
      buttons.forEach(btn => {
        btn.onclick = () => {
          const idx = parseInt(btn.dataset.idx, 10);
          state.answers.grammar[q.id] = idx;
          saveTemp();
          render();
        };
      });
    }

    if (sectionKey === 'reading') {
      const buttons = container.querySelectorAll('.reading-opt-btn');
      buttons.forEach(btn => {
        btn.onclick = () => {
          const subIdx = btn.dataset.sub;
          const optIdx = parseInt(btn.dataset.idx, 10);
          state.answers.reading[q.id + '_' + subIdx] = optIdx;
          saveTemp();
          render();
        };
      });
    }

    if (sectionKey === 'listening') {
      const playBtn = document.getElementById('play-audio-btn');
      if (playBtn) {
        playBtn.onclick = () => {
          SpeechService.speak(q.transcript);
          Toast.info('Playing listening audio track...');
        };
      }

      const buttons = container.querySelectorAll('.listening-opt-btn');
      buttons.forEach(btn => {
        btn.onclick = () => {
          const subIdx = btn.dataset.sub;
          const optIdx = parseInt(btn.dataset.idx, 10);
          state.answers.listening[q.id + '_' + subIdx] = optIdx;
          saveTemp();
          render();
        };
      });
    }

    if (sectionKey === 'writing') {
      const textarea = document.getElementById('writing-input');
      if (textarea) {
        textarea.oninput = () => {
          state.answers.writing[state.currentQuestionIdx] = textarea.value;
          const wc = textarea.value.trim() ? textarea.value.trim().split(/\s+/).length : 0;
          const badge = document.getElementById('word-count-badge');
          if (badge) badge.textContent = wc;
          saveTemp();
        };
      }
    }

    // Navigation buttons
    const prevBtn = document.getElementById('prev-btn');
    if (prevBtn) {
      prevBtn.onclick = () => {
        if (state.currentQuestionIdx > 0) {
          state.currentQuestionIdx--;
        } else if (state.currentSectionIdx > 0) {
          state.currentSectionIdx--;
          const prevSection = PLACEMENT_SECTIONS[state.currentSectionIdx].id;
          state.currentQuestionIdx = (PLACEMENT_QUESTIONS[prevSection] || []).length - 1;
        }
        render();
      };
    }

    const nextBtn = document.getElementById('next-btn');
    if (nextBtn) {
      nextBtn.onclick = () => {
        SpeechService.stopSpeaking();
        if (isLastQuestion()) {
          finishTest();
        } else {
          const currentSection = PLACEMENT_SECTIONS[state.currentSectionIdx].id;
          const questions = PLACEMENT_QUESTIONS[currentSection] || [];
          if (state.currentQuestionIdx < questions.length - 1) {
            state.currentQuestionIdx++;
          } else if (state.currentSectionIdx < PLACEMENT_SECTIONS.length - 1) {
            state.currentSectionIdx++;
            state.currentQuestionIdx = 0;
          }
          render();
        }
      };
    }
  }

  function isLastQuestion() {
    const isLastSec = state.currentSectionIdx === PLACEMENT_SECTIONS.length - 1;
    const currentSection = PLACEMENT_SECTIONS[state.currentSectionIdx].id;
    const questions = PLACEMENT_QUESTIONS[currentSection] || [];
    const isLastQ = state.currentQuestionIdx === questions.length - 1;
    return isLastSec && isLastQ;
  }

  function finishTest() {
    const results = scorePlacementTest(state.answers, PLACEMENT_QUESTIONS);
    state.results = results;
    state.phase = 'results';
    Store.setPlacement(results);
    Store.remove('placement_temp');

    // Also update profile current level
    const profile = Store.getProfile();
    profile.currentLevel = results.overall.level;
    Store.setProfile(profile);

    Toast.success('Assessment complete! Diagnostic report generated.');
    render();
  }

  function renderResults() {
    const r = state.results || Store.getPlacement();
    if (!r) {
      state.phase = 'intro';
      render();
      return;
    }

    const overall = r.overall;
    const skills = r.skills || {};

    container.innerHTML = `
      <div class="page-container page-container--narrow">
        <div style="text-align: center; margin-bottom: var(--space-8);">
          <div class="badge badge--${overall.level.toLowerCase()}" style="font-size: 20px; padding: 8px 24px; margin-bottom: var(--space-3);">
            Estimated CEFR: ${overall.level} (${overall.levelName})
          </div>
          <h1 style="font-size: var(--text-3xl); font-weight: var(--font-bold); color: var(--color-neutral-900);">
            Your Diagnostic English Profile
          </h1>
          <p style="color: var(--color-neutral-500); font-size: var(--text-base); max-width: 500px; margin: 8px auto 0;">
            Based on your multi-skill responses across grammar, reading, listening, and written tasks.
          </p>
        </div>

        <!-- Skill Level Breakdown Cards -->
        <div class="card" style="padding: var(--space-6); margin-bottom: var(--space-6);">
          <h3 style="font-size: var(--text-lg); font-weight: var(--font-bold); margin-bottom: var(--space-4);">
            Individual Skill Proficiency
          </h3>
          <div style="display: flex; flex-direction: column; gap: var(--space-4);">
            ${Object.entries(skills).map(([skill, data]) => `
              <div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-1);">
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <span style="font-weight: 600; text-transform: capitalize;">${skill}</span>
                    ${data.estimated ? '<span style="font-size: 11px; color: var(--color-neutral-400);">(Estimated)</span>' : ''}
                  </div>
                  <span class="badge badge--${data.level.toLowerCase()}">${data.level} - ${data.levelName}</span>
                </div>
                <div class="progress">
                  <div class="progress__bar" style="width: ${(data.numeric / 6) * 100}%;"></div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Strengths & Areas to Improve -->
        <div class="grid-2" style="margin-bottom: var(--space-6);">
          <div class="card" style="padding: var(--space-5); border-left: 4px solid var(--color-success);">
            <h4 style="font-weight: bold; margin-bottom: var(--space-2); color: var(--color-success);">
              ✓ Strongest Competencies
            </h4>
            <ul style="padding-left: 20px; font-size: 14px; color: var(--color-neutral-700); line-height: 1.6;">
              ${(r.strengths || []).map(s => `<li>${s.name} (${s.level})</li>`).join('') || '<li>Balanced foundational skills</li>'}
            </ul>
          </div>
          <div class="card" style="padding: var(--space-5); border-left: 4px solid var(--color-warning);">
            <h4 style="font-weight: bold; margin-bottom: var(--space-2); color: var(--color-warning);">
              ⚡ Recommended Focus Areas
            </h4>
            <ul style="padding-left: 20px; font-size: 14px; color: var(--color-neutral-700); line-height: 1.6;">
              ${(r.weaknesses || []).map(w => `<li>${w.name} (${w.level})</li>`).join('') || '<li>Refine idiomatic expressions</li>'}
            </ul>
          </div>
        </div>

        <!-- Recommendations -->
        <div class="card" style="padding: var(--space-5); margin-bottom: var(--space-8);">
          <h4 style="font-weight: bold; margin-bottom: var(--space-2);">Next Steps</h4>
          <p style="font-size: 14px; color: var(--color-neutral-600); margin-bottom: var(--space-4);">
            We will now build a personalized curriculum that targets your current weaknesses while reinforcing your strengths.
          </p>
          <a href="#/goal-selection" class="btn btn--primary btn--full btn--lg">
            Set Target Level & Build My Curriculum →
          </a>
        </div>
      </div>
    `;
  }

  render();
}
