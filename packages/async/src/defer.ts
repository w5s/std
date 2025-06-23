const __withResolvers: typeof Promise.withResolvers =
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  Promise.withResolvers == null
    ? () => {
        const deferred: any = {};
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        deferred.promise = new Promise((resolve, reject) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          deferred.resolve = resolve;
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          deferred.reject = reject;
        });

        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return deferred;
      }
    : () => Promise.withResolvers();

/**
 * Creates a new Promise and returns it in an object, along with its resolve and reject functions.
 *
 * @example
 * ```typescript
 * function sayHelloWorld(ms: number): Promise<string> {
 *   const { promise, resolve, reject } = defer<string>();
 *   setTimeout(() => resolve('Hello world'), ms);
 *   return promise;
 * }
 * ```
 * @returns An object with the properties promise, resolve, and reject.
 */
export function defer<T>(): PromiseWithResolvers<T> {
  return __withResolvers();
}
