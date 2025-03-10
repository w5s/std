import { describe, expect, it } from 'vitest';
import nodePath from 'node:path';
import { fileURLToPath } from 'node:url';
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
          name: 'AssertionError',
          message: 'expected blah to exist',
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
          name: 'AssertionError',
          message: `expected ${__dirname} to be a file`,
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
          name: 'AssertionError',
          message: `expected ${__filename} to be a directory`,
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
          name: 'AssertionError',
          message: `expected ${__filename} to be a symbolic link`,
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
          name: 'AssertionError',
          message: `expected 'test1_content\\n' to deeply equal ''`,
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
          name: 'AssertionError',
          message: `expected [ 'test1', 'test2' ] to deeply equal []`,
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
          name: 'AssertionError',
          message: `expected [ 'test1', 'test2' ] to have property "length" with value 1`,
        }),
      );
    });
  });
});
