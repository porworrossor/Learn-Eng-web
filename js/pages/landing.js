// ========================================
// LingoPath Landing Page
// ========================================

import { CONFIG } from '../config.js';
import { AuthService } from '../services/auth.js';
import { Router } from '../router.js';

export function renderLanding(container) {
  const isLoggedIn = AuthService.isLoggedIn();

  container.innerHTML = `
    <div class="landing">
      <!-- Header -->
      <header class="landing-header">
        <a href="#/" class="landing-header__logo">
          <div class="landing-header__logo-icon">LP</div>
          <span>LingoPath</span>
        </a>
        <div class="landing-header__actions">
          ${isLoggedIn ? `
            <a href="#/dashboard" class="btn btn--primary">Go to Dashboard</a>
          ` : `
            <a href="#/auth" class="btn btn--ghost">Sign In</a>
            <button class="btn btn--secondary" id="landing-demo-btn">Try Demo</button>
            <a href="#/placement" class="btn btn--primary">Start Placement Test</a>
          `}
        </div>
      </header>

      <!-- Hero Section -->
      <section class="landing-hero">
        <div class="landing-hero__eyebrow">
          <span>✨</span>
          <span>Adaptive CEFR-Aligned English Mastery</span>
        </div>
        <h1 class="landing-hero__title">
          Your English journey, <br><span>built around you.</span>
        </h1>
        <p class="landing-hero__subtitle">
          Stop studying random grammar exercises. LingoPath diagnoses your unique skill profile across Reading, Listening, Writing, and Speaking, then builds an individualized curriculum tailored to your goals.
        </p>

        <div class="landing-hero__actions">
          <a href="#/placement" class="btn btn--primary btn--lg">
            Take Placement Test
            <span style="margin-left: 6px;">→</span>
          </a>
          <button class="btn btn--secondary btn--lg" id="landing-hero-demo">
            Instant Demo Mode
          </button>
        </div>

        <!-- Dashboard Preview Card -->
        <div class="landing-hero__preview">
          <div style="background: var(--color-neutral-900); padding: 12px 16px; display: flex; align-items: center; gap: 8px;">
            <div style="width: 10px; height: 10px; border-radius: 50%; background: #ff5f56;"></div>
            <div style="width: 10px; height: 10px; border-radius: 50%; background: #ffbd2e;"></div>
            <div style="width: 10px; height: 10px; border-radius: 50%; background: #27c93f;"></div>
            <span style="color: var(--color-neutral-400); font-size: 12px; margin-left: 8px;">lingopath.app/dashboard</span>
          </div>
          <div style="padding: var(--space-8); background: var(--color-neutral-50); text-align: left;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-6);">
              <div>
                <h3 style="font-size: var(--text-xl); font-weight: var(--font-bold); color: var(--color-neutral-900);">Welcome back, Alex! 👋</h3>
                <p style="color: var(--color-neutral-500); font-size: var(--text-sm);">Current: <span class="badge badge--a2">A2 Elementary</span> &nbsp;→&nbsp; Target: <span class="badge badge--b2">B2 Upper Intermediate</span></p>
              </div>
              <span class="badge badge--primary" style="font-size: 14px; padding: 6px 12px;">🔥 5-Day Streak</span>
            </div>

            <div class="grid-3" style="margin-bottom: var(--space-6);">
              <div class="card" style="padding: var(--space-4);">
                <div style="font-size: 12px; color: var(--color-neutral-500);">Current Stage</div>
                <div style="font-size: 16px; font-weight: var(--font-bold); margin-top: 4px;">Develop B1 Foundations</div>
                <div class="progress" style="margin-top: 8px;"><div class="progress__bar" style="width: 65%;"></div></div>
              </div>
              <div class="card" style="padding: var(--space-4);">
                <div style="font-size: 12px; color: var(--color-neutral-500);">Study Time This Week</div>
                <div style="font-size: 16px; font-weight: var(--font-bold); margin-top: 4px;">145 / 150 mins</div>
                <div class="progress" style="margin-top: 8px;"><div class="progress__bar" style="width: 96%; background: var(--color-success);"></div></div>
              </div>
              <div class="card" style="padding: var(--space-4);">
                <div style="font-size: 12px; color: var(--color-neutral-500);">Next Recommended</div>
                <div style="font-size: 16px; font-weight: var(--font-bold); margin-top: 4px;">Expressing Opinions (15m)</div>
                <div style="font-size: 12px; color: var(--color-primary-600); margin-top: 8px; font-weight: var(--font-semibold);">Ready to start →</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="landing-features">
        <div class="landing-features__header">
          <h2 class="landing-features__title">A Complete Ecosystem for Language Mastery</h2>
          <p class="landing-features__desc">Everything you need to progress from basic conversation to fluent professional English.</p>
        </div>

        <div class="landing-features__grid">
          <div class="feature-card">
            <div class="feature-card__icon feature-card__icon--blue">🎯</div>
            <h3 class="feature-card__title">Adaptive Placement Assessment</h3>
            <p class="feature-card__desc">Accurately gauges your CEFR level independently across Reading, Listening, Writing, and Speaking without one-size-fits-all assumptions.</p>
          </div>

          <div class="feature-card">
            <div class="feature-card__icon feature-card__icon--green">🗺️</div>
            <h3 class="feature-card__title">Personalized Curriculum</h3>
            <p class="feature-card__desc">Generates a customized path with Stages, Modules, and Lessons tailored directly to your target level, personal interests, and schedule.</p>
          </div>

          <div class="feature-card">
            <div class="feature-card__icon feature-card__icon--purple">💬</div>
            <h3 class="feature-card__title">AI English Conversation Tutor</h3>
            <p class="feature-card__desc">Practice free chat, interview prep, IELTS exams, and roleplays with voice synthesis and detailed grammar & vocabulary reports.</p>
          </div>

          <div class="feature-card">
            <div class="feature-card__icon feature-card__icon--amber">📚</div>
            <h3 class="feature-card__title">Smart Spaced Repetition</h3>
            <p class="feature-card__desc">Master vocabulary effortlessly with an SM-2 spaced repetition engine, pronunciation guidance, and bilingual Thai explanations.</p>
          </div>

          <div class="feature-card">
            <div class="feature-card__icon feature-card__icon--rose">✍️</div>
            <h3 class="feature-card__title">Writing Rubric Evaluation</h3>
            <p class="feature-card__desc">Submit written responses and receive structured feedback on vocabulary variety, sentence structure, coherence, and grammar.</p>
          </div>

          <div class="feature-card">
            <div class="feature-card__icon feature-card__icon--teal">📊</div>
            <h3 class="feature-card__title">Diagnostic Progress Tracking</h3>
            <p class="feature-card__desc">Clear milestone visualizer, error journal for recurring mistakes, and stage-by-stage mastery checks with no deceptive vanity metrics.</p>
          </div>
        </div>
      </section>

      <!-- CTA -->
      <section class="landing-cta">
        <h2 class="landing-cta__title">Start Your Personalized Learning Journey</h2>
        <p class="landing-cta__desc">Join thousands of learners achieving their real-world English goals with an intelligent, adaptive curriculum.</p>
        <div style="display: flex; justify-content: center; gap: 16px;">
          <a href="#/placement" class="btn btn--primary btn--lg">Take Placement Test</a>
          <button class="btn btn--secondary btn--lg" id="landing-cta-demo">Try Demo Mode</button>
        </div>
      </section>

      <!-- Footer -->
      <footer class="landing-footer">
        <p class="landing-footer__text">
          LingoPath &copy; 2026. CEFR-aligned learning platform. Estimated proficiency indicators are for educational planning and do not substitute for official certified exams.
        </p>
      </footer>
    </div>
  `;

  // Demo buttons handler
  const handleDemo = () => {
    AuthService.enterDemoMode();
    Router.navigate('/dashboard');
  };

  const b1 = document.getElementById('landing-demo-btn');
  const b2 = document.getElementById('landing-hero-demo');
  const b3 = document.getElementById('landing-cta-demo');
  if (b1) b1.onclick = handleDemo;
  if (b2) b2.onclick = handleDemo;
  if (b3) b3.onclick = handleDemo;
}
