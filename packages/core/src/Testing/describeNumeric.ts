import type { TestingLibrary } from '@w5s/core-type';
import type { Numeric } from '../Numeric.js';
import { defaultTestingLibrary } from './defaultTestingLibrary.js';
import { describeAdd } from './describeAdd.js';
import { describeZero } from './describeZero.js';
import { describeComparable } from './describeComparable.js';
import type { ComparableInterface } from '../Comparable.js';
import { describeMultiply } from './describeMultiply.js';
import { describeSubtract } from './describeSubtract.js';
import { describeSigned } from './describeSigned.js';
import type { EqualsInterface } from '../Equal.js';

export function describeNumeric<T>(
  subject: Numeric.Numeric<T> & ComparableInterface<T> & EqualsInterface<T>,
  testingLibrary: TestingLibrary = defaultTestingLibrary(),
) {
  const { zero, one, negate } = subject;
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
        { value: zero(), type: 'zero', sign: zero(), abs: zero() },
        { value: one(), type: 'positive', sign: one(), abs: one() },
        { value: minusOne(), type: 'negative', sign: minusOne(), abs: one() },
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
      ordered: () => [minusOne(), zero(), one()],
      equivalent: () => [
        [one(), one()],
        [zero(), zero()],
        [minusOne(), minusOne()],
      ],
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
