import type { PartialKeys } from '@w5s/core-type';
import type { AsString } from './AsString.js';
import { Struct as StructImpl } from './Struct/Struct.js';
import { Callable } from './Callable.js';
import { define as defineType } from './Type/define.js';
import type { Type } from './Type.js';
import type { Symbol } from './Symbol.js';

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
  } = {
    [Struct.type]: string;
  },
> = Readonly<Properties>;

export namespace Struct {
  /**
   * Extract all parameters to create a new Struct
   */
  export type Parameters<Model> = Omit<Model, Struct.type>;

  export interface Module<Model extends Struct>
    extends Type.Module<Model>,
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

  export type ModuleParameter<T> = Pick<Type<T>, Symbol.inspect> & AsString<T>;

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
  export function create<Properties>(module: ModuleParameter<Properties>, properties: Properties): Properties {
    return StructImpl.create(module, properties);
  }

  export interface DefineParameters<Model extends Struct<{ [Struct.type]: string }>>
    extends PartialKeys<Type.Parameters<Model>, 'hasInstance'> {
    typeName: Model[Struct.type];
  }

  /**
   * Return a new `Struct` default factory
   * See {@link Module} for additional properties added to the constructor
   *
   * @example
   * ```typescript
   * type Model = Struct<{ [Struct.type]: 'Model', foo: boolean }>
   * const Model = Struct.define<Model>({ typeName: 'Model' });
   *
   * const instance = Model({ foo: true }); // { _: 'Model', foo: true }
   * Model.typeName === 'Model' // true
   * Model.hasInstance(instance); // true
   * ```
   * @param typeName - the type unique name
   */
  export function define<Model extends Struct<{ [Struct.type]: string }>>(
    parameters: DefineParameters<Model>,
  ): Module<Model> {
    const { typeName } = parameters;
    const module = {
      ...defineType({
        hasInstance: (anyValue: unknown): anyValue is Model =>
          // @ts-ignore We know what we are doing
          anyValue == null ? false : anyValue[type] === typeName,
        ...parameters,
        typeName,
      }),
      create: (properties: any) =>
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        create(module, {
          [type]: typeName,
          ...properties,
        }),
    };

    // @ts-ignore We know what we are doing
    return Callable({
      [Callable.symbol]: module.create,
      ...module,
    });
  }
}
