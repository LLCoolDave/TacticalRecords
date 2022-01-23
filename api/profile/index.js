import { checkJwt, getGuaranteedUserId } from '../../lib/auth';
import prisma from '../../lib/prisma';

export default async function fetchProfile(req, res) {
  const { method } = req;
  let authorized = false;

  switch (method) {
    case 'GET':
      authorized = await checkJwt(req);
      if (!authorized) res.status(500).json({ error: 'User unauthenticated' });
      else {
        const userId = await getGuaranteedUserId(req);
        try {
          const matches = await prisma.user.findUnique({
            where: {
              id: userId,
            },
            include: {
              player: {
                select: {
                  name: true,
                  pfp: true,
                  sunstones: true,
                  bronze: true,
                  silver: true,
                  gold: true,
                  platinum: true,
                  diamond: true,
                  moon: true,
                },
              },
            },
          });
          res.json(matches);
        } catch (e) {
          console.error('Request error', e);
          res.status(500).json({ error: `Error fetching user profile for ${userId}` });
        }
        break;
      }
      break;
    case 'PUT':
      authorized = await checkJwt(req);
      if (!authorized) res.status(500).json({ error: 'User unauthenticated' });
      else {
        // Safeguard against nonsense data
        if (req.body?.name === '') {
          res.status(500).json({ error: 'Display Name may not be empty' });
          break;
        }

        const userId = await getGuaranteedUserId(req);
        try {
          await prisma.player.update({
            where: {
              id: userId,
            },
            data: req.body,
          });
          const matches = await prisma.user.findUnique({
            where: {
              id: userId,
            },
            include: {
              player: {
                select: {
                  name: true,
                  pfp: true,
                  sunstones: true,
                  bronze: true,
                  silver: true,
                  gold: true,
                  platinum: true,
                  diamond: true,
                  moon: true,
                },
              },
            },
          });
          res.json(matches);
        } catch (e) {
          console.error('Request error', e);
          res.status(500).json({ error: `Error updating user profile for ${userId}` });
        }
        break;
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
