import { Result, Symbol } from '@w5s/core';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { emptyDirectory } from './emptyDirectory.js';
import { expectTask } from '../_test/config.js';
import { fsStub, withFile } from '../testing.js';

describe('emptyDirectory', () => {
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
    await expectTask(emptyDirectory(fs.path())).result.resolves.toEqual(Result.Ok(undefined));
    await expectFile(fs.path()).toHaveDirContent([]);
  });

  it('should do nothing when empty', async () => {
    const target = fs.path('exist-and-empty');
    await fs.mkdir(target);

    await expectFile(target).toHaveDirContent([]);
    await expectTask(emptyDirectory(target)).result.resolves.toEqual(Result.Ok(undefined));
    await expectFile(target).toHaveDirContent([]);
  });

  it('should create directory when does not exist', async () => {
    const target = fs.path('does-not-exist');
    await expectTask(emptyDirectory(target)).result.resolves.toEqual(Result.Ok(undefined));
    await expectFile(target).toHaveDirContent([]);
  });
});
