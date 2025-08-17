const a11yOff = Object
  .keys(require('eslint-plugin-vuejs-accessibility').rules)
  .reduce((acc, rule) => { acc[`vuejs-accessibility/${rule}`] = 'off'; return acc; }, {});

module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: '@babel/eslint-parser',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/multi-word-component-names': 'off',
    'max-len': 'off',
    'vue/max-len': 'off',
    'linebreak-style': 0,
    ...a11yOff,
  },
};
