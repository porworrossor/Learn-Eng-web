// ========================================
// LingoPath Settings Page
// ========================================

import { Store } from '../store.js';
import { CONFIG } from '../config.js';
import { Toast } from '../components/toast.js';

export function renderSettings(container) {
  const profile = Store.getProfile();
  const user = Store.getUser() || { name: 'Learner', email: 'alex@example.com' };
  const settings = Store.getSettings();

  container.innerHTML = `
    <div class="page-container page-container--narrow">
      <div class="page-header__breadcrumb">
        <a href="#/dashboard">Dashboard</a> <span>/</span> <span>Settings</span>
      </div>
      <h1 class="page-header__title">Learning Preferences & Settings</h1>
      <p class="page-header__subtitle">
        Customize your curriculum preferences, explanations, and optional live AI connections.
      </p>

      <form id="settings-form" style="display: flex; flex-direction: column; gap: var(--space-6);">
        <!-- Profile Section -->
        <div class="card" style="padding: var(--space-6);">
          <h3 style="font-size: var(--text-lg); font-weight: bold; margin-bottom: var(--space-4);">
            Account & Profile
          </h3>
          <div class="form-group" style="margin-bottom: var(--space-4);">
            <label class="form-label">Display Name</label>
            <input class="form-input" id="set-name" value="${user.name || ''}" required />
          </div>
          <div class="form-group">
            <label class="form-label">Email Address</label>
            <input class="form-input" id="set-email" value="${user.email || ''}" disabled style="opacity: 0.7;" />
          </div>
        </div>

        <!-- Pedagogy & Language Preferences -->
        <div class="card" style="padding: var(--space-6);">
          <h3 style="font-size: var(--text-lg); font-weight: bold; margin-bottom: var(--space-4);">
            Pedagogy & Explanations
          </h3>

          <div class="form-group" style="margin-bottom: var(--space-4);">
            <label class="form-label">Lesson Explanation Language</label>
            <select class="form-input" id="set-lang">
              ${Object.entries(CONFIG.EXPLANATION_LANGUAGES).map(([key, label]) => `
                <option value="${key}" ${settings.explanationLanguage === key ? 'selected' : ''}>${label}</option>
              `).join('')}
            </select>
            <span style="font-size: 12px; color: var(--color-neutral-500); margin-top: 4px; display: block;">
              Thai explanation mode supports native Thai speakers transitioning towards English immersion.
            </span>
          </div>

          <div class="form-group" style="margin-bottom: var(--space-4);">
            <label class="form-label">Tutor Correction Style</label>
            <select class="form-input" id="set-correction">
              <option value="gentle" ${settings.correctionStyle === 'gentle' ? 'selected' : ''}>Gentle (Correct only major stumbling blocks)</option>
              <option value="balanced" ${settings.correctionStyle === 'balanced' ? 'selected' : ''}>Balanced (Correct recurring errors and unnatural phrases)</option>
              <option value="detailed" ${settings.correctionStyle === 'detailed' ? 'selected' : ''}>Detailed (Comprehensive grammar & vocabulary notes)</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Daily Study Target</label>
            <select class="form-input" id="set-daily-time">
              ${CONFIG.STUDY_TIME_OPTIONS.map(mins => `
                <option value="${mins}" ${(profile.studyTimePerDay || 30) === mins ? 'selected' : ''}>${mins} minutes per day</option>
              `).join('')}
            </select>
          </div>
        </div>

        <!-- AI Integration -->
        <div class="card" style="padding: var(--space-6);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-2);">
            <h3 style="font-size: var(--text-lg); font-weight: bold;">
              AI Tutor API Configuration
            </h3>
            <span class="badge ${settings.apiKey ? 'badge--success' : 'badge--neutral'}">
              ${settings.apiKey ? 'Live API Configured' : 'Educational Demo Mode'}
            </span>
          </div>
          <p style="font-size: 13px; color: var(--color-neutral-500); margin-bottom: var(--space-4);">
            By default, LingoPath runs in full educational demo mode with built-in scenarios and pre-written responses. If you have an OpenAI-compatible API key, you may connect it here.
          </p>

          <div class="form-group" style="margin-bottom: var(--space-4);">
            <label class="form-label">API Endpoint URL (Optional)</label>
            <input class="form-input" id="set-ai-endpoint" placeholder="https://api.openai.com/v1/chat/completions" value="${settings.apiEndpoint || ''}" />
          </div>

          <div class="form-group" style="margin-bottom: var(--space-4);">
            <label class="form-label">API Secret Key (Stored locally in your browser)</label>
            <input type="password" class="form-input" id="set-ai-key" placeholder="sk-..." value="${settings.apiKey || ''}" />
          </div>

          <div class="form-group">
            <label class="form-label">AI Model Name</label>
            <input class="form-input" id="set-ai-model" placeholder="gpt-4o-mini" value="${settings.aiModel || 'gpt-4o-mini'}" />
          </div>
        </div>

        <button type="submit" class="btn btn--primary btn--lg btn--full">
          Save Settings
        </button>
      </form>
    </div>
  `;

  document.getElementById('settings-form').onsubmit = (e) => {
    e.preventDefault();

    const name = document.getElementById('set-name').value.trim();
    if (name) {
      const u = Store.getUser() || {};
      u.name = name;
      Store.setUser(u);
    }

    const lang = document.getElementById('set-lang').value;
    const correction = document.getElementById('set-correction').value;
    const dailyMins = parseInt(document.getElementById('set-daily-time').value, 10);
    const endpoint = document.getElementById('set-ai-endpoint').value.trim();
    const apiKey = document.getElementById('set-ai-key').value.trim();
    const aiModel = document.getElementById('set-ai-model').value.trim();

    Store.setSettings({
      ...settings,
      explanationLanguage: lang,
      correctionStyle: correction,
      apiEndpoint: endpoint,
      apiKey: apiKey,
      aiModel: aiModel
    });

    const p = Store.getProfile();
    p.studyTimePerDay = dailyMins;
    p.explanationLanguage = lang;
    Store.setProfile(p);

    Toast.success('Settings updated successfully.');
  };
}
