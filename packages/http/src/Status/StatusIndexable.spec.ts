import { describe, it, expect } from 'vitest';
import { describeIndexable } from '@w5s/core/dist/Testing.js';
import { Int } from '@w5s/core';
import { StatusIndexable } from './StatusIndexable.js';
import { Status } from './Status.js';
import * as StatusAll from './status.all.js';

describe('StatusIndexable', () => {
  describeIndexable({ describe, it, expect })(StatusIndexable, {
    at: [
      [0, Status(Int(0), '')],
      [200, StatusAll.OK],
    ],
    indexOf: [
      [StatusAll.OK, 200],
      [Status(Int(0), ''), 0],
    ],
    rangeSize: [],
    range: [],
  });
});
