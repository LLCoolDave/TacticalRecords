import _ from 'lodash';
import { fetchTower } from './api';

export const medalNames = ['bronze', 'silver', 'gold', 'platinum', 'diamond', 'moon'];
export const chapterNames = ['Chapter-1', 'Chapter-2', 'Chapter-3', 'Chapter-4', 'Chapter-5', 'Chapter-6', 'Chapter-7', 'Chapter-8', 'Chapter-9', 'Chapter-10', 'Extra Chapter', 'Extra Chapter2', 'Special'];

export function getTowerData(towerID) {
  return fetchTower(towerID);
}

export function sunstonesForMedal(medalName, pure = false) {
  if (!pure) return 0;
  return _.indexOf(medalNames, medalName) + 1;
}

export function getMaxMedal(towerData) {
  let medal = null;
  let threshold = 0;
  _.each(medalNames, (name) => {
    if (towerData.medals[name] !== undefined) {
      medal = name;
      threshold = towerData.medals[name];
    }
  });
  return { name: medal, threshold };
}

export function calcRewards(score, towerData, pure = false) {
  let medal = null;
  let sunstones = 0;
  let toNext = 0;
  _.each(towerData.medals, (threshold, name) => {
    if (score >= threshold) medal = name;
  });
  const maxMedal = getMaxMedal(towerData);

  /* Sunstones for medal collection */
  sunstones = sunstonesForMedal(medal, pure);
  /* If we are above the max medal, can overscore */
  if (medal === maxMedal.name) {
    const overscore = score - maxMedal.threshold;
    const overscoreStones = Math.floor(overscore / towerData.overscore);
    sunstones += overscoreStones;
    /* calc gap to next sunstone */
    toNext = towerData.overscore * (overscoreStones + 1) - overscore;
  } else {
    /* calc gap to next medal */
    toNext = towerData.medals[medalNames[_.indexOf(medalNames, medal) + 1]] - score;
  }

  return { medal, sunstones, toNext };
}
