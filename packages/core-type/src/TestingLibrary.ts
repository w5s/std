/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import type { Awaitable } from './Awaitable.js';

export interface ExpectAssertionObject {
  toBeLessThan: (anyValue: any) => void;
  toBeGreaterThan: (anyValue: any) => void;
  toBe: (anyValue: unknown) => void;
  toEqual(expected: unknown): void;
  toHaveProperty(property: string | (string | number)[], value: unknown): void;
  toThrow(error: unknown): void;
}

export type ExpectAssertion = ExpectAssertionObject & {
  not: ExpectAssertionObject;
};

export interface ExpectFunction {
  (value: unknown): ExpectAssertion & {
    resolves: ExpectAssertion;
    rejects: ExpectAssertion;
  };
  fail: (message: string) => never;
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
    each: TestEachFunction;
  };
  expect: ExpectFunction;
}

export interface TestEachFunctionReturn<T extends any[]> {
  (name: string | Function, fn: (...args: T) => Awaitable<void> /* , options?: number | TestCollectorOptions */): void;
  (name: string | Function, /* , options: TestCollectorOptions, */ fn: (...args: T) => Awaitable<void>): void;
}
export interface TestEachFunction {
  <T extends any[] | [any]>(cases: ReadonlyArray<T>): TestEachFunctionReturn<T>;
  <T extends ReadonlyArray<any>>(cases: ReadonlyArray<T>): TestEachFunctionReturn<ExtractEachCallbackArgs<T>>;
  <T>(cases: ReadonlyArray<T>): TestEachFunctionReturn<T[]>;
  (...args: [TemplateStringsArray, ...any]): TestEachFunctionReturn<any[]>;
}

type ExtractEachCallbackArgs<T extends ReadonlyArray<any>> = {
  1: [T[0]];
  2: [T[0], T[1]];
  3: [T[0], T[1], T[2]];
  4: [T[0], T[1], T[2], T[3]];
  5: [T[0], T[1], T[2], T[3], T[4]];
  6: [T[0], T[1], T[2], T[3], T[4], T[5]];
  7: [T[0], T[1], T[2], T[3], T[4], T[5], T[6]];
  8: [T[0], T[1], T[2], T[3], T[4], T[5], T[6], T[7]];
  9: [T[0], T[1], T[2], T[3], T[4], T[5], T[6], T[7], T[8]];
  10: [T[0], T[1], T[2], T[3], T[4], T[5], T[6], T[7], T[8], T[9]];
  fallback: Array<T extends ReadonlyArray<infer U> ? U : any>;
}[T extends Readonly<[any]>
  ? 1
  : T extends Readonly<[any, any]>
    ? 2
    : T extends Readonly<[any, any, any]>
      ? 3
      : T extends Readonly<[any, any, any, any]>
        ? 4
        : T extends Readonly<[any, any, any, any, any]>
          ? 5
          : T extends Readonly<[any, any, any, any, any, any]>
            ? 6
            : T extends Readonly<[any, any, any, any, any, any, any]>
              ? 7
              : T extends Readonly<[any, any, any, any, any, any, any, any]>
                ? 8
                : T extends Readonly<[any, any, any, any, any, any, any, any, any]>
                  ? 9
                  : T extends Readonly<[any, any, any, any, any, any, any, any, any, any]>
                    ? 10
                    : 'fallback'];
