import type { Numeric } from '@w5s/core';
import { NumberSigned } from '../Number/NumberSigned.js';
import type { Int } from '../Int.js';

export const IntSigned: Numeric.Signed<Int> = NumberSigned as Numeric.Signed<Int>;
