import { Task } from '@w5s/core';
import * as fs from 'node:fs';
import type { FilePath } from './data';

export function exists(filePath: FilePath): Task.Async<boolean, never> {
  return Task.Async(async ({ ok }) => {
    try {
      await fs.promises.access(filePath, fs.constants.F_OK);
      return ok(true);
    } catch {
      return ok(false);
    }
  });
}

export function existsSync(filePath: string): Task.Sync<boolean, never> {
  return Task.Sync(({ ok }) => {
    try {
      fs.accessSync(filePath, fs.constants.F_OK);
      return ok(true);
    } catch {
      return ok(false);
    }
  });
}
