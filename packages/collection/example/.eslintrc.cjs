module.exports = {
  parserOptions: {
    project: require.resolve('./tsconfig.json'),
  },
  rules: {
    'import/no-extraneous-dependencies': 'off',
    'no-console': 'off',
  },
};
