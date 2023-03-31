import { describe, it, expect } from 'vitest';
import { lazy } from './lazy.js';

describe('lazy', () => {
  it('should be always called once', () => {
    let index = 0;
    const value = lazy(() => {
      index += 1;
      return index;
    });
    expect(value()).toBe(1);
    expect(value()).toBe(1);
    expect(value()).toBe(1);
  });
});
