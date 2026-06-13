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
const decode: Codec<LogLevel>[Symbol.decode] = (input, { error, ok }) => {
  if (typeof input === 'string') {
    const match = /^(\w+)\[(\d+)]$/.exec(input);
    if (match?.length === 3) {
      // eslint-disable-next-line ts/no-non-null-assertion
      const name = match[1]!;
      // eslint-disable-next-line ts/no-non-null-assertion
      const value = parseInt(match[2]!);
      if (value != null) {
        return ok(LogLevel.create({ name, value }));
      }
    }
  }

  return error(input, typeName);
};

export const LogLevel = Struct.define<LogLevel>({
  [Symbol.decode]: decode,
  [Symbol.encode]: encode,
  [Symbol.inspect]: encode,
  [Symbol.schema]: () => ({
    format: typeName,
    type: 'string',
  }),
  typeName,
  ...LogLevelAsString,
});
