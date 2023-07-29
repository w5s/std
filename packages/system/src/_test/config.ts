import * as path from 'node:path';
import * as fs from 'node:fs';
import { Task, unsafeRun } from '@w5s/core';
// eslint-disable-next-line import/no-extraneous-dependencies
import { expect } from 'vitest';
import type { FilePath } from '../filePath.js';
import type { ErrnoException } from '../internal.js';
// import * as url from 'node:url';

// eslint-disable-next-line unicorn/prefer-module
export const fsTestDir = __dirname; // path.dirname(url.fileURLToPath(import.meta.url));
export const fsTestFile = (...parts: string[]) => path.join(fsTestDir, ...parts) as FilePath;

export const withTmpDirectory =
  (
    block: (context: {
      filePath: (...parts: string[]) => FilePath;
      createDir: (path: string) => Promise<string | undefined>;
      createFile: (path: string) => Promise<void>;
    }) => Promise<void>
  ) =>
  async () => {
    const filePath = fsTestFile(`test${Math.random().toString(36)}`);
    try {
      await fs.promises.mkdir(filePath, { recursive: true });
      await block({
        filePath: (...parts) => path.join(filePath, ...parts) as FilePath,
        createDir: (pathString) => fs.promises.mkdir(pathString, { recursive: true }),
        createFile: (pathString) => fs.promises.writeFile(pathString, ''),
      });
    } finally {
      await fs.promises.rm(filePath, { recursive: true });
    }
  };

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

export const expectFile = (filePath: string) => ({
  not: {
    async toExist() {
      await expect(fs.promises.stat(filePath)).rejects.toEqual(expect.anything());
    },
  },
  async toHaveContent(expectedContent: string) {
    const actualContent = await fs.promises.readFile(filePath, 'utf8');
    expect(actualContent).toEqual(expectedContent);
  },
  async toExist() {
    await expect(fs.promises.stat(filePath)).resolves.toEqual(expect.anything());
  },
  async toBeADirectory() {
    try {
      const stat = await fs.promises.lstat(filePath);
      if (!stat.isDirectory()) {
        throw new Error(`Expected ${filePath} to be a directory`);
      }
    } catch {
      throw new Error(`Expected ${filePath} to exist`);
    }
  },
  async toBeAFile() {
    try {
      const stat = await fs.promises.lstat(filePath);
      if (!stat.isFile()) {
        throw new Error(`Expected ${filePath} to be a file`);
      }
    } catch {
      throw new Error(`Expected ${filePath} to exist`);
    }
  },
  async toBeASymbolicLink() {
    try {
      const stat = await fs.promises.lstat(filePath);
      if (!stat.isSymbolicLink()) {
        throw new Error(`Expected ${filePath} to be a symbolic link`);
      }
    } catch {
      throw new Error(`Expected ${filePath} to exist`);
    }
  },
});

export const expectDir = (filePath: string) => ({
  async toHaveLength(length: number) {
    return expect(fs.promises.readdir(filePath)).resolves.toHaveLength(length);
  },
});
