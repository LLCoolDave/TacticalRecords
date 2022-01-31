import prisma from '../../../lib/prisma';

export default async function fetchTowerRuns(req, res) {
  const { method } = req;
  const { tower } = req.query;

  switch (method) {
    case 'GET':
      try {
        const queries = [prisma.run.findMany({
          where: {
            towerId: tower,
            impure: true,
          },
          orderBy: [{ impureSunstones: 'desc' }, { resourceUse: { sunstones: 'asc' } }, { score: 'desc' }],
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
        }), prisma.run.findMany({
          where: {
            towerId: tower,
            pure: true,
          },
          orderBy: [{ sunstones: 'desc' }, { resourceUse: { sunstones: 'asc' } }, { score: 'desc' }],
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
        })];

        const [impureRecords, pureRecords] = await prisma.$transaction(queries);
        res.json({ impure: impureRecords, pure: pureRecords });
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
