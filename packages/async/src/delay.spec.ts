import { describe, expect, it, vi } from 'vitest';
import { delay } from './delay.js';

describe('delay', () => {
  it('resolves undefined', async () => {
    await expect(delay(5)).resolves.toBe(undefined);
  });
  it('should not call setTimeout when 0 milliseconds', async () => {
    const setTimeoutSpy = vi.spyOn(globalThis, 'setTimeout');

    await delay(0);
    expect(setTimeoutSpy).not.toHaveBeenCalled();
  });
  it('waits for milliseconds passed as parameter', async () => {
    const now = Date.now();
    const milliseconds = 5;
    const promise = delay(milliseconds);

    await promise;
    expect(Date.now() + milliseconds).toBeGreaterThan(now);
  });
});
