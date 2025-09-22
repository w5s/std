import type { Int, Tag } from '@w5s/core';

const KILOBYTES = 1000;
const MEGABYTES = KILOBYTES * 1000;
const GIGABYTES = MEGABYTES * 1000;
const TERABYTES = GIGABYTES * 1000;

export type FileSize = Int & Tag<'FileSize'>;

/**
 * @namespace
 */
export const FileSize = Object.assign(
  // eslint-disable-next-line @typescript-eslint/no-shadow, prefer-arrow-callback
  function FileSize(value: number): FileSize {
    return Math.trunc(value) as FileSize;
  },
  {
    /**
     * Returns a file size of `amount` bytes
     *
     * @example
     * ```typescript
     * const size = FileSize.bytes(123);
     * ```
     * @param amount - The amount of bytes
     */
    bytes(amount: number): FileSize {
      return FileSize(amount);
    },
    /**
     * Returns a file size of `amount` kilobytes
     *
     * @example
     * ```typescript
     * const size = FileSize.kilobytes(123);
     * ```
     * @param amount - The amount of kilobytes
     */
    kilobytes(amount: number): FileSize {
      return FileSize(amount * KILOBYTES);
    },
    /**
     * Returns a file size of `amount` megabytes
     *
     * @example
     * ```typescript
     * const size = FileSize.megabytes(123);
     * ```
     * @param amount - The amount of megabytes
     */
    megabytes(amount: number): FileSize {
      return FileSize(amount * MEGABYTES);
    },

    /**
     * Returns a file size of `amount` gigabytes
     *
     * @example
     * ```typescript
     * const size = FileSize.gigabytes(123);
     * ```
     * @param amount - The amount of gigabytes
     */
    gigabytes(amount: number): FileSize {
      return FileSize(amount * GIGABYTES);
    },

    /**
     * Returns a file size of `amount` terabytes
     *
     * @example
     * ```typescript
     * const size = FileSize.terabytes(123);
     * ```
     * @param amount - The amount of terabytes
     */
    terabytes(amount: number): FileSize {
      return FileSize(amount * TERABYTES);
    },
  },
);
