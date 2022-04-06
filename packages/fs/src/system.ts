import * as fsEnsureDirectory from './ensureDirectory';

export namespace FileSystem {
  export const { ensureDirectory, ensureDirectorySync } = fsEnsureDirectory;
}
