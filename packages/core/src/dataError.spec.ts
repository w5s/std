import { describe, it, expect } from '@jest/globals';
import { DataError } from './dataError.js';

describe('DataError', () => {
  const anyString = 'AnyString';
  describe('()', () => {
    it('should return instance of Error', () => {
      expect(DataError({ name: anyString })).toBeInstanceOf(globalThis.Error);
    });
    it('should return DataObject.type == "DataError"', () => {
      expect(DataError({ name: anyString })._).toEqual('DataError');
    });
    it('should return Error with default properties', () => {
      expect(DataError({ name: anyString })).toEqual(
        expect.objectContaining({
          message: '',
          cause: undefined,
        })
      );
    });
    it('should merge custom properties', () => {
      expect(DataError({ name: 'MockError', message: 'custom message', foo: true })).toEqual(
        expect.objectContaining({
          name: 'MockError',
          message: 'custom message',
          foo: true,
        })
      );
    });
    it('should keep original message', () => {
      const cause = new Error('CauseMessage');
      expect(DataError({ name: anyString, message: 'OriginalMessage', cause })).toEqual(
        expect.objectContaining({
          message: 'OriginalMessage',
          cause,
        })
      );
    });
  });
  describe('#toString()', () => {
    it.each([
      [DataError({ name: 'CustomError' }), 'CustomError'],
      [DataError({ name: 'CustomError', message: 'CustomMessage' }), 'CustomError: CustomMessage'],
      [
        DataError({ name: 'CustomError', message: 'CustomMessage', cause: new Error('CauseMessage') }),
        'CustomError: CustomMessage',
      ],
    ])('should return correctly formatted string representation', (error, expected) => {
      expect(String(error)).toEqual(expected);
    });
  });
  describe('#stack', () => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    (Error.captureStackTrace == null ? it.skip : it)('should capture stack', () => {
      const error = DataError({
        name: 'CustomError',
        message: 'CustomMessage',
        cause: new Error('CauseMessage'),
      });
      const lines = (error.stack ?? '').split('\n');
      // eslint-disable-next-line jest/no-standalone-expect
      expect(lines[0]).toEqual('CustomError: CustomMessage');
      // eslint-disable-next-line jest/no-standalone-expect
      expect(lines[1]).not.toEqual(expect.stringMatching(/\.DataError/));
    });
  });
  describe('.MakeGeneric()', () => {
    const TestError = DataError.MakeGeneric('TestError', (create) => (email: string) => create({ email }));
    it('should create a new constructor', () => {
      expect(TestError('foo@bar.com')).toEqual(
        DataError({
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
  describe('.Make()', () => {
    type TestError = DataError<{ name: 'TestError'; email: string }>;
    const TestError = DataError.Make<TestError>('TestError');
    it('should create a new constructor', () => {
      expect(TestError({ email: 'foo@bar.com' })).toEqual(
        DataError({
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
});
