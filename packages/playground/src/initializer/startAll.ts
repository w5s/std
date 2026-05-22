import type { Awaitable } from '@w5s/core-type';
import { Initializer } from './Initializer.js';
import { start } from './start.js';

/**
 *
 * @param appContext
 * @param initializers
 * @example
 * ```typescript
 * const appContext = {};
 * await startAll(appContext, [
 *   () => Initializer('init1', async (_: AppContext) => { }), // synchronous getter
 *   async () => Initializer('init2', async (_: AppContext) => { }), // asynchronous getter
 *   () => import('./initializers/init3.js'), // will call .default
 * ]);
 * ```
 */
export async function startAll<
  AppContext extends object,
  const Initializers extends readonly (
    | (() => Awaitable<Initializer<AppContext>>)
    | (() => Awaitable<{ default: Initializer<AppContext> }>)
  )[],
>(
  appContext: AppContext,
  initializers: Initializers,
): Promise<void> {
  const resolvedInitializers = await Promise.all(
    initializers.map(async (initializerOrPromise) => {
      const initializer = await initializerOrPromise();
      return 'default' in initializer ? initializer.default : initializer;
    }),
  );
  await Promise.all(resolvedInitializers.map(async (initializer) => start(appContext, initializer)));
}
