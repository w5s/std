import type { AppContext } from './AppContext.js';
import type { InjectionKey } from './InjectionKey.js';

export function provide<Value>(key: InjectionKey<Value>, provider: (appContext: AppContext) => Value): AppContext {
  return {
    [key.injectKey]: provider,
  };
}
