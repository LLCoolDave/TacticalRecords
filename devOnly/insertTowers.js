import _ from 'lodash';
import { towers } from '../src/scripts/wsproxy';
import prisma from '../lib/prisma';

export default async function fetchTower(req, res) {
  const towerInsertions = _.map(towers, (val, key) => ({
    id: val.id,
    fullName: val.fullName,
    slot: val.slot,
    chapter: val.chapter,
    ingameId: val.ingameId,
    hasMysticGate: val.unlocks.mysticGate,
    hasLastInflator: val.unlocks.lastInflator,
    thresholds: {
      create: {
        bronze: val.medals.bronze || null,
        silver: val.medals.silver || null,
        gold: val.medals.gold || null,
        platinum: val.medals.platinum || null,
        diamond: val.medals.diamond || null,
        moon: val.medals.moon || null,
        overscore: val.overscore,
      },
    },
    clears: {
      // eslint-disable-next-line no-nested-ternary
      create: _.map(val.clears, (clear, clearname) => ({ difficulty: clear.difficulty, volume: clear.volume, level: clearname === 'clear1' ? 1 : clearname === 'clear2' ? 2 : 3 })),
    },
  }
  ));
  console.log(towerInsertions);

  for (let i = 0; i < towerInsertions.length; i += 1) {
    try {
      // eslint-disable-next-line no-await-in-loop
      const newTower = await prisma.tower.create({
        data: towerInsertions[i],
      });
      console.log(newTower);
    } catch (e) {
      console.error('Request error', e);
    }
  }

  res.send('all good so far');
}
