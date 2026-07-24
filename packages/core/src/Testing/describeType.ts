import { inspect } from 'node:util';

import type { Type } from '../Type.js';
import type { TestingLibrary } from './type.js';

import { defaultTestingLibrary } from './defaultTestingLibrary.js';

/**
 * @example
 * ```typescript
 * describeType(BigDecimal, () => ({
 *   typeName: 'BigDecimal',
 *   instances: [BigDecimal.create({ value: 0n, scale: 0 }), BigDecimal.create({ value: -2n, scale: 0 })],
 *   notInstances: [null, undefined, '-2', 2],
 *   inspect: [
 *     [BigDecimal('1m'), '1m'],
 *     [BigDecimal('2.0m'), '2.0m'],
 *   ]
 * }));
 * ```
 * @param subject The type to describe.
 * @param properties A function that returns an object with the following properties
 * @param testingLibrary Optional testing library to use. Automatically detects if not provided.
 */
export function describeType<S extends Type<any>>(
  subject: S,
  properties: (subject: S) => {
    inspect?: Array<[instance: S extends Type<infer T> ? T : never, expected: string]>;
    instances: Array<S extends Type<infer T> ? T : never>;
    notInstances: Array<unknown>;
    typeName: string;
  },
  testingLibrary: TestingLibrary = defaultTestingLibrary(),
) {
  const { describe, expect, it } = testingLibrary;
  const {
    inspect: inspectDefault = [],
    instances: instancesDefault,
    notInstances: notInstancesDefault,
    typeName,
  } = properties(subject);
  const instances = () => instancesDefault.map((instance) => ({ instance }));
  const notInstances = () => notInstancesDefault.map((instance) => ({ instance }));
  const fromData = [
    ...instancesDefault.map((_) => ({ expected: _, value: _ })),
    ...notInstancesDefault.map((_) => ({ expected: undefined, value: _ })),
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
    it.each(fromData)('($value) returns $expected', ({ expected, value }) => {
      expect(subject.asInstance(value)).toEqual(expected);
    });
  });

  (inspectDefault.length === 0 ? describe.todo : describe)('node:util.inspect()', () => {
    it.each(inspectDefault)('($0) returns $1', (instance, expected) => {
      expect(inspect(instance)).toEqual(expected);
    });
  });
}
