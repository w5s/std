import { describe } from 'vitest';
import { describeAsString } from '@w5s/core/dist/Testing.js';
import { TimeDurationAsString } from './TimeDurationAsString.js';
import { from } from './from.js';

describe('TimeDurationAsString', () => {
  describeAsString(
    TimeDurationAsString,
    () => [
      [from({ milliseconds: 0 }), '0ms'],
      [from({ milliseconds: 999 }), '999ms'],
      [from({ milliseconds: -999 }), '-999ms'],
    ],
    { asString: true, String: false },
  );
});
