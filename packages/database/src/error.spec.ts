import { describe, it, expect } from 'vitest';
import { describeError } from '@w5s/error/Testing';
import { DatabaseError } from './error.js';

describe('DatabaseError', () => {
  describeError({ describe, it, expect })(DatabaseError, {
    defaultParameters: () => ({}),
    expectedName: 'DatabaseError',
    expectedDefaultMessage: 'An unknown error occurred with database',
  });
});
