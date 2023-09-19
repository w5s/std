import * as nodePath from 'node:path';
import * as fs from 'node:fs';
import { Symbol } from '../symbol.js';
import type { Option } from '../option.js';

/**
 * Return a new `FSStubModule`
 *
 * @example
 * ```ts
 * await using fs = fsStub({
 *   cwd: // ...
 * });
 * ```
 * @param options
 */
export function fsStub(options: FSOptions): FSStubModule {
  const {
    cwd = process.cwd(),

    testPath = () => nodePath.join('.cache', `test_${Math.random().toString(36)}`),
  } = options;
  const tmpPath = nodePath.join(cwd, testPath());
  const dispose = () => fs.promises.rm(tmpPath, { recursive: true });
  const path = (...parts: string[]) => nodePath.join(tmpPath, ...parts);
  const mkdir = (pathString: string) => fs.promises.mkdir(pathString, { recursive: true });
  const touch = async (pathString: string) => {
    await mkdir(nodePath.dirname(pathString));
    await fs.promises.writeFile(pathString, '');
  };
  return {
    tmpPath,
    path,
    mkdir,
    touch,
    [Symbol.asyncDispose]: dispose,
  };
}

export interface FSStubModule extends AsyncDisposable {
  /**
   * A temporary path
   */
  tmpPath: string;
  /**
   * Return a new path
   *
   * @param parts
   */
  path(...parts: string[]): string;
  /**
   * Create a directory named `pathString` relative to `rootPath`
   *
   * @param pathString - the path string
   */
  mkdir(pathString: string): Promise<Option<string>>;
  /**
   * Create a new `pathString` relative to `rootPath`
   *
   * @param pathString - the path string
   */
  touch(pathString: string): Promise<void>;
}

/**
 * Options to create a fsStub
 */
export interface FSOptions {
  /**
   * Current working directory
   */
  cwd?: string;
  /**
   * Return a new sub path from `pwd`
   */
  testPath?: () => string;
}
