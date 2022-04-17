import { DataError, Option } from '@w5s/core';
import type { FilePath } from './path';

export const FileErrorType = {
  AlreadyExists: 'AlreadyExists',
  IllegalOperation: 'IllegalOperation',
  UserError: 'UserError',
  OtherError: 'OtherError',
} as const;
export type FileErrorType = typeof FileErrorType[keyof typeof FileErrorType];

/**
 * An error when a file system call fails
 */
export interface FileError
  extends DataError<{
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
export const FileError = DataError.Make<FileError>('FileError');
