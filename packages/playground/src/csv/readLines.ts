import type { Option } from '@w5s/core';
import type { AsyncIterableLike } from '@w5s/iterable/dist/AsyncIterableLike.js';

export interface ReadLineOptions {
  delimiter?: Option<string>;
}

export function readLines(chunks: AsyncIterableLike<string>, options: ReadLineOptions = {}): AsyncIterable<string> {
  const lineDelimiter = options.delimiter ?? '\n';
  return {
    async *[Symbol.asyncIterator]() {
      let buffer = '';
      for await (const chunk of chunks) {
        const parts = chunk.split(lineDelimiter);
        const partCount = parts.length;
        buffer += parts[0];
        if (parts.length > 1) {
          if (buffer.length > 0) {
            yield buffer;
          }
          for (let partIndex = 1; partIndex < partCount; partIndex += 1) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            buffer = parts[partIndex]!;
            if (buffer.length > 0) {
              yield buffer;
            }
          }
          buffer = '';
        }
      }
      if (buffer.length > 0) {
        yield buffer;
      }
    },
  };
}
