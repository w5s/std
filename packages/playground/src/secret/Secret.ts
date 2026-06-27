import type { Struct } from '@w5s/core/Struct';
import { of } from './Secret/of.js';
import { SecretAsString } from './Secret/SecretAsString.js';
import { value } from './Secret/value.js';

export interface Secret<T> extends Struct<{ _: 'Secret' }> {
  ['@@secret']: T;

  /**
   * Returns string conversion
   */
  toString(): string;

  /**
   * Return JSON conversion
   */
  toJSON(): string;
}

/**
 * @namespace
 */
export const Secret = Object.assign(
  // eslint-disable-next-line ts/no-shadow
  function Secret<T>(value: T) {
    return of(value);
  },
  {
    of,
    value,
    ...SecretAsString,
  },
);
