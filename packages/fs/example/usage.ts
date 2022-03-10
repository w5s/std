import { FileSystem } from '@w5s/fs';
import { Task } from '@w5s/core';

export function main(): void {
  const existTask = FileSystem.exists('some/file.txt');
  console.log(Task.unsafeRun(existTask)); // > Result.Ok(false)
}
