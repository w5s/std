/**
 * Raise a compile error when accessing this function and throws a TypeError at runtime
 * This is useful for exhaustive switch check.
 *
 * @example
 * ```typescript
 * const print = (fruit: 'banana'|'kiwi') => {
 *   switch (fruit) {
 *     case 'banana': return '🍌 Banana';
 *     case 'kiwi': return '🥝 Kiwi';
 *     default: return assertNever(fruit); // <- This line will report an error if a case is missing
 *   }
 * }
 * ```
 * @param subject - the never value that should be reported
 */
export function assertNever(subject: never): never;
/**
 * Raise a compile error when accessing this function and returns `returnValue`.
 * This is useful for exhaustive switch check.
 *
 * @example
 * ```typescript
 * const print = (fruit: 'banana'|'kiwi') => {
 *   switch (fruit) {
 *     case 'banana': return '🍌 Banana';
 *     case 'kiwi': return '🥝 Kiwi';
 *     default: return assertNever(fruit); // <- This line will report an error if a case is missing
 *   }
 * }
 * ```
 * @param subject - the never value that should be reported
 * @param returnValue - the value returned
 */
export function assertNever<V>(subject: never, returnValue: V): V;
export function assertNever(subject: never, returnValue?: unknown): unknown | never {
  if (arguments.length < 2) {
    const error = new TypeError(subject);
    // @ts-ignore framesToPop is not defined
    error.framesToPop = 1; // Ignore call to assertNever() in stacktrace
    throw error;
  }

  return returnValue;
}

/**
 * Raise a compile error when `Actual` is not strictly equal to `Expected`.
 * This is a type helper and does nothing at run time.
 *
 * @example
 * ```typescript
 * type Expected = 'foo'
 * assertType<'foo', Expected>(true);// -> everything is fine
 * assertType<'bar', Expected>(true);// -> ts raises an error
 * ```
 * @param _shouldBeEqual - an inferred value
 */
export function assertType<Actual, Expected>(_shouldBeEqual: IsExact<Actual, Expected>): void {}

type IsExact<T, U> = TupleMatches<AnyToBrand<T>, AnyToBrand<U>> extends true
  ? TupleMatches<DeepMakeRequiredForIsExact<T>, DeepMakeRequiredForIsExact<U>> extends true // catch optional properties
    ? true
    : false
  : false;
type DeepMakeRequiredForIsExact<T> = {
  [P in keyof T]-?: DeepMakeRequiredForIsExact<AnyToBrand<T[P]>>;
};
type IsAny<T> = 0 extends 1 & T ? true : false;
type TupleMatches<T, U> = Matches<[T], [U]> extends true ? true : false;
type Matches<T, U> = T extends U ? (U extends T ? true : false) : false;

// eslint-disable-next-line @typescript-eslint/naming-convention
type AnyToBrand<T> = IsAny<T> extends true ? { __assertTypeAny__: undefined } : T;

/**
 * Assert that `condition` is truthy, else throws `Error { name: 'InvariantError', message }`
 *
 * In production environment, `message` parameter could be stripped from source in order to reduce file size
 *
 * @example
 * ```typescript
 * invariant(true, 'this should be true');// pass
 * invariant(false, 'this should be true');// throw new Error('this should be true')
 * ```
 * @param condition - the predicate result
 * @param message - an optional message for Error
 */
export function invariant(condition: boolean, message?: string | null): asserts condition {
  if (!condition) {
    const error = new Error(message == null ? '' : message);
    error.name = 'InvariantError';
    // @ts-ignore framesToPop is not defined
    error.framesToPop = 1; // Ignore call to invariant() in stacktrace
    throw error;
  }
}
