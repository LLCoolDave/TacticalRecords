import _ from 'lodash';
import { calcImpureStones } from '../lib/records';
import prisma from '../lib/prisma';

export default async function updateImpure(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const match = await prisma.run.findMany({
          where: {
            impureSunstones: 0,
            id: {
              gt: 250,
            },
          },
          take: 50,
        });
        const queries = [];
        _.each(match, (run) => {
          queries.push(prisma.run.update({
            where: {
              id: run.id,
            },
            data: {
              impureSunstones: calcImpureStones(run),
            },
          }));
        });
        console.log('queries built');
        const resp = await prisma.$transaction(queries);

        res.json(resp);
      } catch (e) {
        console.error('Request error', e);
        res.status(500).json({ error: 'Error updating runs' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
