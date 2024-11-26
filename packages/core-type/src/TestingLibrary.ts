export interface ExpectAssertionObject {
  toBeLessThan: (anyValue: any) => void;
  toBeGreaterThan: (anyValue: any) => void;
  toBe: (anyValue: unknown) => void;
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

/**
 * Common interface for testing libraries like jest and vitest
 */
export interface TestingLibrary {
  describe: {
    (description: string, fn: () => void): void;
    todo: (description: string, fn: () => void) => void;
  };
  it: {
    (description: string, fn: () => void): void;
    todo: (description: string, fn: () => void) => void;
    each: <T>(values: ReadonlyArray<T>) => (description: string, fn: (value: T) => void) => void;
  };
  expect: ExpectFunction;
}
