import { getRecords } from '../../../lib/records';

export default async function fetchPlayerRecords(req, res) {
  const { method } = req;
  const player = parseInt(req.query.player, 10);

  switch (method) {
    case 'GET':
      try {
        const [impureRecords, pureRecords, playerInfo] = await getRecords({ player });
        res.json({ impure: impureRecords, pure: pureRecords, player: playerInfo });
      } catch (e) {
        console.error('Request error', e);
        res.status(500).json({ error: `Error fetching records for player ${player}` });
      }
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
