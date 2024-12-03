export type CSVField = string;

export type CSVRecord = ReadonlyArray<CSVField>;

export type CSVHeaderName = string;

export type CSVHeader = ReadonlyArray<CSVHeaderName>;

export type CSVNamedRecord = {
  readonly [name: CSVHeaderName]: CSVField;
};
export const CSVNamedRecord = {
  fromCSVRecord(header: CSVHeader, record: CSVRecord): CSVNamedRecord {
    const length = Math.min(header.length, record.length);
    const returnValue: Record<CSVHeaderName, CSVField> = {};
    for (let index = 0; index < length; index += 1) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      returnValue[header[index]!] = record[index]!;
    }
    return returnValue;
  },
};
