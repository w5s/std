import type { Int } from '@w5s/core-type';

import { describe, expect, it, vi } from 'vitest';

import type { Ordering } from '../Ordering.js';

import { Comparable } from '../Comparable.js';
import { Integral } from './Integral.js';

describe(Integral, () => {
  interface TestCustom {
    custom: boolean;
    value: number;
  }
  const TestComparable = Comparable({
    compare: (left: TestCustom, right: TestCustom) => Math.sign(left.value - right.value) as Ordering,
  });
  const TestType = {
    ...Integral({
      '%': (left, right) => ({ custom: true, value: (left.value % right.value) as Int }),
      '*': (left, right) => ({ custom: true, value: (left.value * right.value) as Int }),
      '+': (left, right) => ({ custom: true, value: (left.value + right.value) as Int }),

      '/': (left, right) => ({ custom: true, value: (left.value / right.value) as Int }),
      'asInt': (value) => value.value,
      'compare': TestComparable.compare,
      'fromInt': (value: Int) => ({ custom: true, value }),
    }),
    ...TestComparable,
  };

  it('extends Numeric', () => {
    expect(TestType).toEqual(
      expect.objectContaining({
        '*': expect.any(Function),
        '+': expect.any(Function),
      }),
    );
  });
  describe('/', () => {
    it('overrides with "/" when set', () => {
      const quot = vi.fn();
      const SomeType = Integral({
        ...TestType,
        '/': quot,
      });
      expect(SomeType['/']).toBe(quot);
    });
  });
  describe('%', () => {
    it('overrides with "%" when set', () => {
      const mod = vi.fn();
      const SomeType = Integral({
        ...TestType,
        '%': mod,
      });
      expect(SomeType['%']).toBe(mod);
    });
  });
});
