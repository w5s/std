import type { Type } from '../Type.js';
import { defaultTestingLibrary } from './defaultTestingLibrary.js';
import type { TestingLibrary } from './type.js';

export function describeType<T>(
  subject: Type<T>,
  properties: {
    typeName: string;
    instances: () => T[];
    notInstances: () => unknown[];
  },
  testingLibrary: TestingLibrary = defaultTestingLibrary(),
) {
  const { describe, it, expect } = testingLibrary;
  const { instances: instancesDefault, notInstances: notInstancesDefault } = properties;
  const instances = () => instancesDefault().map((instance) => ({ instance }));
  const notInstances = () => notInstancesDefault().map((instance) => ({ instance }));
  const fromData = [
    ...instancesDefault().map((_) => ({ value: _, expected: _ })),
    ...notInstancesDefault().map((_) => ({ value: _, expected: undefined })),
  ];

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

  (fromData.length === 0 ? describe.todo : describe)('asInstance', () => {
    it.each(fromData)('($value) returns $expected', ({ value, expected }) => {
      expect(subject.asInstance(value)).toEqual(expected);
    });
  });
}
