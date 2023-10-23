import { invariant } from '@w5s/invariant';

export function addTwo(value: unknown) {
  invariant(typeof value === 'number', `${String(value)} must be number`); // Throw error if first parameter is not true
  // value: boolean
  return value + 2;
}
