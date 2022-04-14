// data IOErrorType
//   -- Haskell 2010:
//   = AlreadyExists
//   | NoSuchThing
//   | ResourceBusy
//   | ResourceExhausted
//   | EOF
//   | IllegalOperation
//   | PermissionDenied
//   | UserError
//   -- GHC only:
//   | UnsatisfiedConstraints
//   | SystemError
//   | ProtocolError
//   | OtherError
//   | InvalidArgument
//   | InappropriateType
//   | HardwareFault
//   | UnsupportedOperation
//   | TimeExpired
//   | ResourceVanished
//   | Interrupted
import { DataError, Option } from '@w5s/core';
import { ErrnoException } from './nodejs';
import type { FilePath } from './path';

export type FileErrorType = 'AlreadyExists' | 'IllegalOperation' | 'UserError' | 'OtherError';

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

export function errnoExceptionHandler(path: FilePath) {
  return (error: unknown): FileError =>
    FileError.hasInstance(error)
      ? error
      : ErrnoException.hasInstance(error)
      ? FileError({
          fileErrorType: 'OtherError',
          path,
          cause: error,
          syscall: error.syscall,
          errno: error.errno,
          code: error.code,
        })
      : FileError({
          fileErrorType: 'OtherError',
          path,
          cause: error,
          syscall: Option.None,
          errno: Option.None,
          code: Option.None,
        });
}
