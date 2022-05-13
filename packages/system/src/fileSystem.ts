import * as fsEmptyDirectory from './fileSystem/emptyDirectory';
import * as fsEnsureDirectory from './fileSystem/ensure';
import * as fs from './fileSystem/fs';

export namespace FileSystem {
  export const { emptyDirectory } = fsEmptyDirectory;
  export const { ensureDirectory, ensureFile, ensureSymbolicLink } = fsEnsureDirectory;
  export const { createDirectory, copyFile, listDirectory, remove, rename } = fs;
}
