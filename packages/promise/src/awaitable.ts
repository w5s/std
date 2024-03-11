/**
 * Type for something that can be used with `await`.
 * It can be either `T` or `Promise<T>`
 *
 * @see https://stackoverflow.com/a/56129545
 */
export type Awaitable<T> = T | PromiseLike<T>;
