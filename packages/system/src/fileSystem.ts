import * as fsEmptyDirectory from './fileSystem/emptyDirectory.js';
import * as fsEnsureDirectory from './fileSystem/ensure.js';
import * as fs from './fileSystem/fs.js';
import * as fsMove from './fileSystem/move.js';

export namespace FileSystem {
  export const { emptyDirectory } = fsEmptyDirectory;
  export const { ensureDirectory, ensureFile, ensureSymbolicLink } = fsEnsureDirectory;
  export const {
    createDirectory,
    createSymbolicLink,
    copyFile,
    listDirectory,
    readFileStatus,
    readSymbolicLink,
    readSymbolicLinkStatus,
    remove,
    rename,
    writeFile,
  } = fs;
  export const { move } = fsMove;
}
