import { describe, it, expect } from 'vitest';
import { Boolean } from './Boolean.js';
import { describeType, describeComparable } from './testing.js';

describe('Boolean', () => {
  describeType({ describe, it, expect })(Boolean, {
    typeName: 'Boolean',
    instances: () => [true, false],
    notInstances: () => ['', null, undefined],
  });
  describeComparable({ describe, it, expect })(Boolean, {
    ordered: () => [false, true],
    equivalent: () => [
      [true, true],
      [false, false],
    ],
  });
});
