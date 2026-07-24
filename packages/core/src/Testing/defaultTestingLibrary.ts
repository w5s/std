import type { TestingLibrary } from '@w5s/core-type';

import { panic } from '@w5s/error';

const tryImport = async (path: string): Promise<TestingLibrary | undefined> => {
  try {
    const module = await import(path);

    return module;
  } catch {
    return undefined;
  }
};

const vitestLibrary = await tryImport('vitest');
const jestLibrary = await tryImport('@jest/globals');

export function defaultTestingLibrary() {
  return vitestLibrary ?? jestLibrary ?? panic(new ReferenceError('Cannot find testing library'));
}
