import _ from 'lodash';
import prisma from './prisma';

export function buildModeRecordsQuery(options) {
  const { pure, player, sunstones } = options;
  const filter = { isLegacy: false };
  let orderBy = {};
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
    orderBy = [{ sunstones: 'desc' }, { resourceUse: { sunstones: 'asc' } }, { score: 'desc' }];
  } else {
    filter.impure = true;
    orderBy = [{ impureSunstones: 'desc' }, { resourceUse: { sunstones: 'asc' } }, { score: 'desc' }];
  }
  if (sunstones != null) {
    filter.resourceUse = { sunstones: { lte: sunstones } };
  }

  return prisma.run.findMany({
    where: filter,
    distinct: ['towerId'],
    orderBy,
    include: {
      resourceUse: {
        select: {
          atk: true,
          def: true,
          hp: true,
          maxHp: true,
          legacyStones: true,
          sunstones: true,
          legacies: true,
          bronze: true,
          silver: true,
          gold: true,
          platinum: true,
          diamond: true,
          moon: true,
          sun: true,
        },
      },
      player: playerInfo,
    },
  });
}

export async function getRecords(options = {}) {
  const { player = null, sunstones = null } = options;
  const queries = [buildModeRecordsQuery({ pure: false, player, sunstones }), buildModeRecordsQuery({ pure: true, player, sunstones })];
  if (player != null) queries.push(prisma.player.findUnique({ where: { id: player } }));
  return prisma.$transaction(queries);
}

const MEDALORDER = ['NONE', 'BRONZE', 'SILVER', 'GOLD', 'PLATINUM', 'DIAMOND', 'MOON', 'SUN'];

function bestMedal(oldMedal, newMedal) {
  if (!oldMedal) return newMedal;
  return MEDALORDER.indexOf(newMedal) > MEDALORDER.indexOf(oldMedal) ? newMedal : oldMedal;
}

export async function updatePlayerStats(player) {
  if (player == null) return {};
  const [impureRecords, pureRecords, playerInfo] = await getRecords({ player });
  let sunstones = 0;
  const bestMedals = {};
  _.each(impureRecords, (run) => {
    sunstones += run.impureSunstones;
    bestMedals[run.towerId] = run.medal;
  });
  _.each(pureRecords, (run) => {
    sunstones += run.sunstones;
    bestMedals[run.towerId] = bestMedal(bestMedals[run.towerId], run.medal);
  });
  const newPlayerStats = {
    sunstones, bronze: 0, silver: 0, gold: 0, platinum: 0, diamond: 0, moon: 0, sun: 0,
  };
  _.each(bestMedals, (medal) => { if (medal !== 'NONE') newPlayerStats[medal.toLowerCase()] += 1; });
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

export function calcImpureStones(run) {
  if (run.impure) {
    if (run.pure) {
      const medalStones = Math.max(MEDALORDER.indexOf(run.medal), 0);
      return Math.max(0, run.sunstones - medalStones);
    }
    return run.sunstones;
  }
  return 0;
}
