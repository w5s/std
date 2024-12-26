/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { asString } from './CustomError/asString.js';

interface CustomErrorConstructor {
  new <Properties extends { name: string }>(properties: Properties): CustomError<Properties>;
  <Properties extends { name: string }>(properties: Properties): CustomError<Properties>;
  readonly prototype: Error;
  /**
   * Static method to convert an error to a string
   *
   * @example
   * ```ts
   * CustomError.asString(new Error('my message'));
   * ```
   * @param self
   */
  asString(self: Error): string;

  /**
   * Return a new `CustomError` default factory
   * See {@link CustomError.Module} for additional properties added to the constructor
   *
   * @example
   * ```typescript
   * interface MyError extends CustomError<{ name: 'MyError', foo: boolean }> {}
   * const MyError = CustomError.define<CustomError>({
   *   errorName: 'MyError',
   *   // errorMessage: 'my message',
   * });
   *
   * const instance = MyError({ foo: true, message: 'hey!' }); // Error { name: 'MyError', message: 'hey!', foo: true }
   * MyError.errorName === 'MyError' // true
   * MyError.hasInstance(instance); // true
   * ```
   * @param parameters - the parameters for the new error type
   */
  define<Model extends CustomError<{ name: string }>>(parameters: {
    /**
     * The default error name
     */
    errorName: Model['name'];
    /**
     * The default error message
     */
    errorMessage?: string;
  }): CustomError.Module<Model>;
}

/**
 * A custom error type
 */
export type CustomError<Properties extends { name: string }> = globalThis.Error &
  Readonly<
    {
      /**
       * Error message
       */
      message: string;
      /**
       * Optional stack trace (when supported)
       */
      stack: string | undefined;
      /**
       * Optional `Error` that was thrown
       */
      cause: unknown;
    } & Properties
  >;

/**
 * Return a new `CustomError`
 *
 * @example
 * ```typescript
 * const parentError: Error;
 * const error = CustomError({
 *   name: 'FooError' as const, // this is required
 *   message: 'my custom message', // customize message (optional)
 *   cause: parentError, // Error that caused this error (optional)
 * })
 * ```
 * @category Constructor
 * @param properties - initial properties
 */
export const CustomError: CustomErrorConstructor = (() => {
  const defaultProperties = { message: '', stack: undefined, cause: undefined };
  const __assign = Object.assign;
  const __create = Object.create;

  function CustomError<Properties extends { name: string; message?: string; cause?: unknown }>(
    this: any,
    properties: Properties,
  ): CustomError<Properties> {
    interface MutableError extends Error {
      [extra: string]: unknown;
    }

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, @typescript-eslint/strict-boolean-expressions, @typescript-eslint/no-unsafe-argument
    const returnValue: MutableError = new.target ? (this as MutableError) : __create(CustomError.prototype);

    // Assign properties
    __assign(returnValue, defaultProperties);
    __assign(returnValue, properties);

    // Capture stack trace
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(returnValue, CustomError);
    }

    return returnValue as CustomError<Properties>;
  }

  function define<Model extends CustomError<{ name: string }>>(parameters: {
    errorName: Model['name'];
    errorMessage?: string;
  }): CustomError.Module<Model> {
    const { errorName, errorMessage } = parameters;
    const create = (properties: any) => CustomError({ name: errorName, message: errorMessage, ...properties });
    Object.defineProperty(create, 'name', {
      value: errorName,
      writable: false,
    });
    // @ts-ignore We know what we are doing
    return __assign(create, {
      create,
      errorName,
      hasInstance: (anyValue: unknown): boolean =>
        // @ts-ignore We know what we are doing
        anyValue?.name === errorName,
    });
  }

  return __assign(CustomError, {
    define,
    asString,
    prototype: __assign(__create(Error.prototype), {
      constructor: CustomError,
      toString(this: Error) {
        return asString(this);
      },
    }),
  }) as CustomErrorConstructor;
})();

export namespace CustomError {
  /**
   * A type for all properties added by the result of `Make()` or `MakeGeneric()`
   */
  export interface Module<Model extends CustomError<{ name: string }>> {
    (...properties: CustomError.Parameters<Model>): Model;

    /**
     * The model name constant. Can be useful for `switch` / `case` statements.
     *
     * @example
     * ```typescript
     * const error: SomeError;
     * switch (error.name) {
     *   case SomeError.errorName: //...
     * }
     * ```
     */
    readonly errorName: Model['name'];
    /**
     * Predicate that returns `true` when `anyValue` is a `Model`
     * The implementation compares `anyValue.name === Module.errorName`
     *
     * @example
     * ```typescript
     * const MyError = CustomError.define('MyError1');
     * const unknownError: unknown;
     * if (MyError.hasInstance(unknownError)) {
     *   // unknownError.name === 'MyError1'
     * }
     * ```
     */
    readonly hasInstance: (anyValue: unknown) => anyValue is Model;
    /**
     * Return a new `CustomError`
     *
     * @example
     * ```typescript
     * const MyError = CustomError.define('MyError1');
     * const error = MyError.create({
     *   message: 'my custom message', // customize message (optional)
     *   cause: parentError, // Error that caused this error (optional)
     * })
     * ```
     * @category Constructor
     * @param properties - initial properties
     */
    readonly create: (...properties: Parameters<Model>) => Model;
  }

  /**
   * Extract all properties passed to constructor
   */
  export type ParametersProperties<Model extends object> = Omit<Model, 'name' | 'stack' | 'message' | 'cause'> &
    Partial<Pick<CustomError<{ name: string }>, 'message' | 'cause'>>;

  /**
   * Extract all parameters to create a new CustomError
   */
  export type Parameters<Model extends object> =
    RequiredKeysOf<Omit<Model, 'name' | 'stack' | 'message' | 'cause'>> extends never
      ? [properties?: ParametersProperties<Model>]
      : [properties: ParametersProperties<Model>];
}

// TODO: move this to library
type RequiredKeysOf<T extends object> = Exclude<
  {
    [Key in keyof T]: T extends Record<Key, T[Key]> ? Key : never;
  }[keyof T],
  undefined
>;
