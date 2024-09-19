import { describe, it, expect } from 'vitest';
import { describeComparable } from '@w5s/core/dist/Testing.js';
import { StatusComparable } from './StatusComparable.js';
import { Status } from './Status.js';

describe('StatusComparable', () => {
  describeComparable({ describe, it, expect })(StatusComparable, {
    ordered: () => [Status(100, 'z'), Status(101, 'b'), Status(500, 'a')],
    equivalent: () => [
      [Status(100, 'z'), Status(100, 'z')],
      [Status(100, 'z'), Status(100, 'a')],
    ],
  });
});
