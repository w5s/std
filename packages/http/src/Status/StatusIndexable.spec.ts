import { Int } from '@w5s/core';
import { describeIndexable } from '@w5s/core/dist/Testing.js';
import { describe } from 'vitest';

import * as StatusAll from './status.all.js';
import { Status } from './Status.js';
import { StatusIndexable } from './StatusIndexable.js';

describe('StatusIndexable', () => {
  describeIndexable(StatusIndexable, {
    index: [
      [0, Status(Int(0), '')],
      [200, StatusAll.OK],
    ],
    range: [],
    rangeSize: [],
  });
});
