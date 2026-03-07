const __withResolvers: typeof Promise.withResolvers =

  Promise.withResolvers == null
    ? () => {
        const deferred: any = {};

        deferred.promise = new Promise((resolve, reject) => {
          deferred.resolve = resolve;

          deferred.reject = reject;
        });

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
