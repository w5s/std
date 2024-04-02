import { describe, it, expect } from 'vitest';
import type { Class } from '../Class.js';
import { describeClass } from './describeClass.js';

describe('describeEqual', () => {
  const StringType: Class<string> = {
    hasInstance: (value): value is string => typeof value === 'string',
  };

  describeClass({ describe, it, expect })(StringType, {
    instances: () => ['', 'a', 'hello world !'],
    // eslint-disable-next-line no-new-wrappers
    notInstances: () => [null, undefined, 1, {}, new String('')],
  });
});
