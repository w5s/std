import { FileSystem, FilePath } from '@w5s/fs';
import { Task } from '@w5s/core';

export function main(): void {
  const path = 'some/dir' as FilePath;
  const ensureTask = FileSystem.ensureDirectory(path);
  console.log(Task.unsafeRun(ensureTask)); // > Result.Ok(false)
}
