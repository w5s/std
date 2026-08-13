import { defineConfig } from '@w5s/eslint-config';

export default await defineConfig({
  ignores: [
    '**/build',
    '**/dist',
  ],
  plugins: {
    node: {
      rules: {
      // Temporarily disabled globally: eslint-plugin-n `node/no-sync` crashes on TS files
      // without parser services in this monorepo; keep local `node/no-sync` disables where needed.
        'node/no-sync': 'off',
      },
    },
    react: false,
    ts: {
      rules: {

        'jsdoc/require-example': [
          'warn',
          {
            checkConstructors: false,
            exemptedBy: [
              'type',
            ],
          },
        ],
        'ts/naming-convention': 'off',
        'ts/no-invalid-void-type': 'off',
      },
    },
  },
  // TODO: move this to eslint-config or find a solution
  rules: {
    'e18e/prefer-array-at': 'off',
    'e18e/prefer-static-regex': 'off',
    'test/no-unneeded-async-expect-function': 'off',
    'unicorn/no-array-from-fill': 'off',
    'unicorn/no-for-each': 'off',
    'unicorn/no-nonstandard-builtin-properties': 'off',
    'unicorn/no-top-level-side-effects': 'off',
    'unicorn/no-unnecessary-global-this': 'off',
    'unicorn/no-unreadable-object-destructuring': 'off',
    'unicorn/no-useless-template-literals': 'off',
    'unicorn/prefer-await': 'off',
    'unicorn/prefer-logical-operator-over-ternary': 'off',
    'unicorn/prefer-minimal-ternary': 'off',
    'unicorn/prefer-split-limit': 'off',
    'unicorn/prefer-unicode-code-point-escapes': 'off',
    'unicorn/prefer-url-href': 'off',
  },
});
