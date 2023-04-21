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
};

export function getLegacyIconURL(icon) {
  const filebase = legacyIconMap?.[icon];
  if (filebase) return require(`../assets/legacy/${filebase}.png`);
  return null;
}
