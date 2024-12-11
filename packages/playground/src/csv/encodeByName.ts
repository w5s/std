import { create as taskCreate } from '@w5s/task/dist/Task/create.js';
import type { Task } from '@w5s/task';
import { defaultCSVEncodeOptions, type CSVEncodeOptions } from './CSVEncodeOptions.js';
import type { CSVNamedRecord } from './CSVRecord.js';
import type { AsyncIterableLike } from '../iterable/AsyncIterableLike.js';
import { map as asyncIterableMap } from '../iterable/AsyncIterable/map.js';

export function encodeByName(
  data: AsyncIterableLike<CSVNamedRecord>,
  options: CSVEncodeOptions = defaultCSVEncodeOptions,
): Task<AsyncIterable<string>, never> {
  const headers: Array<string> = [];
  const { delimiter, recordDelimiter } = options;
  const encodeRecord = (record: CSVNamedRecord) =>
    headers.map((headerName) => record[headerName]).join(delimiter) + recordDelimiter;
  return taskCreate(async ({ ok }) => ok(asyncIterableMap(data, encodeRecord)));
}
