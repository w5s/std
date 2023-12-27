const defaultHandler = () => {};

/**
 * A Deferred object is useful when a promise is resolved or rejected outside the scope of the constructor `Promise((resolve) => {  })`
 *
 * @example
 * ```ts
 * // module1.ts
 * const deferred = new Deferred();
 *
 * export function resolveWithValue() {
 *   setTimeout(() => deferred.resolve('any value'), 1);
 * }
 * export const promise = deferred.promise;
 * ```
 * ```ts
 * // main.ts
 * import { resolveWithValue, promise } from './module1.ts';
 *
 * function main() {
 *   resolveWithValue();
 *   return promise;
 * }
 * ```
 */
export class Deferred<Value> {
  #fulfilled = false;

  #resolve: (value: Value) => void = defaultHandler;

  #reject: (error: unknown) => void = defaultHandler;

  /**
   * Returns true only if resolve or reject was already called.
   *
   * @example
   * ```ts
   * const deferred = new Deferred();
   * deferred.isFulfilled(); // false
   * deferred.resolve('value');
   * deferred.isFulfilled(); // true
   * ```
   */
  isFulfilled(): boolean {
    return this.#fulfilled;
  }

  /**
   * Resolve callback. Internally, it is a reference to `new Promise((resolve) => { ... })`
   *
   * @example
   * ```ts
   * const deferred = new Deferred();
   * deferred.resolve('hello_world');
   *
   * await deferred.promise;// 'hello_world'
   * ```
   *
   * @param value - the value resolved to the promise
   */
  resolve(value: Value): void {
    this.#fulfilled = true;
    this.#resolve(value);
  }

  /**
   * Reject callback. Internally, it is a reference to `new Promise((_, reject) => { ... })`
   *
   * @example
   * const deferred = new Deferred();
   * deferred.reject(new Error('DeferredError'));
   *
   * await deferred.promise;// throws new Error('DeferredError')
   *
   * @param error - the error rejected to the promise
   */
  reject(error: unknown): void {
    this.#fulfilled = true;
    this.#reject(error);
  }

  /**
   * A reference to the manipulated promise
   */
  promise: Promise<Value> = new Promise<Value>((resolve, reject) => {
    this.#resolve = resolve;
    this.#reject = reject;
  });
}
