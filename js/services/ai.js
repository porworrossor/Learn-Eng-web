// ========================================
// LingoPath AI Service Interface
// ========================================

import { CONFIG } from '../config.js';
import { Store } from '../store.js';

export const AIService = {
  isConfigured() {
    const settings = Store.getSettings();
    return Boolean(settings.apiKey || CONFIG.AI_API_KEY);
  },

  async generateTutorReply(userMessage, conversationHistory, context = {}) {
    const settings = Store.getSettings();
    const apiKey = settings.apiKey || CONFIG.AI_API_KEY;

    if (!apiKey) {
      // High-quality contextual demo responses
      return this._mockTutorReply(userMessage, conversationHistory, context);
    }

    try {
      const endpoint = settings.apiEndpoint || CONFIG.AI_API_URL || 'https://api.openai.com/v1/chat/completions';
      const model = settings.aiModel || 'gpt-4o-mini';

      const systemPrompt = `You are LingoPath's friendly, patient, and expert English tutor. 
The learner's estimated CEFR level is ${context.userLevel || 'B1'}.
Current mode: ${context.mode || 'Free Conversation'}.
Correction style: ${settings.correctionStyle || 'balanced'}.
Keep your reply natural, conversational, and appropriate for their CEFR level. 
Ask an engaging follow-up question to keep the conversation moving.
If they make an obvious grammatical mistake, politely offer a gentle alternative expression at the end.`;

      const messages = [
        { role: 'system', content: systemPrompt },
        ...conversationHistory.slice(-8).map(m => ({
          role: m.sender === 'user' ? 'user' : 'assistant',
          content: m.text
        })),
        { role: 'user', content: userMessage }
      ];

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model,
          messages,
          temperature: 0.7,
          max_tokens: 300
        })
      });

      if (!res.ok) {
        throw new Error(`AI API error: HTTP ${res.status}`);
      }

      const data = await res.json();
      return {
        reply: data.choices[0]?.message?.content || "That's very interesting! Could you tell me more?",
        isLiveAI: true
      };
    } catch (err) {
      console.warn('AI API call failed, falling back to educational tutor responses:', err);
      const fallback = this._mockTutorReply(userMessage, conversationHistory, context);
      fallback.warning = 'Using offline educational tutor response (live AI connection unavailable).';
      return fallback;
    }
  },

  _mockTutorReply(userMessage, conversationHistory, context) {
    const text = userMessage.toLowerCase();
    let reply = "";

    if (text.includes('hello') || text.includes('hi') || text.includes('hey')) {
      reply = "Hello! It's fantastic to practice with you today. How has your day been so far?";
    } else if (text.includes('weather') || text.includes('rain') || text.includes('hot') || text.includes('cold')) {
      reply = "Weather is such a classic English conversation topic! What's the climate like where you live during this time of year?";
    } else if (text.includes('job') || text.includes('work') || text.includes('career') || text.includes('study')) {
      reply = "That sounds like a meaningful field to be in. What is the most rewarding or challenging aspect of it?";
    } else if (text.includes('travel') || text.includes('trip') || text.includes('country') || text.includes('place')) {
      reply = "Traveling is an amazing way to sharpen your English skills in real-world contexts. Where would you most like to travel next?";
    } else if (text.includes('hobby') || text.includes('like') || text.includes('enjoy') || text.includes('free time')) {
      reply = "It's so important to have hobbies that energize you. How did you first get interested in that?";
    } else {
      const templates = [
        "That's a thoughtful point. In English, expressing clear ideas like that builds great conversational confidence! What led you to think about that?",
        "I understand completely. Could you give me a specific example or personal story related to that?",
        "Very well articulated! If you were explaining this to a colleague or friend, what key point would you emphasize most?",
        "I appreciate your perspective. How does this compare to what you experienced in the past?"
      ];
      reply = templates[Math.floor(Math.random() * templates.length)];
    }

    return {
      reply,
      isLiveAI: false
    };
  }
};
