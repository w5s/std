import { Result, Task, TaskCanceler } from '@w5s/core';
import { describe, it, expect, jest } from '@jest/globals';
import { HTTP } from './client.js';
import { HTTPError } from './error.js';

describe('HTTP.request', () => {
  const anyURL = 'https://localhost';
  const anyHttpError = HTTPError.ParserError('AnyError');
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

  it('should call global fetch and send to parser', async () => {
    const globalFetch = jest.fn(async () => anyResponse);
    const parse = jest.fn(() => Task.resolve('TestReturn'));
    const url = 'http://localhost#test';
    const task = HTTP.request({
      url,
      method: 'GET',
      parse,
      fetch: globalFetch,
    });
    const result = await Task.unsafeRun(task);
    expect(globalFetch).toHaveBeenLastCalledWith(url, expect.objectContaining({ method: 'GET' }));
    expect(parse).toHaveBeenLastCalledWith(anyResponse);
    expect(result).toEqual(Result.Ok('TestReturn'));
  });
  it('should handle malformed URL', async () => {
    const task = HTTP.request({
      url: 'http://www.exam ple.com', // invalid url
      parse: anyParser,
      fetch: anyFetch,
    });
    const result = await Task.unsafeRun(task);
    expect(result).toEqual(
      Result.Error(HTTPError.InvalidURL({ message: 'Invalid URL', input: 'http://www.exam ple.com' }))
    );
  });
  it('should convert fetch error to NetworkError', async () => {
    const fetchError = new Error('FetchError');
    const globalFetch = jest.fn(async () => {
      throw fetchError;
    });
    const task = HTTP.request({
      url: anyURL,
      parse: anyParser,
      fetch: globalFetch,
    });
    const result = await Task.unsafeRun(task);
    expect(result).toEqual(Result.Error(HTTPError.NetworkError({ cause: fetchError })));
  });
  it('should convert reject parse errors', async () => {
    const failParser = jest.fn(() => Task.reject(anyHttpError));

    const task = HTTP.request({
      url: anyURL,
      parse: failParser,
      fetch: anyFetch,
    });
    const result = await Task.unsafeRun(task);
    expect(result).toEqual(Result.Error(anyHttpError));
  });
  it('should be cancelable', async () => {
    const finished = defer();
    const respondAfter = (ms: number) =>
      new Promise<typeof anyResponse>((resolve) => {
        setTimeout(() => {
          resolve(anyResponse);
        }, ms);
      });

    const globalFetch = jest.fn<typeof fetch>(async (_, { signal } = {}) => {
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
    const parse = jest.fn(() => Task.reject(HTTPError.ParserError({ message: 'NeverParsedError' })));

    const task = HTTP.request({
      url: anyURL,
      parse,
      fetch: globalFetch,
    });
    const resolve = jest.fn();
    const reject = jest.fn();
    const cancelerRef: TaskCanceler = { current: undefined };
    task.taskRun(resolve, reject, cancelerRef);
    TaskCanceler.cancel(cancelerRef);

    await finished.promise;
    expect(resolve).not.toHaveBeenCalled();
    expect(reject).not.toHaveBeenCalled();
  });
});
describe('HTTP.Headers', () => {
  it('should return immutable copy of headers', () => {
    const init = {
      foo: 'bar',
    };
    expect(HTTP.Headers(init)).toEqual({
      foo: 'bar',
    });
    expect(HTTP.Headers(init)).not.toBe(init);
  });
  it('should work with iterable of tuple', () => {
    const init = [['foo', 'bar'] as const];
    expect(HTTP.Headers(init)).toEqual({
      foo: 'bar',
    });
    expect(HTTP.Headers(init)).not.toBe(init);
  });
});
