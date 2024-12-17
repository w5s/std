import type { Result } from '@w5s/core';
import type { Awaitable, EmptyObject } from '@w5s/core-type';
import { Ok } from '@w5s/core/dist/Result/Ok.js';

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
  readonly onStart: (appContext: AppContext) => Awaitable<Result<void, never>>;
}
export function Initializer<AppContext extends object>(
  id: string,
  onStart: (appContext: AppContext) => Awaitable<Result<void, never>> = () => Ok(),
): Initializer<AppContext> {
  return {
    id: Symbol(id),
    onStart,
  };
}
