import rootConfig from '../../eslint.config.js';

export default [
  ...rootConfig,
  {
    rules: {
      // End
      'global-require': 'off',
      'import/extensions': 'off',
      'ts/no-require-imports': 'off',
      /// FIXME: Start
      'ts/no-unsafe-assignment': 'off',
      'ts/no-unsafe-member-access': 'off',
      'ts/no-var-requires': 'off',
      'unicorn/prefer-module': 'off',
    },
  },
];
