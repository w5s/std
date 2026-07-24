import * as fs from 'node:fs';

import type { FilePath } from '../FilePath.js';
import type { ErrnoException } from '../Internal.js';
// import * as url from 'node:url';

export const anyPath = 'anyPath' as FilePath;
export const anyError = new Error('AnyError');
export const anyErrnoException = (() => {
  try {
    fs.lstatSync('non-existent-file');
    return undefined as never;
  } catch (error: unknown) {
    return error as ErrnoException;
  }
})();

const randomBoolean = () => Math.random() >= 0.5;
const randomInt = () => Math.floor(Math.random() * 10_000_000_000);
const randomDate = () => new Date(Math.floor(Math.random() * 10_000_000_000));

export const generateStats = (): fs.Stats => {
  const isFile = randomBoolean();
  const isDirectory = randomBoolean();
  const isSymbolicLink = randomBoolean();
  const isBlockDevice = randomBoolean();
  const isCharacterDevice = randomBoolean();
  const isFIFO = randomBoolean();
  const isSocket = randomBoolean();
  return {
    atime: randomDate(),
    get atimeMs() {
      return this.atime.getTime();
    },
    // ctimeNs: Math.random(),
    birthtime: randomDate(),
    get birthtimeMs() {
      return this.birthtime.getTime();
    },
    blksize: randomInt(),
    blocks: randomInt(),
    // mtimeNs: Math.random(),
    ctime: randomDate(),
    get ctimeMs() {
      return this.ctime.getTime();
    },
    // birthtimeNs: Math.random(),
    dev: randomInt(),
    gid: randomInt(),
    ino: randomInt(),
    isBlockDevice: () => isBlockDevice,
    isCharacterDevice: () => isCharacterDevice,
    isDirectory: () => isDirectory,
    isFIFO: () => isFIFO,
    isFile: () => isFile,
    isSocket: () => isSocket,
    isSymbolicLink: () => isSymbolicLink,
    mode: randomInt(),
    // atimeNs: Math.random(),
    mtime: randomDate(),
    get mtimeMs() {
      return this.mtime.getTime();
    },
    nlink: randomInt(),
    rdev: randomInt(),
    size: 0,
    uid: randomInt(),
  };
};
