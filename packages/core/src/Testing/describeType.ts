import type { Type } from '../Type.js';
import { defaultTestingLibrary } from './defaultTestingLibrary.js';
import type { TestingLibrary } from './type.js';

/**
 * @example
 * ```typescript
 * describeType(BigDecimal, () => ({
 *   typeName: 'BigDecimal',
 *   instances: [BigDecimal.create({ value: 0n, scale: 0 }), BigDecimal.create({ value: -2n, scale: 0 })],
 *   notInstances: [null, undefined, '-2', 2],
 * }));
 * ```
 * @param subject - The type to describe.
 * @param properties - A function that returns an object with the following properties
 * @param testingLibrary - Optional testing library to use. Automatically detects if not provided.
 */
export function describeType<S extends Type<any>>(
  subject: S,
  properties: (subject: S) => {
    typeName: string;
    instances: Array<S extends Type<infer T> ? T : never>;
    notInstances: Array<unknown>;
  },
  testingLibrary: TestingLibrary = defaultTestingLibrary(),
) {
  const { describe, it, expect } = testingLibrary;
  const { typeName, instances: instancesDefault, notInstances: notInstancesDefault } = properties(subject);
  const instances = () => instancesDefault.map((instance) => ({ instance }));
  const notInstances = () => notInstancesDefault.map((instance) => ({ instance }));
  const fromData = [
    ...instancesDefault.map((_) => ({ value: _, expected: _ })),
    ...notInstancesDefault.map((_) => ({ value: _, expected: undefined })),
  ];

  describe('typeName', () => {
    it('is a constant', () => {
      expect(subject.typeName).toBe(typeName);
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
