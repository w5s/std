import type { NumberConversion } from '../NumberConversion.js';

const defaultConversionInstance: NumberConversion<any> = {
  asNumber: (n: number) => n,
  fromNumber: (n: number) => n,
};

// eslint-disable-next-line ts/no-unsafe-return
export const defaultConversion = <T>(): NumberConversion<T> => defaultConversionInstance;
