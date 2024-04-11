import type { Type } from '../Type.js';
import type { TestingLibrary } from './type.js';

export function describeType({ describe, it, expect }: TestingLibrary) {
  return <T>(
    subject: Type<T>,
    properties: {
      typeName: string;
      instances: () => T[];
      notInstances: () => unknown[];
    }
  ) => {
    const { instances: instancesDefault, notInstances: notInstancesDefault } = properties;
    const instances = () => instancesDefault().map((instance) => ({ instance }));
    const notInstances = () => notInstancesDefault().map((instance) => ({ instance }));

    describe('typeName', () => {
      it('is a constant', () => {
        expect(subject.typeName).toBe(properties.typeName);
      });
    });

    describe('hasInstance', () => {
      it.each(instances())('($instance) returns true for instances of type', ({ instance }) => {
        expect(subject.hasInstance(instance)).toBe(true);
      });
      it.each(notInstances())('($right, $left) returns false for non instances', ({ instance }) => {
        expect(subject.hasInstance(instance)).toBe(false);
      });
    });
  };
}
