import { describe, expect, it } from 'vitest';

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
      expect(CustomError({ name: anyString })).toBeInstanceOf(Error);
      expect(CustomError({ name: anyString })).toBeInstanceOf(CustomError);
    });
    it('should return Error with default properties', () => {
      expect(CustomError({ name: anyString })).toEqual(
        expect.objectContaining({
          cause: undefined,
          message: '',
        }),
      );
    });
    it('should merge custom properties', () => {
      expect(CustomError({ foo: true, message: 'custom message', name: 'MockError' })).toEqual(
        expect.objectContaining({
          foo: true,
          message: 'custom message',
          name: 'MockError',
        }),
      );
    });
    it('should keep original message', () => {
      const cause = new Error('CauseMessage');
      expect(CustomError({ cause, message: 'OriginalMessage', name: anyString })).toEqual(
        expect.objectContaining({
          cause,
          message: 'OriginalMessage',
        }),
      );
    });
  });
  describe('new ()', () => {
    it('returns instance of Error', () => {
      expect(new CustomError({ name: anyString })).toBeInstanceOf(Error);
      expect(new CustomError({ name: anyString })).toBeInstanceOf(CustomError);
      expect(new CustomError({ foo: true, name: anyString })).toEqual(expect.objectContaining({ foo: true }));
    });
  });

  describe('#toString()', () => {
    it.each([
      [CustomError({ name: 'CustomError' }), 'CustomError'],
      [CustomError({ message: 'CustomMessage', name: 'CustomError' }), 'CustomError: CustomMessage'],
      [
        CustomError({ cause: new Error('CauseMessage'), message: 'CustomMessage', name: 'CustomError' }),
        [
          // lines
          'CustomError: CustomMessage',
          '  └ Error: CauseMessage',
        ].join('\n'),
      ],
      [
        CustomError({
          cause: CustomError({
            cause: CustomError({
              message: 'Level 3',
              name: 'CustomError3',
            }),
            message: 'Level 2',
            name: 'CustomError2',
          }),
          message: 'Level 1',
          name: 'CustomError1',
        }),
        [
          // lines
          'CustomError1: Level 1',
          '  └ CustomError2: Level 2',
          '  └ CustomError3: Level 3',
        ].join('\n'),
      ],
    ])('should return correctly formatted string representation', (error, expected) => {
      expect(String(error)).toEqual(expected);
    });
  });
  describe('#stack', () => {
    it('should capture stack', () => {
      if (Error.captureStackTrace == null) {
        return;
      }

      const error = CustomError({
        cause: new Error('CauseMessage'),
        message: 'CustomMessage',
        name: 'CustomError',
      });
      const lines = error.stack.split('\n');

      expect(lines[0]).toEqual('CustomError: CustomMessage');

      expect(lines[1]).not.toEqual(expect.stringMatching(/\.CustomError/));
    });
  });
  describe('#cause', () => {
    it('forwards cause property', () => {
      const cause = new Error('CauseMessage');
      const error = CustomError({
        cause: new Error('CauseMessage'),
        message: 'CustomMessage',
        name: 'CustomError',
      });

      expect(error.cause).toStrictEqual(cause);
    });
  });
  describe('#message', () => {
    it('forwards cause property', () => {
      const error = CustomError({
        message: 'CustomMessage',
        name: 'CustomError',
      });

      expect(error.message).toStrictEqual('CustomMessage');
    });
  });
});
