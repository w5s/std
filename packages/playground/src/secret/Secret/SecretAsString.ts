import type { AsString } from '@w5s/core';
import type { Secret } from '../Secret.js';

export const SecretAsString: AsString<Pick<Secret<unknown>, '_'>> = {
  asString(_self): string {
    return '<secret>';
  },
};
