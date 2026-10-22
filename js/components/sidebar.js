// ========================================
// LingoPath Sidebar & Navigation Component
// ========================================

import { Store } from '../store.js';
import { AuthService } from '../services/auth.js';
import { Router } from '../router.js';

export const Sidebar = {
  render(activePath = '/') {
    const user = Store.getUser() || { name: 'Learner', isDemo: true };
    const placement = Store.getPlacement();
    const currentLevel = placement?.overall?.level || 'A2';
    const vocab = Store.getVocabulary();
    const dueVocab = Store.getDueVocabulary();

    const navItems = [
      { path: '/dashboard', label: 'Dashboard', icon: '📊' },
      { path: '/curriculum', label: 'My Learning Path', icon: '🗺️' },
      { path: '/lesson', label: 'Current Lesson', icon: '📖' },
      { path: '/conversation', label: 'AI Conversation', icon: '💬' },
      { path: '/vocabulary', label: 'Vocabulary', icon: '📚', badge: dueVocab.length > 0 ? dueVocab.length : null },
      { path: '/assessments', label: 'Assessments', icon: '📝' },
      { path: '/progress', label: 'Progress & Reports', icon: '📈' },
      { path: '/settings', label: 'Settings', icon: '⚙️' }
    ];

    return `
      <!-- Mobile Top Bar -->
      <header class="mobile-header">
        <button class="mobile-header__menu-btn" id="mobile-menu-toggle" aria-label="Toggle Navigation">
          ☰
        </button>
        <a href="#/dashboard" class="mobile-header__logo">
          <div class="sidebar__logo-icon" style="width:28px;height:28px;font-size:14px;">LP</div>
          <span>LingoPath</span>
        </a>
        <div class="badge badge--${currentLevel.toLowerCase()}">${currentLevel}</div>
      </header>

      <!-- Sidebar -->
      <aside class="sidebar" id="app-sidebar">
        <div class="sidebar__header">
          <a href="#/dashboard" class="sidebar__logo">
            <div class="sidebar__logo-icon">LP</div>
            <div>
              <div class="sidebar__logo-text">LingoPath</div>
              <div style="font-size: 11px; color: var(--color-neutral-400);">Adaptive English</div>
            </div>
          </a>
        </div>

        <nav class="sidebar__nav">
          <div class="sidebar__section">
            <div class="sidebar__section-label">Learning</div>
            ${navItems.slice(0, 5).map(item => `
              <a href="#${item.path}" class="nav-item ${activePath.startsWith(item.path) ? 'nav-item--active' : ''}">
                <span class="nav-item__icon">${item.icon}</span>
                <span>${item.label}</span>
                ${item.badge ? `<span class="nav-item__badge">${item.badge}</span>` : ''}
              </a>
            `).join('')}
          </div>

          <div class="sidebar__section">
            <div class="sidebar__section-label">Evaluation & Profile</div>
            ${navItems.slice(5).map(item => `
              <a href="#${item.path}" class="nav-item ${activePath.startsWith(item.path) ? 'nav-item--active' : ''}">
                <span class="nav-item__icon">${item.icon}</span>
                <span>${item.label}</span>
              </a>
            `).join('')}
          </div>
        </nav>

        <div class="sidebar__footer">
          <div class="sidebar__user" id="sidebar-user-menu">
            ${user.picture ? `
              <img src="${user.picture}" class="avatar" alt="${user.name}" style="object-fit: cover; border: 1px solid var(--color-neutral-200);" />
            ` : `
              <div class="avatar">${user.name.charAt(0).toUpperCase()}</div>
            `}
            <div class="sidebar__user-info">
              <div class="sidebar__user-name" style="display: flex; align-items: center; gap: 4px;">
                <span>${user.name}</span>
                ${user.provider === 'google' ? '<span style="font-size: 10px; background: #e8f0fe; color: #1a73e8; padding: 1px 4px; border-radius: 4px;">Google</span>' : ''}
              </div>
              <div class="sidebar__user-level">Estimated CEFR: <strong>${currentLevel}</strong></div>
            </div>
          </div>
          <div style="margin-top: var(--space-2); display: flex; gap: var(--space-2);">
            <button class="btn btn--ghost btn--sm" style="width: 100%; font-size: 12px;" id="sidebar-logout-btn">
              Switch Account / Sign Out
            </button>
          </div>
        </div>
      </aside>
    `;
  },

  bindEvents() {
    const toggle = document.getElementById('mobile-menu-toggle');
    const sidebar = document.getElementById('app-sidebar');
    if (toggle && sidebar) {
      toggle.onclick = () => {
        sidebar.classList.toggle('sidebar--open');
      };
    }

    const logoutBtn = document.getElementById('sidebar-logout-btn');
    if (logoutBtn) {
      logoutBtn.onclick = () => {
        AuthService.logout();
        Router.navigate('/');
      };
    }

    // Auto-close mobile sidebar when clicking a nav link
    const links = document.querySelectorAll('.sidebar .nav-item');
    links.forEach(link => {
      link.addEventListener('click', () => {
        if (sidebar) sidebar.classList.remove('sidebar--open');
      });
    });
  }
};
