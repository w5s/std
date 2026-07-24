import nodePath from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

import { withFile } from './withFile.js';

describe('withFile', () => {
  const expectFile = withFile(expect);
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = nodePath.dirname(__filename);
  const fixtureDir = nodePath.join(__dirname, '__fixture__');

  describe('#toExist', () => {
    it('should assert file exist', async () => {
      await expect(async () => {
        await expectFile('blah').toExist();
      }).rejects.toEqual(
        expect.objectContaining({
          message: 'expected blah to exist',
          name: 'AssertionError',
        }),
      );
    });
  });
  describe('#toBeAFile', () => {
    it('should assert', async () => {
      await expect(async () => {
        await expectFile(__dirname).toBeAFile();
      }).rejects.toEqual(
        expect.objectContaining({
          message: `expected ${__dirname} to be a file`,
          name: 'AssertionError',
        }),
      );
    });
  });
  describe('#toBeADirectory', () => {
    it('should assert', async () => {
      await expect(async () => {
        await expectFile(__filename).toBeADirectory();
      }).rejects.toEqual(
        expect.objectContaining({
          message: `expected ${__filename} to be a directory`,
          name: 'AssertionError',
        }),
      );
    });
  });
  describe('#toBeASymbolicLink', () => {
    it('should assert', async () => {
      await expect(async () => {
        await expectFile(__filename).toBeASymbolicLink();
      }).rejects.toEqual(
        expect.objectContaining({
          message: `expected ${__filename} to be a symbolic link`,
          name: 'AssertionError',
        }),
      );
    });
  });
  describe('#toHaveFileContent', () => {
    it('should assert', async () => {
      await expect(async () => {
        await expectFile(nodePath.join(fixtureDir, 'test1')).toHaveFileContent('');
      }).rejects.toEqual(
        expect.objectContaining({
          message: String.raw`expected 'test1_content\n' to deeply equal ''`,
          name: 'AssertionError',
        }),
      );
    });
  });
  describe('#toHaveDirContent', () => {
    it('should assert', async () => {
      await expect(async () => {
        await expectFile(fixtureDir).toHaveDirContent([]);
      }).rejects.toEqual(
        expect.objectContaining({
          message: `expected [ 'test1', 'test2' ] to deeply equal []`,
          name: 'AssertionError',
        }),
      );
    });
  });
  describe('#toHaveDirLength', () => {
    it('should assert', async () => {
      await expect(async () => {
        await expectFile(nodePath.join(__dirname, '__fixture__')).toHaveDirLength(1);
      }).rejects.toEqual(
        expect.objectContaining({
          message: `expected [ 'test1', 'test2' ] to have property "length" with value 1`,
          name: 'AssertionError',
        }),
      );
    });
  });
});
