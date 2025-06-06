import { describe } from 'vitest';
import { Int } from '@w5s/core';
import { describeAsString } from '@w5s/core/dist/Testing.js';
import { LogAsString } from './LogAsString.js';
import { of } from './of.js';

describe('LogAsString', () => {
  describeAsString(LogAsString, () => [
    [of('Info', Int(2)), 'Info'],
    [of('', Int(2)), ''],
  ]);
});
