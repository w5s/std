import { describe } from 'vitest';
import { describeSigned } from '@w5s/core/dist/Testing.js';
import { NumberConversion } from '../NumberConversion.js';
import { Signed } from './Signed.js';

describe(Signed, () => {
  describeSigned(
    { ...NumberConversion.Comparable(), ...Signed() },
    {
      values: () => [
        { value: -2, type: 'negative', sign: -1, abs: 2 },
        { value: -1, type: 'negative', sign: -1, abs: 1 },
        { value: 0, type: 'zero', sign: 0, abs: 0 },
        { value: 1, type: 'positive', sign: 1, abs: 1 },
        { value: 2, type: 'positive', sign: 1, abs: 2 },
      ],
    },
  );

  const CustomConversion = {
    fromNumber: (v: number) => ({ custom: true, value: v }),
    asNumber: (v: { custom: true; value: number }) => v.value,
  };
  describeSigned(
    { ...NumberConversion.Comparable(CustomConversion), ...Signed(CustomConversion) },
    {
      values: () => [
        {
          value: CustomConversion.fromNumber(-2),
          type: 'negative',
          sign: CustomConversion.fromNumber(-1),
          abs: CustomConversion.fromNumber(2),
        },
        {
          value: CustomConversion.fromNumber(-1),
          type: 'negative',
          sign: CustomConversion.fromNumber(-1),
          abs: CustomConversion.fromNumber(1),
        },
        {
          value: CustomConversion.fromNumber(0),
          type: 'zero',
          sign: CustomConversion.fromNumber(0),
          abs: CustomConversion.fromNumber(0),
        },
        {
          value: CustomConversion.fromNumber(1),
          type: 'positive',
          sign: CustomConversion.fromNumber(1),
          abs: CustomConversion.fromNumber(1),
        },
        {
          value: CustomConversion.fromNumber(2),
          type: 'positive',
          sign: CustomConversion.fromNumber(1),
          abs: CustomConversion.fromNumber(2),
        },
      ],
    },
  );
});
