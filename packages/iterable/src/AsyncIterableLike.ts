import type { Awaitable } from '@w5s/core-type';

/**
 * A type that represents an {@link AsyncIterable} or an {@link Iterable} of {@link Awaitable}
 */
export type AsyncIterableLike<T> = AsyncIterable<T> | Iterable<Awaitable<T>>;
