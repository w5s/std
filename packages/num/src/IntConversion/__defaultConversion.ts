import type { Int } from '../Int.js';
import type { IntConversion } from '../IntConversion.js';

const __defaultConversionInstance: IntConversion<any> = {
  fromInt: (n: Int) => n,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  asInt: (n: any): Int => n,
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
export const __defaultConversion = <T>(): IntConversion<T> => __defaultConversionInstance;
