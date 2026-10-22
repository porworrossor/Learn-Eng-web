// ========================================
// LingoPath Demo Lessons
// ========================================

export const DEMO_LESSONS = {
  // A2 Level Lessons
  'a2-greetings': {
    id: 'a2-greetings',
    title: 'Greetings and Introductions',
    level: 'A2',
    skill: 'speaking',
    duration: 15,
    objectives: [
      'Introduce yourself confidently',
      'Ask and answer personal questions',
      'Use formal and informal greetings'
    ],
    content: {
      explanation: `
        <h4>Formal vs Informal Greetings</h4>
        <p>In English, we change our greetings depending on the situation:</p>
        <div class="example-box">
          <p><strong>Formal:</strong> "Good morning. How do you do?" / "Pleased to meet you."</p>
          <p><strong>Informal:</strong> "Hey! What's up?" / "Nice to meet you!"</p>
        </div>
        <h4>Introducing Yourself</h4>
        <p>A typical self-introduction includes:</p>
        <ul>
          <li>Your name: "My name is..." / "I'm..."</li>
          <li>Where you're from: "I'm from..." / "I come from..."</li>
          <li>What you do: "I'm a student/teacher/engineer..."</li>
          <li>Something about yourself: "I like..." / "I enjoy..."</li>
        </ul>
      `,
      examples: [
        { situation: 'Meeting a new colleague', dialog: 'A: "Hi, I\'m Sarah. I just started working here."\nB: "Welcome! I\'m Tom. Nice to meet you."\nA: "Nice to meet you too. Which department are you in?"' },
        { situation: 'Meeting a friend\'s friend', dialog: 'A: "Hey! I\'m Alex."\nB: "Hi Alex, I\'m Jamie. I\'ve heard a lot about you!"\nA: "All good things, I hope!"' }
      ]
    },
    activities: [
      {
        id: 'a2-g-act1',
        type: 'multiple-choice',
        question: 'Which greeting is most appropriate when meeting a company director for the first time?',
        options: [
          'Hey, what\'s up?',
          'Good morning. Pleased to meet you.',
          'Yo! How\'s it going?',
          'Hi there!'
        ],
        correct: 1,
        explanation: 'When meeting a company director for the first time, a formal greeting is appropriate. "Good morning. Pleased to meet you." is formal and professional.'
      },
      {
        id: 'a2-g-act2',
        type: 'fill-blank',
        question: 'Complete the introduction: "Hi, my name ___ Priya. I ___ from Mumbai, and I ___ studying English."',
        blanks: ['is', 'am', 'am'],
        explanation: 'We use "is" with "my name" (third person), but "am" with "I" (first person). "I am from..." and "I am studying..." both use "am."'
      },
      {
        id: 'a2-g-act3',
        type: 'multiple-choice',
        question: '"How do you do?" is typically used in:',
        options: [
          'Casual conversations with friends',
          'Very formal first meetings',
          'Text messages',
          'Ordering food'
        ],
        correct: 1,
        explanation: '"How do you do?" is a very formal greeting used when meeting someone for the first time in professional or official settings.'
      },
      {
        id: 'a2-g-act4',
        type: 'sentence-order',
        question: 'Put these sentences in the correct order to make a natural conversation:',
        sentences: [
          'Nice to meet you too. I\'m from Thailand.',
          'Hi, I\'m Mark. Where are you from?',
          'Oh, that\'s great! How long have you been here?',
          'About six months. I really like it here.'
        ],
        correctOrder: [1, 0, 2, 3],
        explanation: 'A natural conversation flows: greeting/question → answer → follow-up question → response.'
      },
      {
        id: 'a2-g-act5',
        type: 'writing',
        question: 'Write a short self-introduction (3-4 sentences). Include your name, where you\'re from, what you do, and one thing you enjoy.',
        minWords: 15,
        sampleAnswer: 'Hi, my name is Somchai. I\'m from Bangkok, Thailand. I\'m a university student studying computer science. I enjoy playing football and learning English.'
      }
    ]
  },

  'a2-daily-routines': {
    id: 'a2-daily-routines',
    title: 'Daily Routines and Habits',
    level: 'A2',
    skill: 'grammar',
    duration: 20,
    objectives: [
      'Use present simple for habits and routines',
      'Use time expressions correctly',
      'Describe a typical day'
    ],
    content: {
      explanation: `
        <h4>Present Simple for Routines</h4>
        <p>We use the <strong>present simple</strong> tense to talk about habits, routines, and things that are always true.</p>
        <div class="example-box">
          <p><strong>I/you/we/they</strong> + base verb: "I <strong>wake up</strong> at 7 AM."</p>
          <p><strong>He/she/it</strong> + verb + s/es: "She <strong>wakes up</strong> at 7 AM."</p>
        </div>
        <h4>Common Time Expressions</h4>
        <ul>
          <li><strong>every day/morning/week</strong>: "I exercise every morning."</li>
          <li><strong>always/usually/often/sometimes/rarely/never</strong>: "I usually have coffee."</li>
          <li><strong>at + time</strong>: "I start work at 9 o'clock."</li>
          <li><strong>in the morning/afternoon/evening</strong>: "I study in the evening."</li>
        </ul>
      `,
      examples: [
        { situation: 'Describing a morning routine', dialog: '"I usually wake up at 6:30. First, I take a shower. Then I have breakfast — I always have toast and coffee. After that, I brush my teeth and get dressed."' },
        { situation: 'Talking about weekly habits', dialog: '"I go to the gym three times a week. On Mondays and Wednesdays, I do yoga. On Fridays, I swim. At the weekend, I sometimes go hiking."' }
      ]
    },
    activities: [
      {
        id: 'a2-dr-act1',
        type: 'multiple-choice',
        question: 'Choose the correct sentence:',
        options: [
          'He go to school every day.',
          'He goes to school every day.',
          'He going to school every day.',
          'He is goes to school every day.'
        ],
        correct: 1,
        explanation: 'With "he" (third person singular), we add "-s" or "-es" to the verb: "goes." This is the present simple rule for he/she/it.'
      },
      {
        id: 'a2-dr-act2',
        type: 'fill-blank',
        question: 'Complete: "My sister ___ (not/like) waking up early. She usually ___ (get) up at 10 on weekends."',
        blanks: ["doesn't like", 'gets'],
        explanation: 'Negative present simple with he/she/it: "doesn\'t" + base verb. Positive: verb + s. "She doesn\'t like" and "she gets."'
      },
      {
        id: 'a2-dr-act3',
        type: 'multiple-choice',
        question: 'Where should the adverb "always" go in this sentence? "I ___ eat breakfast."',
        options: [
          'Before the verb: "I always eat breakfast."',
          'After the verb: "I eat always breakfast."',
          'At the end: "I eat breakfast always."',
          'At the beginning: "Always I eat breakfast."'
        ],
        correct: 0,
        explanation: 'Frequency adverbs (always, usually, often, sometimes, rarely, never) go before the main verb: "I always eat breakfast."'
      },
      {
        id: 'a2-dr-act4',
        type: 'error-correction',
        question: 'Find and correct the error: "She don\'t drinks coffee in the morning."',
        correctAnswer: "She doesn't drink coffee in the morning.",
        explanation: 'Two errors: 1) "don\'t" should be "doesn\'t" (third person). 2) After "doesn\'t," use the base form "drink" (not "drinks").'
      },
      {
        id: 'a2-dr-act5',
        type: 'writing',
        question: 'Describe your typical morning routine in 4-5 sentences. Use time expressions and frequency adverbs.',
        minWords: 25,
        sampleAnswer: 'I usually wake up at 7 o\'clock. First, I always check my phone. Then I take a shower and get dressed. I sometimes have rice for breakfast, but I often just have toast. I leave for school at 8:15.'
      }
    ]
  },

  // B1 Level Lessons
  'b1-past-narratives': {
    id: 'b1-past-narratives',
    title: 'Telling Stories: Past Tenses',
    level: 'B1',
    skill: 'grammar',
    duration: 25,
    objectives: [
      'Use past simple and past continuous together',
      'Sequence events using linking words',
      'Tell a story about a past experience'
    ],
    content: {
      explanation: `
        <h4>Past Simple vs Past Continuous</h4>
        <p>When telling stories about the past, we often use two tenses together:</p>
        <div class="example-box">
          <p><strong>Past Simple:</strong> completed actions: "I <strong>walked</strong> to the park."</p>
          <p><strong>Past Continuous:</strong> background/ongoing actions: "The sun <strong>was shining</strong>."</p>
          <p><strong>Together:</strong> "I <strong>was walking</strong> to the park when I <strong>saw</strong> an old friend."</p>
        </div>
        <h4>Story Linking Words</h4>
        <ul>
          <li><strong>First / At first</strong> — to begin the story</li>
          <li><strong>Then / After that / Next</strong> — to sequence events</li>
          <li><strong>While / When</strong> — for simultaneous or interrupting actions</li>
          <li><strong>Suddenly / Unexpectedly</strong> — for surprising events</li>
          <li><strong>Eventually / In the end / Finally</strong> — to conclude</li>
        </ul>
      `,
      examples: [
        { situation: 'A travel story', dialog: '"Last summer, I was traveling through Japan. I was sitting on a train when I suddenly realized I was on the wrong line! I quickly got off at the next station and asked for directions. The people were so kind — they walked me to the right platform. Eventually, I arrived at my hotel, tired but grateful."' }
      ]
    },
    activities: [
      {
        id: 'b1-pn-act1',
        type: 'multiple-choice',
        question: 'Choose the correct combination: "I ___ dinner when the power ___ out."',
        options: [
          'cooked / went',
          'was cooking / went',
          'cooked / was going',
          'am cooking / goes'
        ],
        correct: 1,
        explanation: 'The ongoing action (cooking) uses past continuous. The interrupting action (power outage) uses past simple. "Was cooking" (background) + "went" (sudden event).'
      },
      {
        id: 'b1-pn-act2',
        type: 'multiple-choice',
        question: '"While she ___ for the bus, she ___ a strange noise."',
        options: [
          'waited / was hearing',
          'was waiting / heard',
          'was waiting / was hearing',
          'waited / heard'
        ],
        correct: 1,
        explanation: '"While" introduces the background action (past continuous: was waiting). The sudden event uses past simple (heard).'
      },
      {
        id: 'b1-pn-act3',
        type: 'sentence-order',
        question: 'Arrange these events into a logical story:',
        sentences: [
          'Eventually, the fire department arrived and put out the fire.',
          'I was sleeping peacefully at 3 AM.',
          'I grabbed my phone and called for help.',
          'Suddenly, I heard a loud alarm.',
          'I ran outside and saw smoke coming from the building next door.'
        ],
        correctOrder: [1, 3, 4, 2, 0],
        explanation: 'A good story has: setting (sleeping) → disruption (alarm) → action sequence (ran outside → called for help) → resolution (fire department arrived).'
      },
      {
        id: 'b1-pn-act4',
        type: 'writing',
        question: 'Tell a short story about an unexpected event that happened to you. Use past simple, past continuous, and at least three linking words. Write 5-8 sentences.',
        minWords: 40,
        sampleAnswer: 'Last year, I was walking home from school when I suddenly heard someone calling my name. At first, I couldn\'t see who it was. Then I turned around and saw my childhood friend who I hadn\'t seen for five years! We were so surprised that we just stood there smiling. After that, we went to a café and talked for hours. Eventually, we exchanged phone numbers and now we meet every month. It was such a wonderful surprise.'
      }
    ]
  },

  // B2 Level Lesson
  'b2-opinion-essays': {
    id: 'b2-opinion-essays',
    title: 'Expressing Opinions: Agreement and Disagreement',
    level: 'B2',
    skill: 'writing',
    duration: 25,
    objectives: [
      'Express opinions using sophisticated language',
      'Agree and disagree politely',
      'Support arguments with evidence and examples'
    ],
    content: {
      explanation: `
        <h4>Expressing Opinions</h4>
        <p>At the B2 level, you should use varied and nuanced opinion language:</p>
        <div class="example-box">
          <p><strong>Strong opinion:</strong> "I firmly believe that..." / "I'm convinced that..."</p>
          <p><strong>Moderate opinion:</strong> "I tend to think that..." / "It seems to me that..."</p>
          <p><strong>Tentative opinion:</strong> "I'm inclined to agree, although..." / "I would argue that..."</p>
        </div>
        <h4>Agreeing and Disagreeing</h4>
        <div class="example-box">
          <p><strong>Agreeing:</strong> "I couldn't agree more." / "That's a valid point." / "I see exactly what you mean."</p>
          <p><strong>Partial agreement:</strong> "I see your point, but..." / "That may be true, however..." / "While I understand your perspective..."</p>
          <p><strong>Disagreeing politely:</strong> "I'm afraid I disagree." / "I see it somewhat differently." / "With all due respect, I think..."</p>
        </div>
        <h4>Supporting Your Arguments</h4>
        <ul>
          <li><strong>Evidence:</strong> "Research shows that..." / "According to..."</li>
          <li><strong>Examples:</strong> "For instance..." / "A case in point is..."</li>
          <li><strong>Reasons:</strong> "This is because..." / "The main reason for this is..."</li>
          <li><strong>Concession:</strong> "Admittedly..." / "It is true that..., nevertheless..."</li>
        </ul>
      `,
      examples: []
    },
    activities: [
      {
        id: 'b2-oe-act1',
        type: 'multiple-choice',
        question: 'Which response best shows polite disagreement in a formal discussion?',
        options: [
          '"You\'re wrong about that."',
          '"No way, that\'s ridiculous."',
          '"I see your point, but I would argue that the evidence suggests otherwise."',
          '"I don\'t agree and I don\'t want to discuss it."'
        ],
        correct: 2,
        explanation: 'This response acknowledges the other person\'s view ("I see your point") before presenting a counter-argument with reference to evidence — polite and professional.'
      },
      {
        id: 'b2-oe-act2',
        type: 'fill-blank',
        question: 'Complete the argument: "___ it is true that social media connects people globally, ___ it can also lead to increased isolation and superficial relationships."',
        blanks: ['While', 'nevertheless'],
        explanation: '"While... nevertheless" is a concession structure. You acknowledge a valid point (While...) then present your counter-argument (nevertheless...).'
      },
      {
        id: 'b2-oe-act3',
        type: 'writing',
        question: 'Write a paragraph (60-100 words) expressing your opinion on the following statement: "Schools should teach practical life skills such as cooking and financial management." Use at least two opinion expressions and support your view with reasons.',
        minWords: 50,
        sampleAnswer: 'I firmly believe that schools should incorporate practical life skills into their curriculum. While academic subjects remain essential, the reality is that many graduates enter adulthood without knowing how to manage a budget or cook a nutritious meal. For instance, a recent survey found that 60% of young adults feel unprepared for basic financial decisions. Teaching these skills wouldn\'t replace traditional subjects but would complement them, producing more well-rounded individuals. Admittedly, finding time in an already crowded curriculum presents a challenge, but the long-term benefits would far outweigh the costs.'
      }
    ]
  },

  // Reading lesson
  'b1-reading-tech': {
    id: 'b1-reading-tech',
    title: 'Reading: Technology in Education',
    level: 'B1',
    skill: 'reading',
    duration: 20,
    objectives: [
      'Understand main ideas in informational texts',
      'Identify supporting details',
      'Learn vocabulary related to technology and education'
    ],
    content: {
      explanation: `
        <h4>Reading Strategy: Identifying Main Ideas</h4>
        <p>When reading informational texts:</p>
        <ul>
          <li><strong>Look at the first sentence</strong> of each paragraph — it often contains the main idea.</li>
          <li><strong>Ask yourself:</strong> "What is this paragraph about?"</li>
          <li><strong>Distinguish</strong> between the main idea and supporting details (examples, statistics, quotes).</li>
        </ul>
      `,
      examples: []
    },
    activities: [
      {
        id: 'b1-rt-act1',
        type: 'reading-comprehension',
        passage: `Artificial intelligence is beginning to transform education in significant ways. AI-powered tutoring systems can now adapt to each student's learning pace and style, providing personalized exercises and explanations. When a student struggles with a concept, the system can offer additional practice or approach the topic from a different angle.

However, many educators worry about over-reliance on technology. They argue that human teachers provide something that AI cannot: emotional support, mentorship, and the ability to inspire curiosity. A teacher can notice when a student seems sad or distracted, while an AI system typically cannot.

The most promising approach may be a combination of both. Teachers can use AI tools to handle routine tasks like grading and tracking progress, freeing up time to focus on what they do best — connecting with students and fostering a love of learning.`,
        questions: [
          {
            question: 'What is the main advantage of AI tutoring systems mentioned in the passage?',
            options: [
              'They are cheaper than human teachers.',
              'They can personalize learning for each student.',
              'They never make mistakes.',
              'They are more popular with students.'
            ],
            correct: 1,
            explanation: 'The passage states AI systems "can adapt to each student\'s learning pace and style, providing personalized exercises."'
          },
          {
            question: 'According to the passage, what can human teachers do that AI cannot?',
            options: [
              'Grade papers quickly',
              'Track student progress',
              'Provide emotional support and inspiration',
              'Teach mathematics'
            ],
            correct: 2,
            explanation: 'The passage says teachers provide "emotional support, mentorship, and the ability to inspire curiosity."'
          },
          {
            question: 'What does the author suggest as the best approach?',
            options: [
              'Replace teachers with AI',
              'Ban AI from classrooms',
              'Combine AI tools with human teaching',
              'Let students choose between AI and teachers'
            ],
            correct: 2,
            explanation: '"The most promising approach may be a combination of both" — using AI for routine tasks while teachers focus on human connection.'
          }
        ]
      }
    ]
  }
};

// Generate curriculum structure from demo lessons
export function generateDemoCurriculum(currentLevel, targetLevel) {
  const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  const currentIdx = levels.indexOf(currentLevel);
  const targetIdx = levels.indexOf(targetLevel);
  
  const stages = [];
  
  for (let i = currentIdx; i <= targetIdx; i++) {
    const level = levels[i];
    const isFirst = i === currentIdx;
    const isLast = i === targetIdx;
    
    const modules = [];
    
    // Generate modules for each level
    const moduleTemplates = getModulesForLevel(level, isFirst);
    moduleTemplates.forEach((template, idx) => {
      const lessons = [];
      
      // Check if we have demo lessons for this
      const demoKey = Object.keys(DEMO_LESSONS).find(k => 
        DEMO_LESSONS[k].level === level && DEMO_LESSONS[k].skill === template.skill
      );
      
      if (demoKey) {
        lessons.push({
          id: DEMO_LESSONS[demoKey].id,
          title: DEMO_LESSONS[demoKey].title,
          duration: DEMO_LESSONS[demoKey].duration,
          type: 'interactive',
          hasDemo: true
        });
      }
      
      // Add placeholder lessons
      template.lessonTitles.forEach((title, lIdx) => {
        if (!lessons.find(l => l.title === title)) {
          lessons.push({
            id: `${level.toLowerCase()}-${template.skill}-${idx}-${lIdx}`,
            title,
            duration: 15 + Math.floor(Math.random() * 15),
            type: 'interactive',
            hasDemo: demoKey ? false : lIdx === 0
          });
        }
      });
      
      modules.push({
        id: `module-${level.toLowerCase()}-${idx}`,
        title: template.title,
        skill: template.skill,
        level,
        duration: lessons.reduce((sum, l) => sum + l.duration, 0),
        objectives: template.objectives,
        lessons,
        mastery: 0
      });
    });

    stages.push({
      id: `stage-${i + 1}`,
      number: i - currentIdx + 1,
      title: isFirst ? `Strengthen ${level} Foundations` : 
             isLast ? `Achieve ${level} Proficiency` : 
             `Develop ${level} Skills`,
      level,
      description: isFirst ? `Review and solidify your current ${level} skills.` :
                   `Build competency in ${level}-level English across all skills.`,
      modules,
      isCompleted: false,
      isActive: isFirst
    });
  }
  
  return {
    id: 'curriculum_' + Date.now(),
    currentLevel,
    targetLevel,
    stages,
    createdAt: Date.now(),
    totalModules: stages.reduce((sum, s) => sum + s.modules.length, 0),
    totalLessons: stages.reduce((sum, s) => sum + s.modules.reduce((ms, m) => ms + m.lessons.length, 0), 0),
    estimatedHours: Math.round(stages.reduce((sum, s) => sum + s.modules.reduce((ms, m) => ms + m.duration, 0), 0) / 60)
  };
}

function getModulesForLevel(level, isFoundation) {
  const moduleSets = {
    A1: [
      {
        title: 'Essential Greetings & Phrases',
        skill: 'speaking',
        objectives: ['Use basic greetings', 'Introduce yourself', 'Ask simple questions'],
        lessonTitles: ['Hello and Goodbye', 'What\'s Your Name?', 'Numbers and Counting', 'Days and Months']
      },
      {
        title: 'Basic Sentence Patterns',
        skill: 'grammar',
        objectives: ['Form simple present sentences', 'Use articles a/an/the', 'Make plurals'],
        lessonTitles: ['Subject + Verb + Object', 'Articles: A, An, The', 'Singular and Plural Nouns', 'Simple Questions with Do/Does']
      },
      {
        title: 'Everyday Vocabulary',
        skill: 'vocabulary',
        objectives: ['Learn 100 most common words', 'Describe objects and people', 'Name places and things'],
        lessonTitles: ['Family Members', 'Colors and Shapes', 'Food and Drinks', 'Places in a City']
      },
      {
        title: 'Reading Simple Texts',
        skill: 'reading',
        objectives: ['Understand signs and notices', 'Read simple messages', 'Follow basic instructions'],
        lessonTitles: ['Signs Around Us', 'Reading Messages', 'Simple Instructions', 'Short Stories']
      }
    ],
    A2: [
      {
        title: 'Greetings & Introductions',
        skill: 'speaking',
        objectives: ['Introduce yourself confidently', 'Use formal and informal language', 'Talk about your interests'],
        lessonTitles: ['Greetings and Introductions', 'Talking About Yourself', 'Asking About Others', 'Making Plans']
      },
      {
        title: 'Daily Routines & Habits',
        skill: 'grammar',
        objectives: ['Use present simple for habits', 'Use frequency adverbs', 'Describe daily activities'],
        lessonTitles: ['Daily Routines and Habits', 'Frequency Adverbs', 'Telling the Time', 'Weekend Activities']
      },
      {
        title: 'Past Events & Experiences',
        skill: 'grammar',
        objectives: ['Use past simple regular/irregular verbs', 'Tell simple past stories', 'Use past time expressions'],
        lessonTitles: ['Past Simple: Regular Verbs', 'Past Simple: Irregular Verbs', 'Telling Past Stories', 'Last Weekend']
      },
      {
        title: 'Everyday Reading',
        skill: 'reading',
        objectives: ['Read short articles', 'Understand emails', 'Follow simple news stories'],
        lessonTitles: ['Reading Emails', 'Simple News Stories', 'Restaurant Menus', 'Travel Information']
      },
      {
        title: 'Practical Listening',
        skill: 'listening',
        objectives: ['Understand announcements', 'Follow simple conversations', 'Get key information from audio'],
        lessonTitles: ['At the Airport', 'Phone Conversations', 'Weather Reports', 'Directions']
      }
    ],
    B1: [
      {
        title: 'Past Tenses for Storytelling',
        skill: 'grammar',
        objectives: ['Combine past simple and past continuous', 'Use past perfect', 'Sequence events clearly'],
        lessonTitles: ['Telling Stories: Past Tenses', 'Past Perfect', 'Narrative Linking Words', 'Anecdotes and Experiences']
      },
      {
        title: 'Expressing Opinions',
        skill: 'speaking',
        objectives: ['Give and support opinions', 'Agree and disagree politely', 'Discuss everyday topics'],
        lessonTitles: ['Giving Opinions', 'Agreeing and Disagreeing', 'Discussion Skills', 'Debate Practice']
      },
      {
        title: 'Intermediate Reading Skills',
        skill: 'reading',
        objectives: ['Understand main ideas', 'Identify supporting details', 'Infer meaning from context'],
        lessonTitles: ['Technology in Education', 'Current Events', 'Opinion Articles', 'Short Academic Texts']
      },
      {
        title: 'Intermediate Writing',
        skill: 'writing',
        objectives: ['Write paragraphs with topic sentences', 'Use linking words', 'Write informal emails'],
        lessonTitles: ['Paragraph Structure', 'Linking Words and Cohesion', 'Informal Emails', 'Story Writing']
      },
      {
        title: 'Conditional Sentences',
        skill: 'grammar',
        objectives: ['Use first and second conditionals', 'Talk about possibilities and hypotheticals', 'Make polite requests'],
        lessonTitles: ['First Conditional: Real Possibilities', 'Second Conditional: Imaginary', 'Mixed Practice', 'Polite Language']
      }
    ],
    B2: [
      {
        title: 'Advanced Grammar Structures',
        skill: 'grammar',
        objectives: ['Use all conditional forms', 'Master passive voice', 'Use reported speech naturally'],
        lessonTitles: ['Third Conditional', 'Advanced Passive Voice', 'Reported Speech', 'Inversion for Emphasis']
      },
      {
        title: 'Opinion Essays & Arguments',
        skill: 'writing',
        objectives: ['Write structured opinion essays', 'Build persuasive arguments', 'Use academic vocabulary'],
        lessonTitles: ['Expressing Opinions: Agreement and Disagreement', 'Essay Structure', 'Persuasive Writing', 'Formal vs Informal Register']
      },
      {
        title: 'Academic Reading',
        skill: 'reading',
        objectives: ['Read complex articles', 'Analyze arguments', 'Identify bias and perspective'],
        lessonTitles: ['Academic Articles', 'Critical Reading', 'Analyzing Arguments', 'Research Summaries']
      },
      {
        title: 'Fluency & Communication',
        skill: 'speaking',
        objectives: ['Discuss complex topics', 'Give presentations', 'Handle challenging conversations'],
        lessonTitles: ['Complex Discussion', 'Presentation Skills', 'Negotiation Language', 'Dealing with Misunderstandings']
      }
    ],
    C1: [
      {
        title: 'Nuanced Grammar',
        skill: 'grammar',
        objectives: ['Use cleft sentences', 'Master participle clauses', 'Use formal structures naturally'],
        lessonTitles: ['Cleft Sentences', 'Participle Clauses', 'Formal Register', 'Subtle Meaning']
      },
      {
        title: 'Academic Writing',
        skill: 'writing',
        objectives: ['Write research-style essays', 'Use hedging language', 'Cite and reference'],
        lessonTitles: ['Academic Essay Writing', 'Hedging and Modality', 'Critical Analysis', 'Literature Reviews']
      },
      {
        title: 'Advanced Comprehension',
        skill: 'reading',
        objectives: ['Understand nuanced texts', 'Identify implicit meaning', 'Read academic papers'],
        lessonTitles: ['Nuanced Reading', 'Implicit Meaning', 'Academic Papers', 'Complex Arguments']
      },
      {
        title: 'Professional Communication',
        skill: 'speaking',
        objectives: ['Lead discussions', 'Present complex arguments', 'Use idiomatic language naturally'],
        lessonTitles: ['Leading Discussions', 'Complex Arguments', 'Idiomatic English', 'Professional Presentations']
      }
    ],
    C2: [
      {
        title: 'Mastery Grammar',
        skill: 'grammar',
        objectives: ['Master all advanced structures', 'Use stylistic variation', 'Understand archaic forms'],
        lessonTitles: ['Style and Register', 'Advanced Conjunctions', 'Literary Grammar', 'Error-Free Writing']
      },
      {
        title: 'Expert Writing',
        skill: 'writing',
        objectives: ['Write at publication quality', 'Adapt style to purpose', 'Use rhetorical devices'],
        lessonTitles: ['Publication-Quality Writing', 'Rhetorical Devices', 'Style Adaptation', 'Creative Writing']
      },
      {
        title: 'Native-Level Comprehension',
        skill: 'reading',
        objectives: ['Understand any English text', 'Appreciate literary devices', 'Read critically and analytically'],
        lessonTitles: ['Literary Analysis', 'Critical Reviews', 'Complex Academic Texts', 'Cultural References']
      }
    ]
  };
  
  return moduleSets[level] || moduleSets['A2'];
}
