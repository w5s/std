import type { BodyReader, BodyReaderFormat, BodyReaderValue } from '../BodyReader.js';

type Resolver<T> = { reject: unknown } | { resolve: T };

const fakeBodyValueFactory = {
  arrayBuffer: () => new ArrayBuffer(1),
  blob: () => new Blob(),
  formData: () => new FormData(),
  json: () => null,
  stream: () => undefined,
  text: () => '',
};
const formatToProperty = {
  arrayBuffer: 'unsafeArrayBuffer',
  blob: 'unsafeBlob',
  formData: 'unsafeFormData',
  json: 'unsafeJSON',
  stream: 'unsafeStream',
  text: 'unsafeText',
} as const;

/**
 * Returns a new body value
 *
 * @example
 * ```ts
 * const value = fakeBodyValue('arrayBuffer');// ArrayBuffer
 * ```
 * @param format - the format to use to generate
 */
export function fakeBodyValue<F extends BodyReaderFormat>(format: F): BodyReaderValue<F> {
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

/**
 * Returns a new BodyReader for testing
 *
 * @example
 * ```ts
 * const bodyReader = fakeBodyReader('text', {
 *   resolve: 'My Text',
 * });
 * ```
 * @param format
 * @param parameters
 */
export function fakeBodyReader<F extends BodyReaderFormat>(
  format: F,
  parameters: Resolver<BodyReaderValue<F>>,
): BodyReader {
  return {
    ...defaultBodyReader,
    [formatToProperty[format]]:
      // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
      'resolve' in parameters ? () => Promise.resolve(parameters.resolve) : () => Promise.reject(parameters.reject),
  };
}
