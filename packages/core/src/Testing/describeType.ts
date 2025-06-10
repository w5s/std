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
 *   inspect: [
 *     [BigDecimal('1m'), '1m'],
 *     [BigDecimal('2.0m'), '2.0m'],
 *   ]
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
    inspect?: Array<[instance: S extends Type<infer T> ? T : never, expected: string]>;
  },
  testingLibrary: TestingLibrary = defaultTestingLibrary(),
) {
  const { describe, it, expect } = testingLibrary;
  const {
    typeName,
    instances: instancesDefault,
    notInstances: notInstancesDefault,
    inspect: inspectDefault = [],
  } = properties(subject);
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

  (inspectDefault.length === 0 ? describe.todo : describe)('node:util.inspect()', () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, global-require, @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires, unicorn/prefer-module
    const { inspect } = require('node:util');

    it.each(inspectDefault)('($0) returns $1', (instance, expected) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      expect(inspect(instance)).toEqual(expected);
    });
  });
}
