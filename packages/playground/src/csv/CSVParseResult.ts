import type { Result } from '@w5s/core';

import type { CSVError } from './CSVError.js';
import type { CSVHeader, CSVNamedRecord, CSVRecord } from './CSVRecord.js';

export interface CSVParseResult<Value extends CSVNamedRecord | CSVRecord> {
  csvHeader: CSVHeader;
  csvRecords: AsyncIterable<Result<Value, CSVError>>;
}
