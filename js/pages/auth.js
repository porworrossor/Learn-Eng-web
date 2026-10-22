// ========================================
// LingoPath Authentication Page
// ========================================

import { AuthService } from '../services/auth.js';
import { Router } from '../router.js';
import { Toast } from '../components/toast.js';

export function renderAuth(container) {
  let isSignUp = false;

  function renderForm() {
    container.innerHTML = `
      <div class="auth-page">
        <div class="auth-card">
          <div class="auth-card__logo">
            <div class="sidebar__logo-icon">LP</div>
            <span>LingoPath</span>
          </div>

          <h2 class="auth-card__title">${isSignUp ? 'Create your account' : 'Welcome back'}</h2>
          <p class="auth-card__subtitle">
            ${isSignUp ? 'Begin your personalized English journey today' : 'Continue your adaptive learning path'}
          </p>

          <form id="auth-form" style="display: flex; flex-direction: column; gap: var(--space-4);">
            ${isSignUp ? `
              <div class="form-group">
                <label class="form-label" for="auth-name">Your Full Name</label>
                <input class="form-input" id="auth-name" type="text" placeholder="e.g. Alex Rivera" required />
              </div>
            ` : ''}

            <div class="form-group">
              <label class="form-label" for="auth-email">Email Address</label>
              <input class="form-input" id="auth-email" type="email" placeholder="learner@example.com" required />
            </div>

            <div class="form-group">
              <label class="form-label" for="auth-password">Password</label>
              <input class="form-input" id="auth-password" type="password" placeholder="••••••••" required />
            </div>

            <button type="submit" class="btn btn--primary btn--full" style="margin-top: var(--space-2);">
              ${isSignUp ? 'Create Account' : 'Sign In'}
            </button>
          </form>

          <div class="auth-card__divider">or test drive with no sign-up</div>

          <button class="btn btn--secondary btn--full" id="auth-demo-btn">
            ⚡ Continue in Demo Mode
          </button>

          <div class="auth-card__footer">
            ${isSignUp ? `
              Already have an account? <a href="javascript:void(0)" id="toggle-auth-mode">Sign in</a>
            ` : `
              Don't have an account yet? <a href="javascript:void(0)" id="toggle-auth-mode">Sign up</a>
            `}
          </div>
        </div>
      </div>
    `;

    // Event listeners
    const form = document.getElementById('auth-form');
    if (form) {
      form.onsubmit = (e) => {
        e.preventDefault();
        const email = document.getElementById('auth-email').value;
        const pass = document.getElementById('auth-password').value;
        try {
          if (isSignUp) {
            const name = document.getElementById('auth-name').value;
            AuthService.signUp(name, email, pass);
            Toast.success('Account created! Welcome to LingoPath.');
          } else {
            AuthService.login(email, pass);
            Toast.success('Welcome back!');
          }
          Router.navigate('/dashboard');
        } catch (err) {
          Toast.error(err.message);
        }
      };
    }

    const demoBtn = document.getElementById('auth-demo-btn');
    if (demoBtn) {
      demoBtn.onclick = () => {
        AuthService.enterDemoMode();
        Toast.info('Entered Demo Mode as Alex Rivera.');
        Router.navigate('/dashboard');
      };
    }

    const toggleBtn = document.getElementById('toggle-auth-mode');
    if (toggleBtn) {
      toggleBtn.onclick = () => {
        isSignUp = !isSignUp;
        renderForm();
      };
    }
  }

  renderForm();
}
