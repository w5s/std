import { ignore, pipe, Task } from '@w5s/core';
import { FileError } from './error';
import { readdir, mkdir, rm } from './nodejs';
import { FilePath } from './path';

export function emptyDirectory(filePath: FilePath): Task<void, FileError> {
  return pipe(readdir(filePath)).to(
    (_) =>
      Task.andThen(_, (items) =>
        Task.all(
          items.map((item) =>
            rm(FilePath.join(filePath, item), {
              force: true,
              recursive: true,
            })
          )
        )
      ),
    (_) => Task.orElse(_, () => mkdir(filePath, { recursive: true })),
    (_) => Task.map(_, ignore)
  );
}
