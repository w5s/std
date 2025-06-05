/* eslint-disable prefer-regex-literals */
import { describe, it, expect } from 'vitest';
import { RegExp } from './RegExp.js';
import { describeCodec, describeType } from '../Testing.js';
import { Result } from '../Result.js';
import { CodecError } from '../CodecError.js';

describe('RegExp', () => {
  describeType(RegExp, {
    typeName: 'RegExp',
    instances: () => [/abc/],
    notInstances: () => ['anything', null, undefined],
  });
  describeCodec(RegExp, {
    encode: [
      [new globalThis.RegExp(''), '/(?:)/'],
      [/[a-z][A-Z]/, '/[a-z][A-Z]/'],
    ],
    decode: [
      ['', Result.Ok(/(?:)/)],
      ['[a-z][A-Z]', Result.Ok(/[a-z][A-Z]/)],
      ['/[a-z][A-Z]/', Result.Ok(/[a-z][A-Z]/)],
      ['/[a-z]{2}/gi', Result.Ok(/[a-z]{2}/gi)],
      [undefined, Result.Error(new CodecError({ message: 'Cannot decode undefined as RegExp', input: undefined }))],
      [null, Result.Error(new CodecError({ message: 'Cannot decode null as RegExp', input: null }))],
    ],
    schema: () => ({ type: 'string', format: 'regex' }),
  });
  describe(RegExp.parse, () => {
    it('should parse a regexp string', () => {
      expect(RegExp.parse('/[a-z][A-Z]/')).toEqual(/[a-z][A-Z]/);
      expect(RegExp.parse('/hello world')).toEqual(/\/hello world/);
    });
  });
});
