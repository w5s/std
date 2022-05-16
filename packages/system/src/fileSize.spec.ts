import { FileSize } from './fileSize';

describe(FileSize, () => {
  const anyNumber = 123;
  test('should return an integer value', () => {
    expect(FileSize(1)).toEqual(1);
  });
  describe(FileSize.bytes, () => {
    test('should return identity', () => {
      expect(FileSize.bytes(anyNumber)).toEqual(anyNumber);
    });
  });
  describe(FileSize.kilobytes, () => {
    test('should return a multiple of 10**3', () => {
      expect(FileSize.kilobytes(anyNumber)).toEqual(anyNumber * 10 ** 3);
    });
  });
  describe(FileSize.megabytes, () => {
    test('should return a multiple of 10**6', () => {
      expect(FileSize.megabytes(anyNumber)).toEqual(anyNumber * 10 ** 6);
    });
  });
  describe(FileSize.gigabytes, () => {
    test('should return a multiple of 10**9', () => {
      expect(FileSize.gigabytes(anyNumber)).toEqual(anyNumber * 10 ** 9);
    });
  });
  describe(FileSize.terabytes, () => {
    test('should return a multiple of 10**12', () => {
      expect(FileSize.terabytes(anyNumber)).toEqual(anyNumber * 10 ** 12);
    });
  });
});
