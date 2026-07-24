import { describeError } from '@w5s/error/dist/Testing.js';
import { describe, expect, it } from 'vitest';

import { DatabaseError } from './error.js';

describe('DatabaseError', () => {
  describeError({ describe, expect, it })(DatabaseError, {
    defaultParameters: () => ({}),
    expectedDefaultMessage: 'An unknown error occurred with database',
    expectedName: 'DatabaseError',
  });
});
