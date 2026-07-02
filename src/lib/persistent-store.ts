import type { Profile, StudyMaterial, Flashcard, ReviewSession, ExamSession, Analytics, BlogPost } from '@/types/types';

type StoreKey = 'studyMaterials' | 'flashcards' | 'reviewSessions' | 'examSessions' | 'analytics' | 'profiles';

type ListRecord<T> = {
  items: T[];
  add: (item: T) => void;
  update: (id: string, patch: Partial<T>) => T | null;
  remove: (id: string) => boolean;
  all: () => T[];
  clear: () => void;
};

function loadList<T>(key: StoreKey): T[] {
  try {
    const raw = localStorage.getItem(`recall:${key}`);
    if (!raw) return [];
    return JSON.parse(raw) as T[];
  } catch {
    return [];
  }
}

function saveList<T>(key: StoreKey, items: T[]) {
  localStorage.setItem(`recall:${key}`, JSON.stringify(items));
}

export function createListStore<T extends { id: string }>(key: StoreKey): ListRecord<T> {
  const items = loadList<T>(key);

  return {
    items,
    add(item) {
      items.push(item);
      saveList(key, items);
    },
    update(id, patch) {
      const index = items.findIndex((x) => x.id === id);
      if (index === -1) return null;
      items[index] = { ...items[index], ...patch } as T;
      saveList(key, items);
      return items[index];
    },
    remove(id) {
      const index = items.findIndex((x) => x.id === id);
      if (index === -1) return false;
      items.splice(index, 1);
      saveList(key, items);
      return true;
    },
    all() {
      return [...items];
    },
    clear() {
      items.length = 0;
      saveList(key, items);
    },
  };
}

export const studyMaterialStore = createListStore<StudyMaterial>('studyMaterials');
export const flashcardStore = createListStore<Flashcard>('flashcards');
export const reviewSessionStore = createListStore<ReviewSession>('reviewSessions');
export const examSessionStore = createListStore<ExamSession>('examSessions');
export const analyticsStore = createListStore<Analytics>('analytics');

export type PersistentStore = {
  studyMaterialStore: typeof studyMaterialStore;
  flashcardStore: typeof flashcardStore;
  reviewSessionStore: typeof reviewSessionStore;
  examSessionStore: typeof examSessionStore;
  analyticsStore: typeof analyticsStore;
};
