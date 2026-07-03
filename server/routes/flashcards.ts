import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  try {
    const { user_id, next_review_lte } = req.query;

    const where: any = {};
    if (user_id) where.user_id = user_id as string;
    if (next_review_lte) {
      where.next_review = { lte: new Date(next_review_lte as string) };
    }

    const flashcards = await prisma.flashcard.findMany({
      where,
      orderBy: { next_review: 'asc' }
    });

    res.json(flashcards);
  } catch (error) {
    console.error('Failed to fetch flashcards:', error);
    res.status(500).json({ error: 'Failed to fetch flashcards' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const flashcard = await prisma.flashcard.findUnique({
      where: { id }
    });

    if (!flashcard) {
      return res.status(404).json({ error: 'Flashcard not found' });
    }

    res.json(flashcard);
  } catch (error) {
    console.error('Failed to fetch flashcard:', error);
    res.status(500).json({ error: 'Failed to fetch flashcard' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { user_id, material_id, question, answer, difficulty, next_review, interval_days, ease_factor } = req.body;

    const flashcard = await prisma.flashcard.create({
      data: {
        user_id,
        material_id: material_id || null,
        question,
        answer,
        difficulty: difficulty || 0,
        next_review: next_review ? new Date(next_review) : null,
        interval_days: interval_days || 1,
        ease_factor: ease_factor || 2.5
      }
    });

    res.status(201).json(flashcard);
  } catch (error) {
    console.error('Failed to create flashcard:', error);
    res.status(500).json({ error: 'Failed to create flashcard' });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { next_review, interval_days, ease_factor } = req.body;

    const flashcard = await prisma.flashcard.update({
      where: { id },
      data: {
        next_review: next_review ? new Date(next_review) : undefined,
        interval_days,
        ease_factor
      }
    });

    res.json(flashcard);
  } catch (error) {
    console.error('Failed to update flashcard:', error);
    res.status(500).json({ error: 'Failed to update flashcard' });
  }
});

router.post('/review', async (req, res) => {
  try {
    const { user_id, flashcard_id, rating } = req.body;

    const session = await prisma.reviewSession.create({
      data: {
        user_id,
        flashcard_id,
        rating
      }
    });

    res.status(201).json(session);
  } catch (error) {
    console.error('Failed to create review session:', error);
    res.status(500).json({ error: 'Failed to create review session' });
  }
});

export default router;
