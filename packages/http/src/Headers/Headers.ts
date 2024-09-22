import type { Type } from '@w5s/core';
import { Record } from '@w5s/core/dist/Type/Record.js';
import { string } from '@w5s/core/dist/Type/string.js';

export const Headers = {
  ...Record(string, string),
  typeName: 'Headers',
};
export interface Headers extends Type.TypeOf<typeof Headers> {}
