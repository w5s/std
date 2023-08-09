/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Always return `undefined` and ignore passed value
 *
 * @example
 * ```typescript
 * const doSomething = () => 'foo
 * const doSomethingIgnore = () => ignore(doSomething());// undefined
 * ```
 * @param anyValue - any value that should be ignored
 */
export function ignore(anyValue: unknown): void {}
