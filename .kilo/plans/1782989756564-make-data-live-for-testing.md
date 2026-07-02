# Make Uploads, Flashcards, and Exams Live for Testing

## Goal
Persist all data mutations from `Upload`, `Flashcards`, `Exam`, and related auth in-browser so they survive refreshes for real testing. Keep `src/db/dummy-data.ts` untouched as the static seed.

## Persistence Strategy
Use **localStorage** for JSON metadata and **IndexedDB** for file blobs. This matches the user's choice and avoids any backend dependency.

Create/modify:
- `src/lib/persistent-store.ts` — localStorage-backed arrays/records for created `StudyMaterial`, `Flashcard`, `ReviewSession`, `ExamSession`, and `Analytics` rows.
- `src/lib/storage/idb-storage.ts` — replace the current in-memory `mockFileStorage` with an IndexedDB-backed file store so uploaded files persist across reloads.
- Update `src/lib/storage.ts` to use the new IndexedDB implementation.

## Auth/Data Seeding
- In `src/lib/auth.ts`, on sign-in or one-time startup, detect username `alex_morgan` / email `alex@example.com` and seed that user's persistent store from `dummy-data.ts` exactly once.
- New non-demo users start with **no** dummy fallback and no seeded data.

## mockPrisma Changes
Update `src/db/mock-prisma.ts`:
- `studyMaterial.findMany`, `flashcard.findMany`, `examSession.findMany`, `analytics.findUnique`:
  - Merge in-memory/seed data with persisted store.
  - Only return user-specific persisted rows plus seed rows for `user-demo`.
  - Remove the global fallback that returned demo data for any empty user query.
- `studyMaterial.create`, `flashcard.create`, `flashcard.update`, `reviewSession.create`, `examSession.create`, `examSession.findUnique`:
  - Append/update the in-memory arrays **and** persist the change.
- File upload in `Upload.tsx` calls `uploadFile`, which now writes to IndexedDB via `storage.ts`.

## New Behavior
- Uploads, generated flashcards, exams, and review ratings persist across refresh.
- Demo account sees seeded dummy data plus any additional changes.
- New accounts show only their own created data.

## Validation
1. Sign in as a new user, upload a file, generate flashcards, create an exam, rate cards, then refresh — data must remain.
2. Sign in as `alex@example.com` and confirm dummy data is still present with seeded analytics.
3. Test tab-switch warning and exam timer in `Exam.tsx` (no code change needed there).
