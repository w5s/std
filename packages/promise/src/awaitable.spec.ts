import { describe, expect, it } from 'vitest';
import { Awaitable } from './awaitable.js';

describe('Awaitable', () => {
  describe('map()', () => {
    it('returns a Promise when a Promise', async () => {
      await expect(Awaitable.map(Promise.resolve(1), (_) => _ + 1)).resolves.toEqual(2);
    });
    it('returns a value when not a Promise', async () => {
      expect(Awaitable.map(1, (_) => _ + 1)).toEqual(2);
    });
  });
});
