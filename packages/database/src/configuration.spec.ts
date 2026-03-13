import { describe, expect, it } from 'vitest';
import { configuration } from './configuration.js';

describe('configuration', () => {
  it('should be a configuration', () => {
    expect(configuration.current).toEqual({});
  });
});
