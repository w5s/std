import * as fsExists from './exists.js';

export * from './data.js';

export namespace FileSystem {
  export const { exists, existsSync } = fsExists;
}
