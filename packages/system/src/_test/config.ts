import { Task } from '@w5s/core';
import * as path from 'node:path';
import * as fs from 'node:fs';
import type { FilePath } from '../path';
import type { ErrnoException } from '../internal';
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

export const expectTask = <Value, Error>(t: Task<Value, Error>) => ({
  get result() {
    return expect(Task.unsafeRun(t));
  },
  get resolves() {
    return this.result.resolves;
  },
  get rejects() {
    return this.result.rejects;
  },
});

export const expectFile = (filePath: string) => ({
  async toExist() {
    await expect(fs.promises.stat(filePath)).resolves.not.toThrow();
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
