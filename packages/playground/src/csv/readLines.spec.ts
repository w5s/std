import { describe, expect, it } from 'vitest';
import { decodeByName } from './decodeByName.js';
import { withAsyncIterable } from '../iterable/Testing.js';
import { readLines } from './readLines.js';

describe(decodeByName, () => {
  const expectAsyncIterable = withAsyncIterable(expect);
  it('should decode header', async () => {
    const input = ['column', '1,col', 'umn2\na1,\na2,', ''];
    await expectAsyncIterable(readLines(input)).toHaveValues(['column1,column2', 'a1,', 'a2,']);
  });
});
