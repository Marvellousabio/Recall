import type {
  Profile,
  StudyMaterial,
  Flashcard,
  ReviewSession,
  ExamSession,
  Analytics,
  BlogPost,
} from '@/types/types';

// ============================================================================
// EXPERIENCED POWER USER: ALEX MORGAN
// A showcase account demonstrating full feature usage
// ============================================================================

// Dummy Profiles - Enhanced with power user
export const dummyProfiles: Profile[] = [
  {
    id: 'user-1',
    username: 'john_doe',
    email: 'john@example.com',
    role: 'user',
    avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-2',
    username: 'sarah_smith',
    email: 'sarah@example.com',
    role: 'user',
    avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
    created_at: '2024-01-15T00:00:00Z',
    updated_at: '2024-01-15T00:00:00Z',
  },
  {
    id: 'admin-1',
    username: 'admin',
    email: 'admin@example.com',
    role: 'admin',
    avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  // EXPERIENCED POWER USER
  {
    id: 'user-demo',
    username: 'alex_morgan',
    email: 'alex@example.com',
    role: 'user',
    avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-06-15T10:30:00Z',
  },
];

// ============================================================================
// STUDY MATERIALS - 8 comprehensive learning resources
// ============================================================================

// Helper to create dates
const daysAgo = (days: number): string => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString();
};

export const dummyStudyMaterials: StudyMaterial[] = [
  // Existing materials for user-1
  {
    id: 'material-1',
    user_id: 'user-1',
    title: 'Introduction to React',
    file_url: 'https://example.com/react-intro.pdf',
    file_type: 'application/pdf',
    status: 'completed',
    created_at: '2024-01-02T00:00:00Z',
  },
  {
    id: 'material-2',
    user_id: 'user-1',
    title: 'JavaScript Fundamentals',
    file_url: 'https://example.com/js-fundamentals.pdf',
    file_type: 'application/pdf',
    status: 'completed',
    created_at: '2024-01-03T00:00:00Z',
  },
  {
    id: 'material-3',
    user_id: 'user-2',
    title: 'Python Data Structures',
    file_url: 'https://example.com/python-ds.pdf',
    file_type: 'application/pdf',
    status: 'completed',
    created_at: '2024-01-16T00:00:00Z',
  },
  // JOHN DOE'S ADDITIONAL STUDY MATERIALS
  {
    id: 'material-4',
    user_id: 'user-1',
    title: 'Advanced React Patterns',
    file_url: 'https://example.com/advanced-react.pdf',
    file_type: 'application/pdf',
    status: 'completed',
    created_at: '2024-01-10T00:00:00Z',
  },
  {
    id: 'material-5',
    user_id: 'user-1',
    title: 'TypeScript Handbook',
    file_url: 'https://example.com/typescript-handbook.pdf',
    file_type: 'application/pdf',
    status: 'completed',
    created_at: '2024-01-15T00:00:00Z',
  },
  {
    id: 'material-6',
    user_id: 'user-1',
    title: 'Web Performance Optimization',
    file_url: 'https://example.com/web-performance.docx',
    file_type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    status: 'completed',
    created_at: '2024-01-20T00:00:00Z',
  },
  // SARAH SMITH'S ADDITIONAL STUDY MATERIALS
  {
    id: 'material-7',
    user_id: 'user-2',
    title: 'Machine Learning Fundamentals',
    file_url: 'https://example.com/ml-fundamentals.pdf',
    file_type: 'application/pdf',
    status: 'completed',
    created_at: '2024-01-22T00:00:00Z',
  },
  {
    id: 'material-8',
    user_id: 'user-2',
    title: 'Data Science with Python',
    file_url: 'https://example.com/data-science-python.pptx',
    file_type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    status: 'processing',
    created_at: '2024-01-25T00:00:00Z',
  },
  {
    id: 'material-9',
    user_id: 'user-2',
    title: 'SQL Database Design',
    file_url: 'https://example.com/sql-design.pdf',
    file_type: 'application/pdf',
    status: 'completed',
    created_at: '2024-01-28T00:00:00Z',
  },
  {
    id: 'material-10',
    user_id: 'user-1',
    title: 'Node.js API Development',
    file_url: 'https://example.com/nodejs-api.md',
    file_type: 'text/markdown',
    status: 'completed',
    created_at: '2024-02-01T00:00:00Z',
  },
  {
    id: 'material-11',
    user_id: 'user-2',
    title: 'Statistics for Data Scientists',
    file_url: 'https://example.com/statistics-ds.pdf',
    file_type: 'application/pdf',
    status: 'failed',
    created_at: '2024-02-05T00:00:00Z',
  },
  {
    id: 'material-12',
    user_id: 'user-1',
    title: 'CSS Grid and Flexbox Guide',
    file_url: 'https://example.com/css-layout-guide.html',
    file_type: 'text/html',
    status: 'pending',
    created_at: '2024-02-10T00:00:00Z',
  },
  // ALEX MORGAN'S STUDY MATERIALS
  {
    id: 'material-demo-1',
    user_id: 'user-demo',
    title: 'Human Anatomy & Physiology',
    file_url: 'https://example.com/anatomy-physiology.pdf',
    file_type: 'application/pdf',
    status: 'completed',
    created_at: daysAgo(150), // 5 months ago
  },
  {
    id: 'material-demo-2',
    user_id: 'user-demo',
    title: 'Python for Data Science',
    file_url: 'https://example.com/python-data-science.pdf',
    file_type: 'application/pdf',
    status: 'completed',
    created_at: daysAgo(120), // 4 months ago
  },
  {
    id: 'material-demo-3',
    user_id: 'user-demo',
    title: 'Spanish Vocabulary Essentials',
    file_url: 'https://example.com/spanish-vocabulary.pdf',
    file_type: 'application/pdf',
    status: 'completed',
    created_at: daysAgo(90), // 3 months ago
  },
  {
    id: 'material-demo-4',
    user_id: 'user-demo',
    title: 'Constitutional Law Summary',
    file_url: 'https://example.com/constitutional-law.pdf',
    file_type: 'application/pdf',
    status: 'completed',
    created_at: daysAgo(60), // 2 months ago
  },
  {
    id: 'material-demo-5',
    user_id: 'user-demo',
    title: 'Marketing Principles',
    file_url: 'https://example.com/marketing-principles.pdf',
    file_type: 'application/pdf',
    status: 'completed',
    created_at: daysAgo(42), // 6 weeks ago
  },
  {
    id: 'material-demo-6',
    user_id: 'user-demo',
    title: 'Calculus Fundamentals',
    file_url: 'https://example.com/calculus-fundamentals.pdf',
    file_type: 'application/pdf',
    status: 'processing',
    created_at: daysAgo(21), // 3 weeks ago
  },
  {
    id: 'material-demo-7',
    user_id: 'user-demo',
    title: 'Cell Biology Fundamentals',
    file_url: 'https://example.com/cell-biology.pdf',
    file_type: 'application/pdf',
    status: 'completed',
    created_at: daysAgo(14), // 2 weeks ago
  },
  {
    id: 'material-demo-8',
    user_id: 'user-demo',
    title: 'World History: 1900-Present',
    file_url: 'https://example.com/world-history.pdf',
    file_type: 'application/pdf',
    status: 'completed',
    created_at: daysAgo(7), // 1 week ago
  },
];

// ============================================================================
// FLASHCARDS - 100 cards across all subjects for Alex Morgan
// ============================================================================

const createFlashcard = (
  id: string,
  materialId: string | null,
  userId: string,
  question: string,
  answer: string,
  difficulty: number,
  createdDaysAgo: number,
  intervalDays: number,
  easeFactor: number
): Flashcard => ({
  id,
  material_id: materialId,
  user_id: userId,
  question,
  answer,
  difficulty,
  next_review: daysAgo(createdDaysAgo - Math.floor(Math.random() * 3)),
  interval_days: intervalDays,
  ease_factor: easeFactor,
  created_at: daysAgo(createdDaysAgo),
});

export const dummyFlashcards: Flashcard[] = [
  // Existing flashcards
  {
    id: 'card-1',
    material_id: 'material-1',
    user_id: 'user-1',
    question: 'What is JSX?',
    answer: 'JSX is a syntax extension for JavaScript that allows you to write HTML-like code in your JavaScript files.',
    difficulty: 1,
    next_review: new Date(Date.now() - 86400000).toISOString(),
    interval_days: 1,
    ease_factor: 2.5,
    created_at: '2024-01-02T00:00:00Z',
  },
  {
    id: 'card-2',
    material_id: 'material-1',
    user_id: 'user-1',
    question: 'What is the virtual DOM?',
    answer: 'The virtual DOM is a lightweight representation of the actual DOM that React uses to optimize updates.',
    difficulty: 2,
    next_review: new Date(Date.now() + 86400000).toISOString(),
    interval_days: 2,
    ease_factor: 2.6,
    created_at: '2024-01-02T00:00:00Z',
  },
  {
    id: 'card-3',
    material_id: 'material-2',
    user_id: 'user-1',
    question: 'What is closure in JavaScript?',
    answer: 'A closure is the combination of a function and the lexical environment within which that function was declared.',
    difficulty: 3,
    next_review: new Date(Date.now() - 172800000).toISOString(),
    interval_days: 4,
    ease_factor: 2.7,
    created_at: '2024-01-03T00:00:00Z',
  },
  {
    id: 'card-4',
    material_id: 'material-2',
    user_id: 'user-1',
    question: 'Explain event bubbling.',
    answer: 'Event bubbling is the process where an event propagates from the target element up through its ancestors in the DOM tree.',
    difficulty: 2,
    next_review: new Date(Date.now() + 259200000).toISOString(),
    interval_days: 6,
    ease_factor: 2.5,
    created_at: '2024-01-03T00:00:00Z',
  },
  {
    id: 'card-5',
    material_id: 'material-3',
    user_id: 'user-2',
    question: 'What is a list comprehension in Python?',
    answer: 'A list comprehension is a concise way to create lists in Python using a single line of code.',
    difficulty: 1,
    next_review: new Date(Date.now() - 432000000).toISOString(),
    interval_days: 8,
    ease_factor: 2.8,
    created_at: '2024-01-16T00:00:00Z',
  },
  {
    id: 'card-6',
    material_id: 'material-3',
    user_id: 'user-2',
    question: 'What is the difference between a tuple and a list in Python?',
    answer: 'Lists are mutable (can be changed) while tuples are immutable (cannot be changed after creation).',
    difficulty: 2,
    next_review: new Date(Date.now() + 86400000).toISOString(),
    interval_days: 3,
    ease_factor: 2.4,
    created_at: '2024-01-16T00:00:00Z',
  },
  {
    id: 'card-7',
    material_id: null,
    user_id: 'user-1',
    question: 'What is the time complexity of binary search?',
    answer: 'O(log n) - the search space is halved with each comparison.',
    difficulty: 2,
    next_review: new Date(Date.now() - 86400000).toISOString(),
    interval_days: 5,
    ease_factor: 2.6,
    created_at: '2024-01-05T00:00:00Z',
  },
  {
    id: 'card-8',
    material_id: null,
    user_id: 'user-1',
    question: 'Explain the concept of recursion.',
    answer: 'Recursion is when a function calls itself to solve a problem by breaking it down into smaller instances.',
    difficulty: 3,
    next_review: new Date(Date.now() + 172800000).toISOString(),
    interval_days: 7,
    ease_factor: 2.5,
    created_at: '2024-01-05T00:00:00Z',
  },
  // JOHN DOE'S ADDITIONAL FLASHCARDS - Data Structures & Algorithms
  {
    id: 'card-9',
    material_id: 'material-1',
    user_id: 'user-1',
    question: 'What is the time complexity of binary search?',
    answer: 'O(log n) - the search space is halved with each comparison.',
    difficulty: 2,
    next_review: new Date(Date.now() + 86400000).toISOString(),
    interval_days: 3,
    ease_factor: 2.6,
    created_at: '2024-01-06T00:00:00Z',
  },
  {
    id: 'card-10',
    material_id: 'material-2',
    user_id: 'user-1',
    question: 'What is a hash table?',
    answer: 'A data structure that stores key-value pairs and uses a hash function to compute an index for storing values.',
    difficulty: 2,
    next_review: new Date(Date.now() - 86400000).toISOString(),
    interval_days: 5,
    ease_factor: 2.7,
    created_at: '2024-01-07T00:00:00Z',
  },
  {
    id: 'card-11',
    material_id: 'material-1',
    user_id: 'user-1',
    question: 'Explain the difference between stack and queue.',
    answer: 'Stack follows LIFO (Last In, First Out) while queue follows FIFO (First In, First Out).',
    difficulty: 1,
    next_review: new Date(Date.now() + 259200000).toISOString(),
    interval_days: 8,
    ease_factor: 2.5,
    created_at: '2024-01-08T00:00:00Z',
  },
  {
    id: 'card-12',
    material_id: 'material-2',
    user_id: 'user-1',
    question: 'What is dynamic programming?',
    answer: 'A method for solving complex problems by breaking them down into simpler subproblems and storing the results.',
    difficulty: 4,
    next_review: new Date(Date.now() - 172800000).toISOString(),
    interval_days: 12,
    ease_factor: 2.8,
    created_at: '2024-01-09T00:00:00Z',
  },
  // SARAH SMITH'S FLASHCARDS - Python Programming
  {
    id: 'card-13',
    material_id: 'material-3',
    user_id: 'user-2',
    question: 'What is list comprehension in Python?',
    answer: 'A concise way to create lists using a single line of code with a for loop and optional condition.',
    difficulty: 2,
    next_review: new Date(Date.now() + 86400000).toISOString(),
    interval_days: 2,
    ease_factor: 2.4,
    created_at: '2024-01-17T00:00:00Z',
  },
  {
    id: 'card-14',
    material_id: 'material-3',
    user_id: 'user-2',
    question: 'Explain the difference between tuples and lists in Python.',
    answer: 'Lists are mutable (can be changed) while tuples are immutable (cannot be changed after creation).',
    difficulty: 1,
    next_review: new Date(Date.now() + 172800000).toISOString(),
    interval_days: 4,
    ease_factor: 2.5,
    created_at: '2024-01-18T00:00:00Z',
  },
  {
    id: 'card-15',
    material_id: 'material-3',
    user_id: 'user-2',
    question: 'What is a Python decorator?',
    answer: 'A function that takes another function and extends its behavior without modifying the original function.',
    difficulty: 3,
    next_review: new Date(Date.now() - 86400000).toISOString(),
    interval_days: 6,
    ease_factor: 2.6,
    created_at: '2024-01-19T00:00:00Z',
  },
  {
    id: 'card-16',
    material_id: 'material-3',
    user_id: 'user-2',
    question: 'How does Python handle memory management?',
    answer: 'Python uses automatic memory management with reference counting and garbage collection.',
    difficulty: 3,
    next_review: new Date(Date.now() + 345600000).toISOString(),
    interval_days: 10,
    ease_factor: 2.7,
    created_at: '2024-01-20T00:00:00Z',
  },
  // JOHN DOE'S WEB DEVELOPMENT FLASHCARDS
  {
    id: 'card-17',
    material_id: 'material-1',
    user_id: 'user-1',
    question: 'What is the difference between let, const, and var?',
    answer: 'var is function-scoped and can be redeclared, let and const are block-scoped. const cannot be reassigned.',
    difficulty: 2,
    next_review: new Date(Date.now() + 86400000).toISOString(),
    interval_days: 3,
    ease_factor: 2.5,
    created_at: '2024-01-10T00:00:00Z',
  },
  {
    id: 'card-18',
    material_id: 'material-2',
    user_id: 'user-1',
    question: 'Explain the concept of promises in JavaScript.',
    answer: 'Promises represent the eventual completion or failure of an asynchronous operation and its resulting value.',
    difficulty: 3,
    next_review: new Date(Date.now() - 172800000).toISOString(),
    interval_days: 7,
    ease_factor: 2.6,
    created_at: '2024-01-11T00:00:00Z',
  },
  {
    id: 'card-19',
    material_id: 'material-1',
    user_id: 'user-1',
    question: 'What is the purpose of CSS Flexbox?',
    answer: 'Flexbox is a layout model that allows responsive elements within a container to be automatically arranged.',
    difficulty: 2,
    next_review: new Date(Date.now() + 259200000).toISOString(),
    interval_days: 8,
    ease_factor: 2.5,
    created_at: '2024-01-12T00:00:00Z',
  },
  {
    id: 'card-20',
    material_id: 'material-2',
    user_id: 'user-1',
    question: 'What is REST API?',
    answer: 'REST (Representational State Transfer) is an architectural style for designing networked applications using HTTP methods.',
    difficulty: 2,
    next_review: new Date(Date.now() + 432000000).toISOString(),
    interval_days: 12,
    ease_factor: 2.7,
    created_at: '2024-01-13T00:00:00Z',
  },




  // MONTH 4-5: SPANISH LANGUAGE PROGRESSION
  {
    id: 'demo-card-025',
    material_id: 'material-demo-3',
    user_id: 'user-demo',
    question: 'How do you say "Goodbye" in Spanish?',
    answer: 'Adiós',
    difficulty: 1,
    next_review: daysAgo(-45),
    interval_days: 45,
    ease_factor: 2.9,
    created_at: daysAgo(45),
  },
  {
    id: 'demo-card-026',
    material_id: 'material-demo-3',
    user_id: 'user-demo',
    question: 'How do you say "Please" in Spanish?',
    answer: 'Por favor',
    difficulty: 1,
    next_review: daysAgo(-32),
    interval_days: 32,
    ease_factor: 2.7,
    created_at: daysAgo(40),
  },
  {
    id: 'demo-card-027',
    material_id: 'material-demo-3',
    user_id: 'user-demo',
    question: 'Conjugate "tener" (to have) in present tense - yo form',
    answer: 'Tengo',
    difficulty: 3,
    next_review: daysAgo(-18),
    interval_days: 18,
    ease_factor: 2.4,
    created_at: daysAgo(35),
  },

  // MONTH 5-6: LAW & BUSINESS ADVANCED CONCEPTS
  {
    id: 'demo-card-028',
    material_id: 'material-demo-4',
    user_id: 'user-demo',
    question: 'What is common law?',
    answer: 'A system of law based on judicial precedent rather than statutory law.',
    difficulty: 4,
    next_review: daysAgo(-50),
    interval_days: 50,
    ease_factor: 2.7,
    created_at: daysAgo(28),
  },
  {
    id: 'demo-card-029',
    material_id: 'material-demo-4',
    user_id: 'user-demo',
    question: 'Define stare decisis.',
    answer: 'The legal principle of adhering to precedent in subsequent cases.',
    difficulty: 4,
    next_review: daysAgo(-28),
    interval_days: 28,
    ease_factor: 2.5,
    created_at: daysAgo(23),
  },
  {
    id: 'demo-card-030',
    material_id: 'material-demo-5',
    user_id: 'user-demo',
    question: 'What is target audience?',
    answer: 'The specific group of consumers most likely to want your product or service.',
    difficulty: 2,
    next_review: daysAgo(-42),
    interval_days: 42,
    ease_factor: 2.8,
    created_at: daysAgo(18),
  },

  // MONTH 6: FINAL MASTERY - MIXED ADVANCED TOPICS
  {
    id: 'demo-card-031',
    material_id: 'material-demo-6',
    user_id: 'user-demo',
    question: 'What is an integral?',
    answer: 'The area under a curve; the antiderivative of a function.',
    difficulty: 4,
    next_review: daysAgo(-25),
    interval_days: 25,
    ease_factor: 2.6,
    created_at: daysAgo(12),
  },
  {
    id: 'demo-card-032',
    material_id: 'material-demo-7',
    user_id: 'user-demo',
    question: 'What is cellular respiration?',
    answer: 'The process by which cells convert nutrients into energy.',
    difficulty: 3,
    next_review: daysAgo(-30),
    interval_days: 30,
    ease_factor: 2.7,
    created_at: daysAgo(8),
  },
  {
    id: 'demo-card-033',
    material_id: 'material-demo-8',
    user_id: 'user-demo',
    question: 'What was the Cold War?',
    answer: 'Geopolitical tension between the United States and Soviet Union from 1947-1991.',
    difficulty: 2,
    next_review: daysAgo(-35),
    interval_days: 35,
    ease_factor: 2.8,
    created_at: daysAgo(3),
  },

  // ============================================================================
  // ALEX MORGAN'S REALISTIC 6-MONTH PROGRESSION
  // Shows how a consistent user improves over time
  // ============================================================================

  // MONTH 1 (Nov-Dec 2023): BEGINNER - Basic concepts, short intervals
  // Starting with fundamental web development concepts
  {
    id: 'demo-card-001',
    material_id: 'material-demo-1',
    user_id: 'user-demo',
    question: 'What is HTML?',
    answer: 'HTML (HyperText Markup Language) is the standard markup language for creating web pages and web applications.',
    difficulty: 1,
    next_review: daysAgo(-30), // Due in 30 days
    interval_days: 30,
    ease_factor: 2.5,
    created_at: daysAgo(180), // 6 months ago
  },
  {
    id: 'demo-card-002',
    material_id: 'material-demo-1',
    user_id: 'user-demo',
    question: 'What is CSS?',
    answer: 'CSS (Cascading Style Sheets) is a style sheet language used for describing the presentation of a document written in HTML.',
    difficulty: 1,
    next_review: daysAgo(-25),
    interval_days: 25,
    ease_factor: 2.6,
    created_at: daysAgo(175),
  },
  {
    id: 'demo-card-003',
    material_id: 'material-demo-1',
    user_id: 'user-demo',
    question: 'What is JavaScript?',
    answer: 'JavaScript is a programming language that enables interactive web pages and is an essential part of web applications.',
    difficulty: 1,
    next_review: daysAgo(-20),
    interval_days: 20,
    ease_factor: 2.4,
    created_at: daysAgo(170),
  },
  {
    id: 'demo-card-004',
    material_id: 'material-demo-1',
    user_id: 'user-demo',
    question: 'What is the difference between let and var?',
    answer: 'let is block-scoped while var is function-scoped. let prevents variable hoisting issues.',
    difficulty: 2,
    next_review: daysAgo(-15),
    interval_days: 15,
    ease_factor: 2.3,
    created_at: daysAgo(165),
  },

  // MONTH 2 (Dec-Jan): BUILDING FOUNDATION - React basics
  {
    id: 'demo-card-005',
    material_id: 'material-demo-1',
    user_id: 'user-demo',
    question: 'What is JSX?',
    answer: 'JSX is a syntax extension for JavaScript that allows you to write HTML-like code in your JavaScript files.',
    difficulty: 2,
    next_review: daysAgo(-35),
    interval_days: 35,
    ease_factor: 2.7,
    created_at: daysAgo(150),
  },
  {
    id: 'demo-card-006',
    material_id: 'material-demo-1',
    user_id: 'user-demo',
    question: 'What is a React component?',
    answer: 'A React component is a reusable piece of code that returns a React element to be rendered to the page.',
    difficulty: 2,
    next_review: daysAgo(-28),
    interval_days: 28,
    ease_factor: 2.5,
    created_at: daysAgo(145),
  },
  {
    id: 'demo-card-007',
    material_id: 'material-demo-1',
    user_id: 'user-demo',
    question: 'What is state in React?',
    answer: 'State is a built-in React object that is used to contain data or information about the component.',
    difficulty: 3,
    next_review: daysAgo(-14),
    interval_days: 14,
    ease_factor: 2.2,
    created_at: daysAgo(140),
  },

  // MONTH 3 (Jan-Feb): PYTHON BASICS - New subject, starting over
  {
    id: 'demo-card-008',
    material_id: 'material-demo-2',
    user_id: 'user-demo',
    question: 'What is Python?',
    answer: 'Python is a high-level, interpreted programming language known for its simplicity and readability.',
    difficulty: 1,
    next_review: daysAgo(-12),
    interval_days: 12,
    ease_factor: 2.4,
    created_at: daysAgo(120),
  },
  {
    id: 'demo-card-009',
    material_id: 'material-demo-2',
    user_id: 'user-demo',
    question: 'How do you create a list in Python?',
    answer: 'Lists are created using square brackets: my_list = [1, 2, 3, 4, 5]',
    difficulty: 1,
    next_review: daysAgo(-18),
    interval_days: 18,
    ease_factor: 2.6,
    created_at: daysAgo(115),
  },
  {
    id: 'demo-card-010',
    material_id: 'material-demo-2',
    user_id: 'user-demo',
    question: 'What is list comprehension?',
    answer: 'List comprehension is a concise way to create lists using a single line of code with a for loop.',
    difficulty: 2,
    next_review: daysAgo(-8),
    interval_days: 8,
    ease_factor: 2.1,
    created_at: daysAgo(110),
  },

  // MONTH 4 (Feb-Mar): ADVANCED CONCEPTS - Building mastery
  {
    id: 'demo-card-011',
    material_id: 'material-demo-1',
    user_id: 'user-demo',
    question: 'What are React hooks?',
    answer: 'React hooks are functions that let you use state and lifecycle features in functional components.',
    difficulty: 4,
    next_review: daysAgo(-45),
    interval_days: 45,
    ease_factor: 2.8,
    created_at: daysAgo(90),
  },
  {
    id: 'demo-card-012',
    material_id: 'material-demo-2',
    user_id: 'user-demo',
    question: 'What is a Python decorator?',
    answer: 'A decorator is a function that takes another function and extends its behavior without modifying the original.',
    difficulty: 4,
    next_review: daysAgo(-22),
    interval_days: 22,
    ease_factor: 2.5,
    created_at: daysAgo(85),
  },
  {
    id: 'demo-card-013',
    material_id: 'material-demo-1',
    user_id: 'user-demo',
    question: 'What is the virtual DOM?',
    answer: 'The virtual DOM is a lightweight representation of the actual DOM that React uses to optimize updates.',
    difficulty: 3,
    next_review: daysAgo(-60),
    interval_days: 60,
    ease_factor: 2.9,
    created_at: daysAgo(80),
  },

  // MONTH 5 (Mar-Apr): SPANISH LANGUAGE - New challenge
  {
    id: 'demo-card-014',
    material_id: 'material-demo-3',
    user_id: 'user-demo',
    question: 'How do you say "Hello" in Spanish?',
    answer: 'Hola',
    difficulty: 1,
    next_review: daysAgo(-30),
    interval_days: 30,
    ease_factor: 2.7,
    created_at: daysAgo(60),
  },
  {
    id: 'demo-card-015',
    material_id: 'material-demo-3',
    user_id: 'user-demo',
    question: 'How do you say "Thank you" in Spanish?',
    answer: 'Gracias',
    difficulty: 1,
    next_review: daysAgo(-25),
    interval_days: 25,
    ease_factor: 2.8,
    created_at: daysAgo(55),
  },
  {
    id: 'demo-card-016',
    material_id: 'material-demo-3',
    user_id: 'user-demo',
    question: 'Conjugate "ser" (to be) in present tense - yo form',
    answer: 'soy',
    difficulty: 2,
    next_review: daysAgo(-10),
    interval_days: 10,
    ease_factor: 2.3,
    created_at: daysAgo(50),
  },

  // MONTH 6 (Apr-May): LAW & BUSINESS - Advanced subjects
  {
    id: 'demo-card-017',
    material_id: 'material-demo-4',
    user_id: 'user-demo',
    question: 'What is contract law?',
    answer: 'Contract law is the body of law that relates to making and enforcing agreements.',
    difficulty: 3,
    next_review: daysAgo(-40),
    interval_days: 40,
    ease_factor: 2.6,
    created_at: daysAgo(30),
  },
  {
    id: 'demo-card-018',
    material_id: 'material-demo-5',
    user_id: 'user-demo',
    question: 'What is the marketing mix?',
    answer: 'The marketing mix refers to the set of actions, or tactics, that a company uses to promote its brand or product. It consists of the 4 Ps: Product, Price, Place, Promotion.',
    difficulty: 2,
    next_review: daysAgo(-35),
    interval_days: 35,
    ease_factor: 2.7,
    created_at: daysAgo(25),
  },
  {
    id: 'demo-card-019',
    material_id: 'material-demo-6',
    user_id: 'user-demo',
    question: 'What is a derivative in calculus?',
    answer: 'A derivative measures how a function changes as its input changes. It represents the instantaneous rate of change.',
    difficulty: 4,
    next_review: daysAgo(-15),
    interval_days: 15,
    ease_factor: 2.4,
    created_at: daysAgo(20),
  },
  {
    id: 'demo-card-020',
    material_id: 'material-demo-7',
    user_id: 'user-demo',
    question: 'What are the major muscle groups?',
    answer: 'The major muscle groups are: chest, back, shoulders, arms, legs, core, and calves.',
    difficulty: 2,
    next_review: daysAgo(-20),
    interval_days: 20,
    ease_factor: 2.5,
    created_at: daysAgo(15),
  },

  // RECENT CARDS (Last 2 weeks): MAINTAINING MASTERY
  {
    id: 'demo-card-021',
    material_id: 'material-demo-8',
    user_id: 'user-demo',
    question: 'What was the Industrial Revolution?',
    answer: 'The Industrial Revolution was a period of major industrialization that took place from the late 18th to early 19th century, beginning in Britain and spreading to other parts of the world.',
    difficulty: 2,
    next_review: daysAgo(-7),
    interval_days: 7,
    ease_factor: 2.6,
    created_at: daysAgo(7),
  },



  // MONTH 2-3 CONTINUATION: PYTHON INTERMEDIATE CONCEPTS
  {
    id: 'demo-card-022',
    material_id: 'material-demo-2',
    user_id: 'user-demo',
    question: 'What is the difference between == and is?',
    answer: '== compares values for equality, is compares object identity (memory addresses).',
    difficulty: 3,
    next_review: daysAgo(-55),
    interval_days: 55,
    ease_factor: 2.8,
    created_at: daysAgo(105),
  },
  {
    id: 'demo-card-023',
    material_id: 'material-demo-2',
    user_id: 'user-demo',
    question: 'How do you handle exceptions in Python?',
    answer: 'Using try-except blocks: try: risky_operation() except ExceptionType: handle_error()',
    difficulty: 3,
    next_review: daysAgo(-42),
    interval_days: 42,
    ease_factor: 2.6,
    created_at: daysAgo(100),
  },
  {
    id: 'demo-card-024',
    material_id: 'material-demo-2',
    user_id: 'user-demo',
    question: 'What is a lambda function?',
    answer: 'An anonymous function defined with the lambda keyword: lambda x: x * 2',
    difficulty: 2,
    next_review: daysAgo(-38),
    interval_days: 38,
    ease_factor: 2.7,
    created_at: daysAgo(95),
  },
];

// ============================================================================
// REVIEW SESSIONS - 850+ reviews showing consistent daily usage
// ============================================================================

export const dummyReviewSessions: ReviewSession[] = [
  // JOHN DOE'S REGULAR REVIEW SESSIONS
  {
    id: 'review-1',
    user_id: 'user-1',
    flashcard_id: 'card-1',
    rating: 4,
    reviewed_at: '2024-01-10T00:00:00Z',
  },
  {
    id: 'review-2',
    user_id: 'user-1',
    flashcard_id: 'card-2',
    rating: 3,
    reviewed_at: '2024-01-11T00:00:00Z',
  },
  {
    id: 'review-3',
    user_id: 'user-1',
    flashcard_id: 'card-3',
    rating: 5,
    reviewed_at: '2024-01-12T00:00:00Z',
  },
  {
    id: 'review-4',
    user_id: 'user-2',
    flashcard_id: 'card-5',
    rating: 4,
    reviewed_at: '2024-01-20T00:00:00Z',
  },
  {
    id: 'review-5',
    user_id: 'user-2',
    flashcard_id: 'card-6',
    rating: 3,
    reviewed_at: '2024-01-21T00:00:00Z',
  },
  // ALEX MORGAN'S COMPREHENSIVE 6-MONTH REVIEW HISTORY
  // Shows realistic spaced repetition progression with improving mastery

  // MONTH 1 (Nov-Dec): EARLY STRUGGLES - Mixed ratings, short intervals
  // Card 001 (HTML) - Good initial learning
  {
    id: 'demo-review-001-1',
    user_id: 'user-demo',
    flashcard_id: 'demo-card-001',
    rating: 4,
    reviewed_at: daysAgo(179), // 1 day after creation
  },
  {
    id: 'demo-review-001-2',
    user_id: 'user-demo',
    flashcard_id: 'demo-card-001',
    rating: 5,
    reviewed_at: daysAgo(174), // 6 days later
  },
  {
    id: 'demo-review-001-3',
    user_id: 'user-demo',
    flashcard_id: 'demo-card-001',
    rating: 5,
    reviewed_at: daysAgo(165), // 15 days later
  },

  // Card 002 (CSS) - Some difficulty initially
  {
    id: 'demo-review-002-1',
    user_id: 'user-demo',
    flashcard_id: 'demo-card-002',
    rating: 3,
    reviewed_at: daysAgo(174), // Struggled a bit
  },
  {
    id: 'demo-review-002-2',
    user_id: 'user-demo',
    flashcard_id: 'demo-card-002',
    rating: 4,
    reviewed_at: daysAgo(169),
  },
  {
    id: 'demo-review-002-3',
    user_id: 'user-demo',
    flashcard_id: 'demo-card-002',
    rating: 5,
    reviewed_at: daysAgo(159),
  },

  // MONTH 2 (Dec-Jan): BUILDING CONFIDENCE - Better ratings, longer intervals
  // Card 005 (JSX) - Struggled with React concepts initially
  {
    id: 'demo-review-005-1',
    user_id: 'user-demo',
    flashcard_id: 'demo-card-005',
    rating: 2,
    reviewed_at: daysAgo(149), // Tough concept
  },
  {
    id: 'demo-review-005-2',
    user_id: 'user-demo',
    flashcard_id: 'demo-card-005',
    rating: 3,
    reviewed_at: daysAgo(147), // Reviewed sooner
  },
  {
    id: 'demo-review-005-3',
    user_id: 'user-demo',
    flashcard_id: 'demo-card-005',
    rating: 4,
    reviewed_at: daysAgo(140),
  },
  {
    id: 'demo-review-005-4',
    user_id: 'user-demo',
    flashcard_id: 'demo-card-005',
    rating: 5,
    reviewed_at: daysAgo(125),
  },

  // MONTH 3 (Jan-Feb): CONSISTENT IMPROVEMENT
  // Card 008 (Python basics) - New subject, back to basics
  {
    id: 'demo-review-008-1',
    user_id: 'user-demo',
    flashcard_id: 'demo-card-008',
    rating: 4,
    reviewed_at: daysAgo(119),
  },
  {
    id: 'demo-review-008-2',
    user_id: 'user-demo',
    flashcard_id: 'demo-card-008',
    rating: 5,
    reviewed_at: daysAgo(114),
  },

  // Card 010 (List comprehension) - Challenging concept
  {
    id: 'demo-review-010-1',
    user_id: 'user-demo',
    flashcard_id: 'demo-card-010',
    rating: 2,
    reviewed_at: daysAgo(109), // Struggled
  },
  {
    id: 'demo-review-010-2',
    user_id: 'user-demo',
    flashcard_id: 'demo-card-010',
    rating: 3,
    reviewed_at: daysAgo(107), // Sooner review
  },
  {
    id: 'demo-review-010-3',
    user_id: 'user-demo',
    flashcard_id: 'demo-card-010',
    rating: 4,
    reviewed_at: daysAgo(100),
  },
  {
    id: 'demo-review-010-4',
    user_id: 'user-demo',
    flashcard_id: 'demo-card-010',
    rating: 5,
    reviewed_at: daysAgo(85),
  },

  // MONTH 4 (Feb-Mar): ADVANCED CONCEPTS - Mastering complex topics
  // Card 011 (React hooks) - Major breakthrough
  {
    id: 'demo-review-011-1',
    user_id: 'user-demo',
    flashcard_id: 'demo-card-011',
    rating: 2,
    reviewed_at: daysAgo(89), // Very challenging
  },
  {
    id: 'demo-review-011-2',
    user_id: 'user-demo',
    flashcard_id: 'demo-card-011',
    rating: 2,
    reviewed_at: daysAgo(87), // Still struggling
  },
  {
    id: 'demo-review-011-3',
    user_id: 'user-demo',
    flashcard_id: 'demo-card-011',
    rating: 3,
    reviewed_at: daysAgo(80),
  },
  {
    id: 'demo-review-011-4',
    user_id: 'user-demo',
    flashcard_id: 'demo-card-011',
    rating: 4,
    reviewed_at: daysAgo(65),
  },
  {
    id: 'demo-review-011-5',
    user_id: 'user-demo',
    flashcard_id: 'demo-card-011',
    rating: 5,
    reviewed_at: daysAgo(35), // Finally mastered!
  },

  // MONTH 5 (Mar-Apr): MULTILINGUAL & DIVERSE SUBJECTS
  // Card 014 (Spanish greeting) - Language learning
  {
    id: 'demo-review-014-1',
    user_id: 'user-demo',
    flashcard_id: 'demo-card-014',
    rating: 5,
    reviewed_at: daysAgo(59),
  },
  {
    id: 'demo-review-014-2',
    user_id: 'user-demo',
    flashcard_id: 'demo-card-014',
    rating: 5,
    reviewed_at: daysAgo(44),
  },

  // MONTH 6 (Apr-May): EXPERT MASTERY - Long intervals, perfect recall
  // Card 013 (Virtual DOM) - Well mastered concept
  {
    id: 'demo-review-013-1',
    user_id: 'user-demo',
    flashcard_id: 'demo-card-013',
    rating: 5,
    reviewed_at: daysAgo(79),
  },
  {
    id: 'demo-review-013-2',
    user_id: 'user-demo',
    flashcard_id: 'demo-card-013',
    rating: 5,
    reviewed_at: daysAgo(59),
  },
  {
    id: 'demo-review-013-3',
    user_id: 'user-demo',
    flashcard_id: 'demo-card-013',
    rating: 5,
    reviewed_at: daysAgo(29), // 60-day interval maintained
  },

  // RECENT REVIEWS (Last 2 weeks) - Daily consistent practice
  {
    id: 'demo-review-recent-1',
    user_id: 'user-demo',
    flashcard_id: 'demo-card-001',
    rating: 5,
    reviewed_at: daysAgo(6),
  },
  {
    id: 'demo-review-recent-2',
    user_id: 'user-demo',
    flashcard_id: 'demo-card-011',
    rating: 5,
    reviewed_at: daysAgo(5),
  },
  {
    id: 'demo-review-recent-3',
    user_id: 'user-demo',
    flashcard_id: 'demo-card-021',
    rating: 4,
    reviewed_at: daysAgo(4),
  },
  {
    id: 'demo-review-recent-4',
    user_id: 'user-demo',
    flashcard_id: 'demo-card-005',
    rating: 5,
    reviewed_at: daysAgo(3),
  },
  {
    id: 'demo-review-recent-5',
    user_id: 'user-demo',
    flashcard_id: 'demo-card-013',
    rating: 5,
    reviewed_at: daysAgo(2),
  },
  // ============================================================================
  // ALEX MORGAN'S EXTENSIVE REVIEW HISTORY
  // Generate realistic daily review patterns over 6 months
  // ============================================================================
  ...(generateAlexReviewSessions()),
];

// Helper function to generate Alex's review sessions
function generateAlexReviewSessions(): ReviewSession[] {
  const sessions: ReviewSession[] = [];
  const flashcardIds = dummyFlashcards
    .filter(c => c.user_id === 'user-demo')
    .map(c => c.id);

  // Simulate 6 months of daily reviews (180 days)
  // Active streak: most days have reviews, some breaks for realism
  for (let dayOffset = 1; dayOffset <= 180; dayOffset++) {
    const reviewedAt = daysAgo(dayOffset);

    // Skip about 40 days (random breaks, weekends lighter)
    if (dayOffset % 6 === 0 && dayOffset % 9 !== 0) continue;

    // Number of cards reviewed this day (3-12 typically)
    const numCards = Math.floor(
      Math.random() < 0.3 ? Math.random() * 4 + 3 : Math.random() * 8 + 5
    );

    // Pick random flashcards for this day (shuffled sample)
    const shuffled = [...flashcardIds].sort(() => Math.random() - 0.5);
    const todaysCards = shuffled.slice(0, Math.min(numCards, shuffled.length));

    // Create review sessions for each card
    todaysCards.forEach((cardId, index) => {
      // Rating distribution: mostly 3-5, occasional 1-2
      let rating: number;
      const rand = Math.random();
      if (rand < 0.05) rating = 1;
      else if (rand < 0.12) rating = 2;
      else if (rand < 0.40) rating = 3;
      else if (rand < 0.75) rating = 4;
      else rating = 5;

      // Slight time offset within the day (spaced sessions)
      const hourOffset = index * 2 + Math.floor(Math.random() * 3);
      const date = new Date(reviewedAt);
      date.setHours(9 + hourOffset, Math.floor(Math.random() * 60), 0);

      sessions.push({
        id: `review-demo-${dayOffset}-${index}`,
        user_id: 'user-demo',
        flashcard_id: cardId,
        rating,
        reviewed_at: date.toISOString(),
      });
    });
  }

  return sessions.sort((a, b) =>
    new Date(a.reviewed_at).getTime() - new Date(b.reviewed_at).getTime()
  );
}

// ============================================================================
// EXAM SESSIONS - 12 completed + 3 in-progress for Alex
// ============================================================================

export const dummyExamSessions: ExamSession[] = [
  // Existing sessions
  {
    id: 'exam-1',
    user_id: 'user-1',
    title: 'React Fundamentals Quiz',
    score: 85,
    total_questions: 10,
    duration_seconds: 600,
    completed_at: '2024-01-08T00:00:00Z',
  },
  {
    id: 'exam-2',
    user_id: 'user-1',
    title: 'JavaScript Advanced Concepts',
    score: 92,
    total_questions: 15,
    duration_seconds: 900,
    completed_at: '2024-01-15T00:00:00Z',
  },
  {
    id: 'exam-3',
    user_id: 'user-2',
    title: 'Python Basics Test',
    score: 78,
    total_questions: 12,
    duration_seconds: 720,
    completed_at: '2024-01-22T00:00:00Z',
  },
  {
    id: 'exam-4',
    user_id: 'user-1',
    title: 'Data Structures Practice',
    score: null,
    total_questions: null,
    duration_seconds: null,
    completed_at: new Date().toISOString(),
  },
  // JOHN DOE'S ADDITIONAL EXAMS
  {
    id: 'exam-5',
    user_id: 'user-1',
    title: 'Web Development Fundamentals',
    score: 88,
    total_questions: 20,
    duration_seconds: 1200,
    completed_at: '2024-02-01T00:00:00Z',
  },
  {
    id: 'exam-6',
    user_id: 'user-1',
    title: 'Advanced JavaScript',
    score: 95,
    total_questions: 25,
    duration_seconds: 1500,
    completed_at: '2024-02-08T00:00:00Z',
  },
  {
    id: 'exam-7',
    user_id: 'user-1',
    title: 'TypeScript Essentials',
    score: null,
    total_questions: 18,
    duration_seconds: 1080,
    completed_at: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
  },
  // SARAH SMITH'S EXAMS
  {
    id: 'exam-8',
    user_id: 'user-2',
    title: 'Python Programming Basics',
    score: 82,
    total_questions: 15,
    duration_seconds: 900,
    completed_at: '2024-01-30T00:00:00Z',
  },
  {
    id: 'exam-9',
    user_id: 'user-2',
    title: 'Data Science Fundamentals',
    score: 76,
    total_questions: 22,
    duration_seconds: 1320,
    completed_at: '2024-02-05T00:00:00Z',
  },
  {
    id: 'exam-10',
    user_id: 'user-2',
    title: 'Machine Learning Quiz',
    score: null,
    total_questions: 30,
    duration_seconds: null,
    completed_at: new Date(Date.now() - 1800000).toISOString(), // 30 minutes ago
  },
  // JOHN DOE'S SPECIALIZED EXAMS
  {
    id: 'exam-11',
    user_id: 'user-1',
    title: 'React Component Patterns',
    score: 91,
    total_questions: 12,
    duration_seconds: 720,
    completed_at: '2024-02-15T00:00:00Z',
  },
  {
    id: 'exam-12',
    user_id: 'user-1',
    title: 'API Design Best Practices',
    score: null,
    total_questions: null,
    duration_seconds: null,
    completed_at: new Date().toISOString(),
  },
  {
    id: 'exam-13',
    user_id: 'user-2',
    title: 'SQL Query Optimization',
    score: 89,
    total_questions: 16,
    duration_seconds: 960,
    completed_at: '2024-02-12T00:00:00Z',
  },
  {
    id: 'exam-14',
    user_id: 'user-1',
    title: 'CSS Layout Mastery',
    score: null,
    total_questions: 14,
    duration_seconds: 840,
    completed_at: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
  },
  // ============================================================================
  // ALEX MORGAN'S EXAM HISTORY
  // ============================================================================
  {
    id: 'exam-demo-1',
    user_id: 'user-demo',
    title: 'Anatomy Midterm Exam',
    score: 85,
    total_questions: 20,
    duration_seconds: 2700, // 45 minutes
    completed_at: daysAgo(90),
  },
  {
    id: 'exam-demo-2',
    user_id: 'user-demo',
    title: 'Python for Data Science Final',
    score: 92,
    total_questions: 25,
    duration_seconds: 3600, // 60 minutes
    completed_at: daysAgo(75),
  },
  {
    id: 'exam-demo-3',
    user_id: 'user-demo',
    title: 'Spanish Vocabulary Quiz 1',
    score: 78,
    total_questions: 15,
    duration_seconds: 1800, // 30 minutes
    completed_at: daysAgo(60),
  },
  {
    id: 'exam-demo-4',
    user_id: 'user-demo',
    title: 'Constitutional Law Final Exam',
    score: 88,
    total_questions: 30,
    duration_seconds: 5400, // 90 minutes
    completed_at: daysAgo(45),
  },
  {
    id: 'exam-demo-5',
    user_id: 'user-demo',
    title: 'Marketing Principles Midterm',
    score: 91,
    total_questions: 20,
    duration_seconds: 2700,
    completed_at: daysAgo(30),
  },
  {
    id: 'exam-demo-6',
    user_id: 'user-demo',
    title: 'Calculus Fundamentals Test 1',
    score: 76,
    total_questions: 15,
    duration_seconds: 2700,
    completed_at: daysAgo(21),
  },
  {
    id: 'exam-demo-7',
    user_id: 'user-demo',
    title: 'Cell Biology Final Exam',
    score: 84,
    total_questions: 20,
    duration_seconds: 3600,
    completed_at: daysAgo(14),
  },
  {
    id: 'exam-demo-8',
    user_id: 'user-demo',
    title: 'World History Midterm',
    score: 89,
    total_questions: 18,
    duration_seconds: 2700,
    completed_at: daysAgo(7),
  },
  {
    id: 'exam-demo-9',
    user_id: 'user-demo',
    title: 'Comprehensive Subject Review',
    score: 94,
    total_questions: 50,
    duration_seconds: 7200, // 2 hours
    completed_at: daysAgo(3),
  },
  {
    id: 'exam-demo-10',
    user_id: 'user-demo',
    title: 'Weekly Practice Exam',
    score: 87,
    total_questions: 10,
    duration_seconds: 1200, // 20 minutes
    completed_at: daysAgo(1),
  },
  // In-progress exams
  {
    id: 'exam-demo-11',
    user_id: 'user-demo',
    title: 'Advanced Python Topics',
    score: null,
    total_questions: null,
    duration_seconds: null,
    completed_at: new Date().toISOString(),
  },
  {
    id: 'exam-demo-12',
    user_id: 'user-demo',
    title: 'Spanish Listening Comprehension',
    score: null,
    total_questions: null,
    duration_seconds: null,
    completed_at: new Date().toISOString(),
  },
  {
    id: 'exam-demo-13',
    user_id: 'user-demo',
    title: 'Law Case Analysis Quiz',
    score: null,
    total_questions: null,
    duration_seconds: null,
    completed_at: new Date().toISOString(),
  },
];

// ============================================================================
// ANALYTICS - Outstanding metrics for Alex Morgan
// ============================================================================

export const dummyAnalytics: Analytics[] = [
  {
    id: 'analytics-1',
    user_id: 'user-1',
    retention_score: 87.5,
    mastery_score: 72.3,
    streak_days: 12,
    last_review: '2024-01-15T00:00:00Z',
    total_reviews: 156,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-15T00:00:00Z',
  },
  {
    id: 'analytics-2',
    user_id: 'user-2',
    retention_score: 65.2,
    mastery_score: 58.9,
    streak_days: 5,
    last_review: '2024-01-20T00:00:00Z',
    total_reviews: 89,
    created_at: '2024-01-15T00:00:00Z',
    updated_at: '2024-01-20T00:00:00Z',
  },
  // ALEX MORGAN'S ANALYTICS - CONSISTENT 6-MONTH USER
  // Shows realistic progression: started basic, now advanced but still learning
  {
    id: 'analytics-demo',
    user_id: 'user-demo',
    retention_score: 87.3, // Excellent but not perfect - shows spaced repetition working
    mastery_score: 76.8, // Good mastery across diverse subjects
    streak_days: 28, // Recent streak (not continuous for 6 months)
    last_review: new Date().toISOString(),
    total_reviews: 856, // ~4.8 reviews/day average over 6 months
    created_at: '2024-01-01T00:00:00Z',
    updated_at: new Date().toISOString(),
  },
];

// ============================================================================
// AI TUTOR KNOWLEDGE BASE - Predefined Q&A for intelligent responses
// ============================================================================

export interface AITutorKnowledge {
  id: string;
  category: string;
  question: string;
  answer: string;
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export const dummyAITutorKnowledge: AITutorKnowledge[] = [
  // React Knowledge
  {
    id: 'ai-react-1',
    category: 'React',
    question: 'What is JSX?',
    answer: 'JSX is a syntax extension for JavaScript that allows you to write HTML-like code in your JavaScript files. It makes React components more readable and easier to write. Under the hood, JSX gets transpiled to regular JavaScript function calls.',
    tags: ['react', 'jsx', 'syntax'],
    difficulty: 'beginner',
  },
  {
    id: 'ai-react-2',
    category: 'React',
    question: 'What is the virtual DOM?',
    answer: 'The virtual DOM is a lightweight representation of the actual DOM that React uses to optimize updates. Instead of directly manipulating the real DOM (which is expensive), React compares the virtual DOM with a snapshot taken before the update and only applies the necessary changes to the real DOM.',
    tags: ['react', 'virtual-dom', 'performance'],
    difficulty: 'intermediate',
  },
  {
    id: 'ai-react-3',
    category: 'React',
    question: 'What are React hooks?',
    answer: 'React hooks are functions that let you use state and lifecycle features in functional components. They were introduced in React 16.8 to allow stateful logic reuse without class components. Common hooks include useState, useEffect, useContext, and useCallback.',
    tags: ['react', 'hooks', 'functional-components'],
    difficulty: 'intermediate',
  },

  // JavaScript Knowledge
  {
    id: 'ai-js-1',
    category: 'JavaScript',
    question: 'What is closure in JavaScript?',
    answer: 'A closure is the combination of a function and the lexical environment within which that function was declared. This allows the function to access variables from its outer scope even after the outer function has finished executing.',
    tags: ['javascript', 'closure', 'scope'],
    difficulty: 'intermediate',
  },
  {
    id: 'ai-js-2',
    category: 'JavaScript',
    question: 'Explain event bubbling.',
    answer: 'Event bubbling is the process where an event propagates from the target element up through its ancestors in the DOM tree. When an event occurs on an element, it first runs the handlers on that element, then on its parent, then on its grandparent, and so on, until it reaches the root.',
    tags: ['javascript', 'events', 'dom'],
    difficulty: 'intermediate',
  },
  {
    id: 'ai-js-3',
    category: 'JavaScript',
    question: 'What is the difference between let, const, and var?',
    answer: 'var is function-scoped and can be redeclared, let and const are block-scoped. const cannot be reassigned after declaration, while let can. Both let and const are hoisted but not initialized, unlike var.',
    tags: ['javascript', 'variables', 'scope'],
    difficulty: 'beginner',
  },

  // Python Knowledge
  {
    id: 'ai-python-1',
    category: 'Python',
    question: 'What is list comprehension in Python?',
    answer: 'List comprehension is a concise way to create lists using a single line of code. It consists of brackets containing an expression, followed by a for clause, then zero or more for or if clauses. It\'s more readable and often faster than using loops.',
    tags: ['python', 'list-comprehension', 'syntax'],
    difficulty: 'beginner',
  },
  {
    id: 'ai-python-2',
    category: 'Python',
    question: 'Explain the difference between tuples and lists.',
    answer: 'Lists are mutable (can be changed after creation) while tuples are immutable. Lists use square brackets [] and tuples use parentheses (). Tuples are slightly faster and can be used as dictionary keys, while lists cannot.',
    tags: ['python', 'tuples', 'lists', 'data-structures'],
    difficulty: 'beginner',
  },
  {
    id: 'ai-python-3',
    category: 'Python',
    question: 'What is a Python decorator?',
    answer: 'A decorator is a function that takes another function and extends its behavior without modifying the original function. Decorators are applied using the @ symbol. They\'re commonly used for logging, authentication, caching, and timing functions.',
    tags: ['python', 'decorators', 'functions'],
    difficulty: 'advanced',
  },

  // Data Structures & Algorithms
  {
    id: 'ai-dsa-1',
    category: 'Data Structures',
    question: 'What is the time complexity of binary search?',
    answer: 'Binary search has O(log n) time complexity in both average and worst cases. This is because with each comparison, the search space is halved, so it takes logarithmic time to find the target element in a sorted array.',
    tags: ['algorithms', 'binary-search', 'complexity'],
    difficulty: 'intermediate',
  },
  {
    id: 'ai-dsa-2',
    category: 'Data Structures',
    question: 'What is a hash table?',
    answer: 'A hash table is a data structure that stores key-value pairs and uses a hash function to compute an index for storing values. It provides average O(1) time complexity for insertions, deletions, and lookups, making it very efficient for these operations.',
    tags: ['data-structures', 'hash-table', 'hashing'],
    difficulty: 'intermediate',
  },
  {
    id: 'ai-dsa-3',
    category: 'Algorithms',
    question: 'What is dynamic programming?',
    answer: 'Dynamic programming is a method for solving complex problems by breaking them down into simpler subproblems and storing the results. It\'s particularly useful for optimization problems and is based on the principle of optimality - the optimal solution to a problem depends on the optimal solutions of its subproblems.',
    tags: ['algorithms', 'dynamic-programming', 'optimization'],
    difficulty: 'advanced',
  },

  // Web Development
  {
    id: 'ai-web-1',
    category: 'Web Development',
    question: 'What is REST API?',
    answer: 'REST (Representational State Transfer) is an architectural style for designing networked applications. It uses HTTP methods (GET, POST, PUT, DELETE) and follows principles like statelessness, cacheability, and a uniform interface. REST APIs are commonly used for web services.',
    tags: ['web-development', 'api', 'rest'],
    difficulty: 'intermediate',
  },
  {
    id: 'ai-web-2',
    category: 'Web Development',
    question: 'What is the purpose of CSS Flexbox?',
    answer: 'CSS Flexbox is a layout model that allows responsive elements within a container to be automatically arranged. It provides a more efficient way to lay out, align, and distribute space among items in a container, even when their sizes are unknown or dynamic.',
    tags: ['css', 'flexbox', 'layout'],
    difficulty: 'intermediate',
  },
  {
    id: 'ai-web-3',
    category: 'Web Development',
    question: 'Explain the concept of promises in JavaScript.',
    answer: 'Promises represent the eventual completion or failure of an asynchronous operation and its resulting value. They provide a cleaner way to handle asynchronous code compared to callbacks. A promise can be in one of three states: pending, fulfilled, or rejected.',
    tags: ['javascript', 'promises', 'async'],
    difficulty: 'intermediate',
  },

  // Learning & Study Tips
  {
    id: 'ai-study-1',
    category: 'Study Tips',
    question: 'How does spaced repetition work?',
    answer: 'Spaced repetition works by reviewing information at increasing intervals over time. When you first learn something, you review it soon after. If you remember it well, the interval increases. If you struggle, the interval decreases. This leverages the forgetting curve and strengthens long-term retention.',
    tags: ['learning', 'spaced-repetition', 'memory'],
    difficulty: 'beginner',
  },
  {
    id: 'ai-study-2',
    category: 'Study Tips',
    question: 'What makes a good flashcard?',
    answer: 'A good flashcard has a clear, concise question on one side and a complete but brief answer on the other. It should test understanding rather than just memorization. Use active recall by covering the answer and trying to remember it before checking.',
    tags: ['flashcards', 'study-tips', 'active-recall'],
    difficulty: 'beginner',
  },
];

// ============================================================================
// BLOG POSTS - Existing content (unchanged)
// ============================================================================

export const dummyBlogPosts: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'Mastering Spaced Repetition: The Science Behind Effective Learning',
    slug: 'mastering-spaced-repetition',
    content: `# Mastering Spaced Repetition: The Science Behind Effective Learning

Spaced repetition is a learning technique that involves reviewing material at increasing intervals over time. This method is based on the psychological principle that information is better retained when it's reviewed at optimal time intervals rather than cramming all at once.

## How It Works

The algorithm behind spaced repetition calculates the ideal time for reviewing information based on your performance. When you correctly recall information, the interval increases. When you struggle, the interval decreases.

## Benefits

- **Improved Retention**: Studies show spaced repetition can improve long-term retention by up to 200%
- **Efficient Learning**: Focus your time on material that needs more review
- **Reduced Forgetting**: Combat the "forgetting curve" with strategic reviews

## Getting Started

Start by creating flashcards for the material you want to learn. Review them regularly using a spaced repetition system, and let the algorithm guide your study schedule.`,
    excerpt: 'Learn how spaced repetition can revolutionize your learning process and improve long-term knowledge retention.',
    category: 'Learning Techniques',
    author: 'admin',
    cover_image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800',
    published_at: '2024-01-10T00:00:00Z',
    created_at: '2024-01-10T00:00:00Z',
  },
  {
    id: 'blog-2',
    title: 'The Power of Active Recall in Memory Formation',
    slug: 'power-of-active-recall',
    content: `# The Power of Active Recall in Memory Formation

Active recall is the process of actively retrieving information from memory rather than passively reviewing material. This technique strengthens memory formation and improves long-term retention.

## Why Active Recall Works

When you actively try to remember information, you strengthen the neural connections in your brain. This is more effective than simply re-reading notes or highlighting text.

## Techniques for Active Recall

- **Flashcards**: Test yourself on key concepts
- **Practice Testing**: Take quizzes without looking at answers first
- **Teaching Others**: Explain concepts to someone else
- **Self-Testing**: Cover up answers and try to recall them

## Combining with Spaced Repetition

The most powerful learning strategy combines active recall with spaced repetition. This creates a robust system for mastering any subject.`,
    excerpt: 'Discover how active recall techniques can transform your study sessions and boost memory retention.',
    category: 'Memory Techniques',
    author: 'admin',
    cover_image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800',
    published_at: '2024-01-15T00:00:00Z',
    created_at: '2024-01-15T00:00:00Z',
  },
  {
    id: 'blog-3',
    title: 'Building Better Study Habits: A Complete Guide',
    slug: 'building-study-habits',
    content: `# Building Better Study Habits: A Complete Guide

Developing effective study habits is crucial for academic success and lifelong learning. This guide will help you create a study routine that works for your lifestyle and learning style.

## The Foundation: Consistency

The most important factor in building study habits is consistency. It's better to study for 30 minutes every day than to cram for 5 hours once a week.

## Creating Your Study Environment

- **Dedicated Space**: Have a specific place for studying
- **Minimize Distractions**: Remove phones, social media notifications
- **Comfortable Setup**: Good lighting, comfortable chair, necessary supplies

## Study Techniques

1. **Pomodoro Technique**: 25 minutes of focused study followed by a 5-minute break
2. **Feynman Technique**: Explain concepts as if teaching someone else
3. **Interleaved Practice**: Mix different subjects or topics in one study session

## Tracking Progress

Use tools to track your study time, completed tasks, and learning progress. This helps maintain motivation and identify areas for improvement.`,
    excerpt: 'A comprehensive guide to developing effective study habits that will serve you throughout your academic and professional career.',
    category: 'Study Skills',
    author: 'admin',
    cover_image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
    published_at: '2024-01-20T00:00:00Z',
    created_at: '2024-01-20T00:00:00Z',
  },
];

// Export all dummy data
export const dummyData = {
  profiles: dummyProfiles,
  studyMaterials: dummyStudyMaterials,
  flashcards: dummyFlashcards,
  reviewSessions: dummyReviewSessions,
  examSessions: dummyExamSessions,
  analytics: dummyAnalytics,
  blogPosts: dummyBlogPosts,
};
