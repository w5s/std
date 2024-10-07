import { DecodeError, Type } from '@w5s/core';
import { Task } from '@w5s/task';
import { describe, it, expect } from 'vitest';
import { withTask } from '@w5s/task/dist/Testing.js';
import { ResponseParser } from './ResponseParser.js';
import { HTTPError } from './HTTPError.js';
import type { Response } from './Response.js';
import type { BodyReader, BodyReaderFormat } from './BodyReader.js';
import { fakeBodyReader, fakeBodyValue } from './Testing/fakeBodyReader.js';

const expectTask = withTask(expect);
const mockError = () => new Error('MockError');

const mockResponseWith = (bodyReader: BodyReader): Response<BodyReader> =>
  ({
    body: bodyReader,
  }) as any;

const expectToResolveValue = async <F extends BodyReaderFormat>(
  fn: (response: Response<BodyReader>) => Task<unknown, unknown>,
  format: F,
) => {
  const returnValue = fakeBodyValue(format);
  const response = mockResponseWith(
    fakeBodyReader(format, {
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
        fakeBodyReader('arrayBuffer', {
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
        fakeBodyReader('formData', {
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
        fakeBodyReader('text', {
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
        fakeBodyReader('blob', {
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
        fakeBodyReader('json', {
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
        fakeBodyReader('json', {
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
        fakeBodyReader('json', {
          resolve: { foo: '1' },
        }),
      );
      await expectTask(parser(responseIncorrect)).toResolve({ foo: '1' });
    });
  });
});
