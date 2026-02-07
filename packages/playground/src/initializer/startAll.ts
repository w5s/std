import type { Result } from '@w5s/core';
import { isOk } from '@w5s/core/dist/Result/isOk.js';
import { Ok } from '@w5s/core/dist/Result/Ok.js';
import { Error } from '@w5s/core/dist/Result/Error.js';
import { AggregateError } from '@w5s/error/dist/AggregateError.js';
import type { Awaitable } from '@w5s/core-type';
import { Initializer } from './Initializer.js';
import { start } from './start.js';

type InitializerErrorType<T> = T extends () => Awaitable<Initializer<any, infer AppError>>
  ? AppError
  : T extends () => Awaitable<{ default: Initializer<any, infer AppError> }>
    ? AppError
    : never;

type InitializersErrorType<Initializers extends readonly unknown[]> = Initializers extends readonly [
  infer First,
  ...infer Rest,
]
  ? InitializerErrorType<First> | InitializersErrorType<Rest>
  : never;

export async function startAll<
  AppContext extends object,
  const Initializers extends readonly (
    | (() => Awaitable<Initializer<AppContext, any>>)
    | (() => Awaitable<{ default: Initializer<AppContext, any> }>)
  )[],
>(
  appContext: AppContext,
  initializers: Initializers,
): Promise<Result<void, AggregateError<Array<InitializersErrorType<Initializers>>>>> {
  const resolvedInitializers = await Promise.all(
    initializers.map(async (initializerOrPromise) => {
      const initializer = await initializerOrPromise();
      return 'default' in initializer ? initializer.default : initializer;
    }),
  );
  const results = await Promise.all(resolvedInitializers.map(async (initializer) => start(appContext, initializer)));

  return results.every((result) => isOk(result)) ? Ok() : Error(new AggregateError([]));
}
