import { AbortError } from '@w5s/error/dist/AbortError.js';
import { isDOMException } from '@w5s/error/dist/isDOMException.js';

import type { TimerOptions } from '../TimerOptions.js';

const toAbortError = (reason: any): AbortError => {
  if (reason == null) {
    return new AbortError();
  }

  if (isDOMException(reason) && reason.name === 'AbortError') {
    return new AbortError();
  }

  return reason;
};

export function promiseFromTimer<Timer>(
  request: (
    /**
     * Resolver
     */
    resolve: (value: PromiseLike<void> | void) => void,

    /**
     * Rejecter
     */
    reject: (reason?: any) => void,
  ) => Timer,
  clear: (id: Timer) => void,
  options: TimerOptions = {},
): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const { signal } = options;
    let timerId: Timer;
    const abort = () => {
      reject(toAbortError(signal?.reason));
    };
    const onAbort = () => {
      clear(timerId);
      abort();
    };
    if (signal?.aborted === true) {
      abort();
    } else {
      timerId = request(
        (value) => {
          signal?.removeEventListener('abort', onAbort);
          resolve(value);
        },
        (error) => {
          signal?.removeEventListener('abort', onAbort);
          reject(error);
        },
      );

      signal?.addEventListener('abort', onAbort);
    }
  });
}
