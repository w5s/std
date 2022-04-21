import { Task } from '@w5s/core';
import * as path from 'node:path';
import * as fs from 'node:fs';
import { FilePath } from '../path';
// import * as url from 'node:url';

// eslint-disable-next-line unicorn/prefer-module
export const fsTestDir = __dirname; // path.dirname(url.fileURLToPath(import.meta.url));
export const fsTestFile = (...parts: string[]) => path.join(fsTestDir, ...parts) as FilePath;

export const withTmpDirectory =
  (block: (context: { path: (...parts: string[]) => FilePath }) => Promise<void>) => async () => {
    const filePath = fsTestFile(`test${Math.random().toString(36)}`);
    try {
      await block({
        path: (...parts) => path.join(filePath, ...parts) as FilePath,
      });
    } finally {
      await fs.promises.rm(filePath, { recursive: true });
    }
  };

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
});
