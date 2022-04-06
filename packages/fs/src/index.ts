import * as fsEnsureDirectory from './ensureDirectory';

export * from './data.js';
export * from './path.js';

export namespace FileSystem {
  export const { ensureDirectory, ensureDirectorySync } = fsEnsureDirectory;
}
