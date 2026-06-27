import { Comparable } from '@w5s/core/Comparable';
import type { Money } from './Money.js';
import { compare } from './compare.js';

export const MoneyComparable = Comparable<Money>({
  compare,
});
