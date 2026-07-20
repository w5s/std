import type { NumberConversion } from '../NumberConversion.js';

const defaultConversionInstance: NumberConversion<any> = {
  fromNumber: (n: number) => n,
  asNumber: (n: number) => n,
};

export const defaultConversion = <T>(): NumberConversion<T> => defaultConversionInstance;
