import { describe, it, expect } from 'vitest';
import type { Type } from '../Type.js';
import { describeType } from './describeType.js';

describe('describeType', () => {
  const StringType: Type<string> = {
    typeName: 'String',
    hasInstance: (value): value is string => typeof value === 'string',
    asInstance: (value) => (typeof value === 'string' ? value : undefined),
    __inspect__: undefined,
  };

  describeType({ describe, it, expect })(StringType, {
    typeName: 'String',
    instances: () => ['', 'a', 'hello world !'],
    // eslint-disable-next-line no-new-wrappers
    notInstances: () => [null, undefined, 1, {}, new String('')],
  });
});
