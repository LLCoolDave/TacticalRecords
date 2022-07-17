import prisma from '../../lib/prisma';
import { checkJwt, isAdmin } from '../../lib/auth';

export default async function fetchTower(req, res) {
  const { method } = req;
  const { tower } = req.query;
  let authorized = false;

  switch (method) {
    case 'GET':
      try {
        const matches = await prisma.tower.findUnique({
          where: {
            id: tower,
          },
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
                overscore: true,
              },
            },
          },
        });
        res.setHeader('Cache-Control', 'max-age=3600');
        res.json(matches);
      } catch (e) {
        console.error('Request error', e);
        res.status(500).json({ error: `Error fetching tower ${tower}` });
      }
      break;
    case 'DELETE':
      authorized = await checkJwt(req);
      if (!authorized) {
        res.status(500).json({ error: 'User unauthenticated' });
        break;
      }

      authorized = await isAdmin(req.user);
      if (!authorized) {
        res.status(500).json({ error: 'User unauthorized to modify this data' });
        break;
      }

      try {
        const queries = [
          prisma.threshold.delete({
            where: {
              towerId: tower,
            },
          }),
          prisma.clear.deleteMany({
            where: {
              towerId: tower,
            },
          }),
          prisma.tower.delete({
            where: {
              id: tower,
            },
          })];
        await prisma.$transaction(queries);
        res.json({ id: tower });
      } catch (e) {
        console.error('Request error', e);
        res.status(500).json({ error: `Error updating tower ${req.query.tower}` });
      }
      break;
    case 'POST':
      authorized = await checkJwt(req);
      if (!authorized) {
        res.status(500).json({ error: 'User unauthenticated' });
        break;
      }
      authorized = await isAdmin(req.user, req.body.playerId);
      if (!authorized) {
        res.status(500).json({ error: 'User unauthorized to submit new towers' });
        break;
      }

      try {
        const payload = req.body;
        // Inject create statement for referenced table
        payload.thresholds = { create: req.body.thresholds };
        payload.clears = { create: req.body.clears };
        const newTower = await prisma.tower.create({
          data: payload,
        });
        res.json({ id: newTower.id });
      } catch (e) {
        console.error('Request error', e);
        res.status(500).json({ error: 'Error creating new tower' });
      }
      break;
    case 'PUT':
      authorized = await checkJwt(req);
      if (!authorized) {
        res.status(500).json({ error: 'User unauthenticated' });
        break;
      }
      authorized = await isAdmin(req.user);
      if (!authorized) {
        res.status(500).json({ error: 'User unauthorized to modify this data' });
        break;
      }

      try {
        const payload = req.body;
        // Inject update statement for referenced table
        payload.thresholds = { update: req.body.thresholds };
        payload.clears = { create: req.body.clears };
        const queries = [
          prisma.clear.deleteMany({ where: { towerId: req.body.id } }),
          prisma.tower.update({
            where: {
              id: tower,
            },
            data: payload,
          }),
        ];
        await prisma.$transaction(queries);
        res.json({ id: tower });
      } catch (e) {
        console.error('Request error', e);
        res.status(500).json({ error: `Error updating tower ${tower}` });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'POST', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
