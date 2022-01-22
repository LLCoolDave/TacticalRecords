/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import _ from 'lodash';
import { medalNames } from './tower';

export default function getMedalURI(medal) {
  if (_.indexOf(medalNames, medal) >= 0) return require(`../assets/medal${_.upperFirst(medal)}.png`);
  return null;
}
