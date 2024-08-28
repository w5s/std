import { describe, it, expect } from 'vitest';
import { constant } from './constant.js';
import { describeCodec, describeType } from '../Testing.js';
import { Result } from '../Result.js';
import { DecodeError } from '../DecodeError.js';

describe(constant, () => {
  const subject = constant;

  describeType({ describe, it, expect })(subject('anyValue'), {
    typeName: 'anyValue',
    instances: () => ['anyValue' as const],
    notInstances: () => [null, 1, [1], ''],
  });
  describeCodec({ describe, it, expect })(subject('anyValue'), {
    decode: [
      ['anyValue', Result.Ok('anyValue')],
      [
        'otherValue',
        Result.Error(
          DecodeError({
            message: 'Cannot decode otherValue as anyValue',
            input: 'otherValue',
          })
        ),
      ],
    ],
    encode: [['anyValue' as const, 'anyValue']],
    schema: () => ({ const: 'anyValue' }),
  });
});
