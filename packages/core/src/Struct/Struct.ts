import type { AsString } from '../AsString.js';
import { compare } from '../String/compare.js';
import type { InspectFunction, InspectOptions, Type } from '../Type.js';

const {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  Object: { assign },
  String: toString,
} = globalThis;
const defaultSort = (left: string | symbol, right: string | symbol) =>
  left === right ? 0 : left === '_' ? -1 : right === '_' ? 1 : compare(toString(left), String(right));

/**
 * @internal
 * @param mod - the module (or TS namespace)
 */
export const Struct = class Object {
  // Important : we name Object so it is shown as anonymous object in snapshot.

  static create<T>(mod: Type<T> & AsString<T>, properties: T): T {
    return assign(new Struct(mod), properties);
  }

  #module: Type<unknown> & AsString<unknown>;

  protected constructor(mod: Type<any> & AsString<any>) {
    this.#module = mod;
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
      ? inspect({ ...this }, { ...inspectOptions, sorted: defaultSort })
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
};
