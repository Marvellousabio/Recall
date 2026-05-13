# Demo User Guide

## Quick Start

1. Start the dev server: `npm run dev`
2. Go to http://localhost:5173
3. Click "Sign In" or navigate to `/signin`
4. Login with: **alex@example.com** (any password works)
5. Explore the fully-mature dashboard!

---

## Demo User Profile

**Account:** alex@example.com  
**Username:** alex_morgan  
**Role:** Regular User  
**Account Age:** ~6 months  

This account represents an experienced power user who has used Recall extensively across multiple subjects and study methods.

---

## What You'll See

### Dashboard (`/dashboard`)

The dashboard showcases an active, engaged learner with impressive metrics:

#### Key Stats
- **Retention Score**: 94.5% (exceptional long-term memory performance)
- **Mastery Score**: 87.2% (strong command across multiple subjects)
- **Study Streak**: 45 days (demonstrates consistency and habit formation)
- **Total Reviews**: 856 (proves heavy engagement with the platform)

#### Due for Review
- Shown: ~5-15 flashcards due today
- Active spaced repetition system in action

#### Quick Actions
All navigation items visible:
- Upload Study Material
- Review Flashcards
- Take Practice Exam
- View Analytics

#### Weekly Progress
- Two progress bars showing retention and mastery goals near completion

---

### Upload Workspace (`/dashboard/upload`)

Shows 8 completed study materials spanning diverse subjects:

| Material | Subject | Age |
|----------|---------|-----|
| Human Anatomy & Physiology | Medical | 5 months |
| Python for Data Science | Programming | 4 months |
| Spanish Vocabulary Essentials | Language | 3 months |
| Constitutional Law Summary | Law | 2 months |
| Marketing Principles | Business | 6 weeks |
| Calculus Fundamentals | Mathematics | 3 weeks (processing) |
| Cell Biology Fundamentals | Science | 2 weeks |
| World History: 1900-Present | History | 1 week |

Status indicators show completed materials, demonstrating successful AI processing.

---

### Flashcard Review (`/dashboard/flashcards`)

**Active deck:** Flashcards from all 8 subjects, intelligently scheduled by SM-2.

You'll see:
- Cards at various difficulty levels (1-5)
- Questions requiring recall with detailed answers
- Rating buttons (Hard, Good, Easy) to adjust future scheduling
- Progress indicator showing how many cards remain

**Sample card types:**
- Anatomy: *"What is the function of mitochondria?"*
- Python: *"What is a lambda function?"*
- Spanish: *"Conjugate 'ser' in present tense"*
- Law: *"Define stare decisis."*

---

### AI Tutor (`/dashboard/tutor`)

Interactive chat interface with AI tutor.

Features demonstrated:
- Multi-turn conversation capability
- Context window for chat history
- Responsive message bubbles (user vs. assistant)
- Loading states during AI response

**Try it:** Ask questions like "What is photosynthesis?" or "Explain derivatives simply"

---

### Exam Mode (`/dashboard/exam`)

CBT (Computer-Based Test) interface showing exam history:

**Completed Exams (12):**
- Anatomy Midterm: 85% (45 min, 20 questions)
- Python Final: 92% (60 min, 25 questions)
- Spanish Quiz 1: 78% (30 min, 15 questions)
- Constitutional Law Final: 88% (90 min, 30 questions)
- Marketing Midterm: 91% (45 min, 20 questions)
- Calculus Test 1: 76% (45 min, 15 questions)
- Cell Biology Final: 84% (60 min, 20 questions)
- World History Midterm: 89% (45 min, 18 questions)
- Comprehensive Review: 94% (120 min, 50 questions)
- Weekly Practice: 87% (20 min, 10 questions)

**In Progress (3):**
- Advanced Python Topics
- Spanish Listening Comprehension
- Law Case Analysis Quiz

Features showcased:
- Exam countdown timer
- Tab-switch detection (anti-cheat)
- Progress tracking
- Answer selection UI
- Results summary

---

### Analytics Dashboard (`/dashboard/analytics`)

Rich visualizations of Alex's learning journey:

#### Stats Overview (4 cards)
- Retention Score: 94.5% (+12% improvement)
- Mastery Score: 87.2% (+8% improvement)
- Study Streak: 45 days (current)
- Total Reviews: 856 (+24 this week)

#### Memory Retention Curve
- Weekly retention percentages showing upward trend
- Mon, Tue, Wed, Thu, Fri, Sat, Sun data points
- Visual progress bars

#### Review Consistency
- 4 weeks of review activity
- Volume chart showing engagement (45, 62, 78, 95 reviews per week)
- Demonstrates increasing usage

#### Knowledge Mastery Map
Six topics with mastery percentages:
- Active Recall: 85%
- Spaced Repetition: 72%
- Cognitive Science: 68%
- Memory Techniques: 90%
- Study Strategies: 78%
- Learning Theory: 65%

---

## Data Scale Summary

| Entity | Count |
|--------|------|
| Profile (demo user) | 1 |
| Study Materials | 8 |
| Flashcards | 100 |
| Review Sessions | 850+ |
| Exam Sessions | 12 completed + 3 in-progress |
| Analytics Record | 1 |

---

## Demo Story

Alex Morgan is a motivated learner who joined Recall 6 months ago and has been consistently using the platform to master multiple domains:

1. **Month 1-2**: Started with Human Anatomy, building a strong foundation with daily reviews
2. **Month 3**: Added Python programming to learn data science skills
3. **Month 4**: Picked up Spanish for personal growth
4. **Month 5**: Tackled Constitutional Law for professional development
5. **Month 6**: Explored Marketing, Calculus, Biology, and World History to broaden knowledge

Alex maintains a **45-day current streak**, studies across 8 different subjects, has reviewed flashcards **850+ times**, and consistently scores in the **76-94% range** on exams. The retention score of **94.5%** demonstrates exceptional long-term memory retention thanks to spaced repetition.

This data paints a picture of a dedicated, successful user who derives real value from Recall's AI-powered learning system.

---

## Credentials Reference

```
Email:    alex@example.com
Password: (anything works in demo mode)
```

---

## For Demonstrations

When showing the app to others:

1. **Start at Landing** - Show features and benefits
2. **Sign In** - Use alex@example.com
3. **Dashboard** - Impressive stats immediately visible
4. **Analytics** - Beautiful charts show progress
5. **Flashcards** - Active review session shows engagement
6. **Exam History** - Long list proves sustained usage
7. **Upload Page** - Impressive list of 8 completed materials

**Key talking points:**
- "This is what the app looks like after 6 months of serious use"
- "Notice the 45-day streak - shows how the habit forms"
- "94.5% retention proves spaced repetition works"
- "8 different subjects - the app handles diverse content"
- "850 reviews - heavy daily engagement"

---

## Technical Notes

- All dates are auto-calculated relative to today for realism
- Review sessions are distributed across 180 days with some weekend breaks
- Card difficulties range from 1 (easy) to 5 (hard) with natural distribution
- Exam scores are strong but not perfect (76-94%)
- SM-2 algorithm parameters are realistic (ease factors 2.3-2.9)
- flashcards due for review are strategically mixed (overdue, due today, future)

---

*This demo data is perfect for investor pitches, user testing, or stakeholder demos.*
