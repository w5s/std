import type { TestingLibrary } from '@w5s/core-type';
import { panic } from '@w5s/error';

const __tryImport = async (path: string): Promise<TestingLibrary | undefined> => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const module = await import(path);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return module;
  } catch {
    return undefined;
  }
};

const vitestLibrary = await __tryImport('vitest');
const jestLibrary = await __tryImport('@jest/globals');

export function defaultTestingLibrary() {
  return vitestLibrary ?? jestLibrary ?? panic(new ReferenceError('Cannot find testing library'));
}
