import { describe } from 'vitest';
import { describeComparable } from '@w5s/core/dist/Testing.js';
import { Int } from '@w5s/core';
import { StatusComparable } from './StatusComparable.js';
import { Status } from './Status.js';

describe('StatusComparable', () => {
  describeComparable(StatusComparable, {
    ordered: () => [Status(Int(100), 'z'), Status(Int(101), 'b'), Status(Int(500), 'a')],
    equivalent: () => [
      [Status(Int(100), 'z'), Status(Int(100), 'z')],
      [Status(Int(100), 'z'), Status(Int(100), 'a')],
    ],
  });
});
