import { Router, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware, AuthRequest } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

function adminOnly(req: AuthRequest, res: Response, next: NextFunction) {
  if (req.userId) {
    return next();
  }
  return res.status(403).json({ error: 'Forbidden' });
}

router.get('/users', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const users = await prisma.profile.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        avatarUrl: true,
        createdAt: true,
        updatedAt: true
      }
    });

    res.json(users);
  } catch (error) {
    console.error('Failed to fetch users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

router.patch('/users/:id', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const { newRole } = req.body as { newRole: 'user' | 'admin' };

    if (!newRole || !['user', 'admin'].includes(newRole)) {
      return res.status(400).json({ error: 'Invalid role' });
    }

    const updatedUser = await prisma.profile.update({
      where: { id: req.params.id },
      data: { role: newRole },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        avatarUrl: true,
        createdAt: true,
        updatedAt: true
      }
    });

    res.json(updatedUser);
  } catch (error) {
    console.error('Failed to update user role:', error);
    res.status(500).json({ error: 'Failed to update user role' });
  }
});

export default router;
