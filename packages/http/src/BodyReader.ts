import type { JSONValue, Option } from '@w5s/core';

export type BodyReaderFormat = 'arrayBuffer' | 'blob' | 'formData' | 'json' | 'stream' | 'text';

export type BodyReaderValue<F extends BodyReaderFormat> = F extends 'arrayBuffer'
  ? ArrayBuffer
  : F extends 'blob'
    ? Blob
    : F extends 'formData'
      ? FormData
      : F extends 'json'
        ? JSONValue
        : F extends 'stream'
          ? Option<ReadableStream>
          : F extends 'text'
            ? string
            : never;

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
  unsafeStream(): Option<BodyReaderValue<'stream'>>;
  /**
   * Returns a promise of {@link ArrayBuffer}
   * This is an internal method that should not be used directly
   *
   * @internal
   */
  unsafeArrayBuffer(): Promise<BodyReaderValue<'arrayBuffer'>>;
  /**
   * Returns a promise of {@link Blob}
   * This is an internal method that should not be used directly
   *
   * @internal
   */
  unsafeBlob(): Promise<BodyReaderValue<'blob'>>;
  /**
   * Returns a promise of {@link FormData}
   * This is an internal method that should not be used directly
   *
   * @internal
   */
  unsafeFormData(): Promise<BodyReaderValue<'formData'>>;
  /**
   * Returns a promise of {@link @w5s/core!JSONValue}
   * This is an internal method that should not be used directly
   *
   * @internal
   */
  unsafeJSON(): Promise<BodyReaderValue<'json'>>;
  /**
   * Returns a promise of `string`
   * This is an internal method that should not be used directly
   *
   * @internal
   */
  unsafeText(): Promise<BodyReaderValue<'text'>>;
}
