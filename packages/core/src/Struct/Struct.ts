import type { AsString } from '../AsString.js';
import type { InspectFunction, InspectOptions, Type } from '../Type.js';

export class Struct {
  static create<T>(mod: Type<T> & AsString<T>, properties: T): Struct & T {
    return Object.assign(new Struct(mod), properties);
  }

  #module: Type<unknown> & AsString<unknown>;

  protected constructor(mod: Type<any> & AsString<any>) {
    this.#module = mod;
  }

  /**
   * String tag
   */
  get [Symbol.toStringTag]() {
    return this.#module.typeName;
  }

  /**
   * Return an inspect representation
   *
   * @example
   * @param depth
   * @param inspectOptions
   * @param inspect
   */
  [Symbol.for('nodejs.util.inspect.custom')](depth: number, inspectOptions: InspectOptions, inspect: InspectFunction) {
    return this.#module.__inspect__ == null
      ? inspect(this, { ...inspectOptions, customInspect: false })
      : this.#module.__inspect__(this, depth, inspectOptions, inspect);
  }

  /**
   * Returns a string representation of an object.
   *
   * @example
   * ```typescript
   * struct.toString(); // '[object MyStruct]'
   * ```
   */
  toString() {
    return this.#module.asString(this);
  }
}
