import { describe, test, expect, jest } from '@jest/globals';
import { assertType } from './assert.js';
import { Result } from './result.js';

describe('Result', () => {
  const anyValue = 'anyValue' as const;
  const anyError = 'anyError' as const;
  const anyResult = Result.Error(anyError) as Result<typeof anyValue, typeof anyError>;

  describe(Result.Ok, () => {
    test('should return a new object', () => {
      expect(Result.Ok(anyValue)).toEqual({ _: 'Ok', value: anyValue });
    });
  });
  describe(Result.Error, () => {
    test('should return a new object', () => {
      expect(Result.Error(anyValue)).toEqual({ _: 'Error', error: anyValue });
    });
  });

  describe(Result.hasInstance, () => {
    test('should return true for Ok() or Error() object', () => {
      expect(Result.hasInstance(Result.Ok(anyValue))).toEqual(true);
      expect(Result.hasInstance(Result.Error(anyValue))).toEqual(true);
    });
    test('should return false for any other value', () => {
      expect(Result.hasInstance(undefined)).toEqual(false);
      expect(Result.hasInstance({ _: 'anyType' })).toEqual(false);
    });
  });

  describe(Result.isOk, () => {
    test('should return true for Ok() object', () => {
      expect(Result.isOk(Result.Ok(anyValue))).toEqual(true);
    });
    test('should return false for Error() object', () => {
      expect(Result.isOk(Result.Error(anyValue))).toEqual(false);
    });
  });
  describe(Result.isOk, () => {
    test('should return true for Result.Ok() object', () => {
      expect(Result.isError(Result.Ok(anyValue))).toEqual(false);
    });
    test('should return false for Result.Error() object', () => {
      expect(Result.isError(Result.Error(anyError))).toEqual(true);
    });
  });
  describe(Result.map, () => {
    test('should return true for Result.Ok() object', () => {
      expect(Result.map(Result.Ok('anyValue'), (value) => `${value}_suffix`)).toEqual(Result.Ok('anyValue_suffix'));
    });
    test('should return false for Result.Error() object', () => {
      expect(Result.map(Result.Error('anyError'), (value) => `${value}_suffix`)).toEqual(Result.Error('anyError'));
    });
  });
  describe(Result.mapError, () => {
    test('should return true for Result.Ok() object', () => {
      expect(Result.mapError(Result.Ok('anyValue'), (error) => `${error}_suffix`)).toEqual(Result.Ok(anyValue));
    });
    test('should return false for Result.Error() object', () => {
      expect(Result.mapError(Result.Error('anyError'), (error) => `${error}_suffix`)).toEqual(
        Result.Error('anyError_suffix')
      );
    });
  });
  describe(Result.value, () => {
    test('should return undefined for Result.Error', () => {
      const value = Result.value(Result.Error(anyError));
      expect(value).toBe(undefined);
      assertType<typeof value, undefined>(true);
    });
    test('should return value for Result.Ok', () => {
      const value = Result.value(Result.Ok(anyValue));
      expect(value).toBe(anyValue);
      assertType<typeof value, typeof anyValue>(true);

      const optValue = Result.value(anyResult);
      assertType<typeof optValue, typeof anyValue | undefined>(true);
    });
  });
  describe(Result.error, () => {
    test('should return undefined for Result.Ok', () => {
      const error = Result.error(Result.Ok(anyValue));
      expect(error).toBe(undefined);
      assertType<typeof error, undefined>(true);
    });
    test('should return error for Result.Ok', () => {
      const error = Result.error(Result.Error(anyError));
      expect(error).toBe(anyError);
      assertType<typeof error, typeof anyError>(true);

      const optError = Result.error(anyResult);
      assertType<typeof optError, typeof anyError | undefined>(true);
    });
  });
  describe(Result.getOrElse, () => {
    test('should return defaultValue for Result.Error', () => {
      const returnValue = Result.getOrElse(Result.Error(anyError) as Result<typeof anyValue, typeof anyError>, () => 1);
      expect(returnValue).toEqual(1);
      assertType<typeof returnValue, typeof anyValue | number>(true);
    });
    test('should return value for Result.Ok', () => {
      expect(Result.getOrElse(Result.Ok(anyValue), () => 1)).toBe(anyValue);
    });
  });
  describe(Result.getOrThrow, () => {
    test('should return undefined for Result.Error', () => {
      expect(() => {
        Result.getOrThrow(Result.Error(anyError));
      }).toThrow(anyError);
    });
    test('should return value for Result.Ok', () => {
      const returnValue = Result.getOrThrow(Result.Ok(anyValue));
      expect(returnValue).toBe(anyValue);
      assertType<typeof returnValue, typeof anyValue>(true);
    });
  });
  describe(Result.andThen, () => {
    const square = (num: number): Result<number, 'TestError'> => Result.Ok(num * num);
    test('should return unchanged result when Result.Error', () => {
      expect(Result.andThen(Result.Error('TestError'), square)).toEqual(Result.Error('TestError'));
    });
    test('should map value when Result.Ok', () => {
      expect(Result.andThen(Result.Ok(4), square)).toEqual(Result.Ok(16));
    });
  });
  describe(Result.orElse, () => {
    const handleError = (message: string): Result<string, 'TestError'> => Result.Ok(`${message}_handled`);

    test('should return unchanged result when Result.Ok', () => {
      expect(Result.orElse(Result.Ok(1), handleError)).toEqual(Result.Ok(1));
    });
    test('should map value when Result.Error', () => {
      expect(Result.orElse(Result.Error('myMessage'), handleError)).toEqual(Result.Ok('myMessage_handled'));
    });
  });

  describe(Result.tryCall, () => {
    class TestError extends Error {
      constructor() {
        super();
        this.name = 'TestError';
      }

      override name = 'TestError';
    }
    describe('sync', () => {
      test('should return Result.Ok(block()) when nothing is thrown', () => {
        expect(
          Result.tryCall(
            () => 'return_value',
            () => new TestError()
          )
        ).toEqual(Result.Ok('return_value'));
      });
      test('should return Result.Error(onError(error)) when error is thrown', () => {
        const thrownError = new Error('custom');
        const onError = jest.fn((_error: unknown) => new TestError());
        expect(
          Result.tryCall(() => {
            throw thrownError;
          }, onError)
        ).toEqual(Result.Error(new TestError()));
        expect(onError).toHaveBeenCalledWith(thrownError);
      });
    });
    describe('async', () => {
      test('should return Result.Ok(block()) when nothing is thrown', async () => {
        await expect(
          Result.tryCall(
            async () => 'return_value',
            async () => new TestError()
          )
        ).resolves.toEqual(Result.Ok('return_value'));
      });
      test('should return Result.Error(onError(error)) when promise is rejected', async () => {
        const thrownError = new Error('custom');
        const onError = jest.fn(async (_error: unknown) => new TestError());
        await expect(Result.tryCall((): Promise<string> => Promise.reject(thrownError), onError)).resolves.toEqual(
          Result.Error(new TestError())
        );
        expect(onError).toHaveBeenCalledWith(thrownError);
      });
    });
  });
  describe(Result.match, () => {
    test('should call matchers.Ok when Ok', () => {
      expect(
        Result.match(Result.Ok('ok'), {
          Ok: (value) => `${value}_value`,
          Error: (error) => `${error}_error`,
        })
      ).toEqual('ok_value');
    });
    test('should call matchers.Error when Error', () => {
      expect(
        Result.match(Result.Error('error'), {
          Ok: (value) => `${value}_value`,
          Error: (error) => `${error}_error`,
        })
      ).toEqual('error_error');
    });
  });
});
