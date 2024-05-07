import { describe, expect, it } from 'vitest';
import { define } from './define.js';
import { Codec } from '../Codec.js';
import { DecodeError } from '../Codec/DecodeError.js';
import { Result } from '../Result.js';

describe(define, () => {
  const TestType = define<string>({
    typeName: 'String',
    hasInstance: (anyValue) => typeof anyValue === 'string',
  });

  describe('#typeName', () => {
    it('returns the type', () => {
      expect(TestType.typeName).toBe('String');
    });
  });
  describe('#hasInstance', () => {
    it('returns predicate function', () => {
      expect(TestType.hasInstance('')).toBe(true);
      expect(TestType.hasInstance(null)).toBe(false);
    });
  });
  describe('#codecEncode', () => {
    it('returns identity', () => {
      expect(Codec.encode(TestType, 'foo')).toEqual('foo');
    });
    it('is overridable by parameters', () => {
      const TestWithEncodeType = define<string>({
        ...TestType,
        codecEncode: (_) => `${_}_bar`,
      });
      expect(Codec.encode(TestWithEncodeType, 'foo')).toEqual('foo_bar');
    });
  });
  describe('#codecDecode', () => {
    it('returns a decoded value', () => {
      expect(Codec.decode(TestType, 'hello')).toEqual(Result.Ok('hello'));
      expect(Codec.decode(TestType, 1)).toEqual(
        Result.Error(DecodeError({ message: 'Cannot decode 1 as String', input: 'invalid' }))
      );
      expect(Codec.decode(TestType, undefined)).toEqual(
        Result.Error(DecodeError({ message: 'Cannot decode undefined as String', input: undefined }))
      );
    });
    it('is overridable by parameters', () => {
      const TestWithEncodeType = define<string>({
        ...TestType,
        codecDecode: (_) => Result.Ok(`${_}_bar`),
      });
      expect(Codec.decode(TestWithEncodeType, 'foo')).toEqual(Result.Ok('foo_bar'));
    });
  });
  describe('#codecSchema', () => {
    it('has a default value', () => {
      expect(Codec.schema(TestType)).toEqual({});
    });
    it('is overridable by parameters', () => {
      const TestWithSchemaType = define<string>({
        ...TestType,
        codecSchema: () => ({
          type: 'string',
        }),
      });

      expect(Codec.schema(TestWithSchemaType)).toEqual({
        type: 'string',
      });
    });
  });
});
