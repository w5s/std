import type { Option } from '@w5s/core/Option';

export interface CSVDecodeOptions {
  /**
   * Field delimiter for records
   *
   * @default ","
   */
  delimiter: string;

  /**
   * Record delimiter
   */
  recordDelimiter: Option<string>;
}

export const defaultCSVDecodeOptions: CSVDecodeOptions = {
  delimiter: ',',
  recordDelimiter: undefined,
};
