import { describe, expect, it } from 'vitest';

import { CodecError } from '../CodecError.js';
import { Result } from '../Result.js';
import { describeCodec, describeType } from '../Testing.js';
import { RegExp } from './RegExp.js';

describe('RegExp', () => {
  describeType(RegExp, () => ({
    instances: [/abc/],
    notInstances: ['anything', null, undefined],
    typeName: 'RegExp',
  }));
  describeCodec(RegExp, () => ({
    decode: [
      ['', Result.Ok(/(?:)/)],
      ['[a-z][A-Z]', Result.Ok(/[a-z][A-Z]/)],
      ['/[a-z][A-Z]/', Result.Ok(/[a-z][A-Z]/)],
      ['/[a-z]{2}/gi', Result.Ok(/[a-z]{2}/gi)],
      [undefined, Result.Error(new CodecError({ input: undefined, message: 'Cannot decode undefined as RegExp' }))],
      [null, Result.Error(new CodecError({ input: null, message: 'Cannot decode null as RegExp' }))],
    ],
    encode: [
      [new globalThis.RegExp(''), '/(?:)/'],
      [/[a-z][A-Z]/, '/[a-z][A-Z]/'],
    ],
    schema: { format: 'regex', type: 'string' },
  }));
  describe(RegExp.parse, () => {
    it('should parse a regexp string', () => {
      expect(RegExp.parse('/[a-z][A-Z]/')).toEqual(/[a-z][A-Z]/);
      expect(RegExp.parse('/hello world')).toEqual(/\/hello world/);
    });
  });
});
