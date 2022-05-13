import { ignore, pipe, Task } from '@w5s/core';
import { FileError } from '../error';
import { listDirectory, createDirectory, remove } from './fs';
import { FilePath } from '../path';

export function emptyDirectory(filePath: FilePath): Task<void, FileError> {
  return pipe(listDirectory(filePath)).to(
    (_) =>
      Task.andThen(_, (items) =>
        Task.all(
          items.map((item) =>
            remove(FilePath.join(filePath, item), {
              force: true,
              recursive: true,
            })
          )
        )
      ),
    (_) => Task.orElse(_, () => createDirectory(filePath, { recursive: true })),
    (_) => Task.map(_, ignore)
  );
}
