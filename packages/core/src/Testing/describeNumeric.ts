import type { TestingLibrary } from '@w5s/core-type';

import type { ComparableInterface } from '../Comparable.js';
import type { EqualsInterface } from '../Equal.js';
import type { Numeric } from '../Numeric.js';

import { defaultTestingLibrary } from './defaultTestingLibrary.js';
import { describeAdd } from './describeAdd.js';
import { describeComparable } from './describeComparable.js';
import { describeMultiply } from './describeMultiply.js';
import { describeSigned } from './describeSigned.js';
import { describeSubtract } from './describeSubtract.js';
import { describeZero } from './describeZero.js';

export function describeNumeric<T>(
  subject: ComparableInterface<T> & EqualsInterface<T> & Numeric.Numeric<T>,
  testingLibrary: TestingLibrary = defaultTestingLibrary(),
) {
  const { negate, one, zero } = subject;
  const minusOne = () => negate(one());

  describeAdd(
    subject,
    [
      { call: [zero(), zero()], returns: zero() },
      { call: [zero(), one()], returns: one() },
      { call: [one(), zero()], returns: one() },
      { call: [one(), minusOne()], returns: zero() },
    ],
    testingLibrary,
  );
  describeSigned(
    subject,
    {
      values: () => [
        { abs: zero(), sign: zero(), type: 'zero', value: zero() },
        { abs: one(), sign: one(), type: 'positive', value: one() },
        { abs: one(), sign: minusOne(), type: 'negative', value: minusOne() },
      ],
    },
    testingLibrary,
  );
  describeSubtract(
    subject,
    [
      { call: [zero(), zero()], returns: zero() },
      { call: [one(), zero()], returns: one() },
      { call: [zero(), one()], returns: minusOne() },
      { call: [one(), one()], returns: zero() },
    ],
    testingLibrary,
  );
  describeMultiply(
    subject,
    [
      { call: [zero(), zero()], returns: zero() },
      { call: [zero(), one()], returns: zero() },
      { call: [one(), zero()], returns: zero() },
      { call: [one(), one()], returns: one() },
    ],
    testingLibrary,
  );
  describeComparable(
    subject,
    {
      equivalent: () => [
        [one(), one()],
        [zero(), zero()],
        [minusOne(), minusOne()],
      ],
      ordered: () => [minusOne(), zero(), one()],
    },
    testingLibrary,
  );
  describeZero(
    subject,
    {
      nonZero: () => [one(), minusOne()],
    },
    testingLibrary,
  );
}
