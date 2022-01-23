import prisma from '../../lib/prisma';
import { checkJwt, mayEdit, getUserId } from '../../lib/auth';
import { updatePlayerStats } from '../../lib/records';

export default async function createRun(req, res) {
  const { method } = req;
  let authorized = false;

  switch (method) {
    case 'POST':
      authorized = await checkJwt(req);
      if (!authorized) {
        res.status(500).json({ error: 'User unauthenticated' });
        break;
      }
      authorized = await mayEdit(req.user, req.body.playerId);
      if (!authorized) {
        res.status(500).json({ error: 'User unauthorized to submit for this player' });
        break;
      }

      try {
        const payload = req.body;
        // Inject create statement for referenced table
        payload.resourceUse = { create: req.body.resourceUse };
        const newRun = await prisma.run.create({
          data: payload,
        });
        const newPlayerInfo = await updatePlayerStats(req.body.playerId);
        /* return new player info in case the submitter did the run themselves */
        if (newPlayerInfo && await getUserId(req.user) === req.body.playerId) {
          res.json({ id: newRun.id, player: newPlayerInfo });
        } else {
          res.json({ id: newRun.id });
        }
      } catch (e) {
        console.error('Request error', e);
        res.status(500).json({ error: 'Error creating new run' });
      }
      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
