import { CodecError, Type } from '@w5s/core';
import { Task } from '@w5s/task';
import { describe, it, expect } from 'vitest';
import { withTask } from '@w5s/task/dist/Testing.js';
import { ResponseParser } from './ResponseParser.js';
import { HTTPError } from './HTTPError.js';
import type { Response } from './Response.js';
import type { BodyReader, BodyReaderFormat } from './BodyReader.js';
import { FakeBodyReader } from './Testing.js';

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
  const returnValue = FakeBodyReader.value(format);
  const response = mockResponseWith(
    FakeBodyReader(format, {
      resolve: returnValue,
    }),
  );
  const task = fn(response);
  await expectTask(task).toResolveAsync(returnValue);
};
describe('ResponseParser', () => {
  describe('arrayBuffer', () => {
    const parser = ResponseParser.arrayBuffer;

    it('should parse as ArrayBuffer', async () => expectToResolveValue(parser, 'arrayBuffer'));
    it('should reject FetchResponseError', async () => {
      const error = mockError();
      const response = mockResponseWith(
        FakeBodyReader('arrayBuffer', {
          reject: error,
        }),
      );
      await expectTask(parser(response)).toRejectAsync(HTTPError.ParserError({ cause: error }));
    });
  });
  describe('formData', () => {
    const parser = ResponseParser.formData;

    it('should parse as FormData', async () => expectToResolveValue(ResponseParser.formData, 'formData'));
    it('should reject FetchResponseError', async () => {
      const error = mockError();
      const response = mockResponseWith(
        FakeBodyReader('formData', {
          reject: error,
        }),
      );
      await expectTask(parser(response)).toRejectAsync(HTTPError.ParserError({ cause: error }));
    });
  });
  describe('text', () => {
    const parser = ResponseParser.text;

    it('should parse as text', async () => expectToResolveValue(ResponseParser.text, 'text'));

    it('should reject FetchResponseError', async () => {
      const error = mockError();
      const response = mockResponseWith(
        FakeBodyReader('text', {
          reject: error,
        }),
      );
      await expectTask(parser(response)).toRejectAsync(HTTPError.ParserError({ cause: error }));
    });
  });
  describe('blob', () => {
    const parser = ResponseParser.blob;

    it('should parse as blob', async () => expectToResolveValue(ResponseParser.blob, 'blob'));

    it('should reject FetchResponseError', async () => {
      const error = mockError();
      const response = mockResponseWith(
        FakeBodyReader('blob', {
          reject: error,
        }),
      );
      await expectTask(parser(response)).toRejectAsync(HTTPError.ParserError({ cause: error }));
    });
  });
  describe('json', () => {
    it('should parse as JSON', async () => expectToResolveValue(ResponseParser.json('unsafe'), 'json'));
    it('should reject FetchResponseError', async () => {
      const parser = ResponseParser.json('unsafe');
      const error = mockError();
      const response = mockResponseWith(
        FakeBodyReader('json', {
          reject: error,
        }),
      );
      await expectTask(parser(response)).toRejectAsync(HTTPError.ParserError({ cause: error }));
    });

    it('should parse using Codec', async () => {
      const parser = ResponseParser.json(
        Type.Object({
          foo: Type.string,
        }),
      );
      const data = { foo: true };
      const response = mockResponseWith(
        FakeBodyReader('json', {
          resolve: data,
        }),
      );
      await expectTask(parser(response)).toRejectAsync(
        HTTPError.ParserError({
          message: 'Cannot parse response body',
          cause: CodecError({ message: 'Cannot decode true as string', input: true }),
        }),
      );

      const responseIncorrect = mockResponseWith(
        FakeBodyReader('json', {
          resolve: { foo: '1' },
        }),
      );
      await expectTask(parser(responseIncorrect)).toResolveAsync({ foo: '1' });
    });
  });
});
