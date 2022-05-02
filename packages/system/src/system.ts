import * as fsEmptyDirectory from './emptyDirectory';
import * as fsEnsureDirectory from './ensureDirectory';

export namespace FileSystem {
  export const { emptyDirectory } = fsEmptyDirectory;
  export const { ensureDirectory } = fsEnsureDirectory;
}
