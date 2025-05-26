import { create as taskCreate } from '@w5s/task/dist/Task/create.js';
import type { Task } from '@w5s/task';
import { error } from '@w5s/task/dist/Task/error.js';
import { ok } from '@w5s/task/dist/Task/ok.js';
import { defaultCSVDecodeOptions, type CSVDecodeOptions } from './CSVDecodeOptions.js';
import type { CSVParseResult } from './CSVParseResult.js';
import type { CSVNamedRecord } from './CSVRecord.js';
import type { AsyncIterableLike } from '../iterable/AsyncIterableLike.js';
import { CSVError } from './CSVError.js';
import { find as asyncIterableFind } from '../iterable/AsyncIterable/find.js';
import { filter as asyncIterableFilter } from '../iterable/AsyncIterable/filter.js';
import { map as asyncIterableMap } from '../iterable/AsyncIterable/map.js';
import { map as iterableMap } from '../iterable/Iterable/map.js';
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
      if (csvRecordTuple.length < csvHeader.length) {
        return error(new CSVError({ message: `Cannot decode line number ${lineNumber}` }));
      }

      return ok(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        Object.fromEntries(iterableMap(csvHeader, (field, fieldIndex) => [field, csvRecordTuple[fieldIndex]!])),
      );
    });

    return ok({
      csvHeader,
      csvRecords,
    });
  });
}
