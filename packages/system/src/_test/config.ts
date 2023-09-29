import * as fs from 'node:fs';
import { Task, unsafeRun } from '@w5s/core';
// eslint-disable-next-line import/no-extraneous-dependencies
import { expect } from 'vitest';
import type { FilePath } from '../filePath.js';
import type { ErrnoException } from '../internal.js';
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
    isFile: () => isFile,
    isDirectory: () => isDirectory,
    isSymbolicLink: () => isSymbolicLink,
    isBlockDevice: () => isBlockDevice,
    isCharacterDevice: () => isCharacterDevice,
    isFIFO: () => isFIFO,
    isSocket: () => isSocket,
    size: 0,
    atime: randomDate(),
    get atimeMs() {
      return this.atime.getTime();
    },
    // atimeNs: Math.random(),
    mtime: randomDate(),
    get mtimeMs() {
      return this.mtime.getTime();
    },
    // mtimeNs: Math.random(),
    ctime: randomDate(),
    get ctimeMs() {
      return this.ctime.getTime();
    },
    // ctimeNs: Math.random(),
    birthtime: randomDate(),
    get birthtimeMs() {
      return this.birthtime.getTime();
    },
    // birthtimeNs: Math.random(),
    dev: randomInt(),
    ino: randomInt(),
    mode: randomInt(),
    nlink: randomInt(),
    uid: randomInt(),
    gid: randomInt(),
    rdev: randomInt(),
    blksize: randomInt(),
    blocks: randomInt(),
  };
};

export const expectTask = <Value, Error>(t: Task<Value, Error>) => ({
  get result() {
    return expect(unsafeRun(t));
  },
});
