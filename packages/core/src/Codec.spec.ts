import { describe, it, expect } from 'vitest';
import { Result } from './Result.js';
import { Codec, DecodeError, dateISO } from './Codec.js';

describe('Codec', () => {
  describe('.encode()', () => {
    it('should call codecEncode', () => {
      const codec = {
        codecEncode: (_: string) => `test_${_}`,
      };
      expect(Codec.encode(codec, 'value')).toEqual('test_value');
    });
  });
  describe('.decode()', () => {
    it('should call codecEncode', () => {
      const codec = {
        codecDecode: (_: unknown) => Result.Ok(`test_${_}`),
      };
      expect(Codec.decode(codec, 'value')).toEqual(Result.Ok('test_value'));
    });
  });
});

describe('lazy', () => {
  const subject = Codec.lazy;
  const getCodec = () =>
    Codec<string>({
      codecEncode: (_) => `__${_}`,
      codecDecode: (_) => Result.Ok(String(_).slice(2)),
      codecSchema: () => ({ type: 'string', format: 'test' }),
    });

  describe('.codecSchema', () => {
    it('should forward schema', () => {
      const codec = subject(getCodec);
      expect(Codec.schema(codec)).toEqual({ type: 'string', format: 'test' });
    });
  });
  describe('.codecEncode', () => {
    it('should forward encode', () => {
      const codec = subject(getCodec);
      expect(Codec.encode(codec, 'a')).toEqual('__a');
    });
  });
  describe('.codecDecode', () => {
    it('should forward decode', () => {
      const codec = subject(getCodec);
      expect(Codec.decode(codec, '__a')).toEqual(Result.Ok('a'));
    });
  });
});
describe('dateISO', () => {
  const subject = dateISO;
  describe('.codecSchema', () => {
    it('should return correct schema', () => {
      expect(Codec.schema(subject)).toEqual({ type: 'string', format: 'date-time' });
    });
  });
  describe('.codecEncode', () => {
    it.each([
      [new Date(0), '1970-01-01T00:00:00.000Z'],
      [new Date('2022-08-01T20:14:09.721Z'), '2022-08-01T20:14:09.721Z'],
    ])('should encode values', (input, expected) => {
      expect(Codec.encode(subject, input)).toEqual(expected);
    });
  });
  describe('.codecDecode', () => {
    it.each([
      ['1970-01-01T00:00:00.000Z', Result.Ok(new Date(0))],
      ['2022-08-01T20:14:09.721Z', Result.Ok(new Date('2022-08-01T20:14:09.721Z'))],
      [
        undefined,
        Result.Error(
          DecodeError({
            message: 'Cannot decode undefined as String',
            input: undefined,
          })
        ),
      ],
      [
        'foo',
        Result.Error(
          DecodeError({
            message: 'foo is not a valid Date',
            input: 'foo',
          })
        ),
      ],
    ])('should encode values', (input, expected) => {
      expect(Codec.decode(subject, input)).toEqual(expected);
    });
  });
});
