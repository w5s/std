import * as fsEmptyDirectory from './emptyDirectory';
import * as fsEnsureDirectory from './ensure';
import * as fs from './nodejs';

export namespace FileSystem {
  export const { emptyDirectory } = fsEmptyDirectory;
  export const { ensureDirectory, ensureFile, ensureSymbolicLink } = fsEnsureDirectory;
  export const { remove } = fs;
}
