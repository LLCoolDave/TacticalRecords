import prisma from '../../lib/prisma';

export default async function fetchPlayers(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const matches = await prisma.player.findMany({
          where: {
            sunstones: {
              gt: 0,
            },
          },
          orderBy: [
            {
              sunstones: 'desc',
            },
          ],
        });
        res.json(matches);
      } catch (e) {
        console.error('Request error', e);
        res.status(500).json({ error: 'Error fetching player' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
