import { Symbol } from '@w5s/core/dist/Symbol.js';
import { __state } from '../__state.js';

const SECRET = '<secret>';

export class Secret<T> {
  constructor(value: T) {
    __state.set(this, value);
  }

  [Symbol.inspect]() {
    return SECRET;
  }

  toString() {
    return SECRET;
  }

  toJSON() {
    return SECRET;
  }
}
