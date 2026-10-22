// ========================================
// LingoPath Vocabulary Notebook & Spaced Review
// ========================================

import { Store } from '../store.js';
import { VOCABULARY_BANK } from '../data/vocabulary-bank.js';
import { SpeechService } from '../services/speech.js';
import { Modal } from '../components/modal.js';
import { Toast } from '../components/toast.js';

export function renderVocabulary(container) {
  // If user notebook is empty, preload initial starter words from bank
  let items = Store.getVocabulary();
  if (items.length === 0) {
    VOCABULARY_BANK.slice(0, 6).forEach(v => Store.addVocabularyItem(v));
    items = Store.getVocabulary();
  }

  let state = {
    view: 'list', // 'list' | 'review'
    filter: 'all', // 'all' | 'due' | 'learning' | 'mastered'
    searchQuery: '',
    reviewQueue: [],
    reviewIndex: 0,
    showAnswer: false
  };

  function render() {
    if (state.view === 'review') {
      renderReview();
    } else {
      renderList();
    }
  }

  function renderList() {
    const all = Store.getVocabulary();
    const due = Store.getDueVocabulary();

    let filtered = all.filter(v => {
      if (state.filter === 'due') return v.nextReview <= Date.now();
      if (state.filter === 'mastered') return v.status === 'mastered';
      if (state.filter === 'learning') return v.status === 'learning';
      return true;
    });

    if (state.searchQuery) {
      const q = state.searchQuery.toLowerCase();
      filtered = filtered.filter(v => 
        v.word.toLowerCase().includes(q) || 
        (v.meaning && v.meaning.toLowerCase().includes(q)) ||
        (v.meaningTh && v.meaningTh.toLowerCase().includes(q))
      );
    }

    container.innerHTML = `
      <div class="page-container page-container--wide">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: var(--space-6);">
          <div>
            <div class="page-header__breadcrumb">
              <a href="#/dashboard">Dashboard</a> <span>/</span> <span>Vocabulary</span>
            </div>
            <h1 class="page-header__title">Smart Vocabulary Notebook</h1>
            <p class="page-header__subtitle">
              ${all.length} saved words &bull; ${due.length} words due for spaced repetition review
            </p>
          </div>

          <div style="display: flex; gap: var(--space-3);">
            <button class="btn btn--outline" id="add-word-btn">
              + Add Word
            </button>
            <button class="btn btn--primary" id="start-review-btn" ${due.length === 0 ? 'disabled' : ''}>
              ⚡ Review Due Cards (${due.length})
            </button>
          </div>
        </div>

        <!-- Filter & Search Bar -->
        <div style="display: flex; gap: var(--space-4); margin-bottom: var(--space-6); flex-wrap: wrap;">
          <input type="text" id="vocab-search-input" class="form-input" style="max-width: 300px;" placeholder="Search words or meanings..." value="${state.searchQuery}" />

          <div style="display: flex; gap: var(--space-2);">
            <button class="btn btn--sm ${state.filter === 'all' ? 'btn--primary' : 'btn--outline'} filter-btn" data-filter="all">All (${all.length})</button>
            <button class="btn btn--sm ${state.filter === 'due' ? 'btn--primary' : 'btn--outline'} filter-btn" data-filter="due">Due Review (${due.length})</button>
            <button class="btn btn--sm ${state.filter === 'learning' ? 'btn--primary' : 'btn--outline'} filter-btn" data-filter="learning">Learning</button>
            <button class="btn btn--sm ${state.filter === 'mastered' ? 'btn--primary' : 'btn--outline'} filter-btn" data-filter="mastered">Mastered</button>
          </div>
        </div>

        <!-- Cards Grid -->
        <div class="grid-auto">
          ${filtered.length > 0 ? filtered.map(item => `
            <div class="vocab-card">
              <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                <div>
                  <h3 class="vocab-card__word">${item.word}</h3>
                  <div style="display: flex; align-items: center; gap: 6px;">
                    <span style="font-size: 12px; color: var(--color-neutral-400);">${item.phonetic || ''}</span>
                    <span class="vocab-card__pos">${item.partOfSpeech || 'word'}</span>
                  </div>
                </div>
                <div style="display: flex; align-items: center; gap: 6px;">
                  <button class="btn btn--ghost btn--sm play-audio-btn" data-word="${item.word}" title="Listen pronunciation">🔊</button>
                  <span class="badge badge--${(item.cefr || 'a2').toLowerCase()}">${item.cefr || 'A2'}</span>
                </div>
              </div>

              <div class="vocab-card__meaning" style="margin-top: 10px;">
                ${item.meaning}
              </div>

              ${item.meaningTh ? `
                <div style="font-size: 13px; color: var(--color-primary-700); margin-bottom: 8px;">
                  🇹🇭 ${item.meaningTh}
                </div>
              ` : ''}

              ${item.example ? `
                <div class="vocab-card__example">
                  "${item.example}"
                </div>
              ` : ''}

              <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 14px; font-size: 11px; color: var(--color-neutral-400); border-top: 1px solid var(--color-neutral-150); padding-top: 8px;">
                <span>Status: <strong style="text-transform: capitalize; color: var(--color-neutral-600);">${item.status}</strong></span>
                <span>Reviewed: ${item.reviewCount || 0} times</span>
              </div>
            </div>
          `).join('') : `
            <div class="empty-state" style="grid-column: 1 / -1;">
              <div class="empty-state__icon">📚</div>
              <h3 class="empty-state__title">No vocabulary found</h3>
              <p class="empty-state__text">Try adjusting your search query or add a new word to your notebook.</p>
            </div>
          `}
        </div>
      </div>
    `;

    bindListEvents();
  }

  function bindListEvents() {
    container.querySelectorAll('.play-audio-btn').forEach(btn => {
      btn.onclick = () => SpeechService.speak(btn.dataset.word);
    });

    container.querySelectorAll('.filter-btn').forEach(btn => {
      btn.onclick = () => {
        state.filter = btn.dataset.filter;
        render();
      };
    });

    const search = document.getElementById('vocab-search-input');
    if (search) {
      search.oninput = () => {
        state.searchQuery = search.value;
        render();
      };
    }

    const addBtn = document.getElementById('add-word-btn');
    if (addBtn) {
      addBtn.onclick = () => {
        Modal.open({
          title: 'Add New Word to Notebook',
          content: `
            <div style="display: flex; flex-direction: column; gap: var(--space-3);">
              <div>
                <label class="form-label">Word or Phrase</label>
                <input class="form-input" id="new-word" placeholder="e.g. Articulate" />
              </div>
              <div class="grid-2">
                <div>
                  <label class="form-label">Part of Speech</label>
                  <input class="form-input" id="new-pos" placeholder="verb, noun, adj..." />
                </div>
                <div>
                  <label class="form-label">CEFR Level</label>
                  <select class="form-input" id="new-cefr">
                    <option value="A1">A1</option>
                    <option value="A2">A2</option>
                    <option value="B1" selected>B1</option>
                    <option value="B2">B2</option>
                    <option value="C1">C1</option>
                    <option value="C2">C2</option>
                  </select>
                </div>
              </div>
              <div>
                <label class="form-label">English Definition</label>
                <input class="form-input" id="new-meaning" placeholder="Meaning in English..." />
              </div>
              <div>
                <label class="form-label">Thai Translation (ความหมายภาษาไทย)</label>
                <input class="form-input" id="new-th" placeholder="คำแปลภาษาไทย..." />
              </div>
              <div>
                <label class="form-label">Example Sentence</label>
                <textarea class="form-input" id="new-example" placeholder="Example sentence using this word..." rows="2"></textarea>
              </div>
            </div>
          `,
          actions: [
            { label: 'Cancel', className: 'btn--ghost' },
            {
              label: 'Save to Notebook',
              className: 'btn--primary',
              onClick: () => {
                const w = document.getElementById('new-word').value.trim();
                const m = document.getElementById('new-meaning').value.trim();
                if (!w) {
                  Toast.error('Please enter a word.');
                  return;
                }
                Store.addVocabularyItem({
                  word: w,
                  partOfSpeech: document.getElementById('new-pos').value.trim(),
                  cefr: document.getElementById('new-cefr').value,
                  meaning: m || 'No definition entered.',
                  meaningTh: document.getElementById('new-th').value.trim(),
                  example: document.getElementById('new-example').value.trim()
                });
                Toast.success(`Added "${w}" to notebook.`);
                render();
              }
            }
          ]
        });
      };
    }

    const reviewBtn = document.getElementById('start-review-btn');
    if (reviewBtn) {
      reviewBtn.onclick = () => {
        state.reviewQueue = Store.getDueVocabulary();
        if (state.reviewQueue.length === 0) {
          Toast.info('No cards due right now! Great job.');
          return;
        }
        state.reviewIndex = 0;
        state.showAnswer = false;
        state.view = 'review';
        render();
      };
    }
  }

  function renderReview() {
    const card = state.reviewQueue[state.reviewIndex];
    if (!card) {
      state.view = 'list';
      Toast.success('Review session completed! Spaced intervals updated.');
      render();
      return;
    }

    container.innerHTML = `
      <div class="page-container page-container--narrow">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-6);">
          <button class="btn btn--ghost btn--sm" id="exit-review-btn">✕ Exit Session</button>
          <span style="font-size: 14px; color: var(--color-neutral-500);">
            Card ${state.reviewIndex + 1} of ${state.reviewQueue.length}
          </span>
          <span class="badge badge--${(card.cefr || 'b1').toLowerCase()}">${card.cefr || 'B1'}</span>
        </div>

        <div class="card" style="padding: var(--space-8); text-align: center; min-height: 280px; display: flex; flex-direction: column; justify-content: center; align-items: center; margin-bottom: var(--space-6);">
          <div style="font-size: 32px; font-weight: bold; color: var(--color-neutral-900); margin-bottom: 8px;">
            ${card.word}
          </div>
          <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 16px;">
            <span style="font-size: 14px; color: var(--color-neutral-400);">${card.phonetic || ''}</span>
            <span style="font-size: 13px; font-style: italic; color: var(--color-primary-600);">${card.partOfSpeech || ''}</span>
            <button class="btn btn--ghost btn--sm" id="review-audio-btn">🔊</button>
          </div>

          ${state.showAnswer ? `
            <div class="animate-fade-in" style="width: 100%; border-top: 1px solid var(--color-neutral-150); padding-top: var(--space-5); margin-top: var(--space-3);">
              <div style="font-size: 18px; color: var(--color-neutral-800); margin-bottom: 8px;">
                ${card.meaning}
              </div>
              ${card.meaningTh ? `
                <div style="font-size: 16px; color: var(--color-primary-700); margin-bottom: 12px; font-weight: 500;">
                  🇹🇭 ${card.meaningTh}
                </div>
              ` : ''}
              ${card.example ? `
                <div style="font-size: 14px; color: var(--color-neutral-500); font-style: italic; background: var(--color-neutral-50); padding: 10px; border-radius: var(--radius-md);">
                  "${card.example}"
                </div>
              ` : ''}
            </div>
          ` : `
            <p style="color: var(--color-neutral-400); font-size: 14px; margin-top: 16px;">
              Can you recall the meaning and context sentence?
            </p>
          `}
        </div>

        <div style="display: flex; justify-content: center;">
          ${!state.showAnswer ? `
            <button class="btn btn--primary btn--lg" id="show-answer-btn" style="min-width: 200px;">
              Show Meaning
            </button>
          ` : `
            <div class="grid-4" style="width: 100%;">
              <button class="btn btn--outline rate-btn" data-rate="1" style="border-color: #f87171; color: #dc2626;">
                1 - Again<br><span style="font-size: 11px;">(&lt;10m)</span>
              </button>
              <button class="btn btn--outline rate-btn" data-rate="2" style="border-color: #fbbf24; color: #d97706;">
                2 - Hard<br><span style="font-size: 11px;">(1d)</span>
              </button>
              <button class="btn btn--outline rate-btn" data-rate="3" style="border-color: #60a5fa; color: #2563eb;">
                3 - Good<br><span style="font-size: 11px;">(3d)</span>
              </button>
              <button class="btn btn--outline rate-btn" data-rate="4" style="border-color: #34d399; color: #059669;">
                4 - Easy<br><span style="font-size: 11px;">(7d)</span>
              </button>
            </div>
          `}
        </div>
      </div>
    `;

    document.getElementById('review-audio-btn').onclick = () => SpeechService.speak(card.word);
    document.getElementById('exit-review-btn').onclick = () => {
      state.view = 'list';
      render();
    };

    const showBtn = document.getElementById('show-answer-btn');
    if (showBtn) {
      showBtn.onclick = () => {
        state.showAnswer = true;
        render();
      };
    }

    container.querySelectorAll('.rate-btn').forEach(btn => {
      btn.onclick = () => {
        const quality = parseInt(btn.dataset.rate, 10);
        Store.updateVocabularyReview(card.id, quality);
        state.reviewIndex++;
        state.showAnswer = false;
        render();
      };
    });
  }

  render();
}
