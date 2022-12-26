import * as fsEmptyDirectory from './fileSystem/emptyDirectory.js';
import * as fsCreateDirectory from './fileSystem/createDirectory.js';
import * as fsCopyFile from './fileSystem/copyFile.js';
import * as fsCreateSymbolicLink from './fileSystem/createSymbolicLink.js';
import * as fsReadSymbolicLink from './fileSystem/readSymbolicLink.js';
import * as fsListDirectory from './fileSystem/listDirectory.js';
import * as fsEnsureDirectory from './fileSystem/ensure.js';
import * as fsReadFileStatus from './fileSystem/readFileStatus.js';
import * as fsRemove from './fileSystem/remove.js';
import * as fsRename from './fileSystem/rename.js';
import * as fsWriteFile from './fileSystem/writeFile.js';
import * as fsMove from './fileSystem/move.js';

export namespace FileSystem {
  export const { copyFile } = fsCopyFile;
  export const { createDirectory } = fsCreateDirectory;
  export const { createSymbolicLink } = fsCreateSymbolicLink;
  export const { readSymbolicLink } = fsReadSymbolicLink;
  export const { listDirectory } = fsListDirectory;
  export const { emptyDirectory } = fsEmptyDirectory;
  export const { ensureDirectory, ensureFile, ensureSymbolicLink } = fsEnsureDirectory;
  export const { readFileStatus, readSymbolicLinkStatus } = fsReadFileStatus;
  export const { rename } = fsRename;
  export const { writeFile } = fsWriteFile;
  export const { move } = fsMove;
  export const { remove } = fsRemove;
}
