import { describe, it, expect } from 'vitest';
import { CustomError } from './CustomError.js';
import { asString } from './CustomError/asString.js';

describe('CustomError', () => {
  const anyString = 'AnyString';
  it('is an alias to functions', () => {
    expect({ ...CustomError }).toEqual(
      expect.objectContaining({
        asString,
      }),
    );
  });
  describe('()', () => {
    it('should return instance of Error', () => {
      expect(CustomError({ name: anyString })).toBeInstanceOf(globalThis.Error);
      expect(CustomError({ name: anyString })).toBeInstanceOf(CustomError);
    });
    it('should return Error with default properties', () => {
      expect(CustomError({ name: anyString })).toEqual(
        expect.objectContaining({
          message: '',
          cause: undefined,
        }),
      );
    });
    it('should merge custom properties', () => {
      expect(CustomError({ name: 'MockError', message: 'custom message', foo: true })).toEqual(
        expect.objectContaining({
          name: 'MockError',
          message: 'custom message',
          foo: true,
        }),
      );
    });
    it('should keep original message', () => {
      const cause = new Error('CauseMessage');
      expect(CustomError({ name: anyString, message: 'OriginalMessage', cause })).toEqual(
        expect.objectContaining({
          message: 'OriginalMessage',
          cause,
        }),
      );
    });
  });
  describe('new ()', () => {
    it('returns instance of Error', () => {
      expect(new CustomError({ name: anyString })).toBeInstanceOf(globalThis.Error);
      expect(new CustomError({ name: anyString })).toBeInstanceOf(CustomError);
      expect(new CustomError({ name: anyString, foo: true })).toEqual(expect.objectContaining({ foo: true }));
    });
  });

  describe('#toString()', () => {
    it.each([
      [CustomError({ name: 'CustomError' }), 'CustomError'],
      [CustomError({ name: 'CustomError', message: 'CustomMessage' }), 'CustomError: CustomMessage'],
      [
        CustomError({ name: 'CustomError', message: 'CustomMessage', cause: new Error('CauseMessage') }),
        [
          // lines
          'CustomError: CustomMessage',
          '  └ Error: CauseMessage',
        ].join('\n'),
      ],
      [
        CustomError({
          name: 'CustomError1',
          message: 'Level 1',
          cause: CustomError({
            name: 'CustomError2',
            message: 'Level 2',
            cause: CustomError({
              name: 'CustomError3',
              message: 'Level 3',
            }),
          }),
        }),
        [
          // lines
          'CustomError1: Level 1',
          '  └ CustomError2: Level 2',
          '  └ CustomError3: Level 3',
        ].join('\n'),
      ],
    ])('should return correctly formatted string representation', (error, expected) => {
      // eslint-disable-next-line @typescript-eslint/no-base-to-string
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
      const lines = error.stack.split('\n');

      expect(lines[0]).toEqual('CustomError: CustomMessage');

      expect(lines[1]).not.toEqual(expect.stringMatching(/\.DataError/));
    });
  });
  describe('#cause', () => {
    it('forwards cause property', () => {
      const cause = new Error('CauseMessage');
      const error = CustomError({
        name: 'CustomError',
        message: 'CustomMessage',
        cause: new Error('CauseMessage'),
      });

      expect(error.cause).toStrictEqual(cause);
    });
  });
  describe('#message', () => {
    it('forwards cause property', () => {
      const error = CustomError({
        name: 'CustomError',
        message: 'CustomMessage',
      });

      expect(error.message).toStrictEqual('CustomMessage');
    });
  });
});
