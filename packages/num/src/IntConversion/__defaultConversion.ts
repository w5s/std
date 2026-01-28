import type { Int } from '../Int.js';
import type { IntConversion } from '../IntConversion.js';

export const __defaultConversion: IntConversion<Int> = {
  fromInt: (n: Int) => n,
  asInt: (n: Int) => n,
};
