/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Always return `undefined` and ignore passed value.
 *
 * This should be used in conjunction with eslint rules such as [@typescript-eslint/no-misused-promises](https://typescript-eslint.io/rules/no-misused-promises/)
 * to explicitly ignore a promise returned by a callback.
 *
 * @example
 * ```typescript
 * const doSomething = () => 'foo'; // string
 * const doSomethingIgnore = () => ignore(doSomething()); // undefined as void
 *
 * const doAsync = async () => 'foo'; // Promise<string>
 * const doSyncIgnore = () => ignore(doAsync()); // undefined as void
 * ```
 * @param anyValue - any value that should be ignored
 */
export function ignore(anyValue: unknown): void {}
