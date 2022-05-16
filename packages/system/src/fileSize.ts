import { Int, Tag } from '@w5s/core';

export type FileSize = Tag<Int, { fileSize: true }>;
export function FileSize(value: number): FileSize {
  return Int(value) as FileSize;
}
export namespace FileSize {
  const KILOBYTES = 1000;
  const MEGABYTES = KILOBYTES * 1000;
  const GIGABYTES = MEGABYTES * 1000;
  const TERABYTES = GIGABYTES * 1000;

  /**
   * Returns a file size of `amount` bytes
   *
   * @example
   * ```ts
   * const size = FileSize.bytes(123);
   * ```
   * @param amount The amount of bytes
   */
  export function bytes(amount: number): FileSize {
    return FileSize(amount);
  }

  /**
   * Returns a file size of `amount` kilobytes
   *
   * @example
   * ```ts
   * const size = FileSize.kilobytes(123);
   * ```
   * @param amount The amount of kilobytes
   */
  export function kilobytes(amount: number): FileSize {
    return FileSize(amount * KILOBYTES);
  }

  /**
   * Returns a file size of `amount` megabytes
   *
   * @example
   * ```ts
   * const size = FileSize.megabytes(123);
   * ```
   * @param amount The amount of megabytes
   */
  export function megabytes(amount: number): FileSize {
    return FileSize(amount * MEGABYTES);
  }

  /**
   * Returns a file size of `amount` gigabytes
   *
   * @example
   * ```ts
   * const size = FileSize.gigabytes(123);
   * ```
   * @param amount The amount of gigabytes
   */
  export function gigabytes(amount: number): FileSize {
    return FileSize(amount * GIGABYTES);
  }

  /**
   * Returns a file size of `amount` terabytes
   *
   * @example
   * ```ts
   * const size = FileSize.terabytes(123);
   * ```
   * @param amount The amount of terabytes
   */
  export function terabytes(amount: number): FileSize {
    return FileSize(amount * TERABYTES);
  }
}
