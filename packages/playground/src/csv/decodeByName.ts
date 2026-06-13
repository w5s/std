import type { AsyncIterableLike } from '@w5s/iterable/AsyncIterableLike';
import type { Task } from '@w5s/task/Task';

import { filter as asyncIterableFilter } from '@w5s/iterable/AsyncIterable/filter';
import { find as asyncIterableFind } from '@w5s/iterable/AsyncIterable/find';
import { map as asyncIterableMap } from '@w5s/iterable/AsyncIterable/map';
import { map as iterableMap } from '@w5s/iterable/Iterable/map';
import { create as taskCreate } from '@w5s/task/Task/create';
import { error } from '@w5s/task/Task/error';
import { ok } from '@w5s/task/Task/ok';

import type { CSVParseResult } from './CSVParseResult.js';
import type { CSVNamedRecord } from './CSVRecord.js';

import { type CSVDecodeOptions, defaultCSVDecodeOptions } from './CSVDecodeOptions.js';
import { CSVError } from './CSVError.js';
import { readLines } from './readLines.js';

export function decodeByName(
  data: AsyncIterableLike<string>,
  options: CSVDecodeOptions = defaultCSVDecodeOptions,
): Task<CSVParseResult<CSVNamedRecord>, CSVError> {
  const { delimiter, recordDelimiter } = options;
  return taskCreate(async () => {
    const lines = readLines(data, { delimiter: recordDelimiter });
    const firstLine = await asyncIterableFind(lines, (_, index) => index === 0);
    if (firstLine == null) {
      return error(
        new CSVError({
          message: 'No header found',
        }),
      );
    }
    const csvHeader = firstLine.split(delimiter);
    const restLines = asyncIterableFilter(lines, (_, index) => index !== 0);

    const csvRecords: CSVParseResult<CSVNamedRecord>['csvRecords'] = asyncIterableMap(restLines, (line, lineNumber) => {
      const csvRecordTuple = line.split(delimiter);
      return csvRecordTuple.length < csvHeader.length
        ? error(new CSVError({ message: `Cannot decode line number ${lineNumber}` }))
        : ok(
            // eslint-disable-next-line ts/no-non-null-assertion
            Object.fromEntries(iterableMap(csvHeader, (field, fieldIndex) => [field, csvRecordTuple[fieldIndex]!])),
          );
    });

    return ok({
      csvHeader,
      csvRecords,
    });
  });
}
