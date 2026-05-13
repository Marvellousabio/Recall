export type UserRole = 'user' | 'admin';

export interface Profile {
  id: string;
  username: string;
  email: string | null;
  role: UserRole;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface StudyMaterial {
  id: string;
  user_id: string;
  title: string;
  file_url: string;
  file_type: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  created_at: string;
}

export interface Flashcard {
  id: string;
  material_id: string | null;
  user_id: string;
  question: string;
  answer: string;
  difficulty: number;
  next_review: string | null;
  interval_days: number;
  ease_factor: number;
  created_at: string;
}

export interface ReviewSession {
  id: string;
  user_id: string;
  flashcard_id: string;
  rating: number;
  reviewed_at: string;
}

export interface ExamSession {
  id: string;
  user_id: string;
  title: string;
  score: number | null;
  total_questions: number | null;
  duration_seconds: number | null;
  completed_at: string;
}

export interface Analytics {
  id: string;
  user_id: string;
  retention_score: number;
  mastery_score: number;
  streak_days: number;
  last_review: string | null;
  total_reviews: number;
  created_at: string;
  updated_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  category: string;
  author: string;
  cover_image: string | null;
  published_at: string;
  created_at: string;
}
