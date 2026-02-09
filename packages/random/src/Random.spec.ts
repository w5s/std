import { describe, it, expect } from 'vitest';
import { RandomApplication } from './Random/RandomApplication.js';
import { Random } from './Random.js';
import { next } from './Random/next.js';

describe('Random', () => {
  it('is an alias to functions', () => {
    expect(Random).toEqual(expect.objectContaining(RandomApplication));
    expect(Random).toEqual(
      expect.objectContaining({
        next,
      }),
    );
  });
});
