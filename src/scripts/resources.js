/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import _ from 'lodash';
import { medalNames, statNames } from './tower';

export function getMedalURI(medal) {
  if (_.indexOf(medalNames, medal) >= 0) return require(`../assets/medal${_.upperFirst(medal)}.png`);
  return null;
}

export function getStatURI(stat) {
  if (_.indexOf(statNames, stat) >= 0) return require(`../assets/icon${_.upperCase(stat)}.png`);
  return null;
}
