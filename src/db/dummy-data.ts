import type {
  Profile,
  StudyMaterial,
  Flashcard,
  ReviewSession,
  ExamSession,
  Analytics,
  BlogPost,
} from '@/types/types';

// Dummy Profiles
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
];

// Dummy Study Materials
export const dummyStudyMaterials: StudyMaterial[] = [
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
];

// Dummy Flashcards
export const dummyFlashcards: Flashcard[] = [
  {
    id: 'card-1',
    material_id: 'material-1',
    user_id: 'user-1',
    question: 'What is JSX?',
    answer: 'JSX is a syntax extension for JavaScript that allows you to write HTML-like code in your JavaScript files.',
    difficulty: 1,
    next_review: new Date(Date.now() - 86400000).toISOString(), // Due yesterday
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
    next_review: new Date(Date.now() + 86400000).toISOString(), // Due tomorrow
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
    next_review: new Date(Date.now() - 172800000).toISOString(), // Due 2 days ago
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
    next_review: new Date(Date.now() + 259200000).toISOString(), // Due in 3 days
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
    next_review: new Date(Date.now() - 432000000).toISOString(), // Due 5 days ago
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
    next_review: new Date(Date.now() + 86400000).toISOString(), // Due tomorrow
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
    next_review: new Date(Date.now() - 86400000).toISOString(), // Due yesterday
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
    next_review: new Date(Date.now() + 172800000).toISOString(), // Due in 2 days
    interval_days: 7,
    ease_factor: 2.5,
    created_at: '2024-01-05T00:00:00Z',
  },
];

// Dummy Review Sessions
export const dummyReviewSessions: ReviewSession[] = [
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
];

// Dummy Exam Sessions
export const dummyExamSessions: ExamSession[] = [
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
    completed_at: new Date().toISOString(), // In progress
  },
];

// Dummy Analytics
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
];

// Dummy Blog Posts
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