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
  expect: <V>(value: V) => {
    toBeLessThan: (anyValue: any) => void;
    toBeGreaterThan: (anyValue: any) => void;
    toBe: (anyValue: unknown) => void;
    toEqual: (anyValue: unknown) => void;
  };
}
