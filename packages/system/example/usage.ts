import { FileSystem, FilePath } from '@w5s/system';
import { Task } from '@w5s/core';

export async function main(): Promise<void> {
  const path = 'some/dir' as FilePath;
  const ensureTask = FileSystem.ensureDirectory(path);
  console.log(await Task.unsafeRun(ensureTask)); // > Result.Ok(false)
}
