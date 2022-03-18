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
import { DataError, type Option } from '@w5s/core';
import type { FilePath } from './data';

export type FileErrorType = 'AlreadyExists' | 'IllegalOperation';

/**
 * A network error when `fetch` fails
 */
export interface FileError
  extends DataError<{
    name: 'FileError';
    errorType: FileErrorType;
    // errno: Option<number>;
    // code: Option<string>;
    path: Option<FilePath>;
    // syscall: Option<string>;
  }> {}
/**
 * FileError constructor
 *
 * @category Constructor
 */
export const FileError = DataError.Make<FileError>('FileError');

// export function errnoExceptionToFileError({ errno, code, path, syscall }: NodeJS.ErrnoException) {
//   return FileError({
//     errno,
//     code,
//     path,
//     syscall,
//   });
// }
