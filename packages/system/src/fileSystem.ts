import * as fsEmptyDirectory from './fileSystem/emptyDirectory.js';
import * as fsEnsureDirectory from './fileSystem/ensure.js';
import * as fsReadFileStatus from './fileSystem/readFileStatus.js';
import * as fsRemove from './fileSystem/remove.js';
import * as fs from './fileSystem/fs.js';
import * as fsMove from './fileSystem/move.js';

export namespace FileSystem {
  export const { emptyDirectory } = fsEmptyDirectory;
  export const { ensureDirectory, ensureFile, ensureSymbolicLink } = fsEnsureDirectory;
  export const { readFileStatus, readSymbolicLinkStatus } = fsReadFileStatus;
  export const { createDirectory, createSymbolicLink, copyFile, listDirectory, readSymbolicLink, rename, writeFile } =
    fs;
  export const { move } = fsMove;
  export const { remove } = fsRemove;
}
