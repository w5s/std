import { describe, it, expect } from 'vitest';
import { FileSize } from './FileSize.js';

describe('FileSize', () => {
  it('should return an integer value', () => {
    expect(FileSize(1)).toEqual(1);
    expect(() => FileSize(1.2)).toThrow();
  });
});
