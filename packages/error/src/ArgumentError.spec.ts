import { describe, expect, it } from 'vitest';

import { ArgumentError } from './ArgumentError.js';
import { describeError } from './Testing.js';

describe('ArgumentError', () => {
  describeError({ describe, expect, it })(ArgumentError, {
    defaultParameters: () => ({}),
    expectedDefaultMessage: 'Some arguments are invalid or missing',
    expectedName: 'ArgumentError',
  });
});
