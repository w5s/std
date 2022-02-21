import { JSONValue, Task } from '@w5s/core';
import { HTTPClient } from './client';

function handleError(error: unknown) {
  return HTTPClient.ParserError({
    cause: error,
  });
}

export function parseArrayBuffer(response: HTTPClient.Response) {
  return Task.Async.tryCall<ArrayBuffer, HTTPClient.ParserError>(() => response.arrayBuffer(), handleError);
}

export function parseJSON<Return extends JSONValue>(_decode: 'unsafe') {
  return (response: HTTPClient.Response) =>
    Task.Async.tryCall<Return, HTTPClient.ParserError>(() => response.json(), handleError);
}

export function parseBlob(response: HTTPClient.Response) {
  return Task.Async.tryCall<Blob, HTTPClient.ParserError>(() => response.blob(), handleError);
}

export function parseText(response: HTTPClient.Response) {
  return Task.Async.tryCall<string, HTTPClient.ParserError>(() => response.text(), handleError);
}

export function parseFormData(response: HTTPClient.Response) {
  return Task.Async.tryCall<FormData, HTTPClient.ParserError>(() => response.formData(), handleError);
}
