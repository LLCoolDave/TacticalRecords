import prisma from '../../lib/prisma';
import { updatePlayerStats, calcImpureStones } from '../../lib/records';
import { checkJwt, mayEdit, getUserId } from '../../lib/auth';

export default async function fetchRun(req, res) {
  const { method } = req;
  const run = parseInt(req.query.run, 10);
  let authorized = false;
  let oldRun;
  let playerId;

  switch (method) {
    case 'GET':
      try {
        const match = await prisma.run.findUnique({
          where: {
            id: run,
          },
          include: {
            resourceUse: true,
            player: {
              select: {
                id: true,
                name: true,
                pfp: true,
              },
            },
          },
        });
        res.json(match);
      } catch (e) {
        console.error('Request error', e);
        res.status(500).json({ error: `Error fetching run ${run}` });
      }
      break;
    case 'PUT':
      authorized = await checkJwt(req);
      if (!authorized) {
        res.status(500).json({ error: 'User unauthenticated' });
        break;
      }
      authorized = await mayEdit(req.user, req.body.playerId);
      if (!authorized) {
        res.status(500).json({ error: 'User unauthorized to modify this data' });
        break;
      }

      try {
        const payload = req.body;
        // Inject update statement for referenced table
        payload.resourceUse = { update: req.body.resourceUse };
        // Calculate impure sunstone value
        payload.impureSunstones = calcImpureStones(payload);
        await prisma.run.update({
          where: {
            id: run,
          },
          data: payload,
        });
        const newPlayerInfo = await updatePlayerStats(req.body.playerId);
        /* return new player info in case the submitter did the run themselves */
        if (newPlayerInfo && await getUserId(req.user) === req.body.playerId) {
          res.json({ id: run, player: newPlayerInfo });
        } else {
          res.json({ id: run });
        }
      } catch (e) {
        console.error('Request error', e);
        res.status(500).json({ error: `Error updating run ${run}` });
      }
      break;
    case 'DELETE':
      authorized = await checkJwt(req);
      if (!authorized) {
        res.status(500).json({ error: 'User unauthenticated' });
        break;
      }

      /* Find owner of run */
      oldRun = await prisma.run.findUnique({ where: { id: run }, select: { playerId: true } });
      if (oldRun) {
        playerId = oldRun.playerId;
      } else {
        res.json({ id: run });
        break;
      }

      authorized = await mayEdit(req.user, playerId);
      if (!authorized) {
        res.status(500).json({ error: 'User unauthorized to modify this data' });
        break;
      }

      try {
        await prisma.resourceUse.delete({
          where: {
            runId: run,
          },
        });
        await prisma.run.delete({
          where: {
            id: run,
          },
        });
        const newPlayerInfo = await updatePlayerStats(playerId);
        /* return new player info in case the submitter did the run themselves */
        if (newPlayerInfo && await getUserId(req.user) === playerId) {
          res.json({ id: run, player: newPlayerInfo });
        } else {
          res.json({ id: run });
        }
      } catch (e) {
        console.error('Request error', e);
        res.status(500).json({ error: `Error updating run ${req.query.run}` });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
