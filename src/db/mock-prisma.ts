import {
  dummyProfiles,
  dummyStudyMaterials,
  dummyFlashcards,
  dummyReviewSessions,
  dummyExamSessions,
  dummyAnalytics,
  dummyBlogPosts,
} from './dummy-data';
import type {
  Profile,
  StudyMaterial,
  Flashcard,
  ReviewSession,
  ExamSession,
  Analytics,
  BlogPost,
} from '@/types/types';

// Mock Prisma client that returns dummy data
export const mockPrisma = {
  profile: {
    findUnique: (args: { where: { id?: string; username?: string; email?: string } }) => {
      const { where } = args;
      if (where.id) {
        return Promise.resolve(dummyProfiles.find(p => p.id === where.id) || null);
      }
      if (where.username) {
        return Promise.resolve(dummyProfiles.find(p => p.username === where.username) || null);
      }
      if (where.email) {
        return Promise.resolve(dummyProfiles.find(p => p.email === where.email) || null);
      }
      return Promise.resolve(null);
    },
    findMany: (args?: { where?: any; orderBy?: any; take?: number }) => {
      let results = [...dummyProfiles];

      if (args?.where) {
        // Simple filtering - in a real implementation you'd handle more complex queries
        Object.keys(args.where).forEach(key => {
          if (args.where[key]) {
            results = results.filter(p => (p as any)[key] === args.where[key]);
          }
        });
      }

      if (args?.orderBy) {
        // Simple sorting - handle basic cases
        const [field, order] = Object.entries(args.orderBy)[0];
        results.sort((a, b) => {
          const aVal = (a as any)[field];
          const bVal = (b as any)[field];
          if (order === 'desc') {
            return bVal > aVal ? 1 : -1;
          }
          return aVal > bVal ? 1 : -1;
        });
      }

      if (args?.take) {
        results = results.slice(0, args.take);
      }

      return Promise.resolve(results);
    },
    create: (args: { data: Partial<Profile> }) => {
      const newProfile: Profile = {
        id: `profile-${Date.now()}`,
        username: args.data.username || '',
        email: args.data.email || null,
        role: args.data.role || 'user',
        avatar_url: args.data.avatar_url || null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      dummyProfiles.push(newProfile);
      return Promise.resolve(newProfile);
    },
  },

  studyMaterial: {
    findMany: (args?: { where?: any; orderBy?: any; take?: number }) => {
      let results = [...dummyStudyMaterials];

      if (args?.where) {
        Object.keys(args.where).forEach(key => {
          if (args.where[key]) {
            results = results.filter(m => (m as any)[key] === args.where[key]);
          }
        });
      }

      if (args?.orderBy) {
        const [field, order] = Object.entries(args.orderBy)[0];
        results.sort((a, b) => {
          const aVal = (a as any)[field];
          const bVal = (b as any)[field];
          if (order === 'desc') {
            return bVal > aVal ? 1 : -1;
          }
          return aVal > bVal ? 1 : -1;
        });
      }

      if (args?.take) {
        results = results.slice(0, args.take);
      }

      return Promise.resolve(results);
    },
    create: (args: { data: Partial<StudyMaterial> }) => {
      const newMaterial: StudyMaterial = {
        id: `material-${Date.now()}`,
        user_id: args.data.user_id || '',
        title: args.data.title || '',
        file_url: args.data.file_url || '',
        file_type: args.data.file_type || '',
        status: args.data.status || 'pending',
        created_at: new Date().toISOString(),
      };
      dummyStudyMaterials.push(newMaterial);
      return Promise.resolve(newMaterial);
    },
  },

  flashcard: {
    findMany: (args?: { where?: any; orderBy?: any; take?: number }) => {
      let results = [...dummyFlashcards];

      if (args?.where) {
        Object.keys(args.where).forEach(key => {
          if (args.where[key] !== undefined) {
            if (key === 'nextReview' && args.where[key]?.lte) {
              results = results.filter(f => new Date(f.nextReview || '') <= args.where[key].lte);
            } else {
              results = results.filter(f => (f as any)[key] === args.where[key]);
            }
          }
        });
      }

      if (args?.orderBy) {
        const [field, order] = Object.entries(args.orderBy)[0];
        results.sort((a, b) => {
          const aVal = (a as any)[field];
          const bVal = (b as any)[field];
          if (order === 'desc') {
            return bVal > aVal ? 1 : -1;
          }
          return aVal > bVal ? 1 : -1;
        });
      }

      if (args?.take) {
        results = results.slice(0, args.take);
      }

      return Promise.resolve(results);
    },
    findUnique: (args: { where: { id: string } }) => {
      return Promise.resolve(dummyFlashcards.find(f => f.id === args.where.id) || null);
    },
    create: (args: { data: Partial<Flashcard> }) => {
      const newFlashcard: Flashcard = {
        id: `card-${Date.now()}`,
        material_id: args.data.material_id || null,
        user_id: args.data.user_id || '',
        question: args.data.question || '',
        answer: args.data.answer || '',
        difficulty: args.data.difficulty || 0,
        next_review: args.data.next_review || null,
        interval_days: args.data.interval_days || 1,
        ease_factor: args.data.ease_factor || 2.5,
        created_at: new Date().toISOString(),
      };
      dummyFlashcards.push(newFlashcard);
      return Promise.resolve(newFlashcard);
    },
    update: (args: { where: { id: string }; data: Partial<Flashcard> }) => {
      const index = dummyFlashcards.findIndex(f => f.id === args.where.id);
      if (index !== -1) {
        dummyFlashcards[index] = { ...dummyFlashcards[index], ...args.data };
        return Promise.resolve(dummyFlashcards[index]);
      }
      return Promise.resolve(null);
    },
  },

  reviewSession: {
    create: (args: { data: Partial<ReviewSession> }) => {
      const newSession: ReviewSession = {
        id: `review-${Date.now()}`,
        user_id: args.data.user_id || '',
        flashcard_id: args.data.flashcard_id || '',
        rating: args.data.rating || 3,
        reviewed_at: new Date().toISOString(),
      };
      dummyReviewSessions.push(newSession);
      return Promise.resolve(newSession);
    },
  },

  examSession: {
    findMany: (args?: { where?: any; orderBy?: any; take?: number }) => {
      let results = [...dummyExamSessions];

      if (args?.where) {
        Object.keys(args.where).forEach(key => {
          if (args.where[key]) {
            results = results.filter(e => (e as any)[key] === args.where[key]);
          }
        });
      }

      if (args?.orderBy) {
        const [field, order] = Object.entries(args.orderBy)[0];
        results.sort((a, b) => {
          const aVal = (a as any)[field];
          const bVal = (b as any)[field];
          if (order === 'desc') {
            return bVal > aVal ? 1 : -1;
          }
          return aVal > bVal ? 1 : -1;
        });
      }

      if (args?.take) {
        results = results.slice(0, args.take);
      }

      return Promise.resolve(results);
    },
    create: (args: { data: Partial<ExamSession> }) => {
      const newExam: ExamSession = {
        id: `exam-${Date.now()}`,
        user_id: args.data.user_id || '',
        title: args.data.title || '',
        score: args.data.score || null,
        total_questions: args.data.total_questions || null,
        duration_seconds: args.data.duration_seconds || null,
        completed_at: new Date().toISOString(),
      };
      dummyExamSessions.push(newExam);
      return Promise.resolve(newExam);
    },
  },

  analytics: {
    findUnique: (args: { where: { userId: string } }) => {
      return Promise.resolve(dummyAnalytics.find(a => a.user_id === args.where.userId) || null);
    },
    upsert: (args: { where: { userId: string }; update: Partial<Analytics>; create: Partial<Analytics> }) => {
      const existing = dummyAnalytics.find(a => a.user_id === args.where.userId);
      if (existing) {
        Object.assign(existing, args.update);
        existing.updated_at = new Date().toISOString();
        return Promise.resolve(existing);
      } else {
        const newAnalytics: Analytics = {
          id: `analytics-${Date.now()}`,
          user_id: args.where.userId,
          retention_score: args.create.retention_score || 0,
          mastery_score: args.create.mastery_score || 0,
          streak_days: args.create.streak_days || 0,
          last_review: args.create.last_review || null,
          total_reviews: args.create.total_reviews || 0,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        dummyAnalytics.push(newAnalytics);
        return Promise.resolve(newAnalytics);
      }
    },
  },

  blogPost: {
    findMany: (args?: { where?: any; orderBy?: any; take?: number }) => {
      let results = [...dummyBlogPosts];

      if (args?.where) {
        Object.keys(args.where).forEach(key => {
          if (args.where[key]) {
            results = results.filter(b => (b as any)[key] === args.where[key]);
          }
        });
      }

      if (args?.orderBy) {
        const [field, order] = Object.entries(args.orderBy)[0];
        results.sort((a, b) => {
          const aVal = (a as any)[field];
          const bVal = (b as any)[field];
          if (order === 'desc') {
            return bVal > aVal ? 1 : -1;
          }
          return aVal > bVal ? 1 : -1;
        });
      }

      if (args?.take) {
        results = results.slice(0, args.take);
      }

      return Promise.resolve(results);
    },
    findUnique: (args: { where: { id?: string; slug?: string } }) => {
      if (args.where.id) {
        return Promise.resolve(dummyBlogPosts.find(b => b.id === args.where.id) || null);
      }
      if (args.where.slug) {
        return Promise.resolve(dummyBlogPosts.find(b => b.slug === args.where.slug) || null);
      }
      return Promise.resolve(null);
    },
  },
};