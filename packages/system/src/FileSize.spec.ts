import { describe, it, expect } from 'vitest';
import { FileSize } from './FileSize.js';

describe('FileSize', () => {
  const anyNumber = 123;
  it('should return an integer value', () => {
    expect(FileSize(1)).toEqual(1);
    expect(FileSize(1.2)).toEqual(1);
  });
  describe('.bytes', () => {
    it('should return identity', () => {
      expect(FileSize.bytes(anyNumber)).toEqual(anyNumber);
    });
  });
  describe('.kilobytes', () => {
    it('should return a multiple of 10**3', () => {
      expect(FileSize.kilobytes(anyNumber)).toEqual(anyNumber * 10 ** 3);
    });
  });
  describe('.megabytes', () => {
    it('should return a multiple of 10**6', () => {
      expect(FileSize.megabytes(anyNumber)).toEqual(anyNumber * 10 ** 6);
    });
  });
  describe('.gigabytes', () => {
    it('should return a multiple of 10**9', () => {
      expect(FileSize.gigabytes(anyNumber)).toEqual(anyNumber * 10 ** 9);
    });
  });
  describe('.terabytes', () => {
    it('should return a multiple of 10**12', () => {
      expect(FileSize.terabytes(anyNumber)).toEqual(anyNumber * 10 ** 12);
    });
  });
});
