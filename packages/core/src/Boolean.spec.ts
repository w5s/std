import { describe, it, expect } from 'vitest';
import { Boolean } from './Boolean.js';
import { describeClass, describeComparable } from './testing.js';

describe('Boolean', () => {
  describeClass({ describe, it, expect })(Boolean, {
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
