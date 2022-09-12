import prisma from '../../lib/prisma';

export default async function fetchTower(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const matches = await prisma.tower.findMany({
          orderBy: [
            {
              slot: 'asc',
            },
          ],
          include: {
            clears: {
              select: {
                level: true,
                difficulty: true,
                volume: true,
              },
            },
            thresholds: {
              select: {
                bronze: true,
                silver: true,
                gold: true,
                platinum: true,
                diamond: true,
                moon: true,
                sun: true,
                overscore: true,
              },
            },
          },
        });
        res.setHeader('Cache-Control', 'max-age=3600');
        res.json(matches);
      } catch (e) {
        console.error('Request error', e);
        res.status(500).json({ error: 'Error fetching towers' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
