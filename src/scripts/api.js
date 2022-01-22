import _ from 'lodash';
import { makeRequest, makeSecuredRequest } from './connection';
import { players } from './wsproxy';

export async function fetchTowers() {
  return makeRequest('/api/towers');
}

export async function fetchProfile() {
  return makeSecuredRequest('/api/profile');
}

export async function fetchTower(towerId) {
  const towers = await fetchTowers();
  return _.find(towers, ['id', towerId]);
}

export function fetchRecord(player, tower) {
  const playerRecords = players?.[player].records?.[tower];
  if (playerRecords) {
    /* do some calculations */
    let impure = 0;
    let pure = 0;

    if (playerRecords?.impure) impure = playerRecords.impure;
    if (playerRecords?.pure) {
      pure = playerRecords.pure;
      if (pure > impure) impure = pure;
    }
    if (playerRecords?.mysticGate) {
      if (playerRecords.mysticGate > pure) pure = playerRecords.mysticGate;
    }

    return { impure, pure };
  }
  return undefined;
}
