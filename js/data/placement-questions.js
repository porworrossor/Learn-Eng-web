// ========================================
// LingoPath Placement Test Questions
// ========================================

export const PLACEMENT_SECTIONS = [
  {
    id: 'grammar',
    name: 'Grammar & Vocabulary',
    icon: '📝',
    description: 'Test your knowledge of English grammar rules and vocabulary range.',
    instructions: 'Choose the best answer for each question. There is only one correct answer.'
  },
  {
    id: 'reading',
    name: 'Reading Comprehension',
    icon: '📖',
    description: 'Read short passages and answer questions to test your understanding.',
    instructions: 'Read each passage carefully, then answer the questions that follow.'
  },
  {
    id: 'listening',
    name: 'Listening Comprehension',
    icon: '🎧',
    description: 'Listen to audio or read transcripts and answer comprehension questions.',
    instructions: 'In demo mode, transcripts are provided. Read them and answer the questions.'
  },
  {
    id: 'writing',
    name: 'Writing',
    icon: '✍️',
    description: 'Write short responses to demonstrate your English writing ability.',
    instructions: 'Write your responses as clearly and naturally as you can.'
  }
];

export const PLACEMENT_QUESTIONS = {
  grammar: [
    // A1 Level
    {
      id: 'g1',
      type: 'multiple-choice',
      difficulty: 'A1',
      question: 'She ___ a student.',
      options: ['am', 'is', 'are', 'be'],
      correct: 1,
      explanation: '"She" is a third-person singular pronoun, so we use "is" with it. "I am," "you/we/they are," "he/she/it is."'
    },
    {
      id: 'g2',
      type: 'multiple-choice',
      difficulty: 'A1',
      question: 'I ___ breakfast every morning.',
      options: ['has', 'have', 'having', 'had'],
      correct: 1,
      explanation: '"I" takes the base form "have" in the simple present tense. "Has" is used with he/she/it.'
    },
    {
      id: 'g3',
      type: 'multiple-choice',
      difficulty: 'A1',
      question: 'There are five ___ on the table.',
      options: ['book', 'books', 'bookes', 'booking'],
      correct: 1,
      explanation: 'After a number greater than one, we use the plural form. Most nouns form their plural by adding "-s."'
    },
    // A2 Level
    {
      id: 'g4',
      type: 'multiple-choice',
      difficulty: 'A2',
      question: 'I ___ to the cinema last night.',
      options: ['go', 'goes', 'went', 'going'],
      correct: 2,
      explanation: '"Last night" indicates past tense. The past tense of "go" is "went" (irregular verb).'
    },
    {
      id: 'g5',
      type: 'multiple-choice',
      difficulty: 'A2',
      question: 'She is ___ than her sister.',
      options: ['tall', 'taller', 'tallest', 'more tall'],
      correct: 1,
      explanation: 'For short adjectives (one syllable), we add "-er" to make comparisons. "Taller than" compares two people.'
    },
    {
      id: 'g6',
      type: 'multiple-choice',
      difficulty: 'A2',
      question: 'We ___ TV when the phone rang.',
      options: ['watch', 'watched', 'were watching', 'have watched'],
      correct: 2,
      explanation: 'We use the past continuous (were watching) for an action in progress when interrupted by another event (the phone rang).'
    },
    // B1 Level
    {
      id: 'g7',
      type: 'multiple-choice',
      difficulty: 'B1',
      question: 'If I ___ more time, I would travel the world.',
      options: ['have', 'had', 'would have', 'having'],
      correct: 1,
      explanation: 'This is a second conditional sentence (hypothetical present/future). The structure is: If + past simple, would + base verb.'
    },
    {
      id: 'g8',
      type: 'multiple-choice',
      difficulty: 'B1',
      question: 'The report ___ by the team last week.',
      options: ['wrote', 'was written', 'has written', 'is writing'],
      correct: 1,
      explanation: 'This is a passive voice sentence (past simple passive). The structure is: was/were + past participle. The report received the action.'
    },
    {
      id: 'g9',
      type: 'multiple-choice',
      difficulty: 'B1',
      question: 'She asked me where I ___.',
      options: ['live', 'lived', 'do live', 'am living'],
      correct: 1,
      explanation: 'In reported speech with "asked," the tense shifts back. Present simple becomes past simple. "Where do you live?" becomes "where I lived."'
    },
    // B2 Level
    {
      id: 'g10',
      type: 'multiple-choice',
      difficulty: 'B2',
      question: '___ the rain, they decided to go hiking.',
      options: ['Despite', 'Although', 'However', 'Because of'],
      correct: 0,
      explanation: '"Despite" is a preposition followed by a noun/gerund, meaning "in spite of." "Although" would need a clause with a subject and verb.'
    },
    {
      id: 'g11',
      type: 'multiple-choice',
      difficulty: 'B2',
      question: 'Not only ___ the exam, but she also got the highest score.',
      options: ['she passed', 'did she pass', 'she did pass', 'passed she'],
      correct: 1,
      explanation: '"Not only" at the beginning of a sentence requires subject-verb inversion. The auxiliary "did" comes before the subject "she."'
    },
    {
      id: 'g12',
      type: 'multiple-choice',
      difficulty: 'B2',
      question: 'I wish I ___ harder when I was at university.',
      options: ['study', 'studied', 'had studied', 'would study'],
      correct: 2,
      explanation: '"I wish" + past perfect expresses regret about something in the past. "Had studied" is the past perfect form.'
    },
    // C1 Level
    {
      id: 'g13',
      type: 'multiple-choice',
      difficulty: 'C1',
      question: 'The project, ___ had been in development for two years, was finally completed.',
      options: ['that', 'which', 'what', 'whose'],
      correct: 1,
      explanation: '"Which" introduces a non-defining relative clause (set off by commas) that gives extra information about "the project."'
    },
    {
      id: 'g14',
      type: 'multiple-choice',
      difficulty: 'C1',
      question: 'Had I known about the delay, I ___ alternative arrangements.',
      options: ['will make', 'would make', 'would have made', 'had made'],
      correct: 2,
      explanation: 'This is a third conditional with inversion. "Had I known" = "If I had known." The result clause uses "would have + past participle."'
    },
    {
      id: 'g15',
      type: 'multiple-choice',
      difficulty: 'C1',
      question: 'The CEO is believed ___ the company through the crisis effectively.',
      options: ['to lead', 'to have led', 'leading', 'having led'],
      correct: 1,
      explanation: 'When reporting beliefs about past events, we use "is believed to have + past participle." This combines passive reporting with a perfect infinitive.'
    },
    // C2 Level  
    {
      id: 'g16',
      type: 'multiple-choice',
      difficulty: 'C2',
      question: 'Scarcely ___ the announcement when the crowd erupted in applause.',
      options: ['he had made', 'had he made', 'he made', 'did he make'],
      correct: 1,
      explanation: '"Scarcely" at the beginning requires subject-auxiliary inversion with the past perfect: "Scarcely had he made..." This emphasizes how quickly the crowd reacted.'
    },
    {
      id: 'g17',
      type: 'multiple-choice',
      difficulty: 'C2',
      question: 'The phenomenon, ___ it may seem, has a perfectly rational explanation.',
      options: ['however strange', 'how strange', 'strange as', 'no matter strange'],
      correct: 0,
      explanation: '"However + adjective" is a concessive clause meaning "no matter how strange." It\'s a sophisticated way to acknowledge something surprising before providing an explanation.'
    },
    {
      id: 'g18',
      type: 'multiple-choice',
      difficulty: 'C2',
      question: 'Select the sentence with the correct use of the subjunctive:',
      options: [
        'The committee insists that he attends the meeting.',
        'The committee insists that he attend the meeting.',
        'The committee insists that he will attend the meeting.',
        'The committee insists that he is attending the meeting.'
      ],
      correct: 1,
      explanation: 'The subjunctive mood is used after verbs like "insist," "recommend," "suggest." The base form "attend" (not "attends") is required regardless of the subject.'
    },
    // Vocabulary - A1/A2
    {
      id: 'v1',
      type: 'multiple-choice',
      difficulty: 'A1',
      question: 'What is the opposite of "hot"?',
      options: ['warm', 'cool', 'cold', 'mild'],
      correct: 2,
      explanation: '"Cold" is the direct opposite of "hot." "Cool" and "warm" are in between, and "mild" means moderate temperature.'
    },
    {
      id: 'v2',
      type: 'multiple-choice',
      difficulty: 'A2',
      question: '"I\'m really looking forward ___ the concert next week."',
      options: ['to', 'for', 'at', 'in'],
      correct: 0,
      explanation: '"Look forward to" is a phrasal verb meaning to anticipate something with pleasure. It is always followed by "to" (+ noun/gerund).'
    },
    // Vocabulary - B1/B2
    {
      id: 'v3',
      type: 'multiple-choice',
      difficulty: 'B1',
      question: 'The word "substantial" is closest in meaning to:',
      options: ['tiny', 'considerable', 'temporary', 'obvious'],
      correct: 1,
      explanation: '"Substantial" means large in amount, size, or importance — similar to "considerable."'
    },
    {
      id: 'v4',
      type: 'multiple-choice',
      difficulty: 'B2',
      question: '"The new policy will have far-reaching ___."',
      options: ['consequences', 'sequences', 'frequencies', 'references'],
      correct: 0,
      explanation: '"Far-reaching consequences" is a common collocation meaning effects that are widespread and significant.'
    },
    // Vocabulary - C1/C2
    {
      id: 'v5',
      type: 'multiple-choice',
      difficulty: 'C1',
      question: 'To "exacerbate" a problem means to:',
      options: ['solve it', 'ignore it', 'make it worse', 'discover it'],
      correct: 2,
      explanation: '"Exacerbate" means to make a bad situation even worse. It\'s a formal, academic-level word.'
    },
    {
      id: 'v6',
      type: 'multiple-choice',
      difficulty: 'C2',
      question: 'The journalist\'s ___ investigation uncovered widespread corruption.',
      options: ['meticulous', 'notorious', 'ambiguous', 'spontaneous'],
      correct: 0,
      explanation: '"Meticulous" means extremely careful and precise, with great attention to detail — exactly what a thorough investigation requires.'
    }
  ],

  reading: [
    {
      id: 'r1',
      type: 'reading-comprehension',
      difficulty: 'A2',
      passage: `Maria wakes up at 7 o'clock every morning. She has breakfast with her family — usually toast and orange juice. Then she takes the bus to school. Her favorite subject is science because she likes doing experiments. After school, she plays tennis with her friends. In the evening, she does her homework and reads a book before going to bed at 10 o'clock.`,
      questions: [
        {
          id: 'r1q1',
          question: 'What time does Maria wake up?',
          options: ['6 o\'clock', '7 o\'clock', '8 o\'clock', '10 o\'clock'],
          correct: 1,
          explanation: 'The passage states "Maria wakes up at 7 o\'clock every morning."'
        },
        {
          id: 'r1q2',
          question: 'Why does Maria like science?',
          options: ['Because of the teacher', 'Because she likes experiments', 'Because it is easy', 'Because her friends like it'],
          correct: 1,
          explanation: 'The passage says "she likes doing experiments" as the reason she enjoys science.'
        },
        {
          id: 'r1q3',
          question: 'What does Maria do after school?',
          options: ['She does homework', 'She reads a book', 'She plays tennis', 'She watches TV'],
          correct: 2,
          explanation: '"After school, she plays tennis with her friends."'
        }
      ]
    },
    {
      id: 'r2',
      type: 'reading-comprehension',
      difficulty: 'B1',
      passage: `Remote work has become increasingly common since the global pandemic. Many companies have discovered that employees can be just as productive working from home as in an office. However, remote work is not without its challenges. Some workers struggle with loneliness and find it difficult to separate their work life from their personal life. Others miss the spontaneous conversations and creative collaboration that happen naturally in an office environment. Despite these challenges, surveys consistently show that a majority of workers prefer a hybrid model that combines remote and office work.`,
      questions: [
        {
          id: 'r2q1',
          question: 'What is the main idea of this passage?',
          options: [
            'Remote work is always better than office work.',
            'Remote work became common and has both benefits and challenges.',
            'Companies should force employees to return to the office.',
            'The pandemic destroyed the traditional workplace.'
          ],
          correct: 1,
          explanation: 'The passage presents a balanced view: remote work has benefits (productivity) but also challenges (loneliness, work-life balance).'
        },
        {
          id: 'r2q2',
          question: 'According to the passage, what do most workers prefer?',
          options: [
            'Working fully from home',
            'Working only in the office',
            'A hybrid model combining remote and office work',
            'Working in a different city'
          ],
          correct: 2,
          explanation: 'The last sentence states that "a majority of workers prefer a hybrid model."'
        },
        {
          id: 'r2q3',
          question: 'What does "spontaneous" most likely mean in this context?',
          options: ['Planned carefully', 'Happening naturally without planning', 'Formal and structured', 'Repeated regularly'],
          correct: 1,
          explanation: '"Spontaneous" means occurring naturally without being planned — like casual office conversations that happen by chance.'
        }
      ]
    },
    {
      id: 'r3',
      type: 'reading-comprehension',
      difficulty: 'B2',
      passage: `The concept of neuroplasticity — the brain's ability to reorganize itself by forming new neural connections throughout life — has revolutionized our understanding of human cognition. Previously, scientists believed that the brain's structure was essentially fixed after a critical period in early childhood. We now know that learning new skills, recovering from injury, and adapting to new environments all involve the creation and strengthening of neural pathways. This discovery has profound implications for education, rehabilitation medicine, and our understanding of mental health disorders. However, neuroplasticity diminishes with age, which is why learning a new language or instrument is typically easier for children than for adults, though it remains possible at any age.`,
      questions: [
        {
          id: 'r3q1',
          question: 'What was the previous scientific belief about the brain?',
          options: [
            'The brain could change at any time.',
            'The brain\'s structure was fixed after early childhood.',
            'Neuroplasticity increased with age.',
            'The brain stopped growing at birth.'
          ],
          correct: 1,
          explanation: 'The passage states that "scientists believed that the brain\'s structure was essentially fixed after a critical period in early childhood."'
        },
        {
          id: 'r3q2',
          question: 'What can be inferred about adult language learning from this passage?',
          options: [
            'It is impossible for adults to learn a new language.',
            'Adults learn languages faster than children.',
            'Adults can still learn languages but it may require more effort.',
            'Only children can form new neural connections.'
          ],
          correct: 2,
          explanation: 'The passage says neuroplasticity "diminishes with age" making it "typically easier for children" but "remains possible at any age." This implies adults can learn but with more effort.'
        },
        {
          id: 'r3q3',
          question: 'The word "profound" in the passage is closest in meaning to:',
          options: ['Simple', 'Deep and significant', 'Temporary', 'Obvious'],
          correct: 1,
          explanation: '"Profound" means very deep, intense, or significant. The discovery has deep, far-reaching implications.'
        }
      ]
    },
    {
      id: 'r4',
      type: 'reading-comprehension',
      difficulty: 'C1',
      passage: `The paradox of choice, first articulated by psychologist Barry Schwartz, suggests that while some degree of choice is undeniably beneficial, an excessive number of options can lead to anxiety, decision paralysis, and decreased satisfaction with the eventual choice made. This counterintuitive finding challenges the conventional economic assumption that more choices invariably lead to greater consumer welfare. Research has demonstrated that when presented with an overwhelming array of alternatives, individuals often resort to simplifying heuristics, defer the decision entirely, or subsequently experience regret about the option they selected, perpetually wondering whether an alternative would have been superior. The implications extend far beyond consumer behavior, touching on career decisions, relationship choices, and even healthcare options, where the proliferation of treatments can leave patients feeling bewildered rather than empowered.`,
      questions: [
        {
          id: 'r4q1',
          question: 'What is the central argument of the "paradox of choice"?',
          options: [
            'Having many choices always makes people happier.',
            'Too many choices can actually reduce satisfaction and cause anxiety.',
            'People should always choose the cheapest option.',
            'Limited choices are always better than many choices.'
          ],
          correct: 1,
          explanation: 'The paradox is that excessive choice leads to "anxiety, decision paralysis, and decreased satisfaction" — the opposite of what we might expect.'
        },
        {
          id: 'r4q2',
          question: 'What does "simplifying heuristics" refer to in this context?',
          options: [
            'Detailed analysis of every option',
            'Mental shortcuts to make decisions easier',
            'Asking experts for advice',
            'Choosing the most expensive option'
          ],
          correct: 1,
          explanation: 'Heuristics are mental shortcuts or rules of thumb that simplify complex decisions, used when people feel overwhelmed by options.'
        },
        {
          id: 'r4q3',
          question: 'The author suggests that the paradox of choice affects:',
          options: [
            'Only shopping decisions',
            'Only career decisions',
            'Multiple areas of life including health and relationships',
            'Only people with anxiety disorders'
          ],
          correct: 2,
          explanation: 'The passage explicitly states implications "extend far beyond consumer behavior" to "career decisions, relationship choices, and even healthcare options."'
        }
      ]
    }
  ],

  listening: [
    {
      id: 'l1',
      type: 'listening-comprehension',
      difficulty: 'A2',
      transcript: `[Conversation at a restaurant]
Waiter: Good evening! Welcome to The Garden Café. Here's the menu. Can I get you something to drink first?
Customer: Yes, I'd like a glass of water, please. And do you have any juice?
Waiter: We have orange juice and apple juice.
Customer: Orange juice, please. And I think I'm ready to order. Can I have the chicken salad?
Waiter: Of course. Would you like any bread with that?
Customer: Yes, please. Thank you.
Waiter: You're welcome. Your order will be ready in about 15 minutes.`,
      demoNote: 'In a full version, this would be played as audio. The transcript is provided for demo mode.',
      questions: [
        {
          id: 'l1q1',
          question: 'Where does this conversation take place?',
          options: ['At a shop', 'At a restaurant', 'At a school', 'At a hospital'],
          correct: 1,
          explanation: 'The conversation mentions a waiter, a menu, ordering food — all typical of a restaurant setting.'
        },
        {
          id: 'l1q2',
          question: 'What does the customer order to eat?',
          options: ['A sandwich', 'A pizza', 'A chicken salad', 'Fish and chips'],
          correct: 2,
          explanation: 'The customer says "Can I have the chicken salad?"'
        },
        {
          id: 'l1q3',
          question: 'How long will the order take?',
          options: ['5 minutes', '10 minutes', '15 minutes', '20 minutes'],
          correct: 2,
          explanation: 'The waiter says "Your order will be ready in about 15 minutes."'
        }
      ]
    },
    {
      id: 'l2',
      type: 'listening-comprehension',
      difficulty: 'B1',
      transcript: `[Radio weather report]
Good morning, listeners. Here's your weather update for today. We're expecting a cloudy start to the day across most of the region, but the clouds should clear by lunchtime, giving way to some pleasant sunshine this afternoon. Temperatures will reach a high of around 22 degrees Celsius. However, don't put away those umbrellas just yet — there's a chance of rain showers this evening, particularly in the northern parts of the city. Tomorrow is looking much brighter, with clear skies and temperatures climbing to 25 degrees. Now, looking ahead to the weekend, Saturday will be warm and sunny, perfect for outdoor activities. Sunday may see some light rain returning. That's your forecast — have a great day!`,
      demoNote: 'In a full version, this would be played as audio. The transcript is provided for demo mode.',
      questions: [
        {
          id: 'l2q1',
          question: 'What will the weather be like this afternoon?',
          options: ['Rainy', 'Cloudy all day', 'Sunny after clouds clear', 'Stormy'],
          correct: 2,
          explanation: 'The report says "clouds should clear by lunchtime, giving way to some pleasant sunshine this afternoon."'
        },
        {
          id: 'l2q2',
          question: 'Which area might get rain this evening?',
          options: ['The whole city', 'The southern parts', 'The northern parts', 'The city center'],
          correct: 2,
          explanation: '"Rain showers this evening, particularly in the northern parts of the city."'
        },
        {
          id: 'l2q3',
          question: 'When is the best day for outdoor activities this week?',
          options: ['Today', 'Tomorrow', 'Saturday', 'Sunday'],
          correct: 2,
          explanation: '"Saturday will be warm and sunny, perfect for outdoor activities."'
        }
      ]
    },
    {
      id: 'l3',
      type: 'listening-comprehension',
      difficulty: 'B2',
      transcript: `[University lecture excerpt]
Professor: Today I'd like to discuss the concept of the "attention economy." In an age where we have virtually unlimited access to information, the scarcest resource is no longer information itself — it's our attention. Tech companies have recognized this and have designed their platforms to maximize engagement, often at the expense of user well-being. Social media notifications, auto-playing videos, and infinite scroll are all examples of what some researchers call "persuasive design" — features specifically engineered to capture and hold your attention.

Now, what's particularly concerning is the impact on younger generations who have grown up with these technologies. Studies suggest that the average attention span for focused work has decreased significantly over the past two decades. But here's the nuance: it's not that people can't focus — it's that they're being constantly interrupted and have developed habits of frequent task-switching. The distinction matters because it suggests the solution lies in designing better environments, not in blaming individuals for lacking willpower.`,
      demoNote: 'In a full version, this would be played as audio. The transcript is provided for demo mode.',
      questions: [
        {
          id: 'l3q1',
          question: 'According to the professor, what is the scarcest resource in the modern age?',
          options: ['Information', 'Money', 'Attention', 'Technology'],
          correct: 2,
          explanation: 'The professor states "the scarcest resource is no longer information itself — it\'s our attention."'
        },
        {
          id: 'l3q2',
          question: 'What does the professor mean by "persuasive design"?',
          options: [
            'Design that looks beautiful',
            'Features engineered to capture and hold user attention',
            'Design that persuades people to buy products',
            'Simple and easy-to-use interfaces'
          ],
          correct: 1,
          explanation: 'The professor defines it as "features specifically engineered to capture and hold your attention."'
        },
        {
          id: 'l3q3',
          question: 'What does the professor suggest is the real problem with attention?',
          options: [
            'People are naturally unable to focus.',
            'Young people are lazy.',
            'People are constantly interrupted and have developed task-switching habits.',
            'Technology is always harmful.'
          ],
          correct: 2,
          explanation: 'The professor makes a key distinction: "it\'s not that people can\'t focus — it\'s that they\'re being constantly interrupted and have developed habits of frequent task-switching."'
        }
      ]
    }
  ],

  writing: [
    {
      id: 'w1',
      type: 'writing',
      difficulty: 'A2',
      prompt: 'Describe your daily routine in 3-5 sentences. What do you do in the morning, afternoon, and evening?',
      minWords: 20,
      maxWords: 100,
      rubric: {
        grammar: 'Uses basic sentence structures correctly',
        vocabulary: 'Uses everyday vocabulary appropriately',
        coherence: 'Ideas are presented in a logical order',
        taskCompletion: 'Covers morning, afternoon, and evening activities'
      }
    },
    {
      id: 'w2',
      type: 'writing',
      difficulty: 'B1',
      prompt: 'Write about a place you have visited that you really enjoyed. Describe what you did there and explain why you liked it. Write 50-100 words.',
      minWords: 40,
      maxWords: 150,
      rubric: {
        grammar: 'Uses past tenses correctly, varied sentence structures',
        vocabulary: 'Uses descriptive vocabulary and some detail',
        coherence: 'Well-organized with clear paragraphing',
        taskCompletion: 'Describes the place, activities, and reasons for enjoyment'
      }
    },
    {
      id: 'w3',
      type: 'writing',
      difficulty: 'B2',
      prompt: 'Some people believe that technology has made our lives better, while others think it has created new problems. What is your opinion? Give reasons and examples to support your view. Write 80-150 words.',
      minWords: 60,
      maxWords: 200,
      rubric: {
        grammar: 'Uses complex sentence structures, varied tenses, and linking words',
        vocabulary: 'Uses topic-specific vocabulary with precision',
        coherence: 'Well-structured argument with introduction, body, and conclusion',
        taskCompletion: 'Presents a clear opinion with supporting reasons and examples'
      }
    }
  ]
};
