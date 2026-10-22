// ========================================
// LingoPath Authentication & User Service
// ========================================

import { Store } from '../store.js';

export const AuthService = {
  getCurrentUser() {
    return Store.getUser();
  },

  isLoggedIn() {
    return Store.isLoggedIn();
  },

  login(email, password) {
    if (!email) {
      throw new Error('Please enter an email address.');
    }
    const user = {
      id: 'usr_' + email.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase(),
      name: email.split('@')[0] || 'English Learner',
      email: email,
      provider: 'email',
      lastLogin: Date.now()
    };
    Store.switchUser(user);
    return user;
  },

  signUp(name, email, password) {
    if (!email || !name) {
      throw new Error('Please fill in your name and email.');
    }
    const user = {
      id: 'usr_' + email.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase(),
      name: name.trim(),
      email: email.trim(),
      provider: 'email',
      registeredAt: Date.now(),
      lastLogin: Date.now()
    };
    Store.switchUser(user);
    return user;
  },

  // Handle Google Identity Services credential response
  loginWithGoogleCredential(credentialToken) {
    try {
      const payload = this._decodeJwt(credentialToken);
      const user = {
        id: 'google_' + (payload.sub || Date.now()),
        name: payload.name || payload.email.split('@')[0],
        email: payload.email,
        picture: payload.picture || null,
        provider: 'google',
        lastLogin: Date.now()
      };
      Store.switchUser(user);
      return user;
    } catch (err) {
      console.error('Failed to parse Google credential:', err);
      throw new Error('Invalid Google credential received.');
    }
  },

  // Direct 1-click Google Sign-In helper (supports direct login or custom email/name)
  loginWithGoogleProfile(name = 'Google Learner', email = 'user@gmail.com', picture = null) {
    const user = {
      id: 'google_' + email.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase(),
      name: name.trim(),
      email: email.trim(),
      picture: picture || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=2563eb&color=fff`,
      provider: 'google',
      lastLogin: Date.now()
    };
    Store.switchUser(user);
    return user;
  },

  enterDemoMode() {
    const demoUser = {
      id: 'demo_user_alex',
      name: 'Alex Rivera',
      email: 'alex.learner@example.com',
      provider: 'demo',
      lastLogin: Date.now()
    };
    Store.switchUser(demoUser);
    return demoUser;
  },

  logout() {
    Store.logout();
  },

  _decodeJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  }
};
