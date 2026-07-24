import { describeError } from '@w5s/error/dist/Testing.js';
import { describe, expect, it } from 'vitest';

import { CodecError } from './CodecError.js';

describe(CodecError, () => {
  describeError({ describe, expect, it })(CodecError, {
    defaultParameters: () => ({ input: 'some input' }),
    expectedDefaultMessage: 'The encoding or decoding operation failed',
    expectedName: 'CodecError',
  });
});
