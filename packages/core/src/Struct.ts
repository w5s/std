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

  export interface Module<Model extends Struct<{ [Struct.type]: string }>> extends Type<Model> {
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
  export function define<Model extends Struct<{ [Struct.type]: string }>>(
    typeName: Model[Struct.type]
  ): ((properties: Parameters<Model>) => Model) & Module<Model> {
    // @ts-ignore typing is slightly different
    return defineWith(typeName, (_) => (properties) => ({
      [Struct.type]: _,
      ...properties,
    }));
  }

  /**
   * Return a new `Struct` factory using `getConstructor()`
   * See {@link Module} for additional properties added to the constructor
   *
   * @example
   * ```typescript
   * const Model = Struct.defineWith(
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
  export function defineWith<
    Name extends string,
    Constructor extends (...args: any[]) => Struct<{ [Struct.type]: Name }>,
  >(typeName: Name, getConstructor: (_: Name) => Constructor): Constructor & Module<ReturnType<Constructor>> {
    const properties = {
      typeName,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      create: (_properties: any) => ({
        [Struct.type]: typeName,
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
