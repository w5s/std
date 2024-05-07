import { FileSystem, FilePath } from '@w5s/system';
import { Task, Console } from '@w5s/core';

export function program(): Task<void, never> {
  const rootDirectory = FilePath('root_dir');
  const file = FilePath.concat([rootDirectory, 'file.txt']);
  const ensureTask = FileSystem.ensureFile(file);
  const logTask = Task.andThen(ensureTask, () => Console.debug(`Directory ${file} ensured`));
  const handledTask = Task.orElse(logTask, (error) => Console.error(`An error occurred: ${error.message}`));
  return handledTask;
}

Task.unsafeRun(program());
