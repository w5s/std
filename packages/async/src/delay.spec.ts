import { describe, expect, it } from 'vitest';
import { delay } from './delay.js';

describe('delay', () => {
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
});
