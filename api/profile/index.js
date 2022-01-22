import { checkJwt } from '../../lib/auth';

export default async function fetchProfile(req, res) {
  const { method } = req;
  let authorized = false;

  switch (method) {
    case 'GET':
      authorized = await checkJwt(req);
      if (!authorized) res.status(500).json({ error: 'User unauthenticated' });
      else {
        res.json({ userId: req.user.sub });
      }

      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
