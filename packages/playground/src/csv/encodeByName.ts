import type { AsyncIterableLike } from '@w5s/iterable/AsyncIterableLike';
import type { Task } from '@w5s/task/Task';

import { map as asyncIterableMap } from '@w5s/iterable/AsyncIterable/map';
import { create as taskCreate } from '@w5s/task/Task/create';
import { ok } from '@w5s/task/Task/ok';

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
