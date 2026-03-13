import { describe, expect, it } from 'vitest';
import { configuration } from './configuration.js';

describe('configuration', () => {
  it('should be an app', () => {
    expect(configuration.current).toEqual(({ randomNumberGenerator: expect.any(Function) }));
  });
});
