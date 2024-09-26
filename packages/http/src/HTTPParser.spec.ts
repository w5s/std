import { DecodeError, Result, Type } from '@w5s/core';
import { Task } from '@w5s/task';
import { describe, it, expect, vi, type MockedObject } from 'vitest';
import { withTask } from '@w5s/task/dist/Testing.js';
import { HTTPParser } from './HTTPParser.js';
import { HTTPError } from './HTTPError.js';
import type { Response } from './Response.js';
import type { BodyReader } from './BodyReader.js';

const expectTask = withTask(expect);
const mockError = () => new Error('MockError');
const mockResponse = (): Response<MockedObject<BodyReader>> =>
  ({
    body: {
      arrayBuffer: vi.fn(),
      formData: vi.fn(),
      text: vi.fn(),
      blob: vi.fn(),
      json: vi.fn(),
      stream: vi.fn(),
    },
  }) as any;
const mockResponseWith = (mockProperty: keyof BodyReader, parameters: { reject: unknown } | { resolve: unknown }) => {
  const response = mockResponse();
  const responseBody = response.body;
  if ('reject' in parameters) {
    responseBody[mockProperty].mockRejectedValue(parameters.reject);
  } else {
    // @ts-ignore
    responseBody[mockProperty].mockResolvedValue(parameters.resolve);
  }
  return response;
};

const expectToResolveValue = async (
  fn: (response: Response<BodyReader>) => Task<unknown, unknown>,
  mockProperty: keyof BodyReader,
  returnValue: any = {}
) => {
  const response = mockResponse();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  response.body[mockProperty].mockResolvedValue(returnValue);
  const task = fn(response);
  await expect(Task.unsafeRun(task)).resolves.toEqual(Result.Ok(returnValue));
};
describe('HTTPParser', () => {
  describe('arrayBuffer', () => {
    const parser = HTTPParser.arrayBuffer;

    it('should parse as ArrayBuffer', async () => expectToResolveValue(parser, 'arrayBuffer'));
    it('should reject FetchResponseError', async () => {
      const error = mockError();
      const response = mockResponseWith('arrayBuffer', {
        reject: error,
      });
      await expectTask(parser(response)).toReject(HTTPError.ParserError({ cause: error }));
    });
  });
  describe('formData', () => {
    const parser = HTTPParser.formData;

    it('should parse as FormData', async () => expectToResolveValue(HTTPParser.formData, 'formData'));
    it('should reject FetchResponseError', async () => {
      const error = mockError();
      const response = mockResponseWith('formData', {
        reject: error,
      });
      await expectTask(parser(response)).toReject(HTTPError.ParserError({ cause: error }));
    });
  });
  describe('text', () => {
    const parser = HTTPParser.text;

    it('should parse as text', async () => expectToResolveValue(HTTPParser.text, 'text'));

    it('should reject FetchResponseError', async () => {
      const error = mockError();
      const response = mockResponseWith('text', {
        reject: error,
      });
      await expectTask(parser(response)).toReject(HTTPError.ParserError({ cause: error }));
    });
  });
  describe('blob', () => {
    const parser = HTTPParser.blob;

    it('should parse as blob', async () => expectToResolveValue(HTTPParser.blob, 'blob'));

    it('should reject FetchResponseError', async () => {
      const error = mockError();
      const response = mockResponseWith('blob', {
        reject: error,
      });
      await expectTask(parser(response)).toReject(HTTPError.ParserError({ cause: error }));
    });
  });
  describe('json', () => {
    it('should parse as JSON', async () => expectToResolveValue(HTTPParser.json('unsafe'), 'json'));
    it('should reject FetchResponseError', async () => {
      const parser = HTTPParser.json('unsafe');
      const error = mockError();
      const response = mockResponseWith('json', {
        reject: error,
      });
      await expectTask(parser(response)).toReject(HTTPError.ParserError({ cause: error }));
    });

    it('should parse using Codec', async () => {
      const parser = HTTPParser.json(
        Type.Object({
          foo: Type.string,
        })
      );
      const data = { foo: true };
      const response = mockResponseWith('json', {
        resolve: data,
      });
      await expectTask(parser(response)).toReject(
        HTTPError.ParserError({
          message: 'Cannot parse response body',
          cause: DecodeError({ message: '', input: data }),
        })
      );

      const responseIncorrect = mockResponseWith('json', {
        resolve: { foo: '1' },
      });
      await expectTask(parser(responseIncorrect)).toResolve({ foo: '1' });
    });
  });
});
