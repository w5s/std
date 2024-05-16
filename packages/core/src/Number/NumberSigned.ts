import type { Numeric } from '../Numeric.js';

export const NumberSigned: Numeric.Signed<number> = {
  abs: Math.abs,
  sign: Math.sign,
};
