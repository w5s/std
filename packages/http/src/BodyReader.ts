import type { Option } from '@w5s/core';

export interface BodyReader {
  readonly stream: () => Option<ReadableStream<Uint8Array>>;
  readonly arrayBuffer: () => Promise<ArrayBuffer>;
  readonly blob: () => Promise<Blob>;
  readonly formData: () => Promise<FormData>;
  readonly json: globalThis.Response['json'];
  readonly text: () => Promise<string>;
}
