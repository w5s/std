import { FileSystem } from '@w5s/fs';
import { Task } from '@w5s/core';

export function main(): void {
  const ensureTask = FileSystem.ensureDirectory('some/dir');
  console.log(Task.unsafeRun(ensureTask)); // > Result.Ok(false)
}
