import { Result, Task } from '@w5s/core';
import { HTTPClient } from './client.js';
import { parseArrayBuffer, parseBlob, parseFormData, parseJSON, parseText } from './parser.js';

const mockResponse = (): jest.Mocked<HTTPClient.Response> =>
  ({
    arrayBuffer: jest.fn(),
    formData: jest.fn(),
    text: jest.fn(),
    blob: jest.fn(),
    json: jest.fn(),
  } as any);

const expectToRejectFetchResponseError = async (
  fn: (response: HTTPClient.Response) => Task.Async<unknown, unknown>,
  mockProperty: 'arrayBuffer' | 'formData' | 'text' | 'blob' | 'json'
) => {
  const response = mockResponse();
  const thrownError = new Error('MockError');
  response[mockProperty].mockRejectedValue(thrownError);
  const task = fn(response);

  await expect(Task.unsafeRun(task)).resolves.toEqual(Result.Error(HTTPClient.ParserError({ cause: thrownError })));
};
const expectToResolveValue = async (
  fn: (response: HTTPClient.Response) => Task.Async<unknown, unknown>,
  mockProperty: 'arrayBuffer' | 'formData' | 'text' | 'blob' | 'json'
) => {
  const response = mockResponse();
  const returnValue = {} as any;
  response[mockProperty].mockResolvedValue(returnValue);
  const task = fn(response);
  await expect(Task.unsafeRun(task)).resolves.toEqual(Result.Ok(returnValue));
};
describe(parseArrayBuffer, () => {
  test('should parse as ArrayBuffer', async () => expectToResolveValue(parseArrayBuffer, 'arrayBuffer'));
  test('should reject FetchResponseError', async () =>
    expectToRejectFetchResponseError(parseArrayBuffer, 'arrayBuffer'));
});

describe(parseFormData, () => {
  test('should parse as FormData', async () => expectToResolveValue(parseFormData, 'formData'));
  test('should reject FetchResponseError', async () => expectToRejectFetchResponseError(parseFormData, 'formData'));
});
describe(parseText, () => {
  test('should parse as text', async () => expectToResolveValue(parseText, 'text'));

  test('should reject FetchResponseError', async () => expectToRejectFetchResponseError(parseText, 'text'));
});
describe(parseBlob, () => {
  test('should parse as blob', async () => expectToResolveValue(parseBlob, 'blob'));

  test('should reject FetchResponseError', async () => expectToRejectFetchResponseError(parseBlob, 'blob'));
});
describe(parseJSON, () => {
  test('should parse as JSON', async () => expectToResolveValue(parseJSON('unsafe'), 'json'));

  test('should reject FetchResponseError', async () => expectToRejectFetchResponseError(parseJSON('unsafe'), 'json'));
});
