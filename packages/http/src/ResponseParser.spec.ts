import { DecodeError, Option, Type, type JSONValue } from '@w5s/core';
import { Task } from '@w5s/task';
import { describe, it, expect } from 'vitest';
import { withTask } from '@w5s/task/dist/Testing.js';
import { ResponseParser } from './ResponseParser.js';
import { HTTPError } from './HTTPError.js';
import type { Response } from './Response.js';
import type { BodyReader } from './BodyReader.js';

const expectTask = withTask(expect);
const mockError = () => new Error('MockError');

const defaultValue = <F extends BodyReaderFormat>(format: F): BodyReaderValue<F> =>
  // @ts-ignore
  ({
    arrayBuffer: new ArrayBuffer(1),
    blob: new Blob(),
    formData: new FormData(),
    json: null,
    stream: undefined,
    text: '',
  })[format];
const defaultBodyReader: BodyReader = {
  unsafeArrayBuffer: async () => defaultValue('arrayBuffer'),
  unsafeBlob: async () => defaultValue('blob'),
  unsafeFormData: async () => defaultValue('formData'),
  unsafeJSON: async () => defaultValue('json'),
  unsafeStream: () => defaultValue('stream'),
  unsafeText: async () => defaultValue('text'),
};

type Resolver<T> = { reject: unknown } | { resolve: T };

type BodyReaderFormat = 'arrayBuffer' | 'blob' | 'formData' | 'json' | 'stream' | 'text';

type BodyReaderValue<F extends BodyReaderFormat> = F extends 'arrayBuffer'
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

function mockBodyReader<F extends BodyReaderFormat>(format: F, parameters: Resolver<BodyReaderValue<F>>): BodyReader {
  return {
    ...defaultBodyReader,
    [{
      arrayBuffer: 'unsafeArrayBuffer',
      blob: 'unsafeBlob',
      formData: 'unsafeFormData',
      json: 'unsafeJSON',
      stream: 'stream',
      text: 'unsafeText',
    }[format]]:
      // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
      'resolve' in parameters ? () => Promise.resolve(parameters.resolve) : () => Promise.reject(parameters.reject),
  };
}

const mockResponseWith = (bodyReader: BodyReader): Response<BodyReader> =>
  ({
    body: bodyReader,
  }) as any;

const expectToResolveValue = async <F extends BodyReaderFormat>(
  fn: (response: Response<BodyReader>) => Task<unknown, unknown>,
  format: F,
) => {
  const returnValue = defaultValue(format);
  const response = mockResponseWith(
    mockBodyReader(format, {
      resolve: returnValue,
    }),
  );
  const task = fn(response);
  await expectTask(task).toResolve(returnValue);
};
describe('ResponseParser', () => {
  describe('arrayBuffer', () => {
    const parser = ResponseParser.arrayBuffer;

    it('should parse as ArrayBuffer', async () => expectToResolveValue(parser, 'arrayBuffer'));
    it('should reject FetchResponseError', async () => {
      const error = mockError();
      const response = mockResponseWith(
        mockBodyReader('arrayBuffer', {
          reject: error,
        }),
      );
      await expectTask(parser(response)).toReject(HTTPError.ParserError({ cause: error }));
    });
  });
  describe('formData', () => {
    const parser = ResponseParser.formData;

    it('should parse as FormData', async () => expectToResolveValue(ResponseParser.formData, 'formData'));
    it('should reject FetchResponseError', async () => {
      const error = mockError();
      const response = mockResponseWith(
        mockBodyReader('formData', {
          reject: error,
        }),
      );
      await expectTask(parser(response)).toReject(HTTPError.ParserError({ cause: error }));
    });
  });
  describe('text', () => {
    const parser = ResponseParser.text;

    it('should parse as text', async () => expectToResolveValue(ResponseParser.text, 'text'));

    it('should reject FetchResponseError', async () => {
      const error = mockError();
      const response = mockResponseWith(
        mockBodyReader('text', {
          reject: error,
        }),
      );
      await expectTask(parser(response)).toReject(HTTPError.ParserError({ cause: error }));
    });
  });
  describe('blob', () => {
    const parser = ResponseParser.blob;

    it('should parse as blob', async () => expectToResolveValue(ResponseParser.blob, 'blob'));

    it('should reject FetchResponseError', async () => {
      const error = mockError();
      const response = mockResponseWith(
        mockBodyReader('blob', {
          reject: error,
        }),
      );
      await expectTask(parser(response)).toReject(HTTPError.ParserError({ cause: error }));
    });
  });
  describe('json', () => {
    it('should parse as JSON', async () => expectToResolveValue(ResponseParser.json('unsafe'), 'json'));
    it('should reject FetchResponseError', async () => {
      const parser = ResponseParser.json('unsafe');
      const error = mockError();
      const response = mockResponseWith(
        mockBodyReader('json', {
          reject: error,
        }),
      );
      await expectTask(parser(response)).toReject(HTTPError.ParserError({ cause: error }));
    });

    it('should parse using Codec', async () => {
      const parser = ResponseParser.json(
        Type.Object({
          foo: Type.string,
        }),
      );
      const data = { foo: true };
      const response = mockResponseWith(
        mockBodyReader('json', {
          resolve: data,
        }),
      );
      await expectTask(parser(response)).toReject(
        HTTPError.ParserError({
          message: 'Cannot parse response body',
          cause: DecodeError({ message: '', input: data }),
        }),
      );

      const responseIncorrect = mockResponseWith(
        mockBodyReader('json', {
          resolve: { foo: '1' },
        }),
      );
      await expectTask(parser(responseIncorrect)).toResolve({ foo: '1' });
    });
  });
});
