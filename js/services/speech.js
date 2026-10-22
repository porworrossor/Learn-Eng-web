// ========================================
// LingoPath Speech Service (TTS & STT)
// ========================================

export const SpeechService = {
  // --- Text-to-Speech (TTS) ---
  isTTSSupported() {
    return 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
  },

  speak(text, lang = 'en-US', rate = 0.95) {
    return new Promise((resolve, reject) => {
      if (!this.isTTSSupported()) {
        console.warn('SpeechSynthesis not supported on this device/browser.');
        resolve(false);
        return;
      }

      window.speechSynthesis.cancel(); // Stop prior speech

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = rate;

      // Select natural English voice if available
      const voices = window.speechSynthesis.getVoices();
      const enVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha')));
      if (enVoice) utterance.voice = enVoice;

      utterance.onend = () => resolve(true);
      utterance.onerror = (e) => {
        console.warn('Speech synthesis error:', e);
        resolve(false);
      };

      window.speechSynthesis.speak(utterance);
    });
  },

  stopSpeaking() {
    if (this.isTTSSupported()) {
      window.speechSynthesis.cancel();
    }
  },

  // --- Speech-to-Text (STT) ---
  isSTTSupported() {
    return 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
  },

  createRecognition(options = {}) {
    if (!this.isSTTSupported()) {
      return null;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = options.lang || 'en-US';
    recognition.continuous = options.continuous || false;
    recognition.interimResults = options.interimResults || false;

    return recognition;
  }
};
