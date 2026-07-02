import {
  dummyProfiles,
  dummyStudyMaterials,
  dummyFlashcards,
  dummyReviewSessions,
  dummyExamSessions,
  dummyAnalytics,
} from './dummy-data';
import type {
  Profile,
  StudyMaterial,
  Flashcard,
  ReviewSession,
  ExamSession,
  Analytics,
} from '@/types/types';
import {
  studyMaterialStore,
  flashcardStore,
  reviewSessionStore,
  examSessionStore,
  analyticsStore,
} from '@/lib/persistent-store';

function mergeStudyMaterials(userId?: string) {
  const seed = dummyStudyMaterials.filter((m) => m.user_id === userId || !userId);
  const persisted = studyMaterialStore.all();
  const seen = new Set(seed.map((m) => m.id));
  const extra = persisted.filter((m) => !seen.has(m.id));
  return [...seed, ...extra];
}

function mergeFlashcards(userId?: string) {
  const seed = dummyFlashcards.filter((c) => c.user_id === userId || !userId);
  const persisted = flashcardStore.all();
  const seen = new Set(seed.map((c) => c.id));
  const extra = persisted.filter((c) => !seen.has(c.id));
  return [...seed, ...extra];
}

function mergeExamSessions(userId?: string) {
  const seed = dummyExamSessions.filter((e) => e.user_id === userId || !userId);
  const persisted = examSessionStore.all();
  const seen = new Set(seed.map((e) => e.id));
  const extra = persisted.filter((e) => !seen.has(e.id));
  return [...seed, ...extra];
}

function mergeReviewSessions(userId?: string) {
  const seed = dummyReviewSessions.filter((r) => r.user_id === userId || !userId);
  const persisted = reviewSessionStore.all();
  const seen = new Set(seed.map((r) => r.id));
  const extra = persisted.filter((r) => !seen.has(r.id));
  return [...seed, ...extra];
}

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
  },

  studyMaterial: {
    findMany: (args?: { where?: any; orderBy?: any; take?: number }) => {
      let results = mergeStudyMaterials(args?.where?.userId);

      if (args?.where?.userId && results.length === 0) {
        if (args.where.userId !== 'user-demo') {
          results = [];
        }
      }

      if (args?.orderBy) {
        const [field, order] = Object.entries(args.orderBy)[0];
        const dataField = field === 'createdAt' ? 'created_at' : field;
        results.sort((a, b) => {
          const aVal = (a as any)[dataField];
          const bVal = (b as any)[dataField];
          if (order === 'desc') return bVal > aVal ? 1 : -1;
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
      studyMaterialStore.add(newMaterial);
      return Promise.resolve(newMaterial);
    },
    update: (args: { where: { id: string }; data: Partial<StudyMaterial> }) => {
      const updated = studyMaterialStore.update(args.where.id, args.data);
      if (updated) return Promise.resolve(updated);
      const dummyIndex = dummyStudyMaterials.findIndex((m) => m.id === args.where.id);
      if (dummyIndex !== -1) {
        dummyStudyMaterials[dummyIndex] = { ...dummyStudyMaterials[dummyIndex], ...args.data };
        return Promise.resolve(dummyStudyMaterials[dummyIndex]);
      }
      return Promise.resolve(null);
    },
  },

  flashcard: {
    findMany: (args?: { where?: any; orderBy?: any; take?: number }) => {
      let results = mergeFlashcards(args?.where?.userId);

      if (args?.where?.nextReview?.lte) {
        const target = args.where.nextReview.lte;
        results = results.filter((f) => new Date(f.next_review || '') <= new Date(target));
      }

      if (args?.orderBy) {
        const [field, order] = Object.entries(args.orderBy)[0];
        const dataField = field === 'createdAt' ? 'created_at' : field === 'nextReview' ? 'next_review' : field;
        results.sort((a, b) => {
          const aVal = (a as any)[dataField];
          const bVal = (b as any)[dataField];
          if (order === 'desc') return bVal > aVal ? 1 : -1;
          return aVal > bVal ? 1 : -1;
        });
      }

      if (args?.take) {
        results = results.slice(0, args.take);
      }

      return Promise.resolve(results);
    },
    findUnique: (args: { where: { id: string } }) => {
      return Promise.resolve(dummyFlashcards.find((f) => f.id === args.where.id) || flashcardStore.items.find((f) => f.id === args.where.id) || null);
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
      flashcardStore.add(newFlashcard);
      return Promise.resolve(newFlashcard);
    },
    update: (args: { where: { id: string }; data: Partial<Flashcard> }) => {
      const updated = flashcardStore.update(args.where.id, args.data);
      if (updated) return Promise.resolve(updated);
      const dummyIndex = dummyFlashcards.findIndex((f) => f.id === args.where.id);
      if (dummyIndex !== -1) {
        dummyFlashcards[dummyIndex] = { ...dummyFlashcards[dummyIndex], ...args.data };
        return Promise.resolve(dummyFlashcards[dummyIndex]);
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
      reviewSessionStore.add(newSession);
      return Promise.resolve(newSession);
    },
  },

  examSession: {
    findMany: (args?: { where?: any; orderBy?: any; take?: number }) => {
      let results = mergeExamSessions(args?.where?.userId);

      if (args?.where?.userId && results.length === 0) {
        if (args.where.userId !== 'user-demo') {
          results = [];
        }
      }

      if (args?.orderBy) {
        const [field, order] = Object.entries(args.orderBy)[0];
        const dataField = field === 'createdAt' ? 'created_at' : field;
        results.sort((a, b) => {
          const aVal = (a as any)[dataField];
          const bVal = (b as any)[dataField];
          if (order === 'desc') return bVal > aVal ? 1 : -1;
          return aVal > bVal ? 1 : -1;
        });
      }

      if (args?.take) {
        results = results.slice(0, args.take);
      }

      return Promise.resolve(results);
    },
    findUnique: (args: { where: { id: string } }) => {
      const fromDummy = dummyExamSessions.find((e) => e.id === args.where.id);
      const fromStore = examSessionStore.items.find((e) => e.id === args.where.id);
      return Promise.resolve(fromDummy || fromStore || null);
    },
    create: (args: { data: Partial<ExamSession> }) => {
      const newExam: ExamSession = {
        id: `exam-${Date.now()}`,
        user_id: args.data.user_id || '',
        title: args.data.title || '',
        score: args.data.score ?? null,
        total_questions: args.data.total_questions ?? null,
        duration_seconds: args.data.duration_seconds ?? null,
        completed_at: new Date().toISOString(),
      };
      examSessionStore.add(newExam);
      return Promise.resolve(newExam);
    },
  },

  analytics: {
    findUnique: (args: { where: { userId: string } }) => {
      const fromDummy = dummyAnalytics.find((a) => a.user_id === args.where.userId);
      const fromStore = analyticsStore.items.find((a) => a.user_id === args.where.userId);
      if (fromDummy) return Promise.resolve(fromDummy);
      if (fromStore) return Promise.resolve(fromStore);
      if (args.where.userId === 'user-demo') {
        return Promise.resolve(dummyAnalytics.find((a) => a.user_id === 'user-demo') || null);
      }
      return Promise.resolve(null);
    },
    update: async (args: { where: { userId: string }; data: Partial<Analytics> }) => {
      const existing = analyticsStore.items.find((a) => a.user_id === args.where.userId);
      if (existing) {
        const updated = analyticsStore.update(existing.id, args.data);
        if (updated) return Promise.resolve(updated);
      }
      const dummy = dummyAnalytics.find((a) => a.user_id === args.where.userId);
      if (dummy) {
        Object.assign(dummy, args.data, { updated_at: new Date().toISOString() });
        return Promise.resolve(dummy);
      }
      return Promise.resolve(null);
    },
  },

  blogPost: {
    findMany: () => Promise.resolve([]),
    findUnique: () => Promise.resolve(null),
  },
};
