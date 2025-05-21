import { describe, it, expect } from 'vitest';
import { constant } from './constant.js';
import { describeCodec, describeType } from '../Testing.js';
import { Result } from '../Result.js';
import { CodecError } from '../CodecError.js';

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
          new CodecError({
            message: 'Cannot decode "otherValue" as anyValue',
            input: 'otherValue',
          }),
        ),
      ],
    ],
    encode: [['anyValue' as const, 'anyValue']],
    schema: () => ({ const: 'anyValue' }),
  });

  const anySymbol = Symbol('anySymbol');
  const codecWithEncodedValue = subject(anySymbol, '$$anySymbol');
  describeCodec({ describe, it, expect })(codecWithEncodedValue, {
    decode: [
      ['$$anySymbol', Result.Ok(anySymbol)],
      [
        'otherValue',
        Result.Error(
          new CodecError({
            message: 'Cannot decode "otherValue" as Symbol(anySymbol)',
            input: 'otherValue',
          }),
        ),
      ],
    ],
    encode: [[anySymbol, '$$anySymbol']],
    schema: () => ({ const: '$$anySymbol' }),
  });

  const nullLiteral = subject(undefined, null);
  describeCodec({ describe, it, expect })(nullLiteral, {
    decode: [
      [null, Result.Ok(undefined)],
      [
        undefined,
        Result.Error(
          new CodecError({
            message: 'Cannot decode undefined as undefined',
            input: undefined,
          }),
        ),
      ],
    ],
    encode: [[undefined, null]],
    schema: () => ({ type: 'null' }),
  });
});
