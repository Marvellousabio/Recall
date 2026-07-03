import { Router } from 'express';
import { prisma } from '../prisma';

router.get('/', async (req, res) => {
  try {
    const { user_id } = req.query;

    const where: any = {};
    if (user_id) where.user_id = user_id as string;

    const exams = await prisma.examSession.findMany({
      where,
      orderBy: { completed_at: 'desc' }
    });

    res.json(exams);
  } catch (error) {
    console.error('Failed to fetch exams:', error);
    res.status(500).json({ error: 'Failed to fetch exams' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const exam = await prisma.examSession.findUnique({
      where: { id }
    });

    if (!exam) {
      return res.status(404).json({ error: 'Exam not found' });
    }

    res.json(exam);
  } catch (error) {
    console.error('Failed to fetch exam:', error);
    res.status(500).json({ error: 'Failed to fetch exam' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { user_id, title, total_questions, duration_seconds } = req.body;

    const exam = await prisma.examSession.create({
      data: {
        user_id,
        title,
        total_questions,
        duration_seconds,
        score: null,
        completed_at: new Date()
      }
    });

    res.status(201).json(exam);
  } catch (error) {
    console.error('Failed to create exam:', error);
    res.status(500).json({ error: 'Failed to create exam' });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { score, completed_at } = req.body;

    const exam = await prisma.examSession.update({
      where: { id },
      data: {
        score: score ?? undefined,
        completed_at: completed_at ? new Date(completed_at) : undefined
      }
    });

    res.json(exam);
  } catch (error) {
    console.error('Failed to update exam:', error);
    res.status(500).json({ error: 'Failed to update exam' });
  }
});

export default router;
