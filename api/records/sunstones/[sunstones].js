import { getRecords } from '../../../lib/records';

export default async function fetchProgressRecords(req, res) {
  const { method } = req;
  const sunstones = parseInt(req.query.sunstones, 10);

  switch (method) {
    case 'GET':
      try {
        const [impureRecords, pureRecords] = await getRecords({ sunstones });
        res.json({ impure: impureRecords, pure: pureRecords });
      } catch (e) {
        console.error('Request error', e);
        res.status(500).json({ error: `Error fetching records for meta progress ${sunstones}` });
      }
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
