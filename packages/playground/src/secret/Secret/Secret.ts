import { Symbol } from '@w5s/core/Symbol';
import { __state } from '../__state.js';
import { SecretAsString } from './SecretAsString.js';

export class Secret<T> {
  _ = 'Secret' as const;

  constructor(value: T) {
    __state.set(this, value);
  }

  [Symbol.inspect]() {
    return SecretAsString.asString(this);
  }

  toString() {
    return SecretAsString.asString(this);
  }

  toJSON() {
    return SecretAsString.asString(this);
  }
}
