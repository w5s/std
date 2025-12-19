import { defineConfig } from '@w5s/eslint-config';

export default defineConfig({
  es: {
    rules: {
      'import/no-unresolved': 'off',
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
      'import/export': 'off',
    },
  },
});
