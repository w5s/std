import { DataObject } from './data';
import { Option } from './option';

export type DataError<Properties extends { name: string }> = DataObject<
  {
    [DataObject.type]: typeof DataError.typeName;
    /**
     * Error message
     */
    message: string;
    /**
     * Optional stack trace
     */
    stack: Option<string>;
    /**
     * Optional `Error` that was thrown
     */
    cause: Option<unknown>;
  } & Properties
>;

/**
 * Return a new `DataError`
 *
 * @example
 * ```typescript
 * const parentError: Error;
 * const error = DataError({
 *   name: 'FooError' as const, // this is required
 *   message: 'my custom message', // customize message (optional)
 *   cause: parentError, // Error that caused this error (optional)
 * })
 * ```
 * @param properties - initial properties
 */
export function DataError<Properties extends { name: string; message?: string; cause?: unknown }>(
  properties: Properties
): DataError<Properties> {
  interface MutableError extends Error {
    [extra: string]: unknown;
  }

  // eslint-disable-next-line unicorn/error-message,@typescript-eslint/no-unsafe-assignment
  const returnValue: MutableError = new Error('') as any;
  returnValue[DataObject.type] = DataError.typeName;

  // Assign properties
  Object.assign(returnValue, properties);
  setDefaultValue(returnValue, 'stack', undefined);
  setDefaultValue(returnValue, 'cause', undefined);

  // Capture stack trace
  if (typeof Error.captureStackTrace === 'function') {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    Error.captureStackTrace(returnValue, DataError);
  }

  return returnValue as DataError<Properties>;
}
export namespace DataError {
  /**
   * Extract all parameters to create a new DataError
   */
  export type Parameters<Model> = Omit<Model, '_type' | 'name' | 'stack' | 'message' | 'cause'> & {
    message?: string;
    cause?: unknown;
  };

  /**
   * A type for all properties added by the result of `Make()` or `MakeGeneric()`
   */
  export interface Module<Model extends DataError<{ name: string }>> {
    /**
     * The model name constant. Can be useful for `switch` / `case` statements.
     *
     * @example
     * ```typescript
     * const MyError1 = Make('MyError1');
     * const MyError2 = Make('MyError2');
     * switch (error) {
     *   case MyError1.errorName: //...
     *   case MyError2.errorName: //...
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
     * const MyError = Make('MyError1');
     * const unknownError: unknown;
     * if (MyError.hasInstance(unknownError)) {
     *   // unknownError.name === 'MyError1'
     * }
     * ```
     */
    readonly hasInstance: (anyValue: unknown) => anyValue is Model;
  }

  /**
   * Type name
   */
  export const typeName = 'DataError';

  /**
   * Return a new `DataError` default factory
   * See {@link Module} for additional properties added to the constructor
   *
   * @example
   * ```typescript
   * type CustomError = DataError<{ name: 'CustomError', foo: boolean }>
   * const CustomError = DataError.Make<CustomError>('CustomError');
   *
   * const instance = CustomError({ foo: true, message: 'hey!' }); // Error{ _type: 'DataError', name: 'CustomError', message: 'hey!', foo: true }
   * CustomError.errorName === 'CustomError' // true
   * CustomError.hasInstance(instance); // true
   * ```
   * @param errorName - the error unique name
   */
  export function Make<Model extends DataError<{ name: string }>>(
    errorName: Model['name']
  ): ((properties: Parameters<Model>) => Model) & Module<Model> {
    // @ts-ignore typing is slightly different
    return MakeGeneric(errorName, (create) => create);
  }

  /**
   * Return a new `DataError` factory using `getConstructor()`
   * See {@link Module} for additional properties added to the constructor
   *
   * @example
   * ```typescript
   * const CustomError = DataError.MakeGeneric(
   *   'CustomError',
   *   (create) => // a helper that creates Error{ _type: 'DataError', name: 'CustomError' }
   *     // the constructor
   *     (foo: boolean) => create({ foo, message: 'hello!' })
   * );
   *
   * const instance = CustomError(true); // Error{ _type: 'DataError', name: 'CustomError', message: 'hello', foo: true }
   * CustomError.errorName === 'CustomError'/ true
   * CustomError.hasInstance(instance); // true
   * ```
   * @param errorName - the error unique name
   * @param getConstructor - a function that returns an error factory
   */
  export function MakeGeneric<Name extends string, Constructor extends (...args: any[]) => DataError<{ name: Name }>>(
    errorName: Name,
    getConstructor: (
      create: <Properties>(properties: Properties) => DataError<{ name: Name } & Properties>
    ) => Constructor
  ): Constructor & Module<ReturnType<Constructor>> {
    const create = (properties: any) => DataError({ name: errorName, ...properties });
    const properties = {
      errorName,
      hasInstance: (anyValue: unknown): boolean =>
        // @ts-ignore We know what we are doing
        anyValue?.name === errorName,
    };

    // @ts-ignore We know what we are doing
    return Object.assign(getConstructor(create), properties);
  }
}

export interface AggregateError<Errors extends any[]>
  extends DataError<{
    name: 'AggregateError';
    errors: Readonly<[...Errors]>;
  }> {}
export const AggregateError = DataError.MakeGeneric(
  'AggregateError',
  (create) =>
    <T extends any[]>(params: DataError.Parameters<AggregateError<T>>): AggregateError<T> =>
      create(params)
);

function setDefaultValue<O extends Record<any, any>, K extends keyof O>(object: O, name: K, defaultValue: O[K]) {
  if (!(name in object)) {
    object[name] = defaultValue;
  }
}
