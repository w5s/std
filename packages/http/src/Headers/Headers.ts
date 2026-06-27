import type { Type } from '@w5s/core/Type';
import { Record } from '@w5s/core/Type/Record';
import { string } from '@w5s/core/Type/string';

export const Headers = {
  ...Record(string, string),
  typeName: 'Headers',
};
export interface Headers extends Type.TypeOf<typeof Headers> {}
