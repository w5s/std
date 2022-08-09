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
export function assertNever<V extends never>(subject: V): V {
  return subject;
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
