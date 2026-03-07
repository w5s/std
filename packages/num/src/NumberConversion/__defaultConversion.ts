import type { NumberConversion } from '../NumberConversion.js';

const __defaultConversionInstance: NumberConversion<any> = {
  fromNumber: (n: number) => n,
  asNumber: (n: number) => n,
};

export const __defaultConversion = <T>(): NumberConversion<T> => __defaultConversionInstance;
