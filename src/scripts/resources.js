/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
export const iconMap = {
  bronze: 'medalBronze',
  silver: 'medalSilver',
  gold: 'medalGold',
  platinum: 'medalPlatinum',
  diamond: 'medalDiamond',
  moon: 'medalMoon',
  sun: 'medalSun',
  atk: 'iconATK',
  def: 'iconDEF',
  hp: 'iconHP',
  maxHp: 'iconMaxHP',
  lvl: 'iconLVL',
  crown: 'iconHPMULTI',
  feather: 'iconEXPMULTI',
  sunstone: 'sunstone',
  sunwisher: 'sunwisher',
  mysticgate: 'mysticgate',
  legacy: 'mysticgate',
  clear1: 'clear1',
  clear2: 'clear2',
  clear3: 'clear3',
  clear3noHp: 'clear3noHp',
  lastinflator: 'lastInflator',
};

export function getIconURL(icon) {
  const filebase = iconMap?.[icon];
  if (filebase) return require(`../assets/${filebase}.png`);
  return null;
}

export const legacyIconMap = {
  bell: 'bell',
  solarMattock: 'solarMattock',
  guardian: 'guardian',
  medicine: 'medicine',
  moonGate: 'moonGate',
  solarGate: 'solarGate',
  summerDrop: 'summerDrop',
  rainbowBadge: 'rainbowBadge',
  solarElixir: 'solarElixir',
  sunsetIce: 'sunsetIce',
  fulfilled: 'fulfilled',
  greenMedicine: 'greenMedicine',
  lostPrayer: 'lostPrayer',
  nexusPendant: 'nexusPendant',
  solarGlory: 'solarGlory',
  solarWinner: 'solarWinner',
  solarSwap: 'solarSwap',
  solarTele: 'solarTele',
  sunstoneCross: 'sunstoneCross',
  heavenBlessing: 'heavenBlessing',
  lunarIce: 'lunarIce',
  banishment: 'banishment',
  solarPave: 'solarPave',
  blazingSpirit: 'blazingSpirit',
  auroraBadge: 'auroraBadge',
  solarBlizzard: 'solarBlizzard',
  ultraMattock: 'ultraMattock',
  tempMiracle: 'tempMiracle',
  dotPendant: 'dotPendant',
  lastBless: 'lastBless',
  deja: 'deja',
  omegaMattock: 'omegaMattock',
  metalWorld: 'metalWorld',
  modestBless: 'modestBless',
  summerMemories: 'summerMemories',
  blueMedicine: 'blueMedicine',
  shiningKey: 'shiningKey',
};

export function getLegacyIconURL(icon) {
  const filebase = legacyIconMap?.[icon];
  if (filebase) return require(`../assets/legacy/${filebase}.png`);
  return null;
}

export const wildcardIconMap = {
  faithfulWill: 'faithfulWill',
  armsOfRealize: 'armsOfRealize',
  mysticEyes: 'mysticEyes',
  lightPerception: 'lightPerception',
  legsOfFreedom: 'legsOfFreedom',
  magicTail: 'magicTail',
  twistOfFate: 'twistOfFate',
};

export function getWildcardIconURL(icon) {
  const filebase = wildcardIconMap?.[icon];
  if (filebase) return require(`../assets/wildcard/${filebase}.png`);
  return null;
}
