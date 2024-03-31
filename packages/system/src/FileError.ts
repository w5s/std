import type { Option } from '@w5s/core';
import { defineCustomErrorWith, type CustomError, type CustomErrorParametersProperties } from '@w5s/error';
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
export const FileError = defineCustomErrorWith(
  'FileError',
  (create) =>
    (parameters: Partial<CustomErrorParametersProperties<FileError>>): FileError =>
      create({
        fileErrorType: 'UserError',
        errno: undefined,
        code: undefined,
        path: undefined,
        syscall: undefined,
        ...parameters,
      })
);
