import { describe, expect, it } from 'vitest';
import { RandomApplication } from './RandomApplication.js';

describe('RandomApplication', () => {
  it('should be an app', () => {
    expect(RandomApplication).toEqual(expect.objectContaining({ id: '@w5s/random' }));
  });
});
