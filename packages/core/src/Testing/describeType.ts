import type { Option } from '../Option.js';
import type { Type } from '../Type.js';
import type { TestingLibrary } from './type.js';

export function describeType(testingLibrary: TestingLibrary) {
  const { describe, it, expect } = testingLibrary;
  return <T>(
    subject: Type<T>,
    properties: {
      typeName: string;
      instances: () => T[];
      notInstances: () => unknown[];
      from?: () => [unknown, Option<T>][];
    },
  ) => {
    const { instances: instancesDefault, notInstances: notInstancesDefault, from } = properties;
    const instances = () => instancesDefault().map((instance) => ({ instance }));
    const notInstances = () => notInstancesDefault().map((instance) => ({ instance }));
    const fromData =
      from == null
        ? [
            ...instancesDefault().map((_) => ({ value: _, expected: _ })),
            ...notInstancesDefault().map((_) => ({ value: _, expected: undefined })),
          ]
        : from().map(([value, expected]) => ({ value, expected }));

    describe('typeName', () => {
      it('is a constant', () => {
        expect(subject.typeName).toBe(properties.typeName);
      });
    });

    describe('hasInstance', () => {
      it.each(instances())('($instance) returns true for instances of type', ({ instance }) => {
        expect(subject.hasInstance(instance)).toBe(true);
      });
      it.each(notInstances())('($instance) returns false for non instances', ({ instance }) => {
        expect(subject.hasInstance(instance)).toBe(false);
      });
    });

    (fromData.length === 0 ? describe.todo : describe)('from', () => {
      it.each(fromData)('($value) returns $expected', ({ value, expected }) => {
        expect(subject.from(value)).toEqual(expected);
      });
    });
  };
}
