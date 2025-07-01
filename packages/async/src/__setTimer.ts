/* eslint-disable @typescript-eslint/no-unsafe-return */
import { AbortError } from '@w5s/error/dist/AbortError.js';
import type { TimerOptions } from './TimerOptions.js';

const __toAbortError = (reason: any): AbortError =>
  reason == null
    ? new AbortError()
    : Object.prototype.toString.call(reason) === '[object DOMException]' &&
        (reason as DOMException).name === 'AbortError'
      ? new AbortError()
      : reason;

export function __setTimer<Timer>(
  request: (
    /**
     * Resolver
     */
    resolve: (value: void | PromiseLike<void>) => void,
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
    const __reject = () => {
      // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
      reject(__toAbortError(signal?.reason));
    };
    if (signal?.aborted === true) {
      __reject();
    } else {
      const timerId = request(resolve, reject);

      signal?.addEventListener('abort', () => {
        clear(timerId);
        __reject();
      });
    }
  });
}
