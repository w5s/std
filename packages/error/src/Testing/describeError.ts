/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { TestingLibrary } from '@w5s/core-type';

/**
 * Create a spec for tagged Error class
 *
 * @example
 * ```typescript
 * describeError({ describe, it, expect })(MyCustomError, {
 *   defaultProperties: () => ({  })
 *   expectedName: 'MyCustomError',
 *   expectedDefaultMessage: 'My custom error default message',
 * });
 * ```
 * @param testingLibrary - Optional testing library to use. Automatically detects if not provided.
 */
export function describeError(testingLibrary: TestingLibrary) {
  const { describe, it, expect } = testingLibrary;
  return <Constructor extends abstract new (properties: any) => any>(
    subject: Constructor,
    spec: {
      defaultParameters: () => Constructor extends abstract new (properties: infer R) => any ? R : never;
      /**
       * Expected error name
       */
      expectedName: string;
      /**
       * Expected default message
       */
      expectedDefaultMessage: string;
    },
  ) => {
    describe('errorName', () => {
      it(`should be ${spec.expectedName}`, () => {
        expect((subject as any).errorName).toBe(spec.expectedName);
      });
    });
    describe('#name', () => {
      it(`should be ${spec.expectedName}`, () => {
        const error = new (subject as any)(spec.defaultParameters());
        expect(error.name).toEqual(spec.expectedName);
      });
    });
    describe('#message', () => {
      it(`uses default errorMessage`, () => {
        const error = new (subject as any)(spec.defaultParameters());
        expect(error.message).toBe(spec.expectedDefaultMessage);
      });
      it(`can be set in ${spec.expectedName}({ message })`, () => {
        const customTestMessage = 'This is a custom test message';
        const error = new (subject as any)({ ...spec.defaultParameters(), message: customTestMessage });
        expect(error.message).toBe(customTestMessage);
      });
    });
  };
}
