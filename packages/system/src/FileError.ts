import type { Option } from '@w5s/core';

import { ErrorClass } from '@w5s/error/dist/ErrorClass.js';

import type { FilePath } from './FilePath.js';

export const FileErrorType = {
  AlreadyExists: 'AlreadyExists',
  IllegalOperation: 'IllegalOperation',
  OtherError: 'OtherError',
  UserError: 'UserError',
} as const;
export type FileErrorType = (typeof FileErrorType)[keyof typeof FileErrorType];

/**
 * An error when a file system call fails
 */
export class FileError extends ErrorClass({
  errorName: 'FileError',
})<{
    code: Option<string>;
    errno: Option<number>;
    fileErrorType: FileErrorType;
    path: Option<FilePath>;
    syscall: Option<string>;
  }> {}
