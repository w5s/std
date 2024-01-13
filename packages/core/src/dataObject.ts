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
  },
> = Readonly<Properties>;

export namespace DataObject {
  /**
   * Extract all parameters to create a new DataObject
   */
  export type Parameters<Model> = Omit<Model, DataObject.type>;

  export interface Module<Model extends DataObject<{ [DataObject.type]: string }>> extends Equal<Model> {
    /**
     * Construct a new model
     *
     * @category Constructor
     * @param properties - The properties for initialization
     */
    create(this: void, properties: Parameters<Model>): Model;
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
     * @category Guard
     * @param anyValue - the value to be tested
     */
    hasInstance(this: void, anyValue: unknown): anyValue is Model;
  }
  /**
   * The type property discriminator
   */
  export const type = '_' as const;

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
    return MakeGeneric(typeName, (_) => (properties) => ({
      [DataObject.type]: _,
      ...properties,
    }));
  }

  /**
   * Return a new `DataObject` factory using `getConstructor()`
   * See {@link Module} for additional properties added to the constructor
   *
   * @example
   * ```typescript
   * const Model = DataObject.MakeGeneric(
   *   'Model',
   *   (_) => // 'Model'
   *     // the constructor
   *     (foo: boolean) => ({ _, foo })
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
    Constructor extends (...args: any[]) => DataObject<{ [DataObject.type]: Name }>,
  >(typeName: Name, getConstructor: (_: Name) => Constructor): Constructor & Module<ReturnType<Constructor>> {
    const properties = {
      '==': shallowEqual,
      '!=': (left: any, right: any) => !shallowEqual(left, right),
      typeName,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      create: (_properties: any) => ({
        [DataObject.type]: typeName,
        ..._properties,
      }),
      hasInstance: (anyValue: unknown): boolean =>
        // @ts-ignore We know what we are doing
        anyValue == null ? false : anyValue[type] === typeName,
    };

    // @ts-ignore We know what we are doing
    return Object.assign(getConstructor(typeName), properties);
  }
}
