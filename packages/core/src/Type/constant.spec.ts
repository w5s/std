import { describe } from 'vitest';

import { CodecError } from '../CodecError.js';
import { Result } from '../Result.js';
import { describeCodec, describeType } from '../Testing.js';
import { constant } from './constant.js';

describe(constant, () => {
  const subject = constant;

  describeType(subject('anyValue'), () => ({
    instances: ['anyValue' as const],
    notInstances: [null, 1, [1], ''],
    typeName: 'anyValue',
  }));
  describeCodec(subject('anyValue'), () => ({
    decode: [
      ['anyValue', Result.Ok('anyValue')],
      [
        'otherValue',
        Result.Error(
          new CodecError({
            input: 'otherValue',
            message: 'Cannot decode "otherValue" as anyValue',
          }),
        ),
      ],
    ],
    encode: [['anyValue' as const, 'anyValue']],
    schema: { const: 'anyValue' },
  }));

  const anySymbol = Symbol('anySymbol');
  const codecWithEncodedValue = subject(anySymbol, '$$anySymbol');
  describeCodec(codecWithEncodedValue, () => ({
    decode: [
      ['$$anySymbol', Result.Ok(anySymbol)],
      [
        'otherValue',
        Result.Error(
          new CodecError({
            input: 'otherValue',
            message: 'Cannot decode "otherValue" as Symbol(anySymbol)',
          }),
        ),
      ],
    ],
    encode: [[anySymbol, '$$anySymbol']],
    schema: { const: '$$anySymbol' },
  }));

  const nullLiteral = subject(undefined, null);
  describeCodec(nullLiteral, () => ({
    decode: [
      [null, Result.Ok(undefined)],
      [
        undefined,
        Result.Error(
          new CodecError({
            input: undefined,
            message: 'Cannot decode undefined as undefined',
          }),
        ),
      ],
    ],
    encode: [[undefined, null]],
    schema: { type: 'null' },
  }));
});
