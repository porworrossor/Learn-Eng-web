# LingoPath — Adaptive Personalized English Learning Platform

> **"Your English journey, built around you."**

LingoPath is a modern, responsive web application engineered to help learners achieve English fluency through individualized learning paths aligned with the **Common European Framework of Reference for Languages (CEFR)** (A1 to C2).

---

## 🌟 Key Features

1. **Adaptive Multi-Skill CEFR Assessment**
   - Independent diagnostic scoring across **Reading, Listening, Writing, and Speaking**, plus Grammar and Vocabulary.
   - Evaluates each competency separately (e.g. B2 Reading with A2 Speaking).
   - Real audio listening tracks with Web Speech API audio synthesis fallback.
   - Transparent scoring rubrics and confidence levels (clearly distinguishes estimated vs certified proficiency).

2. **Personalized Curriculum Generator**
   - Hierarchical learning architecture: **Learning Path → Stages → Modules → Lessons → Activities**.
   - Custom-tailored based on diagnosed baseline, target CEFR level, daily study commitment (15–60 mins), and topic interests (e.g., Technology, Travel, Business, Everyday Life).
   - Bilingual support: includes Thai explanations for Thai-speaking learners transitioning towards full English immersion.

3. **Interactive Lesson Player**
   - Multiple activity types: Multiple-choice, Fill-in-the-blank, Reading Comprehension, Listening, and Writing prompts.
   - Contextual dialogue examples with instant audio pronunciation.
   - Educational feedback explaining *why* an answer is correct or how to improve (never just "wrong").
   - Live score tracking and progress recording.

4. **AI English Conversation Tutor**
   - 6 Specialized Practice Modes:
     - **Free Conversation**: Natural casual dialogue with engaging follow-up questions.
     - **Daily Life**: Ordering at cafés, asking for directions, hotel check-in.
     - **Academic English**: Discussing renewable energy, AI ethics, and research summaries.
     - **Interview Practice**: Job interviews and admissions questions.
     - **Roleplay**: Customer service returns, missed flight re-bookings.
     - **Exam Practice**: Structured IELTS / CEFR speaking prompts.
   - Voice input via browser Speech Recognition (STT) and voice playback via Text-to-Speech (TTS).
   - End-of-session diagnostic report: rubric scores across fluency, task completion, grammar accuracy, and vocabulary range, plus natural phrase alternatives.
   - Configurable live LLM endpoint (OpenAI / Claude / Gemini compatible) with educational offline demo fallback.

5. **Smart Vocabulary Notebook with Spaced Repetition (SM-2)**
   - Save words directly from lessons and conversations.
   - Phonetics, parts of speech, English definitions, and Thai translations.
   - SuperMemo SM-2 spaced repetition algorithm prioritizing words that need review.
   - Flashcard review mode with self-evaluation ratings (Again, Hard, Good, Easy).

6. **Progress Analytics & Error Journal**
   - Study streak tracker, weekly study minutes, and path completion metrics.
   - Automatic Error Journal categorizing recurring mistakes (verb tense, articles, prepositions, word choice).
   - Complete Data Export (`.json`) and data reset controls.

---

## 🏗️ Technical Architecture & Stack

- **Architecture**: Single Page Application (SPA) built with Vanilla JavaScript (ES6 Modules) and Hash-based routing (`#/dashboard`, `#/lesson`, etc.)
- **Styling**: Tailored Vanilla CSS design system with CSS custom properties, responsive grid/flexbox layouts, accessible color contrast, and micro-interactions.
- **State Management**: `Store` module utilizing browser `localStorage` with reactive state change listeners.
- **Audio Services**: HTML5 Web Speech API (`SpeechSynthesis` & `webkitSpeechRecognition`) with graceful text fallbacks and capability detection.
- **Zero Build Dependency**: Runs directly in modern web browsers without requiring Node.js, Webpack, or Vite compilation.

---

## 🚀 Quick Start & Installation

### Option 1: Python Local Server (Recommended)
Because LingoPath uses native ES6 modules, it is best served via a local HTTP server:

```bash
# In the project directory:
python -m http.server 8000
```
Then navigate to: [http://localhost:8000](http://localhost:8000)

### Option 2: Live Server or Any Static Host
Open the project directory in VS Code and click **"Go Live"** (Live Server extension), or deploy directly to Netlify, Vercel, or GitHub Pages.

---

## 🧪 Running Automated Tests

Open [http://localhost:8000/test.html](http://localhost:8000/test.html) in your browser.

The automated test runner executes unit and workflow tests covering:
- CEFR level numeric mapping and boundary calculations
- Placement test scoring algorithms & rubric generation
- Curriculum generation hierarchy (A2 → B2 path structures)
- State persistence and study streak tracking
- SM-2 spaced repetition interval calculation

---

## ⚙️ Configuration & Environment Variables

Copy `.env.example` to `.env` or configure settings directly within the in-app **Settings** page:

| Variable | Description | Default |
| :--- | :--- | :--- |
| `LINGOPATH_AI_API_URL` | Optional OpenAI-compatible REST endpoint | Built-in Educational Tutor |
| `LINGOPATH_AI_API_KEY` | API key (stored locally in browser localStorage) | None (Demo Mode) |
| `LINGOPATH_AI_MODEL` | LLM model identifier (e.g. `gpt-4o-mini`) | `gpt-4o-mini` |
| `LINGOPATH_DEFAULT_LOCALE` | Default explanation language (`en`, `th-en`, `th`) | `th-en` |

---

## 🗄️ Database Schema & Data Models

In demo / offline mode, LingoPath persists state in `localStorage` under the `lp_` prefix:

- `lp_user`: User identity (`id`, `name`, `email`, `isDemo`, `lastLogin`)
- `lp_profile`: Pedagogical profile (`currentLevel`, `targetLevel`, `studyTimePerDay`, `interests`, `explanationLanguage`)
- `lp_placement`: Diagnostic assessment baseline with overall and per-skill breakdown
- `lp_goal`: Target CEFR level, daily commitment, priority skills, and schedule
- `lp_curriculum`: Full curriculum hierarchy (`stages`, `modules`, `lessons`)
- `lp_progress`: Completed lessons, lesson accuracy scores, streak days, total study minutes
- `lp_vocabulary`: Saved words, parts of speech, examples, Thai translations, and SM-2 interval parameters (`interval`, `easeFactor`, `reviewCount`, `nextReview`)
- `lp_conversations`: Saved AI chat transcripts and rubric feedback reports
- `lp_errors`: Recurring error journal entries categorized by language rule

---

## 📋 Educational Disclaimer

Estimated CEFR proficiency levels generated by LingoPath are intended solely for curriculum adaptation, personalized pacing, and formative self-assessment. They do not constitute an officially certified CEFR qualification or accredited language examination score.
