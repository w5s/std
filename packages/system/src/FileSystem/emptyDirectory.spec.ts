import { Symbol } from '@w5s/core';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { withTask } from '@w5s/task/dist/Testing.js';
import { emptyDirectory } from './emptyDirectory.js';
import { fsStub, withFile } from '../Testing.js';

describe(emptyDirectory, () => {
  const expectTask = withTask(expect);
  const expectFile = withFile(expect);

  let fs = fsStub();

  beforeEach(() => {
    fs = fsStub();
  });

  afterEach(async () => {
    await fs[Symbol.asyncDispose]();
  });

  it('should delete all of the items when not empty', async () => {
    await Promise.all([
      fs.touch(fs.path('some-file')),
      fs.touch(fs.path('some-file-2')),
      fs.mkdir(fs.path('some-dir')),
    ]);

    await expectFile(fs.path()).toHaveDirContent(['some-dir', 'some-file', 'some-file-2']);
    const task = emptyDirectory(fs.path());
    await expectTask(task).toResolveAsync(undefined);
    await expectFile(fs.path()).toHaveDirContent([]);
  });

  it('should do nothing when empty', async () => {
    const target = fs.path('exist-and-empty');
    await fs.mkdir(target);

    await expectFile(target).toHaveDirContent([]);
    const task = emptyDirectory(target);
    await expectTask(task).toResolveAsync(undefined);
    await expectFile(target).toHaveDirContent([]);
  });

  it('should create directory when does not exist', async () => {
    const target = fs.path('does-not-exist');
    const task = emptyDirectory(target);
    await expectTask(task).toResolveAsync(undefined);
    await expectFile(target).toHaveDirContent([]);
  });
});
