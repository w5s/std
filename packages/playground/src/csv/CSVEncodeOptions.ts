import type { Option } from '@w5s/core';
import { defaultCSVDecodeOptions } from './CSVDecodeOptions.js';

export interface CSVEncodeOptions {
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

export const defaultCSVEncodeOptions: CSVEncodeOptions = {
  delimiter: defaultCSVDecodeOptions.delimiter,
  recordDelimiter: undefined,
};
