import { describe } from 'vitest';

import type { Type } from '../Type.js';

import { describeType } from './describeType.js';

describe('describeType', () => {
  const StringType: Type<string> = {
    __inspect__: undefined,
    asInstance: (value) => (typeof value === 'string' ? value : undefined),
    hasInstance: (value): value is string => typeof value === 'string',
    typeName: 'String',
  };

  describeType(StringType, () => ({
    instances: ['', 'a', 'hello world !'],
    notInstances: [null, undefined, 1, {}, new String('')],

    typeName: 'String',
  }));
});
