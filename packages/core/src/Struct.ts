import type { AsString } from './AsString.js';
import { Struct as StructImpl } from './Struct/Struct.js';
import { Callable } from './Callable.js';
import { Symbol } from './Symbol.js';
import type { Type } from './Type.js';

/**
 * An Immutable Data Object with a `type` identifier
 *
 * @example
 * ```typescript
 * // Interface have a better appearance in VSCode
 * export interface MyType extends Struct<{
 *  [Struct.type]: 'MyType',
 *  foo: boolean;
 * }> {}
 * ```
 */
export type Struct<
  Properties extends {
    /**
     * The type unique identifier
     */
    [Struct.type]: string;
  },
> = Readonly<Properties>;

export namespace Struct {
  /**
   * Extract all parameters to create a new Struct
   */
  export type Parameters<Model> = Omit<Model, Struct.type>;

  export interface Module<Model extends Struct<{ [Struct.type]: string }>>
    extends Type<Model>,
      Callable<(properties: Parameters<Model>) => Model> {
    /**
     * Construct a new model
     *
     * @category Constructor
     * @param properties - The properties for initialization
     */
    (properties: Parameters<Model>): Model;
    /**
     * Construct a new model
     *
     * @category Constructor
     * @param properties - The properties for initialization
     */
    create(this: void, properties: Parameters<Model>): Model;
    /**
     * The factory type constant
     *
     * @category Type
     */
    readonly typeName: Model[Struct.type];
  }
  /**
   * The type property discriminator
   */
  export const type = '_';

  export type type = typeof type;

  /**
   * Return a new Struct from `properties`.
   * Struct adds debugging / inspecting abilities
   *
   * @example
   * ```typescript
   * const SomeType = Type.define<{ some: boolean }>({ typeName: 'SomeType' });
   *
   * Struct.create(SomeType, { some: true });// Struct { _: 'SomeType', some: true }
   * ```
   * @param module
   * @param properties
   */
  export function create<Properties>(
    module: Type<Properties> & AsString<Properties>,
    properties: Properties,
  ): Properties {
    return StructImpl.create(module, properties);
  }

  /**
   * Return a new `Struct` default factory
   * See {@link Module} for additional properties added to the constructor
   *
   * @example
   * ```typescript
   * type Model = Struct<{ [Struct.type]: 'Model', foo: boolean }>
   * const Model = Struct.define<Model>('Model');
   *
   * const instance = Model({ foo: true }); // { _: 'Model', foo: true }
   * Model.typeName === 'Model' // true
   * Model.hasInstance(instance); // true
   * ```
   * @param typeName - the type unique name
   */
  export function define<Model extends Struct<{ [Struct.type]: string }>>(typeName: Model[Struct.type]): Module<Model> {
    const hasInstance = (anyValue: unknown): anyValue is Model =>
      // @ts-ignore We know what we are doing
      anyValue == null ? false : anyValue[type] === typeName;
    const asInstance = (value: unknown) => (hasInstance(value) ? value : undefined);
    const module = {
      typeName,
      hasInstance,
      [Symbol.inspect]: undefined,
      asInstance,
      asString: String,
      create: (_properties: any) =>
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        Struct.create(module, {
          [Struct.type]: typeName,
          ..._properties,
        }),
    };

    // @ts-ignore We know what we are doing
    return Callable({
      [Callable.symbol]: module.create,
      ...module,
    });
  }
}
