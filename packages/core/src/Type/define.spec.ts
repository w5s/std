import { describe, expect, it } from 'vitest';
import { define } from './define.js';
import { Codec } from '../Codec.js';
import { CodecError } from '../CodecError.js';
import { Result } from '../Result.js';
import { Option } from '../Option.js';

describe(define, () => {
  const inspect = (value: string) => `String(${value})`;
  const TestType = define<string>({
    typeName: 'String',
    hasInstance: (anyValue) => typeof anyValue === 'string',
    inspect,
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
  describe('#inspect', () => {
    it('forwards from parameters', () => {
      expect(TestType.inspect).toBe(TestType.inspect);
    });
  });
  describe('#asInstance', () => {
    it('forwards from parameters', () => {
      const asInstance = () => Option.None;
      const SomeType = define<string>({
        ...TestType,
        asInstance,
      });
      expect(SomeType.asInstance).toBe(asInstance);
    });
    it('returns Option.None when hasInstance(value) is false', () => {
      expect(TestType.asInstance('foo')).toBe('foo');
      expect(TestType.asInstance(1)).toBe(undefined);
    });
  });
  describe('#__encode__', () => {
    it('returns identity', () => {
      expect(Codec.encode(TestType, 'foo')).toEqual('foo');
    });
    it('is overridable by parameters', () => {
      const TestWithEncodeType = define<string>({
        ...TestType,
        __encode__: (_) => `${_}_bar`,
      });
      expect(Codec.encode(TestWithEncodeType, 'foo')).toEqual('foo_bar');
    });
  });
  describe('#__decode__', () => {
    it('returns a decoded value', () => {
      expect(Codec.decode(TestType, 'hello')).toEqual(Result.Ok('hello'));
      expect(Codec.decode(TestType, 1)).toEqual(
        Result.Error(new CodecError({ message: 'Cannot decode 1 as String', input: 1 })),
      );
      expect(Codec.decode(TestType, undefined)).toEqual(
        Result.Error(new CodecError({ message: 'Cannot decode undefined as String', input: undefined })),
      );
    });
    it('is overridable by parameters', () => {
      const TestWithEncodeType = define<string>({
        ...TestType,
        __decode__: (_) => Result.Ok(`${_}_bar`),
      });
      expect(Codec.decode(TestWithEncodeType, 'foo')).toEqual(Result.Ok('foo_bar'));
    });
  });
  describe('#__schema__', () => {
    it('has a default value', () => {
      expect(Codec.schema(TestType)).toEqual({});
    });
    it('is overridable by parameters', () => {
      const TestWithSchemaType = define<string>({
        ...TestType,
        __schema__: () => ({
          type: 'string',
        }),
      });

      expect(Codec.schema(TestWithSchemaType)).toEqual({
        type: 'string',
      });
    });
  });
});
