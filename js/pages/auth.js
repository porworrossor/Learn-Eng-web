// ========================================
// LingoPath Authentication Page (with Google Sign-In)
// ========================================

import { AuthService } from '../services/auth.js';
import { Store } from '../store.js';
import { CONFIG } from '../config.js';
import { Router } from '../router.js';
import { Toast } from '../components/toast.js';
import { Modal } from '../components/modal.js';

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

          <!-- Google Sign-In Button -->
          <div style="margin-bottom: var(--space-4);">
            <div id="google-gsi-btn" style="display: none; justify-content: center; width: 100%;"></div>

            <button type="button" class="btn btn--outline btn--full btn--google" id="google-signin-btn" style="padding: 11px 16px; border: 1px solid var(--color-neutral-200); background: #ffffff; color: var(--color-neutral-800); font-weight: 500; display: flex; align-items: center; justify-content: center; gap: 10px; border-radius: var(--radius-lg);">
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>Continue with Google</span>
            </button>
          </div>

          <div class="auth-card__divider">or continue with email</div>

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
            ⚡ Instant Demo Mode
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

    // Initialize Official Google Identity Services if client ID is set
    initGoogleGIS();

    // Event listeners
    const googleBtn = document.getElementById('google-signin-btn');
    if (googleBtn) {
      googleBtn.onclick = () => {
        showGoogleLoginDialog();
      };
    }

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

  function initGoogleGIS() {
    const settings = Store.getSettings();
    const clientId = settings.googleClientId || CONFIG.GOOGLE_CLIENT_ID;

    if (clientId && window.google?.accounts?.id) {
      try {
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: (response) => {
            if (response.credential) {
              const user = AuthService.loginWithGoogleCredential(response.credential);
              Toast.success(`Signed in as ${user.name}! Previous learning data loaded.`);
              Router.navigate('/dashboard');
            }
          }
        });

        const gsiContainer = document.getElementById('google-gsi-btn');
        if (gsiContainer) {
          gsiContainer.style.display = 'flex';
          const defaultBtn = document.getElementById('google-signin-btn');
          if (defaultBtn) defaultBtn.style.display = 'none';

          window.google.accounts.id.renderButton(gsiContainer, {
            theme: 'outline',
            size: 'large',
            text: 'continue_with',
            shape: 'rectangular',
            width: 350
          });
        }
      } catch (err) {
        console.warn('Google Identity Services setup warning:', err);
      }
    }
  }

  function showGoogleLoginDialog() {
    Modal.open({
      title: 'Sign in with Google',
      content: `
        <div style="text-align: center; padding: var(--space-2) 0;">
          <div style="width: 48px; height: 48px; border-radius: 50%; background: #f1f5f9; display: flex; align-items: center; justify-content: center; margin: 0 auto var(--space-4);">
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
          </div>
          <p style="font-size: 14px; color: var(--color-neutral-600); margin-bottom: var(--space-4);">
            Sign in with your Google Account to automatically sync and retain your assessment scores, vocabulary notebook, and curriculum progress on this device.
          </p>
          <div class="form-group" style="text-align: left; margin-bottom: var(--space-3);">
            <label class="form-label">Google Email</label>
            <input type="email" id="google-input-email" class="form-input" placeholder="example@gmail.com" value="${Store.getUser()?.email || ''}" required />
          </div>
          <div class="form-group" style="text-align: left;">
            <label class="form-label">Display Name</label>
            <input type="text" id="google-input-name" class="form-input" placeholder="Your Name" value="${Store.getUser()?.name || ''}" required />
          </div>
        </div>
      `,
      actions: [
        { label: 'Cancel', className: 'btn--ghost' },
        {
          label: 'Continue to LingoPath',
          className: 'btn--primary',
          onClick: () => {
            const email = document.getElementById('google-input-email')?.value.trim();
            const name = document.getElementById('google-input-name')?.value.trim();
            if (!email) {
              Toast.warning('Please enter your Google email.');
              return;
            }
            const user = AuthService.loginWithGoogleProfile(name || email.split('@')[0], email);
            Toast.success(`Signed in as ${user.name}! Your learning progress is active.`);
            Router.navigate('/dashboard');
          }
        }
      ]
    });
  }

  renderForm();
}
