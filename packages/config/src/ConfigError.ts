import type { Option } from '@w5s/core';
import { ErrorClass } from '@w5s/error/dist/ErrorClass.js';
import type { FilePath } from '@w5s/system';

export const ConfigErrorType = {
  NotFound: 'NotFound',
  ParseError: 'ParseError',
  LoadError: 'LoadError',
  InvalidOptions: 'InvalidOptions',
  ReadError: 'ReadError',
} as const;
export type ConfigErrorType = (typeof ConfigErrorType)[keyof typeof ConfigErrorType];

/**
 * An error when reading or parsing configuration files
 */
export class ConfigError extends ErrorClass({
  errorName: 'ConfigError',
})<{
    configErrorType: ConfigErrorType;
    filepath: Option<FilePath>;
    // cause: Option<unknown>;
    // message?: string;
  }> {}
