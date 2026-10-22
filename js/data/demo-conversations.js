// ========================================
// LingoPath Demo Conversation Scenarios & Tutor Logic
// ========================================

export const CONVERSATION_MODES = [
  {
    id: 'free',
    title: 'Free Conversation',
    icon: '💬',
    description: 'Casual chat about any topic of your choice. Great for building general fluency.',
    prompt: 'You can talk about your day, hobbies, current events, or anything you like.',
    starter: "Hello! It's great to talk with you today. What's on your mind, or what would you like to chat about?"
  },
  {
    id: 'daily',
    title: 'Daily Life',
    icon: '☕',
    description: 'Practical situations: ordering food, shopping, asking directions, hotel check-in.',
    scenarios: [
      { id: 'cafe', title: 'Ordering at a Café', starter: "Welcome to Blue Bottle Coffee! What can I get started for you today?" },
      { id: 'directions', title: 'Asking for Directions', starter: "Excuse me, I seem to be a bit lost. Could you help me find the nearest subway station?" },
      { id: 'hotel', title: 'Hotel Check-in', starter: "Good afternoon! Welcome to the Grand Hyatt. Are you checking in today?" }
    ]
  },
  {
    id: 'academic',
    title: 'Academic English',
    icon: '🎓',
    description: 'Discuss scientific topics, summarize research, defend opinions, and explain concepts.',
    scenarios: [
      { id: 'climate', title: 'Renewable Energy Solutions', starter: "Today we are discussing energy transition. In your view, what is the biggest hurdle to adopting 100% renewable energy worldwide?" },
      { id: 'ai-ethics', title: 'Artificial Intelligence Ethics', starter: "Welcome to our seminar. How do you believe governments should balance AI innovation with privacy regulations?" }
    ]
  },
  {
    id: 'interview',
    title: 'Interview Practice',
    icon: '💼',
    description: 'Simulate job interviews, university admissions, and scholarship panels with structured questions.',
    scenarios: [
      { id: 'job-intro', title: 'Job Interview: Introduction', starter: "Thank you for coming in today. To start off, could you tell me a little bit about yourself and your professional background?" },
      { id: 'job-conflict', title: 'Handling Challenges', starter: "Can you describe a situation where you had a disagreement with a team member and how you resolved it?" }
    ]
  },
  {
    id: 'roleplay',
    title: 'Roleplay',
    icon: '🎭',
    description: 'Step into specific scenarios with defined roles and goals to achieve.',
    scenarios: [
      { id: 'refund', title: 'Returning an Item at a Store', starter: "Hello, welcome to Customer Service. How can I help you today?" },
      { id: 'flight', title: 'Rescheduling a Missed Flight', starter: "Good evening. Flight Desk here. I see your connection was delayed. Let's see what options we have." }
    ]
  },
  {
    id: 'exam',
    title: 'IELTS / CEFR Speaking Exam',
    icon: '⏱️',
    description: 'Structured speaking test simulation with Part 1, Part 2, and Part 3 style prompts.',
    scenarios: [
      { id: 'ielts-p1', title: 'Part 1: Hometown and Studies', starter: "In this first part, I'd like to ask you some questions about yourself. Let's talk about where you live. Could you describe your hometown?" },
      { id: 'ielts-p2', title: 'Part 2: Memorable Journey', starter: "I would like you to describe a memorable trip you took. Tell me where you went, who you went with, and why it was so memorable." }
    ]
  }
];

// Fallback tutor replies when no AI API key is configured
export const TUTOR_RESPONSES = {
  greetings: [
    "That sounds interesting! Could you tell me a little more about that?",
    "I see! How long have you been interested in that?",
    "Great point. In English, we often say that when sharing experiences. What happened next?"
  ],
  followUps: [
    "That makes total sense. Have you had any similar experiences before?",
    "Fascinating! How do you feel about that in general?",
    "I appreciate you explaining that clearly. If you could change one thing about it, what would it be?"
  ]
};

// Generates feedback for conversation session
export function generateConversationReport(messages, userLevel = 'B1', correctionStyle = 'balanced') {
  const userMessages = messages.filter(m => m.sender === 'user');
  const wordCount = userMessages.reduce((sum, m) => sum + m.text.trim().split(/\s+/).length, 0);
  
  // Heuristic grammar and vocabulary tips
  const tips = [];
  const suggestions = [];

  if (wordCount < 30) {
    tips.push("Try giving longer responses with reasons (e.g. 'because...', 'for instance...').");
  } else {
    tips.push("Good response length and willingness to elaborate.");
  }

  suggestions.push({
    original: "I am agree with that.",
    improved: "I agree with that.",
    explanation: "'Agree' is already a verb, so you don't need 'am'."
  });

  suggestions.push({
    original: "More better than before",
    improved: "Much better than before",
    explanation: "'Better' is already comparative; use 'much' or 'far' for emphasis instead of 'more'."
  });

  return {
    id: 'cr_' + Date.now(),
    date: Date.now(),
    turns: userMessages.length,
    totalWords: wordCount,
    estimatedFluency: userMessages.length >= 5 ? userLevel : 'A2',
    strengths: [
      'Maintained conversational flow without long hesitations',
      'Understood prompts and responded appropriately in context',
      'Used relevant vocabulary for the chosen topic'
    ],
    corrections: correctionStyle === 'gentle' ? suggestions.slice(0, 1) : suggestions,
    recommendations: tips,
    rubricScores: {
      taskCompletion: 4,
      fluency: 3.5,
      grammarAccuracy: 3.5,
      vocabularyRange: 4
    }
  };
}
