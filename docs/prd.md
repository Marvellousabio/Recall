# Requirements Document

## 1. Application Overview

### 1.1 Application Name
Project Recall

### 1.2 Application Description
Project Recall is an AI-powered cognitive mastery platform that transforms study materials (PDFs, notes, textbooks) into intelligent learning systems using Active Recall and Spaced Repetition. The platform generates AI-powered flashcards, adaptive quizzes, Feynman explanations, and CBT exam simulations to optimize long-term retention and cognitive performance.

## 2. Users and Usage Scenarios

### 2.1 Target Users
- Students preparing for exams
- Professionals pursuing certifications
- Lifelong learners seeking knowledge retention
- Academic researchers

### 2.2 Core Usage Scenarios
- Upload study materials and generate AI-powered learning content
- Review flashcards using spaced repetition schedules
- Practice with AI-generated mock exams
- Track retention analytics and cognitive performance
- Engage with AI tutor for concept explanations

## 3. Page Structure and Functionality

### 3.1 Page Structure
```
Project Recall Website
├── Landing Page
├── Product Features
├── AI Study Workspace
├── Exam Mode
├── Pricing
├── About / Research
├── Blog / Learning Science
├── Contact
├── Authentication
│   ├── Sign In
│   └── Sign Up
└── User Dashboard
    ├── Upload Workspace
    ├── Flashcard Review UI
    ├── AI Tutor Workspace
    ├── CBT Exam Interface
    └── Analytics & Retention Dashboard
```

### 3.2 Landing Page

**Hero Section**
- Display headline: Stop Forgetting What You Learn
- Display subheadline: Project Recall transforms your notes, PDFs, and textbooks into an AI-powered cognitive mastery system using Active Recall and Spaced Repetition
- Primary CTA button: Start Learning Smarter
- Secondary CTA button: Watch Demo
- Hero visual: Futuristic AI study dashboard showing memory retention graph, AI-generated flashcards, knowledge map, study streaks, active recall sessions, cognitive analytics, and AI explanations using layered glass panels and animated gradients

**Trust Section**
- Display neuroscience-backed learning benefits
- Show animated statistics:
  - 70% of learning forgotten traditionally
  - Up to 90% retention with retrieval practice
  - 40% less study time
  - AI adaptive mastery engine

**How It Works Section**
- Step 1: Upload PDFs / notes
- Step 2: AI extracts and understands concepts
- Step 3: AI generates flashcards, questions, summaries, ELI5 explanations, mock exams
- Step 4: SM-2 algorithm schedules reviews automatically
- Step 5: Retention analytics optimize learning
- Display animated timeline interactions

**Core Features Section**
- Display feature cards:
  - AI-Powered RAG Learning: PDF ingestion, semantic chunking, vector embeddings, context retrieval
  - Active Recall Engine: AI-generated Q&A, retrieval practice, memory reinforcement
  - Feynman Mode: Explain concepts simply, beginner toggle, concept simplification
  - Spaced Repetition: SM-2 algorithm, dynamic scheduling, review calendar
  - CBT Exam System: Timed assessments, difficulty weighting, anti-cheat system
  - AI Cognitive Analytics: Retention heatmaps, focus metrics, knowledge graph, mastery scoring

**Conversion Elements**
- Sticky CTA
- Social proof section
- Student testimonials
- Product demo
- Before vs after retention comparison
- Interactive product walkthrough
- Live dashboard preview
- Waitlist capture form

### 3.3 Product Features Page
- Display detailed feature explanations
- Show visual demonstrations of each core feature
- Include use case examples
- Display feature comparison table

### 3.4 AI Study Workspace

**Layout**
- Split screen interface
- Left panel: PDF viewer with highlight functionality
- Right panel: AI tutor panel and flashcard generation panel
- Context-aware AI chat interface

**Functionality**
- Upload and display PDF documents
- Highlight text to trigger AI explanations
- Ask AI about selected text
- Generate flashcards from highlighted content
- Inline AI interactions without generic chatbot design
- Keyboard shortcut support

### 3.5 Exam Mode (CBT Exam Interface)

**Layout**
- Fullscreen enforcement UI
- Countdown timer display
- Question display area
- Answer selection interface
- Navigation controls

**Functionality**
- Launch fullscreen mode
- Display AI-generated exam questions with topic weighting
- Track time remaining
- Enable focus mode with minimal distractions
- Detect tab switches and display warnings
- Submit exam and display results

### 3.6 Pricing Page
- Display pricing tiers
- Feature comparison table
- FAQ section
- CTA buttons for each tier

### 3.7 About / Research Page
- Display company mission and vision
- Show research backing the platform
- Team information
- Scientific methodology explanation

### 3.8 Blog / Learning Science Page
- Display blog post listings
- Categories: Learning science, Cognitive psychology, AI education, Study techniques, Memory optimization, Active recall methods, Neuroscience of learning
- Individual blog post pages
- Search functionality

### 3.9 Contact Page
- Contact form with fields: Name, Email, Subject, Message
- Submit button
- Display contact information

### 3.10 Authentication Pages

**Sign In Page**
- Email input field
- Password input field
- Sign In button
- Google Sign In button (OSS Google login)
- Forgot password link
- Sign Up link

**Sign Up Page**
- Name input field
- Email input field
- Password input field
- Confirm password input field
- Sign Up button
- Google Sign In button (OSS Google login)
- Sign In link

### 3.11 User Dashboard

**Layout**
- Left sidebar with navigation
- Main content area with modular widgets
- Floating command palette

**Dashboard Widgets**
- AI quick actions
- Cognitive metrics display
- Review queue
- Study heatmaps
- Retention score
- Upcoming reviews list
- AI recommendations
- Focus streaks

**Functionality**
- Navigate to Upload Workspace, Flashcard Review, AI Tutor, CBT Exam, Analytics
- Display personalized learning feed
- Keyboard shortcut support
- Sticky sidebar

### 3.12 Upload Workspace
- File upload interface for PDFs and notes
- Drag and drop support
- Display uploaded files list
- Process files button to trigger AI extraction
- Display processing status
- Navigate to generated flashcards and study materials

### 3.13 Flashcard Review UI
- Display flashcard with question side
- Flip card to reveal answer
- Rate difficulty buttons: Easy, Good, Hard
- Display review progress
- Show next review schedule
- Navigate between flashcards
- Display retention statistics

### 3.14 AI Tutor Workspace
- Chat interface with AI tutor
- Context-aware responses based on study materials
- Ask questions about concepts
- Request ELI5 explanations
- Display conversation history
- Inline code and formula rendering

### 3.15 Analytics & Retention Dashboard

**Visualizations**
- Memory retention curves (interactive chart)
- Knowledge mastery map
- Weak topic detection display
- Review consistency charts
- Daily cognition score
- Long-term progress graph

**Functionality**
- Filter by date range
- Export analytics data
- Display actionable insights
- Show improvement recommendations

## 4. Business Rules and Logic

### 4.1 AI Content Generation
- When user uploads PDF, system extracts text and performs semantic chunking
- AI generates flashcards, questions, summaries, and ELI5 explanations from extracted content
- Generated content is stored and associated with user account

### 4.2 Spaced Repetition Scheduling
- System uses SM-2 algorithm to calculate next review dates
- When user rates flashcard difficulty, algorithm adjusts future review schedule
- Review queue is dynamically updated based on due dates

### 4.3 CBT Exam Generation
- AI generates exam questions with topic weighting based on user study materials
- Questions are randomized for each exam session
- Difficulty is balanced across topics

### 4.4 Retention Analytics
- System tracks all review sessions and user responses
- Calculates retention rates, mastery scores, and cognitive metrics
- Identifies weak topics based on performance patterns
- Generates personalized recommendations

### 4.5 Authentication and Session Management
- Users must register and sign in to access dashboard and study features
- Sessions are managed using JWT tokens
- Google Sign In uses OSS Google login method

### 4.6 Anti-Cheat System
- During CBT exam mode, system detects tab switches
- Display warning when user attempts to leave exam interface
- Log suspicious behavior for review

## 5. Exception and Boundary Cases

| Scenario | Handling |
|----------|----------|
| PDF upload fails | Display error message and allow retry |
| AI generation timeout | Show loading state and retry automatically |
| No flashcards due for review | Display empty state with motivational message |
| User attempts to access exam mode without study materials | Prompt user to upload materials first |
| Tab switch during exam | Display warning and log event |
| Network disconnection during review | Cache progress locally and sync when reconnected |
| Invalid file format upload | Display error message specifying supported formats |
| User rates all flashcards as Easy | Adjust algorithm to maintain engagement |
| Zero retention score | Display encouragement and study tips |

## 6. Acceptance Criteria

1. Landing page displays all sections with correct content and CTAs
2. Users can register and sign in using email or Google Sign In
3. Users can upload PDF files and view processing status
4. AI generates flashcards, questions, and explanations from uploaded materials
5. Flashcard review interface displays cards and accepts difficulty ratings
6. SM-2 algorithm correctly schedules next review dates based on ratings
7. CBT exam mode launches in fullscreen and displays AI-generated questions
8. Exam mode detects tab switches and displays warnings
9. Analytics dashboard displays retention curves, mastery maps, and cognitive metrics
10. AI tutor provides context-aware responses to user questions
11. All pages are fully responsive and optimized for mobile devices
12. Website achieves 95+ Lighthouse score
13. Dark mode and light mode are fully implemented
14. Keyboard shortcuts work across dashboard and study interfaces
15. All interactive elements have appropriate hover states and transitions
16. WCAG AA accessibility compliance is met
17. SEO metadata and structured data are correctly implemented
18. Blog system displays posts with correct categorization

## 7. Out of Scope for This Release

- Collaborative study groups or social features
- Native mobile applications (iOS/Android)
- Offline mode functionality
- Video or audio content processing
- Integration with third-party learning management systems
- Multi-language support beyond English
- Advanced gamification features beyond streaks
- Instructor or teacher dashboard
- Bulk user management for institutions
- Custom branding for white-label solutions
- Real-time collaboration on study materials
- Voice-based AI tutor interactions
- Handwriting recognition for notes
- Integration with physical study devices