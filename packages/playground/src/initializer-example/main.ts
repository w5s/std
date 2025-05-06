/* eslint-disable unicorn/no-await-expression-member */
import { startAll } from '../initializer/index.js';
import type { AppContext } from './AppContext.js';

export function main3() {
  const appContext: AppContext = { foo: true };
  return startAll(appContext, [
    // initializers
    async () => (await import('./initializers/init1.js')).default,
    async () => (await import('./initializers/init2.js')).default,
  ]);
}
