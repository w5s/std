import { Result } from '@w5s/core';
import { Task, type TaskCanceler } from '@w5s/task';
import { describe, it, expect, vi } from 'vitest';
import { beforeEach } from 'node:test';
import { HTTPError } from './HTTPError.js';
import { requestSend } from './requestSend.js';
import { Client } from './Client.js';

describe(requestSend, () => {
  const anyURL = 'https://localhost';
  const anyResponse: Response = {} as any;
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
  const globalFetchMock = vi.fn<typeof globalThis.fetch>(async () => anyResponse);
  const anyClient = Client({
    fetch: globalFetchMock,
  });

  beforeEach(() => {
    globalFetchMock.mockClear();
  });

  it('should call global fetch and send to parser', async () => {
    const url = 'http://localhost#test';
    const task = requestSend(anyClient, {
      url,
      method: 'GET',
    });
    const result = await Task.unsafeRun(task);
    expect(globalFetchMock).toHaveBeenLastCalledWith(url, expect.objectContaining({ method: 'GET' }));
    expect(result).toEqual(Result.Ok(anyResponse));
  });
  it('should handle malformed URL', async () => {
    const task = requestSend(anyClient, {
      url: 'http://www.exam ple.com', // invalid url
    });
    await expect(Task.unsafeRun(task)).resolves.toEqual(
      Result.Error(HTTPError.InvalidURL({ message: 'Invalid URL', input: 'http://www.exam ple.com' }))
    );
  });
  it('should convert fetch error to NetworkError', async () => {
    const fetchError = new Error('FetchError');
    globalFetchMock.mockRejectedValueOnce(fetchError);

    const task = requestSend(anyClient, {
      url: anyURL,
    });
    await expect(Task.unsafeRun(task)).resolves.toEqual(Result.Error(HTTPError.NetworkError({ cause: fetchError })));
  });
  it('should be cancelable', async () => {
    const finished = defer();
    const respondAfter = (ms: number) =>
      new Promise<typeof anyResponse>((resolve) => {
        setTimeout(() => {
          resolve(anyResponse);
        }, ms);
      });

    globalFetchMock.mockImplementationOnce(async (_, { signal } = {}) => {
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
    const task = requestSend(anyClient, {
      url: anyURL,
    });
    const resolve = vi.fn();
    const reject = vi.fn();
    const run = vi.fn();
    const canceler: TaskCanceler = { current: undefined };
    task.taskRun({ resolve, reject, canceler, run });
    if (canceler.current != null) {
      canceler.current();
    }

    await finished.promise;
    expect(resolve).not.toHaveBeenCalled();
    expect(reject).not.toHaveBeenCalled();
  });
});
