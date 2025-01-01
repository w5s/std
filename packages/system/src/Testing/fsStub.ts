import nodePath from 'node:path';
import * as fs from 'node:fs';
import { Symbol, type Option } from '@w5s/core';
import type { FilePath } from '../FilePath.js';

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
  const dispose = () => fs.promises.rm(tmpPath, { recursive: true, force: true });
  const path = (...parts: string[]) => nodePath.join(tmpPath, ...parts) as FilePath;
  const mkdir = (pathString: string) => fs.promises.mkdir(pathString, { recursive: true }) as Promise<Option<FilePath>>;
  const { symlink } = fs.promises;
  const touch = async (pathString: string) => {
    await mkdir(nodePath.dirname(pathString));
    await fs.promises.writeFile(pathString, '');
  };
  return {
    tmpPath,
    path,
    mkdir,
    symlink,
    touch,
    [Symbol.asyncDispose]: dispose,
  };
}

export interface FSStubModule extends AsyncDisposable {
  /**
   * A temporary path
   */
  tmpPath: FilePath;
  /**
   * Return a new path
   *
   * @param parts
   */
  path(...parts: string[]): FilePath;
  /**
   * Create a directory named `pathString` relative to `rootPath`
   *
   * @param pathString - the path string
   */
  mkdir(pathString: string): Promise<Option<FilePath>>;
  /**
   *
   * @param target
   * @param path
   */
  symlink(target: string, path: string): Promise<void>;
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
