import { Result, runTask, Task } from '@w5s/core';
import { HTTPClient } from './client';

describe(HTTPClient.request, () => {
  const anyURL = 'https://localhost';
  const anyError = new Error('AnyError');
  const anyParser = jest.fn(() => Task.Async.resolve('MockParsed'));
  const anyResponse: Response = {} as any;

  test('should call global fetch and send to parser', async () => {
    const globalFetch = jest.fn(async () => anyResponse);
    const parse = jest.fn(() => Task.Async.resolve('TestReturn'));
    const url = 'http://localhost#test';
    const task = HTTPClient.request({
      url,
      method: 'GET',
      parse,
      globalFetch,
    });
    const result = await runTask(task);
    expect(globalFetch).toHaveBeenLastCalledWith(url, { method: 'GET' });
    expect(parse).toHaveBeenLastCalledWith(anyResponse);
    expect(result).toEqual(Result.Ok('TestReturn'));
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
    const result = await runTask(task);
    expect(result).toEqual(Result.Error(HTTPClient.NetworkError({ cause: anyError })));
  });
  test('should convert reject parse errors', async () => {
    const globalFetch = jest.fn(async () => anyResponse);
    const failParser = jest.fn(() => Task.Async.reject(anyError));

    const task = HTTPClient.request({
      url: anyURL,
      parse: failParser,
      globalFetch,
    });
    const result = await runTask(task);
    expect(result).toEqual(Result.Error(anyError));
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
