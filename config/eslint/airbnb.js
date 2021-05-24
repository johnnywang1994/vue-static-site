const { isProd } = process.env.NODE_ENV === 'production';

module.exports = {
  extends: ['airbnb-base'],
  rules: {
    // don't require .js and .ts extension when importing
    'import/extensions': ['error', 'always', { js: 'never', ts: 'never' }],
    // allow plusplus for loop
    // see: https://eslint.org/docs/rules/no-plusplus#allowforloopafterthoughts
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    // allow reassignment of parameters props
    // see: https://eslint.org/docs/rules/no-param-reassign#props
    'no-param-reassign': ['error', { props: false }],
    // warn debugger during development
    'no-debugger': isProd ? 'error' : 'warn',
    // warn unused vars during development
    'no-unused-vars': isProd ? 'error' : 'warn',
    'no-new-func': 0,
    'no-use-before-define': 0,
    'no-underscore-dangle': 0,
    'no-new': 0,
  },
};
