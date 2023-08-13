import { describe, it, expect } from 'vitest';
import { Option } from './option.js';
import { assertType } from './testing.js';

describe('Option', () => {
  describe('.None', () => {
    it('should be an alias for undefined', () => {
      expect(Option.None).toBe(undefined);
    });
    it('should be compatible with JSON.stringify/parse', () => {
      const data = JSON.parse(JSON.stringify({ foo: Option.None }));
      expect(data).toEqual({ foo: Option.None });
      expect(Option.isNone(data.foo)).toBe(true);
    });
  });
  describe('Some', () => {
    it('should be an identity function', () => {
      expect(Option.Some('blah')).toBe('blah');
    });
    it('should throw an TypeError if undefined or null is passed', () => {
      // @ts-ignore this is a voluntary violation
      expect(() => Option.Some(null)).toThrow(new TypeError('Value must be non null, non undefined value'));
      // @ts-ignore this is a voluntary violation
      expect(() => Option.Some(undefined)).toThrow(new TypeError('Value must be non null, non undefined value'));
    });
    it('should report an error in typescript for null', () => {
      expect(() => {
        // @ts-expect-error null is forbidden
        Option.Some(null);
        // @ts-expect-error undefined is forbidden
        Option.Some(undefined);
      }).toThrow();
    });
  });

  describe('.isNone', () => {
    it('should return false for any value', () => {
      expect(Option.isNone({})).toBe(false);
    });
    it('should return true for null or undefined', () => {
      expect(Option.isNone(undefined)).toBe(true);
      expect(Option.isNone(null)).toBe(true);
    });
    it('should narrow type in typescript', () => {
      const anyValue: Option<string> = '';
      if (Option.isNone(anyValue)) {
        // @ts-expect-error anyValue is not a string
        anyValue.trim();
      } else {
        anyValue.trim();
      }
    });
  });
  describe('.isSome', () => {
    it('should return true for any value', () => {
      expect(Option.isSome({})).toBe(true);
    });
    it('should return true for null or undefined', () => {
      expect(Option.isSome(undefined)).toBe(false);
      expect(Option.isSome(null)).toBe(false);
    });
    it('should narrow type in typescript', () => {
      const anyValue: Option<string> = '';
      if (Option.isSome(anyValue)) {
        anyValue.trim();
      } else {
        // @ts-expect-error anyValue is not a string
        anyValue.trim();
      }
    });
  });
  describe('.from', () => {
    it('should return non null value', () => {
      expect(Option.from(null)).toBe(Option.None);
      expect(Option.from(undefined)).toBe(Option.None);
      expect(Option.from('foo')).toBe('foo');
    });
  });
  describe('.map', () => {
    it('should return true for Some() object', () => {
      expect(Option.map(Option.Some('foo'), (value) => `${value}_suffix`)).toEqual(Option.Some('foo_suffix'));
    });
    it('should return false for None values', () => {
      expect(Option.map(undefined, (value) => `${value}_suffix`)).toEqual(Option.None);
      expect(Option.map(null, (value) => `${value}_suffix`)).toEqual(Option.None);
    });
  });
  describe('.getOrElse', () => {
    it('should return defaultValue for Result.Error', () => {
      expect(Option.getOrElse(Option.None, () => 'any_default_value')).toEqual('any_default_value');
    });
    it('should return value for Result.Ok', () => {
      expect(Option.getOrElse(Option.Some('foo'), () => 'any_default_value')).toBe('foo');
    });
  });
  describe('.getOrThrow', () => {
    it('should return undefined for undefined,null', () => {
      expect(() => {
        Option.getOrThrow(undefined);
      }).toThrow();
      expect(() => {
        Option.getOrThrow(null);
      }).toThrow();
    });
    it('should return value for Some()', () => {
      const option: Option<string> = Option.Some('foo');
      const foo = Option.getOrThrow(option);
      expect(foo).toBe('foo');

      assertType<typeof foo, string>(true);
    });
  });
  describe('.andThen', () => {
    const square = (num: number): Option<number> => Option.Some(num * num);
    it('should return always Option.None when Option.None', () => {
      expect(Option.andThen(Option.None, square)).toBe(Option.None);
    });
    it('should map value when Option.Some', () => {
      expect(Option.andThen(Option.Some(4), square)).toBe(Option.Some(16));
    });
  });
  describe('.orElse', () => {
    it('should return callback result when Option.None', () => {
      expect(Option.orElse(Option.None, () => Option.Some('foo'))).toEqual(Option.Some('foo'));
    });
    it('should return identity when Option.Some', () => {
      expect(Option.orElse(Option.Some('foo'), () => Option.Some('bar'))).toEqual(Option.Some('foo'));
    });
  });
  describe('.match', () => {
    it('should call matchers.None when None', () => {
      expect(
        Option.match(Option.None, {
          None: () => 'none',
          Some: (value) => `${value}_some`,
        })
      ).toEqual('none');
    });
    it('should call matchers.Some when Some', () => {
      expect(
        Option.match(Option.Some('foo'), {
          None: () => 'none',
          Some: (value) => `${value}_some`,
        })
      ).toEqual('foo_some');
    });
  });
});
