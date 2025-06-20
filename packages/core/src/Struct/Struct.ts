import { compare } from '../String/compare.js';
import type { Struct as TStruct } from '../Struct.js';
import type { InspectFunction, InspectOptions } from '../Type.js';

const {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  Object: { assign },
  String: toString,
} = globalThis;
const defaultSort = (left: string | symbol, right: string | symbol) =>
  left === right ? 0 : left === '_' ? -1 : right === '_' ? 1 : compare(toString(left), toString(right));

/**
 * @internal
 * @param mod - the module (or TS namespace)
 */
export const Struct = class Object {
  // Important : we name Object so it is shown as anonymous object in snapshot.

  static create<T>(mod: TStruct.ModuleParameter<T>, properties: T): T {
    return assign(new Struct(mod), properties);
  }

  #module: TStruct.ModuleParameter<unknown>;

  protected constructor(mod: TStruct.ModuleParameter<any>) {
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
  [globalThis.Symbol.for('nodejs.util.inspect.custom')](
    depth: number,
    inspectOptions: InspectOptions,
    inspect: InspectFunction,
  ) {
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
