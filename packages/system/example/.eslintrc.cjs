module.exports = {
  parserOptions: {
    project: require.resolve('./tsconfig.json'),
  },
  rules: {
    'no-console': 'off',
    'import/no-extraneous-dependencies': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
  },
};
