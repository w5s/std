import type { Equal } from './equal.js';
import { shallowEqual } from './shallowEqual.js';

/**
 * An Immutable Data Object with a `type` identifier
 *
 * @example
 * ```typescript
 * // Interface have a better appearance in VSCode
 * export interface MyType extends DataObject<{
 *  [DataObject.type]: 'MyType',
 *  foo: boolean;
 * }> {}
 * ```
 */
export type DataObject<
  Properties extends {
    /**
     * The type unique identifier
     */
    [DataObject.type]: string;
  }
> = Readonly<Properties>;

export namespace DataObject {
  /**
   * Extract all parameters to create a new DataError
   */
  export type Parameters<Model> = Omit<Model, DataObject.type>;

  export interface Module<Model extends DataObject<{ [DataObject.type]: string }>> extends Equal<Model> {
    /**
     * Construct a new model
     *
     * @param properties - The properties for initialization
     */
    readonly create: (properties: Parameters<Model>) => Model;
    /**
     * The factory type constant
     */
    readonly typeName: Model[DataObject.type];
    /**
     * Return true if `anyValue.type` is the same as factory `typeName`
     *
     * @example
     * // type MyRecord = { [DataObject.type]: 'MyRecord', anyProperty: string };
     * const anyValue: unknown;
     * if(MyRecord.hasInstance(anyValue)) {
     *   console.log(anyValue.anyProperty);// type is correctly refined here
     * }
     * @param anyValue - the value to be tested
     */
    readonly hasInstance: (anyValue: unknown) => anyValue is Model;
  }
  /**
   * The type property discriminator
   */
  export const type = '_' as const;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  export type type = typeof type;

  /**
   * Return a new `DataObject` default factory
   * See {@link Module} for additional properties added to the constructor
   *
   * @example
   * ```typescript
   * type Model = DataObject<{ [DataObject.type]: 'Model', foo: boolean }>
   * const Model = DataObject.Make<Model>('Model');
   *
   * const instance = Model({ foo: true }); // { _: 'Model', foo: true }
   * Model.typeName === 'Model' // true
   * Model.hasInstance(instance); // true
   * ```
   * @param typeName - the type unique name
   */
  export function Make<Model extends DataObject<{ [DataObject.type]: string }>>(
    typeName: Model[DataObject.type]
  ): ((properties: Parameters<Model>) => Model) & Module<Model> {
    // @ts-ignore typing is slightly different
    return MakeGeneric(typeName, (create) => create);
  }

  /**
   * Return a new `DataObject` factory using `getConstructor()`
   * See {@link Module} for additional properties added to the constructor
   *
   * @example
   * ```typescript
   * const Model = DataObject.MakeGeneric(
   *   'Model',
   *   (create) => // a helper that creates { _: 'Model' }
   *     // the constructor
   *     (foo: boolean) => create({ foo })
   * );
   * const instance = Model(true); // { _: 'Model', foo: true }
   * Model.typeName === 'Model'/ true
   * Model.hasInstance(instance); // true
   * ```
   * @param typeName - the type unique name
   * @param getConstructor - a function that returns an object factory
   */
  export function MakeGeneric<
    Name extends string,
    Constructor extends (...args: any[]) => DataObject<{ [DataObject.type]: Name }>
  >(
    typeName: Name,
    getConstructor: (
      create: <Properties>(properties: Properties) => DataObject<{ [DataObject.type]: Name } & Properties>
    ) => Constructor
  ): Constructor & Module<ReturnType<Constructor>> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    const create = (properties: any) => ({
      [DataObject.type]: typeName,
      ...properties,
    });
    const properties = {
      '==': shallowEqual,
      '!=': (left: any, right: any) => !shallowEqual(left, right),
      typeName,
      create,
      hasInstance: (anyValue: unknown): boolean =>
        // @ts-ignore We know what we are doing
        anyValue == null ? false : anyValue[type] === typeName,
    };

    // @ts-ignore We know what we are doing
    return Object.assign(getConstructor(create), properties);
  }
}
