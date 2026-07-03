import type { Profile, BlogPost } from '@/types/types';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem('auth_token');

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {})
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || `HTTP ${response.status}`);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json();
}

export const api = {
  signUp: (data: { username: string; email: string; password: string }) =>
    request<{ user: any; token: string }>('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(data)
    }),

  signIn: (data: { email: string; password: string }) =>
    request<{ user: any; token: string }>('/auth/signin', {
      method: 'POST',
      body: JSON.stringify(data)
    }),

  getMe: () =>
    request<{ id: string; username: string; email: string; role: string }>('/auth/me'),

  getMaterials: (params?: { user_id?: string }) => {
    const qs = params?.user_id ? `?user_id=${params.user_id}` : '';
    return request<any[]>(`/materials${qs}`);
  },

  createMaterial: (data: any) =>
    request<any>('/materials', {
      method: 'POST',
      body: JSON.stringify(data)
    }),

  updateMaterial: (id: string, data: any) =>
    request<any>(`/materials/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data)
    }),

  getFlashcards: (params?: { user_id?: string; next_review_lte?: string }) => {
    const qs = new URLSearchParams();
    if (params?.user_id) qs.set('user_id', params.user_id);
    if (params?.next_review_lte) qs.set('next_review_lte', params.next_review_lte);
    const query = qs.toString() ? `?${qs.toString()}` : '';
    return request<any[]>(`/flashcards${query}`);
  },

  getFlashcard: (id: string) =>
    request<any>(`/flashcards/${id}`),

  createFlashcard: (data: any) =>
    request<any>('/flashcards', {
      method: 'POST',
      body: JSON.stringify(data)
    }),

  updateFlashcard: (id: string, data: any) =>
    request<any>(`/flashcards/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data)
    }),

  createReviewSession: (data: { user_id: string; flashcard_id: string; rating: number }) =>
    request<any>('/flashcards/review', {
      method: 'POST',
      body: JSON.stringify(data)
    }),

  getExams: (params?: { user_id?: string }) => {
    const qs = params?.user_id ? `?user_id=${params.user_id}` : '';
    return request<any[]>(`/exams${qs}`);
  },

  getExam: (id: string) =>
    request<any>(`/exams/${id}`),

  createExam: (data: any) =>
    request<any>('/exams', {
      method: 'POST',
      body: JSON.stringify(data)
    }),

  updateExam: (id: string, data: any) =>
    request<any>(`/exams/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data)
    }),

  getAnalytics: (userId: string) =>
    request<any>(`/analytics/${userId}`),

  updateAnalytics: (userId: string, data: any) =>
    request<any>(`/analytics/${userId}`, {
      method: 'PATCH',
      body: JSON.stringify(data)
    }),

  getBlogPosts: () =>
    request<BlogPost[]>(`/blog`),

  getBlogPost: (slug: string) =>
    request<BlogPost>(`/blog/${encodeURIComponent(slug)}`),

  getAdminUsers: () =>
    request<Profile[]>(`/admin/users`),

  updateUserRole: (userId: string, newRole: 'user' | 'admin') =>
    request<Profile>(`/admin/users/${userId}`, {
      method: 'PATCH',
      body: JSON.stringify({ newRole })
    })
};
