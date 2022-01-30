import prisma from '../../lib/prisma';

export default async function fetchLatestRuns(req, res) {
  const { method } = req;
  const queryFilter = {};
  if (req.query?.player) {
    queryFilter.playerId = parseInt(req.query.player, 10);
  }
  const count = parseInt(req.query?.count || '20', 10);

  switch (method) {
    case 'GET':
      try {
        const matches = await prisma.run.findMany({
          where: queryFilter,
          take: count,
          orderBy: [{ time: 'desc' }],
          include: {
            player: {
              select: {
                id: true,
                name: true,
                pfp: true,
              },
            },
            resourceUse: true,
          },
        });
        res.json(matches);
      } catch (e) {
        console.error('Request error', e);
        res.status(500).json({ error: 'Error fetching latest runs' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
