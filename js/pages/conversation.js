// ========================================
// LingoPath AI English Conversation Tutor
// ========================================

import { CONVERSATION_MODES, generateConversationReport } from '../data/demo-conversations.js';
import { AIService } from '../services/ai.js';
import { SpeechService } from '../services/speech.js';
import { Store } from '../store.js';
import { Toast } from '../components/toast.js';

export function renderConversation(container) {
  const profile = Store.getProfile();
  const placement = Store.getPlacement();
  const userLevel = placement?.overall?.level || profile.currentLevel || 'B1';
  const settings = Store.getSettings();

  let state = {
    currentMode: 'free',
    currentScenario: null,
    correctionStyle: settings.correctionStyle || 'balanced',
    messages: [],
    isListening: false,
    report: null
  };

  // Initialize first greeting
  const modeData = CONVERSATION_MODES.find(m => m.id === state.currentMode);
  state.messages.push({
    sender: 'tutor',
    text: modeData.starter || "Hello! It's great to chat with you today. What would you like to discuss?",
    time: Date.now()
  });

  function render() {
    if (state.report) {
      renderReport();
    } else {
      renderChat();
    }
  }

  function renderChat() {
    const activeMode = CONVERSATION_MODES.find(m => m.id === state.currentMode);
    const isMicSupported = SpeechService.isSTTSupported();

    container.innerHTML = `
      <div class="page-container page-container--wide">
        <div class="chat-container">
          <!-- Chat Header -->
          <div class="chat-header">
            <div>
              <div style="display: flex; align-items: center; gap: 8px;">
                <h2 style="font-size: var(--text-xl); font-weight: var(--font-bold); color: var(--color-neutral-900);">
                  AI English Conversation Tutor
                </h2>
                <span class="badge badge--${userLevel.toLowerCase()}">Level: ${userLevel}</span>
                ${AIService.isConfigured() ? '<span class="badge badge--success">Live AI</span>' : '<span class="badge badge--neutral">Educational Demo Tutor</span>'}
              </div>
              <p style="font-size: 13px; color: var(--color-neutral-500); margin-top: 2px;">
                ${activeMode.title}: ${activeMode.description}
              </p>
            </div>

            <div style="display: flex; align-items: center; gap: 8px;">
              <select id="correction-style-select" class="form-input" style="padding: 6px 10px; font-size: 13px;">
                <option value="gentle" ${state.correctionStyle === 'gentle' ? 'selected' : ''}>Style: Gentle</option>
                <option value="balanced" ${state.correctionStyle === 'balanced' ? 'selected' : ''}>Style: Balanced</option>
                <option value="detailed" ${state.correctionStyle === 'detailed' ? 'selected' : ''}>Style: Detailed</option>
              </select>

              <button class="btn btn--secondary btn--sm" id="end-session-btn" style="white-space: nowrap;">
                End & View Report
              </button>
            </div>
          </div>

          <!-- Mode Selector Tabs -->
          <div class="chat-mode-selector">
            ${CONVERSATION_MODES.map(m => `
              <button class="btn btn--sm ${m.id === state.currentMode ? 'btn--primary' : 'btn--outline'} mode-tab-btn" data-mode="${m.id}">
                ${m.icon} ${m.title}
              </button>
            `).join('')}
          </div>

          ${activeMode.scenarios ? `
            <div style="display: flex; gap: 6px; margin: 4px 0 12px; overflow-x: auto; padding-bottom: 4px;">
              ${activeMode.scenarios.map(sc => `
                <button class="badge badge--neutral scenario-btn" data-id="${sc.id}" style="cursor: pointer; padding: 4px 10px;">
                  📌 ${sc.title}
                </button>
              `).join('')}
            </div>
          ` : ''}

          <!-- Message History -->
          <div class="chat-messages" id="chat-messages-scroll">
            ${state.messages.map(m => `
              <div class="message message--${m.sender}">
                <div class="message__bubble">
                  ${m.sender === 'tutor' ? `
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; margin-bottom: 4px;">
                      <span style="font-size: 11px; font-weight: bold; color: var(--color-primary-700);">Tutor &bull; ${userLevel}</span>
                      <button class="btn btn--ghost btn--sm tts-btn" data-text="${encodeURIComponent(m.text)}" style="padding: 2px 6px; font-size: 12px;">
                        🔊 Play
                      </button>
                    </div>
                  ` : ''}
                  <div style="font-size: 14px; line-height: 1.6;">${m.text}</div>
                </div>
              </div>
            `).join('')}
          </div>

          <!-- Input Area -->
          <div class="chat-input-area">
            <textarea id="chat-input-field" class="form-input" placeholder="Type your message in English..." rows="1"></textarea>

            <button class="btn ${state.isListening ? 'btn--error' : 'btn--secondary'}" id="mic-btn" title="${isMicSupported ? 'Toggle Microphone' : 'Speech recognition not supported in this browser'}">
              ${state.isListening ? '🛑 Recording...' : '🎙️ Speak'}
            </button>

            <button class="btn btn--primary" id="send-msg-btn">
              Send →
            </button>
          </div>
          ${!isMicSupported ? `
            <div style="font-size: 11px; color: var(--color-neutral-400); margin-top: 4px;">
              *Microphone speech recognition is not supported in this browser; please use standard text input.
            </div>
          ` : ''}
        </div>
      </div>
    `;

    bindChatEvents();
    scrollToBottom();
  }

  function scrollToBottom() {
    const scrollBox = document.getElementById('chat-messages-scroll');
    if (scrollBox) scrollBox.scrollTop = scrollBox.scrollHeight;
  }

  function bindChatEvents() {
    // Mode switcher
    container.querySelectorAll('.mode-tab-btn').forEach(btn => {
      btn.onclick = () => {
        const mode = btn.dataset.mode;
        state.currentMode = mode;
        const modeObj = CONVERSATION_MODES.find(m => m.id === mode);
        state.messages = [{
          sender: 'tutor',
          text: modeObj.starter || modeObj.scenarios?.[0]?.starter || "Welcome! Let's start this scenario.",
          time: Date.now()
        }];
        render();
      };
    });

    // Scenario switcher
    container.querySelectorAll('.scenario-btn').forEach(btn => {
      btn.onclick = () => {
        const scId = btn.dataset.id;
        const modeObj = CONVERSATION_MODES.find(m => m.id === state.currentMode);
        const scenario = modeObj.scenarios?.find(s => s.id === scId);
        if (scenario) {
          state.messages.push({
            sender: 'tutor',
            text: `[Scenario: ${scenario.title}] ${scenario.starter}`,
            time: Date.now()
          });
          render();
        }
      };
    });

    // TTS play buttons
    container.querySelectorAll('.tts-btn').forEach(btn => {
      btn.onclick = () => {
        const text = decodeURIComponent(btn.dataset.text);
        SpeechService.speak(text);
      };
    });

    // Correction style selector
    const styleSelect = document.getElementById('correction-style-select');
    if (styleSelect) {
      styleSelect.onchange = () => {
        state.correctionStyle = styleSelect.value;
      };
    }

    // Send button & text area
    const input = document.getElementById('chat-input-field');
    const sendBtn = document.getElementById('send-msg-btn');

    const sendMessage = async () => {
      const text = input.value.trim();
      if (!text) return;
      input.value = '';

      state.messages.push({
        sender: 'user',
        text: text,
        time: Date.now()
      });
      render();

      // Show typing indicator or fetch reply
      const replyData = await AIService.generateTutorReply(text, state.messages, {
        userLevel,
        mode: state.currentMode
      });

      state.messages.push({
        sender: 'tutor',
        text: replyData.reply,
        time: Date.now()
      });
      render();

      // Auto-speak response if desired
      SpeechService.speak(replyData.reply);
    };

    if (sendBtn) sendBtn.onclick = sendMessage;
    if (input) {
      input.onkeydown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          sendMessage();
        }
      };
    }

    // Microphone STT
    const micBtn = document.getElementById('mic-btn');
    if (micBtn && SpeechService.isSTTSupported()) {
      micBtn.onclick = () => {
        if (!state.isListening) {
          const rec = SpeechService.createRecognition();
          if (!rec) return;

          state.isListening = true;
          render();

          rec.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            if (input) input.value = transcript;
            state.isListening = false;
            render();
          };

          rec.onerror = (e) => {
            console.warn('Speech recognition error:', e);
            state.isListening = false;
            Toast.warning('Microphone input error or permission denied.');
            render();
          };

          rec.onend = () => {
            state.isListening = false;
            render();
          };

          rec.start();
        } else {
          state.isListening = false;
          render();
        }
      };
    }

    // End session button
    const endBtn = document.getElementById('end-session-btn');
    if (endBtn) {
      endBtn.onclick = () => {
        SpeechService.stopSpeaking();
        const report = generateConversationReport(state.messages, userLevel, state.correctionStyle);
        state.report = report;
        Store.saveConversation({
          id: 'conv_' + Date.now(),
          mode: state.currentMode,
          messages: state.messages,
          report: report,
          createdAt: Date.now()
        });
        render();
      };
    }
  }

  function renderReport() {
    const rep = state.report;

    container.innerHTML = `
      <div class="page-container page-container--narrow">
        <div style="text-align: center; margin-bottom: var(--space-8);">
          <div class="badge badge--primary" style="font-size: 16px; padding: 6px 16px; margin-bottom: 8px;">
            Conversation Feedback Report
          </div>
          <h1 style="font-size: var(--text-2xl); font-weight: var(--font-bold); color: var(--color-neutral-900);">
            Session Performance & Insights
          </h1>
          <p style="color: var(--color-neutral-500); font-size: 14px;">
            ${rep.turns} message turns &bull; ${rep.totalWords} spoken/typed words &bull; Estimated Fluency: <strong>${rep.estimatedFluency}</strong>
          </p>
        </div>

        <!-- Rubric Scores -->
        <div class="card" style="padding: var(--space-6); margin-bottom: var(--space-6);">
          <h3 style="font-size: 16px; font-weight: bold; margin-bottom: var(--space-4);">
            CEFR Speaking Rubric Evaluation
          </h3>
          <div class="grid-2">
            <div>
              <div style="display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 4px;">
                <span>Task Relevance & Completion</span>
                <strong>${rep.rubricScores.taskCompletion} / 5</strong>
              </div>
              <div class="progress"><div class="progress__bar" style="width: ${(rep.rubricScores.taskCompletion / 5) * 100}%;"></div></div>
            </div>
            <div>
              <div style="display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 4px;">
                <span>Fluency & Coherence</span>
                <strong>${rep.rubricScores.fluency} / 5</strong>
              </div>
              <div class="progress"><div class="progress__bar" style="width: ${(rep.rubricScores.fluency / 5) * 100}%;"></div></div>
            </div>
            <div>
              <div style="display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 4px;">
                <span>Grammar Accuracy</span>
                <strong>${rep.rubricScores.grammarAccuracy} / 5</strong>
              </div>
              <div class="progress"><div class="progress__bar" style="width: ${(rep.rubricScores.grammarAccuracy / 5) * 100}%;"></div></div>
            </div>
            <div>
              <div style="display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 4px;">
                <span>Vocabulary Precision</span>
                <strong>${rep.rubricScores.vocabularyRange} / 5</strong>
              </div>
              <div class="progress"><div class="progress__bar" style="width: ${(rep.rubricScores.vocabularyRange / 5) * 100}%;"></div></div>
            </div>
          </div>
        </div>

        <!-- Corrections -->
        <div class="card" style="padding: var(--space-6); margin-bottom: var(--space-6);">
          <h3 style="font-size: 16px; font-weight: bold; margin-bottom: var(--space-3); color: var(--color-warning);">
            ✏️ Language Refinements & Natural Expressions:
          </h3>
          <div style="display: flex; flex-direction: column; gap: var(--space-3);">
            ${rep.corrections.map(c => `
              <div style="padding: 12px; border: 1px solid var(--color-neutral-150); border-radius: var(--radius-lg); background: var(--color-neutral-50);">
                <div style="font-size: 13px; color: var(--color-error); text-decoration: line-through; margin-bottom: 2px;">
                  ✗ "${c.original}"
                </div>
                <div style="font-size: 14px; font-weight: 600; color: var(--color-success); margin-bottom: 4px;">
                  ✓ "${c.improved}"
                </div>
                <div style="font-size: 12px; color: var(--color-neutral-600);">
                  ${c.explanation}
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <div style="display: flex; gap: var(--space-4); justify-content: center;">
          <button class="btn btn--secondary btn--lg" id="new-chat-btn">
            Start Another Conversation
          </button>
          <a href="#/dashboard" class="btn btn--primary btn--lg">
            Back to Dashboard
          </a>
        </div>
      </div>
    `;

    document.getElementById('new-chat-btn').onclick = () => {
      state.report = null;
      state.messages = [{
        sender: 'tutor',
        text: "Ready for another practice session! What would you like to explore next?",
        time: Date.now()
      }];
      render();
    };
  }

  render();
}
