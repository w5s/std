import type { Initializer } from './Initializer.js';
import { InitializerStatus } from './InitializerStatus.js';
import { getStatus, setStatus } from './__state.js';

/**
 * Starts the given initializer if it is not already started.
 *
 * @param appContext
 * @param initializer
 * @example
 * ```typescript
 * import { start } from '@w5s/initializer';
 * import init1 from './initializers/init1.js';
 * ```
 * const appContext = {};
 * await start(appContext, init1);
 * ```
 */
export async function start<AppContext extends object>(
  appContext: AppContext,
  initializer: Initializer<AppContext>,
): Promise<void> {
  const currentStatus = getStatus(initializer);
  if (currentStatus === InitializerStatus.Stopped) {
    setStatus(initializer, InitializerStatus.Starting);
    const result = await initializer.onStart(appContext);
    setStatus(initializer, InitializerStatus.Ready);
    return result;
  }
}
