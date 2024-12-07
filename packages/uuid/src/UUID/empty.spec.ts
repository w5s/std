import { describe, it, expect } from 'vitest';
import { empty } from './empty.js';

describe(empty, () => {
  it('should return a 0 based UUID', () => {
    expect(empty()).toBe('00000000-0000-0000-0000-000000000000');
  });
});
