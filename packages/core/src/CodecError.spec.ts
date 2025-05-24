import { describe, it, expect } from 'vitest';
import { describeError } from '@w5s/error/dist/Testing.js';
import { CodecError } from './CodecError.js';

describe(CodecError, () => {
  describeError({ describe, it, expect })(CodecError, {
    defaultParameters: () => ({ input: 'some input' }),
    expectedName: 'CodecError',
    expectedDefaultMessage: 'The encoding or decoding operation failed',
  });
});
