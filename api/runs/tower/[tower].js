import prisma from '../../../lib/prisma';

export default async function fetchTowerRuns(req, res) {
  const { method } = req;
  const { tower } = req.query;

  switch (method) {
    case 'GET':
      try {
        const matches = await prisma.run.findMany({
          where: {
            towerId: tower,
          },
          orderBy: [{ sunstones: 'desc' }, { resourceUse: { sunstones: 'asc' } }],
          include: {
            player: {
              select: {
                id: true,
                name: true,
                pfp: true,
              },
            },
          },
        });
        res.json(matches);
      } catch (e) {
        console.error('Request error', e);
        res.status(500).json({ error: `Error fetching runs for tower ${tower}` });
      }
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
