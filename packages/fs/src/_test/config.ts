import { Task } from '@w5s/core';
import * as path from 'node:path';
// import * as url from 'node:url';

// eslint-disable-next-line unicorn/prefer-module
export const fsTestDir = __dirname; // path.dirname(url.fileURLToPath(import.meta.url));
export const anyNonExistFile = path.join(fsTestDir, 'not_exist_file.txt');
export const anyExistFile = path.join(fsTestDir, 'existing.txt');

export const anyNonExistDir = path.join(fsTestDir, 'not_exist_dir');
export const anyExistDir = fsTestDir;

export const expectTask = <Type extends 'sync' | 'async', Value, Error>(t: Task<Type, Value, Error>) => ({
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
