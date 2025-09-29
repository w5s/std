import type { Result } from '@w5s/core';
import { isOk } from '@w5s/core/dist/Result/isOk.js';
import { Ok } from '@w5s/core/dist/Result/Ok.js';
import { Error } from '@w5s/core/dist/Result/Error.js';
import { AggregateError } from '@w5s/error/dist/AggregateError.js';
import type { Awaitable } from '@w5s/core-type';
import { Initializer } from './Initializer.js';
import { start } from './start.js';

export async function startAll<AppContext extends object, AppError>(
  appContext: AppContext,
  initializers: Array<() => Awaitable<Initializer<AppContext, AppError>>>,
): Promise<Result<void, AggregateError<Array<AppError>>>> {
  const resolvedInitializers = await Promise.all(initializers.map(async (initializer) => initializer()));
  const results = await Promise.all(resolvedInitializers.map((initializer) => start(appContext, initializer)));

  return results.every((result) => isOk(result)) ? Ok() : Error(new AggregateError([]));
}
