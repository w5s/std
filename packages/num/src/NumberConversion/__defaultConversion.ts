import type { NumberConversion } from '../NumberConversion.js';

const __defaultConversionInstance: NumberConversion<any> = {
  fromNumber: (n: number) => n,
  asNumber: (n: number) => n,
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
export const __defaultConversion = <T>(): NumberConversion<T> => __defaultConversionInstance;
