import * as fsEmptyDirectory from './FileSystem/emptyDirectory.js';
import * as fsCreateDirectory from './FileSystem/createDirectory.js';
import * as fsCopyFile from './FileSystem/copyFile.js';
import * as fsCreateSymbolicLink from './FileSystem/createSymbolicLink.js';
import * as fsReadSymbolicLink from './FileSystem/readSymbolicLink.js';
import * as fsListDirectory from './FileSystem/listDirectory.js';
import * as fsEnsure from './FileSystem/ensure.js';
import * as fsReadFileStatus from './FileSystem/readFileStatus.js';
import * as fsRemove from './FileSystem/remove.js';
import * as fsRename from './FileSystem/rename.js';
import * as fsWriteFile from './FileSystem/writeFile.js';
import * as fsMove from './FileSystem/move.js';

/**
 * @namespace
 */
export const FileSystem = {
  ...fsCopyFile,
  ...fsCreateDirectory,
  ...fsCreateSymbolicLink,
  ...fsReadSymbolicLink,
  ...fsListDirectory,
  emptyDirectory: fsEmptyDirectory.emptyDirectory,
  ensureDirectory: fsEnsure.ensureDirectory,
  ensureFile: fsEnsure.ensureFile,
  ensureSymbolicLink: fsEnsure.ensureSymbolicLink,
  ...fsReadFileStatus,
  ...fsRename,
  ...fsWriteFile,
  move: fsMove.move,
  ...fsRemove,
};
