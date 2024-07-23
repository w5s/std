import * as fs from 'node:fs';

export interface ExpectAssertionObject {
  toEqual(expected: unknown): void;
  toHaveProperty(property: string | (string | number)[], value: unknown): void;
}

export type ExpectAssertion = ExpectAssertionObject & {
  not: ExpectAssertionObject;
};

export interface ExpectFunction {
  (value: unknown): ExpectAssertion & {
    resolves: ExpectAssertion;
    rejects: ExpectAssertion;
  };
  fail(message: string): never;
}

export interface ExpectFile {
  /**
   * Assert that the file exists
   */
  toExist(): Promise<void>;
  /**
   * Assert that the file has the content equals to `expectedContent`
   *
   * @param expectedContent - the expected content
   */
  toHaveFileContent(expectedContent: string): Promise<void>;
  /**
   * Assert that the file is (not) a directory
   */
  toBeADirectory(): Promise<void>;
  /**
   * Assert that the file is a (not) file
   */
  toBeAFile(): Promise<void>;
  /**
   * Assert that the file is (not) a symbolic link
   */
  toBeASymbolicLink(): Promise<void>;
  /**
   * Assert that a file (not) containing `expectedContent` entries
   *
   * @param expectedContent - the expected entry list
   */
  toHaveDirContent(expectedContent: string[]): Promise<void>;
  /**
   * Assert that a file (not) containing `expectedLength` entry count
   *
   * @param expectedLength - the expected length
   */
  toHaveDirLength(expectedLength: number): Promise<void>;
}

/**
 * Test expect decorator for file assertions
 *
 * @example
 * ```ts
 * const expectFile = withFile(expect);
 *
 * test('something', async () => {
 *   const someFile = 'path/to/some/file';
 *   await expectFile(someFile).toExist();
 * });
 * ```
 * @param expectFn
 */
export function withFile(expectFn: ExpectFunction) {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { fail } = expectFn;
  const lstat = async (filePath: string) => {
    try {
      const stat = await fs.promises.lstat(filePath);
      return stat;
    } catch {
      return undefined;
    }
  };
  const expectIf = (isNot: boolean, value: string) => {
    const expectValue = expectFn(value);
    return isNot ? expectValue.not : expectValue;
  };
  const failDoesNotExist = (filePath: string) => fail(`expected ${filePath} to exist`);
  const create = (filePath: string, isNot: boolean): ExpectFile => ({
    async toExist() {
      const stat = await lstat(filePath);
      const exists = stat != null;
      if (exists === isNot) {
        fail(`expected ${filePath} ${isNot ? 'not ' : ''}to exist`);
      }
    },
    async toHaveFileContent(expectedContent: string) {
      const actualContent = await fs.promises.readFile(filePath, 'utf8');
      expectIf(isNot, actualContent).toEqual(expectedContent);
    },
    async toBeADirectory() {
      const stat = (await lstat(filePath)) ?? failDoesNotExist(filePath);
      if (stat.isDirectory() === isNot) {
        fail(`expected ${filePath} ${isNot ? 'not ' : ''}to be a directory`);
      }
    },
    async toBeAFile() {
      const stat = (await lstat(filePath)) ?? failDoesNotExist(filePath);
      if (stat.isFile() === isNot) {
        fail(`expected ${filePath} ${isNot ? 'not ' : ''}to be a file`);
      }
    },
    async toBeASymbolicLink() {
      const stat = (await lstat(filePath)) ?? failDoesNotExist(filePath);
      if (stat.isSymbolicLink() === isNot) {
        fail(`expected ${filePath} ${isNot ? 'not ' : ''}to be a symbolic link`);
      }
    },
    async toHaveDirContent(content: string[]) {
      return expectFn(fs.promises.readdir(filePath)).resolves.toEqual(content);
    },
    async toHaveDirLength(length: number) {
      return expectFn(fs.promises.readdir(filePath)).resolves.toHaveProperty('length', length);
    },
  });
  return (filePath: string) =>
    Object.assign(create(filePath, false), {
      not: create(filePath, true),
    });
}
