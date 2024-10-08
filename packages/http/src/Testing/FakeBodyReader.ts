import type { BodyReader, BodyReaderFormat, BodyReaderValue } from '../BodyReader.js';

type Resolver<T> = { reject: unknown } | { resolve: T };

const formatToProperty = {
  arrayBuffer: 'unsafeArrayBuffer',
  blob: 'unsafeBlob',
  formData: 'unsafeFormData',
  json: 'unsafeJSON',
  stream: 'unsafeStream',
  text: 'unsafeText',
} as const;

const fakeBodyValueFactory = {
  arrayBuffer: () => new ArrayBuffer(1),
  blob: () => new Blob(),
  formData: () => new FormData(),
  json: () => null,
  stream: () => undefined,
  text: () => '',
};

function fakeBodyValue<F extends BodyReaderFormat>(format: F): BodyReaderValue<F> {
  // @ts-ignore
  return fakeBodyValueFactory[format]();
}

const defaultBodyReader: BodyReader = {
  unsafeArrayBuffer: async () => fakeBodyValue('arrayBuffer'),
  unsafeBlob: async () => fakeBodyValue('blob'),
  unsafeFormData: async () => fakeBodyValue('formData'),
  unsafeJSON: async () => fakeBodyValue('json'),
  unsafeStream: () => fakeBodyValue('stream'),
  unsafeText: async () => fakeBodyValue('text'),
};

export interface FakeBodyReader<Format extends BodyReaderFormat> extends BodyReader {
  /**
   * The format used to generate the fake body
   */
  fakeReaderFormat: Format;
}

/**
 * Returns a new BodyReader for testing
 *
 * @example
 * ```ts
 * const bodyReader = FakeBodyReader('text', {
 *   resolve: 'My Text',
 * });
 * ```
 * @param format
 * @param parameters
 */
export function FakeBodyReader<F extends BodyReaderFormat>(
  format: F,
  parameters: Resolver<BodyReaderValue<F>>,
): FakeBodyReader<F> {
  return {
    ...defaultBodyReader,
    fakeReaderFormat: format,
    [formatToProperty[format]]:
      // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
      'resolve' in parameters ? () => Promise.resolve(parameters.resolve) : () => Promise.reject(parameters.reject),
  };
}
export namespace FakeBodyReader {
  /**
   * Returns a new body value
   *
   * @example
   * ```ts
   * const value = FakeBodyReader.value('arrayBuffer');// ArrayBuffer
   * ```
   * @param format - the format to use to generate
   */
  export function value<F extends BodyReaderFormat>(format: F): BodyReaderValue<F> {
    return fakeBodyValue(format);
  }
}
