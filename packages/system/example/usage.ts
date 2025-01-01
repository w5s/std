import { FileSystem, FilePath } from '@w5s/system';
import { Task } from '@w5s/task';

declare function log(message: string): Task<void, never>;
declare function logError(message: string): Task<void, never>;

export function program(): Task<void, never> {
  const rootDirectory = FilePath('root_dir');
  const file = FilePath.concat([rootDirectory, 'file.txt']);
  const ensureTask = FileSystem.ensureFile(file);
  const logTask = Task.andThen(ensureTask, () => log(`Directory ${file} ensured`));
  const handledTask = Task.orElse(logTask, (error) => logError(`An error occurred: ${error.message}`));
  return handledTask;
}

Task.unsafeRun(program());
