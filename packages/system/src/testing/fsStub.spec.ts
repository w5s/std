import { describe, it, expect, afterAll } from 'vitest';
import * as nodePath from 'node:path';
import { Symbol } from '@w5s/core';
import { fsStub } from './fsStub.js';
import { withFile } from './withFile.js';

describe('fsStub', () => {
  const rootPath = nodePath.dirname(nodePath.dirname(__dirname));
  const cwd = rootPath;
  const fsContext = fsStub({
    cwd,
  });
  const { path, mkdir, touch } = fsContext;
  const expectFile = withFile(expect);

  afterAll(async () => {
    await fsContext[Symbol.asyncDispose]();
  });

  describe('path', () => {
    it('should return new path', () => {
      expect(path().startsWith(`${cwd}/.cache/test_`)).toBe(true);
    });
    it('should return new path', () => {
      expect(path('foo', 'bar').startsWith(`${cwd}/.cache/test_`)).toBe(true);
      expect(path('foo', 'bar').endsWith(`/foo/bar`)).toBe(true);
    });
  });
  describe('mkdir', () => {
    it('should return new path', async () => {
      const dirname = path('foo');
      await expectFile(dirname).not.toExist();
      await mkdir(dirname);
      await expectFile(dirname).toBeADirectory();
    });
  });
  describe('touch', () => {
    it('should return new path', async () => {
      const filename = path('bar', 'file');
      await expectFile(filename).not.toExist();
      await touch(filename);
      await expectFile(filename).toBeAFile();
    });
  });
});
