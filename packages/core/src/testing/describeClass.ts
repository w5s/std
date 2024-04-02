import type { Class } from '../Class.js';
import type { TestingLibrary } from './type.js';

export function describeClass({ describe, it, expect }: TestingLibrary) {
  return <T>(
    subject: Class<T>,
    properties: {
      instances: () => T[];
      notInstances: () => unknown[];
    }
  ) => {
    const { instances: instancesDefault, notInstances: notInstancesDefault } = properties;
    const instances = () => instancesDefault().map((instance) => ({ instance }));
    const notInstances = () => notInstancesDefault().map((instance) => ({ instance }));

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
