import { describe, expect, it } from 'vitest';
import { withAsyncIterable } from '@w5s/iterable/dist/Testing.js';
import { decodeByName } from './decodeByName.js';
import { readLines } from './readLines.js';

describe(decodeByName, () => {
  const expectAsyncIterable = withAsyncIterable(expect);
  it('should decode header', async () => {
    const input = ['column', '1,col', 'umn2\na1,\na2,', ''];
    await expectAsyncIterable(readLines(input)).toHaveValues(['column1,column2', 'a1,', 'a2,']);
  });
});
