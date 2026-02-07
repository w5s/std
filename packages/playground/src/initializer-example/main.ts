import { startAll } from '../initializer/index.js';
import type { AppContext } from './AppContext.js';

export async function main3() {
  const appContext: AppContext = { foo: true };
  const result = await startAll(appContext, [
    // initializers
    () => import('./initializers/init1.js'),
    () => import('./initializers/init2.js'),
  ]);
  // eslint-disable-next-line no-console
  console.log(result);
}
