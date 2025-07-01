import { describe, expect, it } from 'vitest';
import { AbortError } from '@w5s/error';
import { delay } from './delay.js';

describe(delay, () => {
  const anyReason = 'TestAborted';

  it('resolves undefined', async () => {
    await expect(delay(5)).resolves.toBe(undefined);
  });
  it('waits for milliseconds passed as parameter', async () => {
    const now = Date.now();
    const milliseconds = 5;
    const promise = delay(milliseconds);

    await promise;
    expect(Date.now() + milliseconds).toBeGreaterThan(now);
  });
  it('rejects with an already aborted signal', async () => {
    const controller = new AbortController();
    controller.abort(anyReason); // Abort before
    const promise = delay(5, { signal: controller.signal });

    await expect(promise).rejects.toBe(anyReason);
  });
  it('rejects with a default reason', async () => {
    const controller = new AbortController();
    const promise = delay(5, { signal: controller.signal });
    controller.abort();

    await expect(promise).rejects.toEqual(new AbortError());
  });
  it('rejects with signal reason', async () => {
    const controller = new AbortController();
    const promise = delay(5, { signal: controller.signal });
    controller.abort(anyReason);

    await expect(promise).rejects.toBe(anyReason);
  });
});
