import { type Option, Symbol } from '@w5s/core';
import * as fs from 'node:fs';
import nodePath from 'node:path';

import type { FilePath } from '../FilePath.js';

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

export interface FSStubModule extends AsyncDisposable {
  /**
   * Create a directory named `pathString` relative to `rootPath`
   *
   * @param pathString the path string
   */
  mkdir(pathString: string): Promise<Option<FilePath>>;

  /**
   * Return a new path
   *
   * @param parts
   */
  path(...parts: Array<string>): FilePath;

  /**
   *
   * @param target
   * @param path
   */
  symlink(target: string, path: string): Promise<void>;

  /**
   * A temporary path
   */
  tmpPath: FilePath;

  /**
   * Create a new `pathString` relative to `rootPath`
   *
   * @param pathString the path string
   */
  touch(pathString: string): Promise<void>;
}

/**
 * Return a new `FSStubModule`
 *
 * @example
 * ```typescript
 * await using fs = fsStub({
 *   cwd: // ...
 * });
 * ```
 * @param options
 */
export function fsStub(options: FSOptions = {}): FSStubModule {
  const {
    cwd = process.cwd(),

    testPath = () => nodePath.join('.cache', `test_${Math.random().toString(36)}`),
  } = options;
  const tmpPath = nodePath.join(cwd, testPath()) as FilePath;
  const dispose = () => fs.promises.rm(tmpPath, { force: true, recursive: true });
  const path = (...parts: Array<string>) => nodePath.join(tmpPath, ...parts) as FilePath;
  const mkdir = (pathString: string) => fs.promises.mkdir(pathString, { recursive: true }) as Promise<Option<FilePath>>;
  const { symlink } = fs.promises;
  const touch = async (pathString: string) => {
    await mkdir(nodePath.dirname(pathString));
    await fs.promises.writeFile(pathString, '');
  };
  return {
    mkdir,
    path,
    [Symbol.asyncDispose]: dispose,
    symlink,
    tmpPath,
    touch,
  };
}
