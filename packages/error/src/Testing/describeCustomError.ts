import type { TestingLibrary } from '@w5s/core-type';
import type { CustomError } from '../CustomError.js';

/**
 * Create a spec for a CustomError
 *
 * @example
 * ```ts
 * describeCustomError({ describe, it, expect })(MyCustomError, {
 *   defaultProperties: () => ({  })
 *   expectedName: 'MyCustomError',
 *   expectedDefaultMessage: 'My custom error default message',
 * });
 * ```
 * @param testingLibrary
 */
export function describeCustomError(testingLibrary: TestingLibrary) {
  const { describe, it, expect } = testingLibrary;
  return <Model extends CustomError<{ name: string }>>(
    subject: CustomError.Module<Model>,
    spec: {
      defaultParameters: () => CustomError.ParametersProperties<Model>;
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
        expect(subject.errorName).toBe(spec.expectedName);
      });
    });
    describe('#name', () => {
      it(`should be ${spec.expectedName}`, () => {
        const error = subject.create(spec.defaultParameters());
        expect(error.name).toEqual(spec.expectedName);
      });
    });
    describe('#message', () => {
      it(`uses default errorMessage`, () => {
        const error = subject.create(spec.defaultParameters());
        expect(error.message).toBe(spec.expectedDefaultMessage);
      });
      it(`can be set in ${spec.expectedName}({ message })`, () => {
        const customTestMessage = 'This is a custom test message';
        const error = subject.create({ ...spec.defaultParameters(), message: customTestMessage });
        expect(error.message).toBe(customTestMessage);
      });
    });
  };
}
