import type { JSONValue, Option } from '@w5s/core';

export interface BodyReader {
  stream(): Option<ReadableStream<Uint8Array>>;
  arrayBuffer(): Promise<ArrayBuffer>;
  blob(): Promise<Blob>;
  formData(): Promise<FormData>;
  json(): Promise<JSONValue>;
  text(): Promise<string>;
}
