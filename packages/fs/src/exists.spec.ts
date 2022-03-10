import { Result } from '@w5s/core';
import { exists, existsSync } from './exists.js';
import { anyExistDir, anyExistFile, anyNonExistDir, anyNonExistFile, expectTask } from './_test/config.js';

describe(existsSync, () => {
  test('should work for existing and non existing files', async () => {
    expectTask(existsSync(anyNonExistFile)).result.toEqual(Result.Ok(false));
    expectTask(existsSync(anyExistFile)).result.toEqual(Result.Ok(true));
  });
  test('should work for existing and non existing directories', async () => {
    expectTask(existsSync(anyNonExistDir)).result.toEqual(Result.Ok(false));
    expectTask(existsSync(anyExistDir)).result.toEqual(Result.Ok(true));
  });
});
describe(exists, () => {
  test('should work for existing and non existing files', async () => {
    await expectTask(exists(anyNonExistFile)).resolves.toEqual(Result.Ok(false));
    await expectTask(exists(anyExistFile)).resolves.toEqual(Result.Ok(true));
  });
  test('should work for existing and non existing directories', async () => {
    await expectTask(exists(anyNonExistDir)).resolves.toEqual(Result.Ok(false));
    await expectTask(exists(anyExistDir)).resolves.toEqual(Result.Ok(true));
  });
});
