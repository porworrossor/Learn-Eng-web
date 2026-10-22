// ========================================
// LingoPath SPA Router
// ========================================

const routes = {};
let currentRoute = null;
let beforeEachGuard = null;

export const Router = {
  register(path, handler) {
    routes[path] = handler;
  },

  navigate(path) {
    if (window.location.hash === '#' + path) {
      // Force re-render even if same hash
      this._handleRoute(path);
    } else {
      window.location.hash = path;
    }
  },

  beforeEach(guard) {
    beforeEachGuard = guard;
  },

  getCurrentRoute() {
    return currentRoute;
  },

  getParams() {
    const hash = window.location.hash.slice(1) || '/';
    const parts = hash.split('/').filter(Boolean);
    return parts;
  },

  init() {
    window.addEventListener('hashchange', () => {
      const path = window.location.hash.slice(1) || '/';
      this._handleRoute(path);
    });

    // Handle initial route
    const initialPath = window.location.hash.slice(1) || '/';
    this._handleRoute(initialPath);
  },

  _handleRoute(path) {
    // Find matching route
    let handler = null;
    let params = {};

    // Try exact match first
    if (routes[path]) {
      handler = routes[path];
    } else {
      // Try parameterized routes
      for (const [pattern, routeHandler] of Object.entries(routes)) {
        const match = this._matchRoute(pattern, path);
        if (match) {
          handler = routeHandler;
          params = match;
          break;
        }
      }
    }

    if (!handler) {
      // 404 - redirect to landing or dashboard
      handler = routes['/'] || routes['/dashboard'];
      if (!handler) return;
    }

    // Before each guard
    if (beforeEachGuard) {
      const result = beforeEachGuard(path, currentRoute);
      if (result === false) return;
      if (typeof result === 'string') {
        this.navigate(result);
        return;
      }
    }

    currentRoute = path;
    
    // Get the main content container
    const container = document.getElementById('app-content') || document.getElementById('app');
    if (!container) return;

    // Run the route handler
    try {
      handler(container, params);
    } catch (e) {
      console.error('Route handler error:', e);
      container.innerHTML = `
        <div class="page-container">
          <div class="empty-state">
            <div class="empty-state__icon">⚠️</div>
            <h2 class="empty-state__title">Something went wrong</h2>
            <p class="empty-state__text">${e.message}</p>
            <button class="btn btn--primary" onclick="location.hash='/'">Go Home</button>
          </div>
        </div>
      `;
    }
  },

  _matchRoute(pattern, path) {
    const patternParts = pattern.split('/').filter(Boolean);
    const pathParts = path.split('/').filter(Boolean);

    if (patternParts.length !== pathParts.length) return null;

    const params = {};
    for (let i = 0; i < patternParts.length; i++) {
      if (patternParts[i].startsWith(':')) {
        params[patternParts[i].slice(1)] = pathParts[i];
      } else if (patternParts[i] !== pathParts[i]) {
        return null;
      }
    }
    return params;
  }
};
