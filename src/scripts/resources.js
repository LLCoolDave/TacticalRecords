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
  lvl: 'iconLVL',
  crown: 'iconHPMULTI',
  feather: 'iconEXPMULTI',
  sunstone: 'sunstone',
  sunwisher: 'sunwisher',
  mysticgate: 'mysticgate',
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
