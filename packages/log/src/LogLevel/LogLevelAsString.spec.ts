import { describe } from 'vitest';
import { Int } from '@w5s/core/Int';
import { describeAsString } from '@w5s/core/Testing';
import { LogLevelAsString } from './LogLevelAsString.js';
import { of } from './of.js';

describe('LogAsString', () => {
  describeAsString(LogLevelAsString, () => [
    [of('Info', Int(2)), 'Info'],
    [of('', Int(2)), ''],
  ]);
});
