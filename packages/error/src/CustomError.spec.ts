import { describe, it, expect } from 'vitest';
import { CustomError, defineCustomError, defineCustomErrorWith } from './CustomError.js';

describe('CustomError', () => {
  const anyString = 'AnyString';
  describe('()', () => {
    it('should return instance of Error', () => {
      expect(CustomError({ name: anyString })).toBeInstanceOf(globalThis.Error);
    });
    it('should return Error with default properties', () => {
      expect(CustomError({ name: anyString })).toEqual(
        expect.objectContaining({
          message: '',
          cause: undefined,
        })
      );
    });
    it('should merge custom properties', () => {
      expect(CustomError({ name: 'MockError', message: 'custom message', foo: true })).toEqual(
        expect.objectContaining({
          name: 'MockError',
          message: 'custom message',
          foo: true,
        })
      );
    });
    it('should keep original message', () => {
      const cause = new Error('CauseMessage');
      expect(CustomError({ name: anyString, message: 'OriginalMessage', cause })).toEqual(
        expect.objectContaining({
          message: 'OriginalMessage',
          cause,
        })
      );
    });
  });
  describe('#toString()', () => {
    it.each([
      [CustomError({ name: 'CustomError' }), 'CustomError'],
      [CustomError({ name: 'CustomError', message: 'CustomMessage' }), 'CustomError: CustomMessage'],
      [
        CustomError({ name: 'CustomError', message: 'CustomMessage', cause: new Error('CauseMessage') }),
        'CustomError: CustomMessage',
      ],
    ])('should return correctly formatted string representation', (error, expected) => {
      expect(String(error)).toEqual(expected);
    });
  });
  describe('#stack', () => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    (Error.captureStackTrace == null ? it.skip : it)('should capture stack', () => {
      const error = CustomError({
        name: 'CustomError',
        message: 'CustomMessage',
        cause: new Error('CauseMessage'),
      });
      const lines = (error.stack ?? '').split('\n');

      expect(lines[0]).toEqual('CustomError: CustomMessage');

      expect(lines[1]).not.toEqual(expect.stringMatching(/\.DataError/));
    });
  });
});
describe('defineCustomErrorWith()', () => {
  const TestError = defineCustomErrorWith('TestError', (create) => (email: string) => create({ email }));
  it('should create a new constructor', () => {
    expect(TestError('foo@bar.com')).toEqual(
      CustomError({
        name: 'TestError',
        email: 'foo@bar.com',
      })
    );
  });
  describe('errorName', () => {
    it('should set errorName', () => {
      expect(TestError.errorName).toBe('TestError');
    });
  });
  describe('.hasInstance()', () => {
    it.each([undefined, null, Number.NaN, 0, ''])('should return false for %s', (value) => {
      expect(TestError.hasInstance(value)).toBe(false);
    });
    it('should return true for instance', () => {
      expect(TestError.hasInstance(TestError(''))).toBe(true);
    });
  });
});
describe('defineCustomError()', () => {
  interface TestOptionalError extends CustomError<{ name: 'TestOptionalError'; email?: string }> {}
  const TestOptionalError = defineCustomError<TestOptionalError>('TestOptionalError');

  interface TestError extends CustomError<{ name: 'TestError'; email: string }> {}
  const TestError = defineCustomError<TestError>('TestError');

  it('should create a new constructor', () => {
    expect(TestOptionalError()).toEqual(
      CustomError({
        name: 'TestOptionalError',
      })
    );
    expect(TestOptionalError({})).toEqual(
      CustomError({
        name: 'TestOptionalError',
      })
    );
    // @ts-expect-error Parameters are required
    expect(TestError()).toEqual(
      CustomError({
        name: 'TestError',
      })
    );
    expect(TestError({ email: 'foo@bar.com' })).toEqual(
      CustomError({
        name: 'TestError',
        email: 'foo@bar.com',
      })
    );
  });
  describe('name', () => {
    it('should set name', () => {
      expect(TestError.name).toBe('TestError');
    });
  });
  describe('errorName', () => {
    it('should set errorName', () => {
      expect(TestError.errorName).toBe('TestError');
    });
  });
  describe('.hasInstance()', () => {
    it.each([undefined, null, Number.NaN, 0, ''])('should return false for %s', (value) => {
      expect(TestError.hasInstance(value)).toBe(false);
    });
    it('should return true for instance', () => {
      expect(TestError.hasInstance(TestError({ email: '' }))).toBe(true);
    });
  });
});
