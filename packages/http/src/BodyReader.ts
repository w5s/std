import type { JSONValue, Option } from '@w5s/core';

/**
 * Represents an object that `BodyReader`
 */
export interface BodyReader {
  /**
   * Returns a promise of {@link ReadableStream}
   * This is an internal method that should not be used directly
   *
   * @internal
   */
  unsafeStream(): Option<ReadableStream<Uint8Array>>;
  /**
   * Returns a promise of {@link ArrayBuffer}
   * This is an internal method that should not be used directly
   *
   * @internal
   */
  unsafeArrayBuffer(): Promise<ArrayBuffer>;
  /**
   * Returns a promise of {@link Blob}
   * This is an internal method that should not be used directly
   *
   * @internal
   */
  unsafeBlob(): Promise<Blob>;
  /**
   * Returns a promise of {@link FormData}
   * This is an internal method that should not be used directly
   *
   * @internal
   */
  unsafeFormData(): Promise<FormData>;
  /**
   * Returns a promise of {@link @w5s/core!JSONValue}
   * This is an internal method that should not be used directly
   *
   * @internal
   */
  unsafeJSON(): Promise<JSONValue>;
  /**
   * Returns a promise of `string`
   * This is an internal method that should not be used directly
   *
   * @internal
   */
  unsafeText(): Promise<string>;
}
