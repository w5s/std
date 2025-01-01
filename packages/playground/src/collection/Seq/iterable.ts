import { Symbol } from '@w5s/core';

declare global {
  interface SymbolFor {
    readonly 'w5s.seqIterable': unique symbol;
  }
}

/**
 * Seq iterable symbol
 */
export const iterable: SymbolFor['w5s.seqIterable'] = Symbol.for('w5s.seqIterable');
