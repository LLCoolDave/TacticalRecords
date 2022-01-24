/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
export const iconMap = {
  bronze: 'medalBronze',
  silver: 'medalSilver',
  gold: 'medalGold',
  platinum: 'medalPlatinum',
  diamond: 'medalDiamond',
  moon: 'medalMoon',
  atk: 'iconATK',
  def: 'iconDEF',
  hp: 'iconHP',
  lvl: 'iconLVL',
  crown: 'iconHPMULTI',
  feather: 'iconEXPMULTI',
  sunstone: 'sunstone',
  sunwisher: 'sunwisher',
  mysticgate: 'mysticgate',
};

export function getIconURL(icon) {
  const filebase = iconMap?.[icon];
  if (filebase) return require(`../assets/${filebase}.png`);
  return null;
}
