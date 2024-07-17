import { DecodeError, Result, Type } from '@w5s/core';
import { Task } from '@w5s/task';
import { describe, it, expect, vi, type MockedObject } from 'vitest';
import { withTask } from '@w5s/task/dist/Testing.js';
import type { HTTP } from './HTTP.js';
import { HTTPParser } from './HTTPParser.js';
import { HTTPError } from './HTTPError.js';

const expectTask = withTask(expect);
const mockError = () => new Error('MockError');
const mockResponse = (): MockedObject<HTTP.Response> =>
  ({
    arrayBuffer: vi.fn(),
    formData: vi.fn(),
    text: vi.fn(),
    blob: vi.fn(),
    json: vi.fn(),
  }) as any;
const mockResponseWith = (
  mockProperty: 'arrayBuffer' | 'formData' | 'text' | 'blob' | 'json',
  parameters: { reject: unknown } | { resolve: unknown }
) => {
  const response = mockResponse();
  if ('reject' in parameters) {
    response[mockProperty].mockRejectedValue(parameters.reject);
  } else {
    response[mockProperty].mockResolvedValue(parameters.resolve);
  }
  return response;
};

const expectToResolveValue = async (
  fn: (response: HTTP.Response) => Task<unknown, unknown>,
  mockProperty: 'arrayBuffer' | 'formData' | 'text' | 'blob' | 'json',
  returnValue: any = {}
) => {
  const response = mockResponse();
  response[mockProperty].mockResolvedValue(returnValue);
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
          foo: Type.String,
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
