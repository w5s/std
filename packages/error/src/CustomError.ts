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

/**
 * A custom error type
 */
export type CustomError<Properties extends { name: string }> = Readonly<
  {
    // [Struct.type]: typeof DataError.typeName;
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
export function CustomError<Properties extends { name: string; message?: string; cause?: unknown }>(
  properties: Properties
): CustomError<Properties> {
  interface MutableError extends Error {
    [extra: string]: unknown;
  }

  // eslint-disable-next-line unicorn/error-message,@typescript-eslint/no-unsafe-assignment
  const returnValue: MutableError = new Error('') as any;
  // returnValue['_'] = DataError.typeName;

  // Assign properties
  Object.assign(returnValue, properties);
  __setDefaultValue(returnValue, 'stack', undefined);
  __setDefaultValue(returnValue, 'cause', undefined);

  // Capture stack trace
  __captureStackTrace(returnValue, CustomError);

  return returnValue as CustomError<Properties>;
}

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
  export function defineWith<Name extends string, Constructor extends (...args: any[]) => CustomError<{ name: Name }>>(
    errorName: Name,
    getConstructor: (
      create: <Properties>(properties: Properties) => CustomError<{ name: Name } & Properties>
    ) => Constructor
  ): Constructor & Module<ReturnType<Constructor>> {
    const create = (properties: any) => CustomError({ name: errorName, ...properties });
    const properties = {
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
  export function define<Model extends CustomError<{ name: string }>>(
    errorName: Model['name']
  ): ((...properties: Parameters<Model>) => Model) & Module<Model> {
    // @ts-ignore typing is slightly different
    return defineWith(errorName, (create) => create);
  }
}

// TODO: move this to library
type RequiredKeysOf<T extends object> = Exclude<
  {
    [Key in keyof T]: T extends Record<Key, T[Key]> ? Key : never;
  }[keyof T],
  undefined
>;
