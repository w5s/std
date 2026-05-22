import type { Awaitable, EmptyObject } from '@w5s/core-type';

export interface Initializer<AppContext extends object = EmptyObject> {
  /**
   * Initializer id
   */
  readonly id: symbol;

  /**
   * Initializer effect
   *
   * @param appContext
   */
  readonly onStart: (appContext: AppContext) => Awaitable<void>;
}
export function Initializer<AppContext extends object>(
  id: string,
  onStart: (appContext: AppContext) => Awaitable<void>,
): Initializer<AppContext> {
  return {
    id: Symbol(id),
    onStart,
  };
}
