/* eslint-disable unicorn/custom-error-definition */
import { describe, expect, it } from 'vitest';
import { CustomError } from './customError.js';

describe('CustomError', () => {
  class TestError extends CustomError<TestError> {
    override name = 'TestError' as const;
  }

  describe('#constructor()', () => {
    it('have properties passed to constructor', () => {
      const error = new CustomError<{ message: string; foo: boolean }>({
        message: 'my message',
        foo: true,
      });
      expect(error).toMatchObject(
        expect.objectContaining({
          name: 'CustomError',
          message: 'my message',
          foo: true,
        })
      );
    });
  });

  describe('#message', () => {
    it('have default value', () => {
      expect(new TestError({})).toMatchObject(
        expect.objectContaining({
          message: '',
        })
      );
    });
  });
  describe('#cause', () => {
    it('forwards to object property', () => {
      const cause = new Error('because');
      expect(new CustomError({ cause })).toMatchObject(
        expect.objectContaining({
          cause,
        })
      );
    });
  });
  describe('#toString()', () => {
    it('has same string representation as native error', () => {
      expect(
        String(
          new TestError({
            message: 'my message',
          })
        )
      ).toEqual('TestError: my message');
    });
  });
});
