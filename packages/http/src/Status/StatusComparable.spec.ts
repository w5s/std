import { Int } from '@w5s/core';
import { describeComparable } from '@w5s/core/dist/Testing.js';
import { describe } from 'vitest';

import { Status } from './Status.js';
import { StatusComparable } from './StatusComparable.js';

describe('StatusComparable', () => {
  describeComparable(StatusComparable, {
    equivalent: () => [
      [Status(Int(100), 'z'), Status(Int(100), 'z')],
      [Status(Int(100), 'z'), Status(Int(100), 'a')],
    ],
    ordered: () => [Status(Int(100), 'z'), Status(Int(101), 'b'), Status(Int(500), 'a')],
  });
});
