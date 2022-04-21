import * as fsEnsureDirectory from './ensureDirectory';

export * from './data.js';

export namespace FileSystem {
  export const { ensureDirectory } = fsEnsureDirectory;
}
