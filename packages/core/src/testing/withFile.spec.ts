import { describe, expect, it } from 'vitest';
import { AssertionError } from 'node:assert';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { withFile } from './withFile.js';

describe('withFile', () => {
  const expectFile = withFile(expect);
  const __dirname = dirname(fileURLToPath(import.meta.url));

  describe('#toExist', () => {
    it('should assert file exist', async () => {
      await expect(async () => {
        await expectFile('blah').toExist();
      }).rejects.toEqual(
        new AssertionError({
          message: 'Expected blah to exist',
        })
      );
    });
  });
  describe('#toBeAFile', () => {
    it('should assert', async () => {
      await expect(async () => {
        await expectFile(__dirname).toBeAFile();
      }).rejects.toEqual(
        new AssertionError({
          message: `Expected ${__dirname} to be a file`,
        })
      );
    });
  });
});
