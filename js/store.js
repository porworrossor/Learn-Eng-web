// ========================================
// LingoPath State Store (localStorage)
// ========================================

import { CONFIG } from './config.js';

const PREFIX = CONFIG.STORAGE_PREFIX;

// Event system for state changes
const listeners = {};

export const Store = {
  // --- Core CRUD ---
  get(key) {
    try {
      const raw = localStorage.getItem(PREFIX + key);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      console.warn(`Store.get error for key "${key}":`, e);
      return null;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(PREFIX + key, JSON.stringify(value));
      this._emit(key, value);
    } catch (e) {
      console.error(`Store.set error for key "${key}":`, e);
    }
  },

  remove(key) {
    localStorage.removeItem(PREFIX + key);
    this._emit(key, null);
  },

  // --- Event System ---
  on(key, callback) {
    if (!listeners[key]) listeners[key] = [];
    listeners[key].push(callback);
    return () => {
      listeners[key] = listeners[key].filter(cb => cb !== callback);
    };
  },

  _emit(key, value) {
    if (listeners[key]) {
      listeners[key].forEach(cb => cb(value));
    }
    if (listeners['*']) {
      listeners['*'].forEach(cb => cb(key, value));
    }
  },

  // --- User Management ---
  getUser() {
    return this.get('user');
  },

  setUser(user) {
    this.set('user', { ...user, updatedAt: Date.now() });
  },

  isLoggedIn() {
    const user = this.getUser();
    return user && user.id;
  },

  logout() {
    this.remove('user');
  },

  // --- Profile ---
  getProfile() {
    return this.get('profile') || {};
  },

  setProfile(profile) {
    this.set('profile', { ...profile, updatedAt: Date.now() });
  },

  // --- Placement Assessment ---
  getPlacement() {
    return this.get('placement');
  },

  setPlacement(data) {
    this.set('placement', { ...data, updatedAt: Date.now() });
  },

  // --- Learning Goal ---
  getGoal() {
    return this.get('goal');
  },

  setGoal(goal) {
    this.set('goal', { ...goal, updatedAt: Date.now() });
  },

  // --- Curriculum ---
  getCurriculum() {
    return this.get('curriculum');
  },

  setCurriculum(curriculum) {
    this.set('curriculum', { ...curriculum, updatedAt: Date.now() });
  },

  // --- Progress ---
  getProgress() {
    return this.get('progress') || {
      completedLessons: [],
      lessonScores: {},
      completedModules: [],
      completedStages: [],
      totalStudyMinutes: 0,
      streakDays: 0,
      lastStudyDate: null,
      dailyActivities: {},
      assessmentHistory: []
    };
  },

  setProgress(progress) {
    this.set('progress', { ...progress, updatedAt: Date.now() });
  },

  markLessonComplete(lessonId, score) {
    const progress = this.getProgress();
    if (!progress.completedLessons.includes(lessonId)) {
      progress.completedLessons.push(lessonId);
    }
    progress.lessonScores[lessonId] = {
      score,
      completedAt: Date.now()
    };
    
    // Update streak
    const today = new Date().toDateString();
    if (progress.lastStudyDate !== today) {
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      if (progress.lastStudyDate === yesterday) {
        progress.streakDays = (progress.streakDays || 0) + 1;
      } else if (progress.lastStudyDate !== today) {
        progress.streakDays = 1;
      }
      progress.lastStudyDate = today;
    }
    
    this.setProgress(progress);
  },

  // --- Vocabulary ---
  getVocabulary() {
    return this.get('vocabulary') || [];
  },

  addVocabularyItem(item) {
    const vocab = this.getVocabulary();
    const existing = vocab.find(v => v.word.toLowerCase() === item.word.toLowerCase());
    if (existing) {
      Object.assign(existing, item, { updatedAt: Date.now() });
    } else {
      vocab.push({
        id: 'vocab_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7),
        ...item,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        reviewCount: 0,
        nextReview: Date.now() + 86400000, // 1 day from now
        easeFactor: 2.5,
        interval: 1,
        status: 'new'
      });
    }
    this.set('vocabulary', vocab);
  },

  updateVocabularyReview(vocabId, quality) {
    // SM-2 spaced repetition algorithm
    const vocab = this.getVocabulary();
    const item = vocab.find(v => v.id === vocabId);
    if (!item) return;

    item.reviewCount++;
    
    if (quality >= 3) {
      // Correct
      if (item.reviewCount === 1) {
        item.interval = 1;
      } else if (item.reviewCount === 2) {
        item.interval = 6;
      } else {
        item.interval = Math.round(item.interval * item.easeFactor);
      }
    } else {
      // Incorrect
      item.interval = 1;
      item.reviewCount = 0;
    }

    item.easeFactor = Math.max(1.3,
      item.easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
    );

    item.nextReview = Date.now() + item.interval * 86400000;
    item.status = quality >= 3 ? 'learning' : 'new';
    if (item.interval > 21) item.status = 'mastered';
    item.updatedAt = Date.now();

    this.set('vocabulary', vocab);
  },

  getDueVocabulary() {
    const vocab = this.getVocabulary();
    const now = Date.now();
    return vocab.filter(v => v.nextReview <= now).sort((a, b) => a.nextReview - b.nextReview);
  },

  // --- Conversations ---
  getConversations() {
    return this.get('conversations') || [];
  },

  saveConversation(conversation) {
    const conversations = this.getConversations();
    const existing = conversations.findIndex(c => c.id === conversation.id);
    if (existing >= 0) {
      conversations[existing] = conversation;
    } else {
      conversations.push(conversation);
    }
    this.set('conversations', conversations);
  },

  // --- Error Journal ---
  getErrorJournal() {
    return this.get('errors') || [];
  },

  addError(error) {
    const errors = this.getErrorJournal();
    errors.push({
      id: 'err_' + Date.now(),
      ...error,
      createdAt: Date.now()
    });
    // Keep last 200 errors
    if (errors.length > 200) errors.splice(0, errors.length - 200);
    this.set('errors', errors);
  },

  // --- Settings ---
  getSettings() {
    return this.get('settings') || {
      explanationLanguage: 'en',
      correctionStyle: 'balanced',
      dailyReminder: true,
      theme: 'light'
    };
  },

  setSettings(settings) {
    this.set('settings', { ...settings, updatedAt: Date.now() });
  },

  // --- Bookmarks ---
  getBookmarks() {
    return this.get('bookmarks') || [];
  },

  addBookmark(bookmark) {
    const bookmarks = this.getBookmarks();
    bookmarks.push({ id: 'bm_' + Date.now(), ...bookmark, createdAt: Date.now() });
    this.set('bookmarks', bookmarks);
  },

  removeBookmark(bookmarkId) {
    const bookmarks = this.getBookmarks().filter(b => b.id !== bookmarkId);
    this.set('bookmarks', bookmarks);
  },

  // --- Clear All Data ---
  clearAll() {
    const keys = Object.keys(localStorage).filter(k => k.startsWith(PREFIX));
    keys.forEach(k => localStorage.removeItem(k));
    this._emit('*', null);
  }
};
