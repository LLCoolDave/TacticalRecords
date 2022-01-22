import { towers, players } from './wsproxy';

export function fetchTowers() {
  return towers;
}

export function fetchTower(towerId) {
  return towers[towerId];
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
