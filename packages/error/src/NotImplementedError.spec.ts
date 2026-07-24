import { describe, expect, it } from 'vitest';

import { NotImplementedError } from './NotImplementedError.js';
import { describeError } from './Testing.js';

describe(NotImplementedError, () => {
  describeError({ describe, expect, it })(NotImplementedError, {
    defaultParameters: () => ({}),
    expectedDefaultMessage: 'Not implemented',
    expectedName: 'NotImplementedError',
  });
});
