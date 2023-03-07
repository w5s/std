import { Result, Task, unsafeRun } from '@w5s/core';
import { describe, it, expect, vi, type MockedObject } from 'vitest';
import type { HTTP } from './client.js';
import { HTTPParser } from './parser.js';
import { HTTPError } from './error.js';

const mockResponse = (): MockedObject<HTTP.Response> =>
  ({
    arrayBuffer: vi.fn(),
    formData: vi.fn(),
    text: vi.fn(),
    blob: vi.fn(),
    json: vi.fn(),
  } as any);

const expectToRejectFetchResponseError = async (
  fn: (response: HTTP.Response) => Task<unknown, unknown>,
  mockProperty: 'arrayBuffer' | 'formData' | 'text' | 'blob' | 'json'
) => {
  const response = mockResponse();
  const thrownError = new Error('MockError');
  response[mockProperty].mockRejectedValue(thrownError);
  const task = fn(response);

  await expect(unsafeRun(task)).resolves.toEqual(Result.Error(HTTPError.ParserError({ cause: thrownError })));
};
const expectToResolveValue = async (
  fn: (response: HTTP.Response) => Task<unknown, unknown>,
  mockProperty: 'arrayBuffer' | 'formData' | 'text' | 'blob' | 'json'
) => {
  const response = mockResponse();
  const returnValue = {} as any;
  response[mockProperty].mockResolvedValue(returnValue);
  const task = fn(response);
  await expect(unsafeRun(task)).resolves.toEqual(Result.Ok(returnValue));
};
describe('HTTPParser', () => {
  describe('arrayBuffer', () => {
    it('should parse as ArrayBuffer', async () => expectToResolveValue(HTTPParser.arrayBuffer, 'arrayBuffer'));
    it('should reject FetchResponseError', async () =>
      expectToRejectFetchResponseError(HTTPParser.arrayBuffer, 'arrayBuffer'));
  });
  describe('formData', () => {
    it('should parse as FormData', async () => expectToResolveValue(HTTPParser.formData, 'formData'));
    it('should reject FetchResponseError', async () =>
      expectToRejectFetchResponseError(HTTPParser.formData, 'formData'));
  });
  describe('text', () => {
    it('should parse as text', async () => expectToResolveValue(HTTPParser.text, 'text'));

    it('should reject FetchResponseError', async () => expectToRejectFetchResponseError(HTTPParser.text, 'text'));
  });
  describe('blob', () => {
    it('should parse as blob', async () => expectToResolveValue(HTTPParser.blob, 'blob'));

    it('should reject FetchResponseError', async () => expectToRejectFetchResponseError(HTTPParser.blob, 'blob'));
  });
  describe('json', () => {
    it('should parse as JSON', async () => expectToResolveValue(HTTPParser.json('unsafe'), 'json'));

    it('should reject FetchResponseError', async () =>
      expectToRejectFetchResponseError(HTTPParser.json('unsafe'), 'json'));
  });
});
