import type { Option } from '@w5s/core';
import { CustomError } from '@w5s/error';
import type { FilePath } from './FilePath.js';

export const FileErrorType = {
  AlreadyExists: 'AlreadyExists',
  IllegalOperation: 'IllegalOperation',
  UserError: 'UserError',
  OtherError: 'OtherError',
} as const;
export type FileErrorType = (typeof FileErrorType)[keyof typeof FileErrorType];

/**
 * An error when a file system call fails
 */
export interface FileError
  extends CustomError<{
    name: 'FileError';
    fileErrorType: FileErrorType;
    errno: Option<number>;
    code: Option<string>;
    path: Option<FilePath>;
    syscall: Option<string>;
  }> {}
/**
 * FileError constructor
 *
 * @category Constructor
 */
export const FileError = CustomError.define<FileError>({
  errorName: 'FileError',
});
