import * as fs from 'node:fs';

export interface ExpectFunction {
  (value: unknown): {
    toEqual(expected: unknown): void;
    not: {
      toEqual(expected: unknown): void;
    };
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
   * @param expectedContent
   */
  toHaveContent(expectedContent: string): Promise<void>;
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
}

/**
 * Test expect decorator for file assertions
 *
 * @example
 * @param expectFn
 */
export const withFile = (expectFn: ExpectFunction) => {
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
  const failDoesNotExist = (filePath: string) => fail(`Expected ${filePath} to exist`);
  const create = (filePath: string, isNot: boolean): ExpectFile => ({
    async toExist() {
      const stat = await lstat(filePath);
      const exists = stat != null;
      if (exists === isNot) {
        fail(`Expected ${filePath} ${isNot ? 'not ' : ''}to exist`);
      }
    },
    async toHaveContent(expectedContent: string) {
      const actualContent = await fs.promises.readFile(filePath, 'utf8');
      (isNot ? expectFn(actualContent).not : expectFn(actualContent)).toEqual(expectedContent);
    },
    async toBeADirectory() {
      const stat = (await lstat(filePath)) ?? failDoesNotExist(filePath);
      if (stat.isDirectory() === isNot) {
        fail(`Expected ${filePath} ${isNot ? 'not ' : ''}to be a directory`);
      }
    },
    async toBeAFile() {
      const stat = (await lstat(filePath)) ?? failDoesNotExist(filePath);
      if (stat.isFile() === isNot) {
        fail(`Expected ${filePath} ${isNot ? 'not ' : ''}to be a file`);
      }
    },
    async toBeASymbolicLink() {
      const stat = (await lstat(filePath)) ?? failDoesNotExist(filePath);
      if (stat.isSymbolicLink() === isNot) {
        fail(`Expected ${filePath} ${isNot ? 'not ' : ''}to be a symbolic link`);
      }
    },
  });
  return (filePath: string) =>
    Object.assign(create(filePath, false), {
      not: create(filePath, true),
    });
};
