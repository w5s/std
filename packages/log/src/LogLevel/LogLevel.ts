import type { Codec } from '@w5s/core/Codec';
import type { Int } from '@w5s/core/Int';
import { Struct } from '@w5s/core/Struct';
import { Symbol } from '@w5s/core/Symbol';
import { parse as parseInt } from '@w5s/num/Int/parse';
import { LogLevelAsString } from './LogLevelAsString.js';

export interface LogLevel extends Struct<{
  [Struct.type]: 'LogLevel';

  /**
   * The level string representation.
   */
  name: string;

  /**
   * The level value
   */
  value: Int;
}> {}

const typeName = 'LogLevel';
const encode = ({ name, value }: LogLevel) => `${name}[${value}]`;
const decode: Codec<LogLevel>[Symbol.decode] = (input, { ok, error }) => {
  if (typeof input === 'string') {
    const match = input.match(/^(\w+)\[(\d+)]$/);
    if (match != null && match.length === 3) {
      const name = match[1]!;

      const value = parseInt(match[2]!);
      if (value != null) {
        return ok(LogLevel.create({ name, value }));
      }
    }
  }

  return error(input, typeName);
};

export const LogLevel = Struct.define<LogLevel>({
  typeName,
  [Symbol.decode]: decode,
  [Symbol.encode]: encode,
  [Symbol.inspect]: encode,
  [Symbol.schema]: () => ({
    type: 'string',
    format: typeName,
  }),
  ...LogLevelAsString,
});
