import * as fsEmptyDirectory from './emptyDirectory';
import * as fsEnsureDirectory from './ensure';

export namespace FileSystem {
  export const { emptyDirectory } = fsEmptyDirectory;
  export const { ensureDirectory, ensureFile } = fsEnsureDirectory;
}
