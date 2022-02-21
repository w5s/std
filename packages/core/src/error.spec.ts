import { DataObject } from './data.js';
import { DataError } from './error.js';

describe(DataError, () => {
  const anyString = 'AnyString';
  describe('()', () => {
    test('should return instance of Error', () => {
      expect(DataError({ name: anyString })).toBeInstanceOf(globalThis.Error);
    });
    test('should return DataObject.type == "DataError"', () => {
      expect(DataError({ name: anyString })[DataObject.type]).toEqual('DataError');
    });
    test('should return Error with default properties', () => {
      expect(DataError({ name: anyString })).toEqual(
        expect.objectContaining({
          message: '',
          cause: undefined,
        })
      );
    });
    test('should merge custom properties', () => {
      expect(DataError({ name: 'MockError', message: 'custom message', foo: true })).toEqual(
        expect.objectContaining({
          name: 'MockError',
          message: 'custom message',
          foo: true,
        })
      );
    });
    test('should use cause error', () => {
      const cause = new Error('CauseMessage');
      expect(DataError({ name: anyString, message: 'OriginalMessage', cause })).toEqual(
        expect.objectContaining({
          message: 'OriginalMessage: CauseMessage',
          cause,
        })
      );
    });
  });
  describe('#toString()', () => {
    test.each([
      [DataError({ name: 'CustomError' }), 'CustomError'],
      [DataError({ name: 'CustomError', message: 'CustomMessage' }), 'CustomError: CustomMessage'],
      [
        DataError({ name: 'CustomError', message: 'CustomMessage', cause: new Error('CauseMessage') }),
        'CustomError: CustomMessage: CauseMessage',
      ],
    ])('should return correctly formatted string representation', (error, expected) => {
      expect(String(error)).toEqual(expected);
    });
  });
  describe('#stack', () => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    (Error.captureStackTrace != null ? test : test.skip)('should capture stack', () => {
      const error = DataError({
        name: 'CustomError',
        message: 'CustomMessage',
        cause: new Error('CauseMessage'),
      });
      const lines = (error.stack ?? '').split('\n');
      // eslint-disable-next-line jest/no-standalone-expect
      expect(lines[0]).toEqual('CustomError: CustomMessage: CauseMessage');
      // eslint-disable-next-line jest/no-standalone-expect
      expect(lines[1]).not.toEqual(expect.stringMatching(/\.DataError/));
    });
  });
  describe(DataError.MakeGeneric, () => {
    const TestError = DataError.MakeGeneric('TestError', (create) => (email: string) => create({ email }));
    test('should create a new constructor', () => {
      expect(TestError('foo@bar.com')).toEqual(
        DataError({
          name: 'TestError',
          email: 'foo@bar.com',
        })
      );
    });
    describe('errorName', () => {
      test('should set errorName', () => {
        expect(TestError.errorName).toBe('TestError');
      });
    });
    describe(TestError.hasInstance, () => {
      test.each([undefined, null, Number.NaN, 0, ''])('should return false for %s', (value) => {
        expect(TestError.hasInstance(value)).toBe(false);
      });
      test('should return true for instance', () => {
        expect(TestError.hasInstance(TestError(''))).toBe(true);
      });
    });
  });
  describe(DataError.Make, () => {
    type TestError = DataError<{ name: 'TestError'; email: string }>;
    const TestError = DataError.Make<TestError>('TestError');
    test('should create a new constructor', () => {
      expect(TestError({ email: 'foo@bar.com' })).toEqual(
        DataError({
          name: 'TestError',
          email: 'foo@bar.com',
        })
      );
    });
    describe('errorName', () => {
      test('should set errorName', () => {
        expect(TestError.errorName).toBe('TestError');
      });
    });
    describe(TestError.hasInstance, () => {
      test.each([undefined, null, Number.NaN, 0, ''])('should return false for %s', (value) => {
        expect(TestError.hasInstance(value)).toBe(false);
      });
      test('should return true for instance', () => {
        expect(TestError.hasInstance(TestError({ email: '' }))).toBe(true);
      });
    });
  });
});
