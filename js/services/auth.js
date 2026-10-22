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
    // In demo mode, sign in or create user
    const existingUser = Store.getUser();
    const user = {
      id: existingUser?.id || 'usr_' + Date.now(),
      name: email.split('@')[0] || 'English Learner',
      email: email,
      isDemo: true,
      lastLogin: Date.now()
    };
    Store.setUser(user);
    return user;
  },

  signUp(name, email, password) {
    if (!email || !name) {
      throw new Error('Please fill in your name and email.');
    }
    const user = {
      id: 'usr_' + Date.now(),
      name: name.trim(),
      email: email.trim(),
      isDemo: true,
      registeredAt: Date.now(),
      lastLogin: Date.now()
    };
    Store.setUser(user);
    return user;
  },

  enterDemoMode() {
    const demoUser = {
      id: 'demo_user_1',
      name: 'Alex Rivera',
      email: 'alex.learner@example.com',
      isDemo: true,
      lastLogin: Date.now()
    };
    Store.setUser(demoUser);

    // If no profile exists, set a starter profile
    if (!Store.getProfile().displayName) {
      Store.setProfile({
        displayName: 'Alex Rivera',
        targetLevel: 'B2',
        currentLevel: 'A2',
        studyTimePerDay: 30,
        interests: ['Everyday Life', 'Travel & Culture', 'Science & Technology'],
        explanationLanguage: 'en',
        preferredDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
      });
    }

    return demoUser;
  },

  logout() {
    Store.logout();
  }
};
