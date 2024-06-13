/* eslint-disable @typescript-eslint/no-shadow */

/* eslint-disable @typescript-eslint/no-unsafe-assignment */

function __setDefaultValue<O extends Record<any, any>, K extends keyof O>(object: O, name: K, defaultValue: O[K]) {
  if (!(name in object)) {
    object[name] = defaultValue;
  }
}

// eslint-disable-next-line @typescript-eslint/ban-types
function __captureStackTrace(targetObject: object, constructorOpt?: Function | undefined) {
  if (typeof Error.captureStackTrace === 'function') {
    Error.captureStackTrace(targetObject, constructorOpt);
  }
}

interface CustomErrorConstructor {
  new <Properties extends { name: string }>(properties: Properties): CustomError<Properties>;
  <Properties extends { name: string }>(properties: Properties): CustomError<Properties>;
  readonly prototype: Error;

  /**
   * Return a new `CustomError` factory using `getConstructor()`
   * See {@link CustomErrorConstructor} for additional properties added to the constructor
   *
   * @example
   * ```typescript
   * const MyError = CustomError.defineWith(
   *   'MyError',
   *   (create) => // a helper that creates MyError { name: 'MyError' }
   *     // the constructor
   *     (foo: boolean) => create({ foo, message: 'hello!' })
   * );
   *
   * const instance = MyError(true); // Error { name: 'MyError', message: 'hello', foo: true }
   * MyError.errorName === 'MyError'/ true
   * MyError.hasInstance(instance); // true
   * ```
   * @param errorName - the error unique name
   * @param getConstructor - a function that returns an error factory
   */
  defineWith<Name extends string, Constructor extends (...args: any[]) => CustomError<{ name: Name }>>(
    errorName: Name,
    getConstructor: (
      create: <Properties>(properties: Properties) => CustomError<{ name: Name } & Properties>
    ) => Constructor
  ): Constructor & CustomError.Module<ReturnType<Constructor>>;

  /**
   * Return a new `CustomError` default factory
   * See {@link CustomError.Module} for additional properties added to the constructor
   *
   * @example
   * ```typescript
   * interface MyError extends CustomError<{ name: 'CustomError', foo: boolean }> {}
   * const MyError = CustomError.define<CustomError>('MyError');
   *
   * const instance = MyError({ foo: true, message: 'hey!' }); // Error { name: 'MyError', message: 'hey!', foo: true }
   * MyError.errorName === 'MyError' // true
   * MyError.hasInstance(instance); // true
   * ```
   * @param errorName - the error unique name
   */
  define<Model extends CustomError<{ name: string }>>(
    errorName: Model['name']
  ): ((...properties: CustomError.Parameters<Model>) => Model) & CustomError.Module<Model>;
}

/**
 * A custom error type
 */
export type CustomError<Properties extends { name: string }> = Readonly<
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
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const errorToString = Error.prototype.toString;

  function CustomError<Properties extends { name: string; message?: string; cause?: unknown }>(
    this: any,
    properties: Properties
  ): CustomError<Properties> {
    interface MutableError extends Error {
      [extra: string]: unknown;
    }

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, @typescript-eslint/strict-boolean-expressions, @typescript-eslint/no-unsafe-argument
    const returnValue: MutableError = new.target ? (this as MutableError) : Object.create(CustomError.prototype);

    // Assign properties
    Object.assign(returnValue, properties);
    __setDefaultValue(returnValue, 'stack', undefined);
    __setDefaultValue(returnValue, 'cause', undefined);

    // Capture stack trace
    __captureStackTrace(returnValue, CustomError);

    return returnValue as CustomError<Properties>;
  }

  function defineWith<Name extends string, Constructor extends (...args: any[]) => CustomError<{ name: Name }>>(
    errorName: Name,
    getConstructor: (
      create: <Properties>(properties: Properties) => CustomError<{ name: Name } & Properties>
    ) => Constructor
  ): Constructor & CustomError.Module<ReturnType<Constructor>> {
    const create = (properties: any) => CustomError({ name: errorName, ...properties });
    const properties = {
      create,
      errorName,
      hasInstance: (anyValue: unknown): boolean =>
        // @ts-ignore We know what we are doing
        anyValue?.name === errorName,
    };
    const constructor = getConstructor(create);
    Object.defineProperty(constructor, 'name', { writable: false, value: errorName });

    // @ts-ignore We know what we are doing
    return Object.assign(constructor, properties);
  }

  function define<Model extends CustomError<{ name: string }>>(
    errorName: Model['name']
  ): ((...properties: CustomError.Parameters<Model>) => Model) & CustomError.Module<Model> {
    // @ts-ignore typing is slightly different
    return defineWith(errorName, (create) => create);
  }

  return Object.assign(CustomError, {
    defineWith,
    define,

    prototype: Object.assign(Object.create(Error.prototype), {
      constructor: CustomError,
      toString(this: Error) {
        return errorToString.call(this) + (this.cause == null ? '' : `\n  └ ${String(this.cause)}`);
      },
    }),
  }) as CustomErrorConstructor;
})();

// @ts-ignore Ignore duplicate

// @ts-ignore Ignore duplicate

export namespace CustomError {
  /**
   * A type for all properties added by the result of `Make()` or `MakeGeneric()`
   */
  export interface Module<Model extends CustomError<{ name: string }>> {
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
  export type ParametersProperties<Model extends object> = Omit<Model, 'name' | 'stack' | 'message' | 'cause'> & {
    message?: string;
    cause?: unknown;
  };

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
