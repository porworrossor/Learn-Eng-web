// ========================================
// LingoPath Main Application Controller
// ========================================

import { Router } from './router.js';
import { Store } from './store.js';
import { Sidebar } from './components/sidebar.js';

// Import pages
import { renderLanding } from './pages/landing.js';
import { renderAuth } from './pages/auth.js';
import { renderPlacement } from './pages/placement.js';
import { renderGoalSelection } from './pages/goal-selection.js';
import { renderDashboard } from './pages/dashboard.js';
import { renderCurriculum } from './pages/curriculum.js';
import { renderLesson } from './pages/lesson.js';
import { renderConversation } from './pages/conversation.js';
import { renderVocabulary } from './pages/vocabulary.js';
import { renderAssessments } from './pages/assessments.js';
import { renderProgress } from './pages/progress.js';
import { renderSettings } from './pages/settings.js';

// Routes configuration
const FULLSCREEN_ROUTES = ['/', '/auth', '/placement', '/goal-selection'];

function setupLayout(currentPath) {
  const isFullscreen = FULLSCREEN_ROUTES.includes(currentPath);
  const shell = document.getElementById('app-shell');
  const sidebarContainer = document.getElementById('sidebar-container');
  const main = document.getElementById('main-content');

  if (isFullscreen) {
    if (shell) shell.className = 'app-shell app-shell--no-sidebar';
    if (sidebarContainer) sidebarContainer.innerHTML = '';
    if (main) main.className = 'main-content main-content--full';
  } else {
    if (shell) shell.className = 'app-shell';
    if (sidebarContainer) {
      sidebarContainer.innerHTML = Sidebar.render(currentPath);
      Sidebar.bindEvents();
    }
    if (main) main.className = 'main-content';
  }
}

export function initApp() {
  // Ensure default demo profile exists so the app is always functional
  if (!Store.getUser()) {
    Store.setUser({
      id: 'demo_alex',
      name: 'Alex Rivera',
      email: 'alex.learner@example.com',
      isDemo: true
    });
  }

  // Register all routes with layout awareness
  function wrapRoute(renderFn) {
    return (container, params) => {
      const path = window.location.hash.slice(1) || '/';
      setupLayout(path);
      renderFn(container, params);
      window.scrollTo(0, 0);
    };
  }

  Router.register('/', wrapRoute(renderLanding));
  Router.register('/auth', wrapRoute(renderAuth));
  Router.register('/placement', wrapRoute(renderPlacement));
  Router.register('/goal-selection', wrapRoute(renderGoalSelection));
  Router.register('/dashboard', wrapRoute(renderDashboard));
  Router.register('/curriculum', wrapRoute(renderCurriculum));
  Router.register('/lesson', wrapRoute(renderLesson));
  Router.register('/lesson/:id', wrapRoute(renderLesson));
  Router.register('/conversation', wrapRoute(renderConversation));
  Router.register('/vocabulary', wrapRoute(renderVocabulary));
  Router.register('/assessments', wrapRoute(renderAssessments));
  Router.register('/progress', wrapRoute(renderProgress));
  Router.register('/settings', wrapRoute(renderSettings));

  // Initialize router
  Router.init();
}

// Start application when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
