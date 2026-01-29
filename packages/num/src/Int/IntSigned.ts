import type { Numeric } from '@w5s/core';
import { Signed } from '../NumberConversion/Signed.js';
import type { Int } from '../Int.js';

export const IntSigned: Numeric.Signed<Int> = Signed() as Numeric.Signed<Int>;
