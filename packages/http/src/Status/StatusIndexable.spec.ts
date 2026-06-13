import { describe } from 'vitest';
import { describeIndexable } from '@w5s/core/Testing';
import { Int } from '@w5s/core/Int';
import { StatusIndexable } from './StatusIndexable.js';
import { Status } from './Status.js';
import * as StatusAll from './status.all.js';

describe('StatusIndexable', () => {
  describeIndexable(StatusIndexable, {
    index: [
      [0, Status(Int(0), '')],
      [200, StatusAll.OK],
    ],
    rangeSize: [],
    range: [],
  });
});
