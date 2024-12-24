import type { Result } from '@w5s/core';
import type { Awaitable, EmptyObject } from '@w5s/core-type';

export interface Initializer<AppContext extends object = EmptyObject, AppError = unknown> {
  /**
   * Initializer id
   */
  readonly id: symbol;
  /**
   * Initializer effect
   *
   * @param appContext
   */
  readonly onStart: (appContext: AppContext) => Awaitable<Result<void, AppError>>;
}
export function Initializer<AppContext extends object, AppError = never>(
  id: string,
  onStart: (appContext: AppContext) => Awaitable<Result<void, AppError>>,
): Initializer<AppContext, AppError> {
  return {
    id: Symbol(id),
    onStart,
  };
}
