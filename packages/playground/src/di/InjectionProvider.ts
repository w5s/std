import type { AppContext } from './AppContext.js';

/**
 * An injection provider
 */
export interface InjectionProvider<Value> {
  (appContext: AppContext): Value;
}
