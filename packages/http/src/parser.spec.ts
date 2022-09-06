import { Result, Task } from '@w5s/core';
import { describe, test, expect, jest } from '@jest/globals';
import type { Mocked } from 'jest-mock';
import { HTTP } from './client.js';
import { HTTPParser } from './parser.js';
import { HTTPError } from './error.js';

const mockResponse = (): Mocked<HTTP.Response> =>
  ({
    arrayBuffer: jest.fn(),
    formData: jest.fn(),
    text: jest.fn(),
    blob: jest.fn(),
    json: jest.fn(),
  } as any);

const expectToRejectFetchResponseError = async (
  fn: (response: HTTP.Response) => Task<unknown, unknown>,
  mockProperty: 'arrayBuffer' | 'formData' | 'text' | 'blob' | 'json'
) => {
  const response = mockResponse();
  const thrownError = new Error('MockError');
  response[mockProperty].mockRejectedValue(thrownError);
  const task = fn(response);

  await expect(Task.unsafeRun(task)).resolves.toEqual(Result.Error(HTTPError.ParserError({ cause: thrownError })));
};
const expectToResolveValue = async (
  fn: (response: HTTP.Response) => Task<unknown, unknown>,
  mockProperty: 'arrayBuffer' | 'formData' | 'text' | 'blob' | 'json'
) => {
  const response = mockResponse();
  const returnValue = {} as any;
  response[mockProperty].mockResolvedValue(returnValue);
  const task = fn(response);
  await expect(Task.unsafeRun(task)).resolves.toEqual(Result.Ok(returnValue));
};
describe('HTTPParser', () => {
  describe('arrayBuffer', () => {
    test('should parse as ArrayBuffer', async () => expectToResolveValue(HTTPParser.arrayBuffer, 'arrayBuffer'));
    test('should reject FetchResponseError', async () =>
      expectToRejectFetchResponseError(HTTPParser.arrayBuffer, 'arrayBuffer'));
  });
  describe('formData', () => {
    test('should parse as FormData', async () => expectToResolveValue(HTTPParser.formData, 'formData'));
    test('should reject FetchResponseError', async () =>
      expectToRejectFetchResponseError(HTTPParser.formData, 'formData'));
  });
  describe('text', () => {
    test('should parse as text', async () => expectToResolveValue(HTTPParser.text, 'text'));

    test('should reject FetchResponseError', async () => expectToRejectFetchResponseError(HTTPParser.text, 'text'));
  });
  describe('blob', () => {
    test('should parse as blob', async () => expectToResolveValue(HTTPParser.blob, 'blob'));

    test('should reject FetchResponseError', async () => expectToRejectFetchResponseError(HTTPParser.blob, 'blob'));
  });
  describe('json', () => {
    test('should parse as JSON', async () => expectToResolveValue(HTTPParser.json('unsafe'), 'json'));

    test('should reject FetchResponseError', async () =>
      expectToRejectFetchResponseError(HTTPParser.json('unsafe'), 'json'));
  });
});
