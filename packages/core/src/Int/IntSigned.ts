import type { Int } from '../Int.js';
import { NumberSigned } from '../Number/NumberSigned.js';
import type { Numeric } from '../Numeric.js';

export const IntSigned: Numeric.Signed<Int> = NumberSigned as Numeric.Signed<Int>;
