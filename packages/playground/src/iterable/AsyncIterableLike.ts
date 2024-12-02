import type { Awaitable } from '@w5s/core-type';

export type AsyncIterableLike<T> = AsyncIterable<T> | Iterable<Awaitable<T>>;
