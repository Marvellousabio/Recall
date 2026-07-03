import { Router } from 'express';
import { prisma } from '../prisma';

router.get('/', async (req, res) => {
  try {
    const materials = await prisma.studyMaterial.findMany({
      orderBy: { created_at: 'desc' }
    });
    res.json(materials);
  } catch (error) {
    console.error('Failed to fetch materials:', error);
    res.status(500).json({ error: 'Failed to fetch materials' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { user_id, title, file_url, file_type, status } = req.body;

    const material = await prisma.studyMaterial.create({
      data: {
        user_id,
        title,
        file_url,
        file_type: file_type || 'application/octet-stream',
        status: status || 'pending'
      }
    });

    res.status(201).json(material);
  } catch (error) {
    console.error('Failed to create material:', error);
    res.status(500).json({ error: 'Failed to create material' });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const material = await prisma.studyMaterial.update({
      where: { id },
      data: { status }
    });

    res.json(material);
  } catch (error) {
    console.error('Failed to update material:', error);
    res.status(500).json({ error: 'Failed to update material' });
  }
});

export default router;
