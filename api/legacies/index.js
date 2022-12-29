import _ from 'lodash';
import prisma from '../../lib/prisma';
import { checkJwt, isAdmin } from '../../lib/auth';

function updateQueryBuilder(entry) {
  if (entry?.new) {
    return prisma.legacy.create({
      data: {
        id: entry.id,
        slot: entry.slot,
        fullName: entry.fullName,
        costFlat: entry.costFlat,
        costPercent: entry.costPercent,
        max: entry.max,
      },
    });
  }
  return prisma.legacy.update({
    where: {
      id: entry.origId,
    },
    data: {
      id: entry.id,
      slot: entry.slot,
      fullName: entry.fullName,
      costFlat: entry.costFlat,
      costPercent: entry.costPercent,
      max: entry.max,
    },
  });
}

export default async function fetchLegacies(req, res) {
  const { method } = req;
  let authorized = false;

  switch (method) {
    case 'GET':
      try {
        const matches = await prisma.legacy.findMany({
          orderBy: [
            {
              slot: 'asc',
            },
          ],
        });
        res.setHeader('Cache-Control', 'max-age=3600');
        res.json(matches);
      } catch (e) {
        console.error('Request error', e);
        res.status(500).json({ error: 'Error fetching legacies' });
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
        const queries = _.map(payload, updateQueryBuilder);
        await prisma.$transaction(queries);
        res.json({});
      } catch (e) {
        console.error('Request error', e);
        res.status(500).json({ error: 'Error updating legacies' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
