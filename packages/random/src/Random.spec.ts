import { describe, it, expect } from 'vitest';
import { RandomApplication } from './Random/RandomApplication.js';
import { Random } from './Random.js';

describe('Random', () => {
  it('is an alias to functions', () => {
    expect(Random).toEqual(expect.objectContaining(RandomApplication));
  });
});
