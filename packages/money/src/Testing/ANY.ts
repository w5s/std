import { factory } from '../Money/factory.js';
import { anyCurrency } from './anyCurrency.js';

/**
 * Return a new Money with a stub "ANY" currency
 *
 * @example
 * @param amount
 */
export const ANY = factory(anyCurrency.code);
