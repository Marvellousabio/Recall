import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    let analytics = await prisma.analytics.findUnique({
      where: { user_id: userId }
    });

    if (!analytics) {
      analytics = await prisma.analytics.create({
        data: {
          user_id: userId,
          retention_score: 0,
          mastery_score: 0,
          streak_days: 0,
          total_reviews: 0
        }
      });
    }

    res.json(analytics);
  } catch (error) {
    console.error('Failed to fetch analytics:', error);
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

router.patch('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const updates = req.body;

    const analytics = await prisma.analytics.upsert({
      where: { user_id: userId },
      update: {
        ...updates,
        updated_at: new Date()
      },
      create: {
        user_id: userId,
        ...updates,
        retention_score: updates.retention_score ?? 0,
        mastery_score: updates.mastery_score ?? 0,
        streak_days: updates.streak_days ?? 0,
        total_reviews: updates.total_reviews ?? 0
      }
    });

    res.json(analytics);
  } catch (error) {
    console.error('Failed to update analytics:', error);
    res.status(500).json({ error: 'Failed to update analytics' });
  }
});

export default router;
