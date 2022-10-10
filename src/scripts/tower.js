import _ from 'lodash';
import { fetchTower } from './api';

export const medalNames = ['bronze', 'silver', 'gold', 'platinum', 'diamond', 'moon', 'sun'];
export const statNames = ['atk', 'def', 'hp', 'lvl', 'hpmulti', 'expmulti'];
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
    if (towerData.thresholds[name]) {
      medal = name;
      threshold = towerData.thresholds[name];
    }
  });
  return { name: medal, threshold };
}

export function calcRewards(score, towerData, pure = false) {
  let medal = null;
  let sunstones = 0;
  let toNext = 0;
  _.each(towerData.thresholds, (threshold, name) => {
    if (name === 'overscore') return; // bit ugly, but since we store medals and overscores in the same array...
    if (threshold && score >= threshold) medal = name;
  });
  const maxMedal = getMaxMedal(towerData);

  /* Sunstones for medal collection */
  sunstones = sunstonesForMedal(medal, pure);
  /* If we are above the max medal, can overscore */
  if (medal === maxMedal.name) {
    const overscore = score - maxMedal.threshold;
    const overscoreStones = Math.floor(overscore / towerData.thresholds.overscore);
    sunstones += overscoreStones;
    /* calc gap to next sunstone */
    toNext = towerData.thresholds.overscore * (overscoreStones + 1) - overscore;
  } else {
    /* calc gap to next medal */
    toNext = towerData.thresholds[medalNames[_.indexOf(medalNames, medal) + 1]] - score;
  }

  return { medal, sunstones, toNext };
}

export function calcScores(runData) {
  const atk = runData?.atk || 0;
  const def = runData?.def || 0;
  const hp = runData?.hp || 0;
  const lvl = runData?.level || 1;
  return {
    1: atk * lvl + def * lvl + hp,
    2: atk * 5 * lvl + def * 5 * lvl + hp,
    3: atk * 10 * lvl + def * 10 * lvl + hp,
    4: atk * 10 * lvl + def * 10 * lvl,
  };
}

export function calcClear(runData) {
  const score = runData?.score || 0;
  const scores = calcScores(runData);
  if (scores[1] === score) return 'clear1';
  if (scores[2] === score) return 'clear2';
  if (scores[3] === score) return 'clear3';
  if (scores[4] === score) return 'clear3noHp';
  return null;
}
