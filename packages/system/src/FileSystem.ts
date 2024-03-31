import * as fsEmptyDirectory from './FileSystem/emptyDirectory.js';
import * as fsCreateDirectory from './FileSystem/createDirectory.js';
import * as fsCopyFile from './FileSystem/copyFile.js';
import * as fsCreateSymbolicLink from './FileSystem/createSymbolicLink.js';
import * as fsReadSymbolicLink from './FileSystem/readSymbolicLink.js';
import * as fsListDirectory from './FileSystem/listDirectory.js';
import * as fsEnsureDirectory from './FileSystem/ensure.js';
import * as fsReadFileStatus from './FileSystem/readFileStatus.js';
import * as fsRemove from './FileSystem/remove.js';
import * as fsRename from './FileSystem/rename.js';
import * as fsWriteFile from './FileSystem/writeFile.js';
import * as fsMove from './FileSystem/move.js';

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
