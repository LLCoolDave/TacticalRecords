import _ from 'lodash';
import prisma from './prisma';

export function buildModeRecordsQuery(pure, player = null) {
  const filter = {};
  let playerInfo = false;
  if (player != null) {
    filter.playerId = player;
  } else {
    playerInfo = {
      select: {
        id: true,
        name: true,
        pfp: true,
      },
    };
  }
  if (pure) {
    filter.pure = true;
  } else {
    filter.impure = true;
  }

  return prisma.run.findMany({
    where: filter,
    distinct: ['towerId'],
    orderBy: {
      score: 'desc',
    },
    include: {
      resourceUse: {
        select: {
          atk: true,
          def: true,
          hp: true,
          sunstones: true,
          bronze: true,
          silver: true,
          gold: true,
          platinum: true,
          diamond: true,
          moon: true,
        },
      },
      player: playerInfo,
    },
  });
}

export async function getRecords(player = null) {
  const queries = [buildModeRecordsQuery(false, player), buildModeRecordsQuery(true, player)];
  if (player != null) queries.push(prisma.player.findUnique({ where: { id: player } }));
  return prisma.$transaction(queries);
}

const MEDALORDER = ['NONE', 'BRONZE', 'SILVER', 'GOLD', 'PLATINUM', 'DIAMOND', 'MOON'];

function bestMedal(oldMedal, newMedal) {
  if (!oldMedal) return newMedal;
  return MEDALORDER.indexOf(newMedal) > MEDALORDER.indexOf(oldMedal) ? newMedal : oldMedal;
}

export async function updatePlayerStats(player) {
  if (player == null) return {};
  const [impureRecords, pureRecords, playerInfo] = await getRecords(player);
  let sunstones = 0;
  const bestMedals = {};
  _.each(impureRecords, (run) => {
    sunstones += run.sunstones;
    bestMedals[run.towerId] = run.medal;
  });
  _.each(pureRecords, (run) => {
    sunstones += run.sunstones;
    bestMedals[run.towerId] = bestMedal(bestMedals[run.towerId], run.medal);
  });
  const newPlayerStats = {
    sunstones, bronze: 0, silver: 0, gold: 0, platinum: 0, diamond: 0, moon: 0,
  };
  _.each(bestMedals, (medal) => { newPlayerStats[medal.toLowerCase()] += 1; });
  await prisma.player.update({
    where: {
      id: player,
    },
    data: newPlayerStats,
  });
  newPlayerStats.name = playerInfo.name;
  newPlayerStats.pfp = playerInfo.pfp;
  return newPlayerStats;
}