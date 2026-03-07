import { defineConfig } from '@w5s/eslint-config';

export default defineConfig({
  ignores: [
    '**/build',
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
      'ts/naming-convention': 'off',
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
      // `void` in unions is intentionally used across public type-level APIs.
      // Converting to `undefined` would be a semantic change with compatibility risk.
      'ts/no-invalid-void-type': 'off',
      // Existing APIs intentionally rely on non-null assertions; replacing them safely
      // needs deeper refactors and test expansion to avoid runtime regressions.
      'ts/no-non-null-assertion': 'off',
    },
  },
});
