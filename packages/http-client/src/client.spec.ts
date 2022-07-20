import { Ref, Result, Task } from '@w5s/core';
import { describe, test, expect, jest } from '@jest/globals';
import { HTTPClient } from './client.js';

describe(HTTPClient.request, () => {
  const anyURL = 'https://localhost';
  const anyError = new Error('AnyError');
  const anyParser = jest.fn(() => Task.resolve('MockParsed'));
  const anyResponse: Response = {} as any;
  const anyFetch = async () => anyResponse;
  const defer = <V>(): {
    resolve(value: V | PromiseLike<V>): void;
    reject(error: unknown): void;
    promise: Promise<V>;
  } => {
    const state: any = { resolve: (_: V) => undefined, reject: (_: unknown) => undefined };
    const promise = new Promise<V>((resolve, reject) => {
      state.resolve = resolve;
      state.reject = reject;
    });
    return {
      resolve: (_) => state.resolve(_),
      reject: (_) => state.reject(_),
      promise,
    };
  };

  test('should call global fetch and send to parser', async () => {
    const globalFetch = jest.fn(async () => anyResponse);
    const parse = jest.fn(() => Task.resolve('TestReturn'));
    const url = 'http://localhost#test';
    const task = HTTPClient.request({
      url,
      method: 'GET',
      parse,
      globalFetch,
    });
    const result = await Task.unsafeRun(task);
    expect(globalFetch).toHaveBeenLastCalledWith(url, expect.objectContaining({ method: 'GET' }));
    expect(parse).toHaveBeenLastCalledWith(anyResponse);
    expect(result).toEqual(Result.Ok('TestReturn'));
  });
  test('should handle malformed URL', async () => {
    const task = HTTPClient.request({
      url: 'http://www.exam ple.com', // invalid url
      parse: anyParser,
      globalFetch: anyFetch,
    });
    const result = await Task.unsafeRun(task);
    expect(result).toEqual(Result.Error(HTTPClient.InvalidURLError({ message: 'Invalid URL' })));
  });
  test('should convert fetch error to NetworkError', async () => {
    const globalFetch = jest.fn(async () => {
      throw anyError;
    });
    const task = HTTPClient.request({
      url: anyURL,
      parse: anyParser,
      globalFetch,
    });
    const result = await Task.unsafeRun(task);
    expect(result).toEqual(Result.Error(HTTPClient.NetworkError({ cause: anyError })));
  });
  test('should convert reject parse errors', async () => {
    const failParser = jest.fn(() => Task.reject(anyError));

    const task = HTTPClient.request({
      url: anyURL,
      parse: failParser,
      globalFetch: anyFetch,
    });
    const result = await Task.unsafeRun(task);
    expect(result).toEqual(Result.Error(anyError));
  });
  test('should be cancelable', async () => {
    const finished = defer();
    const respondAfter = (ms: number) =>
      new Promise<typeof anyResponse>((resolve) => {
        setTimeout(() => {
          resolve(anyResponse);
        }, ms);
      });

    const globalFetch = jest.fn(async (_, { signal }) => {
      if (signal != null) {
        signal.addEventListener('abort', () => {
          finished.resolve(undefined);
        });
      }
      try {
        await respondAfter(5);
        return anyResponse;
      } finally {
        queueMicrotask(() => {
          finished.resolve(undefined);
        });
      }
    });
    const parse = jest.fn(() => Task.reject(new Error('NeverParsedError')));

    const task = HTTPClient.request({
      url: anyURL,
      parse,
      globalFetch,
    });
    const resolve = jest.fn();
    const reject = jest.fn();
    const cancelerRef = Ref(Task.defaultCanceler);
    task.taskRun(resolve, reject, cancelerRef);
    cancelerRef.current();

    await finished.promise;
    expect(resolve).not.toHaveBeenCalled();
    expect(reject).not.toHaveBeenCalled();
  });
});
describe(HTTPClient.Headers, () => {
  test('should return immutable copy of headers', () => {
    const init = {
      foo: 'bar',
    };
    expect(HTTPClient.Headers(init)).toEqual({
      foo: 'bar',
    });
    expect(HTTPClient.Headers(init)).not.toBe(init);
  });
  test('should work with iterable of tuple', () => {
    const init = [['foo', 'bar'] as const];
    expect(HTTPClient.Headers(init)).toEqual({
      foo: 'bar',
    });
    expect(HTTPClient.Headers(init)).not.toBe(init);
  });
});
