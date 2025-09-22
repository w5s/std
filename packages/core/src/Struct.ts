import type { PartialKeys } from '@w5s/core-type';
import type { AsString } from './AsString.js';
import { Struct as StructImpl } from './Struct/Struct.js';
import { Callable } from './Callable.js';
import { define as defineType } from './Type/define.js';
import type { Type } from './Type.js';
import type { Symbol } from './Symbol.js';

const type = '_' as const;

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
    [type]: string;
  } = {
    [type]: string;
  },
> = Readonly<Properties>;

/**
 * @namespace
 */
export const Struct = {
  /**
   * The type property discriminator
   */
  type,
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
  create<Properties>(module: Struct.ModuleParameter<Properties>, properties: Properties): Properties {
    return StructImpl.create(module, properties);
  },
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
   * @param parameters - The parameters to define the Struct
   */
  define<Model extends Struct<{ [type]: string }>>(parameters: Struct.DefineParameters<Model>): Struct.Module<Model> {
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
        Struct.create(module, {
          [type]: typeName,
          ...properties,
        }),
    };

    // @ts-ignore We know what we are doing
    return Callable({
      [Callable.symbol]: module.create,
      ...module,
    });
  },
};

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

  export type type = typeof type;

  export type ModuleParameter<T> = Pick<Type<T>, Symbol.inspect> & AsString<T>;

  export interface DefineParameters<Model extends Struct<{ [type]: string }>>
    extends PartialKeys<Type.Parameters<Model>, 'hasInstance'> {
    typeName: Model[Struct.type];
  }
}
