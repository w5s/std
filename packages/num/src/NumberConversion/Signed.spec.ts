import { describeSigned } from '@w5s/core/dist/Testing.js';
import { describe } from 'vitest';

import { NumberConversion } from '../NumberConversion.js';
import { Signed } from './Signed.js';

describe(Signed, () => {
  describeSigned(
    { ...NumberConversion.Comparable(), ...Signed() },
    {
      values: () => [
        { abs: 2, sign: -1, type: 'negative', value: -2 },
        { abs: 1, sign: -1, type: 'negative', value: -1 },
        { abs: 0, sign: 0, type: 'zero', value: 0 },
        { abs: 1, sign: 1, type: 'positive', value: 1 },
        { abs: 2, sign: 1, type: 'positive', value: 2 },
      ],
    },
  );

  const CustomConversion = {
    asNumber: (v: { custom: true; value: number }) => v.value,
    fromNumber: (v: number) => ({ custom: true, value: v }),
  };
  describeSigned(
    { ...NumberConversion.Comparable(CustomConversion), ...Signed(CustomConversion) },
    {
      values: () => [
        {
          abs: CustomConversion.fromNumber(2),
          sign: CustomConversion.fromNumber(-1),
          type: 'negative',
          value: CustomConversion.fromNumber(-2),
        },
        {
          abs: CustomConversion.fromNumber(1),
          sign: CustomConversion.fromNumber(-1),
          type: 'negative',
          value: CustomConversion.fromNumber(-1),
        },
        {
          abs: CustomConversion.fromNumber(0),
          sign: CustomConversion.fromNumber(0),
          type: 'zero',
          value: CustomConversion.fromNumber(0),
        },
        {
          abs: CustomConversion.fromNumber(1),
          sign: CustomConversion.fromNumber(1),
          type: 'positive',
          value: CustomConversion.fromNumber(1),
        },
        {
          abs: CustomConversion.fromNumber(2),
          sign: CustomConversion.fromNumber(1),
          type: 'positive',
          value: CustomConversion.fromNumber(2),
        },
      ],
    },
  );
});
