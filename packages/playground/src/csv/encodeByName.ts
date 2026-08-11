import type { AsyncIterableLike } from '@w5s/iterable/dist/AsyncIterableLike.js';
import type { Task } from '@w5s/task';

import { map as asyncIterableMap } from '@w5s/iterable/dist/AsyncIterable/map.js';
import { create as taskCreate } from '@w5s/task/dist/Task/create.js';
import { ok } from '@w5s/task/dist/Task/ok.js';

import type { CSVNamedRecord } from './CSVRecord.js';

import { type CSVEncodeOptions, defaultCSVEncodeOptions } from './CSVEncodeOptions.js';

export function encodeByName(
  data: AsyncIterableLike<CSVNamedRecord>,
  options: CSVEncodeOptions = defaultCSVEncodeOptions,
): Task<AsyncIterable<string>, never> {
  const headers: Array<string> = [];
  const { delimiter, recordDelimiter } = options;
  const encodeRecord = (record: CSVNamedRecord) =>
    headers.map((headerName) => record[headerName]).join(delimiter) + recordDelimiter;
  return taskCreate(() => ok(asyncIterableMap(data, encodeRecord)));
}
