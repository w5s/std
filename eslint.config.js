import { defineConfig } from '@w5s/eslint-config';

export default [...(await defineConfig({
  ignores: [
    '**/build',
    '**/dist',
  ],
  node: {
    rules: {
      // Temporarily disabled globally: eslint-plugin-n `node/no-sync` crashes on TS files
      // without parser services in this monorepo; keep local `node/no-sync` disables where needed.
      'node/no-sync': 'off',
    },
  },
  ts: {
    rules: {
      'jsdoc/check-tag-names': 'off',
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
      // `void` in unions is intentionally used across public type-level APIs.
      // Converting to `undefined` would be a semantic change with compatibility risk.
      'ts/no-invalid-void-type': 'off',
      // Existing APIs intentionally rely on non-null assertions; replacing them safely
      // needs deeper refactors and test expansion to avoid runtime regressions.
      'ts/no-non-null-assertion': 'off',
    },
  },
})),
{
  // TODO: move this to eslint-config or find a solution
  rules: {
    'e18e/prefer-array-at': 'off',
    'e18e/prefer-static-regex': 'off',
    'jsdoc/require-returns-type': 'off',
    'next/no-assign-module-variable': 'off',
    'test/expect-expect': ['error', { assertFunctionNames: ['expect*', 'assert*'] }],
    'test/no-unneeded-async-expect-function': 'off',
    'test/valid-expect': 'off',
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
},
];
