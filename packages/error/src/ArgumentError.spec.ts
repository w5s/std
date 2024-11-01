import { describe, it, expect } from 'vitest';
import { ArgumentError } from './ArgumentError.js';
import { describeError } from './Testing.js';

describe('ArgumentError', () => {
  describeError({ describe, it, expect })(ArgumentError, {
    defaultParameters: () => ({}),
    expectedName: 'ArgumentError',
    expectedDefaultMessage: 'Some arguments are invalid or missing',
  });
});
