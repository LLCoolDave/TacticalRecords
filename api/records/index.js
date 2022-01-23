import { getRecords } from '../../lib/records';

export default async function fetchGlobalRecords(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const [impureRecords, pureRecords] = await getRecords();
        res.json({ impure: impureRecords, pure: pureRecords });
      } catch (e) {
        console.error('Request error', e);
        res.status(500).json({ error: 'Error fetching global records' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
