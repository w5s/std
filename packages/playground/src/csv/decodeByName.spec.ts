import { describe, expect, it } from 'vitest';
import { withTask } from '@w5s/task/dist/Testing.js';
import { Result } from '@w5s/core';
import { withAsyncIterable } from '@w5s/iterable/dist/Testing.js';
import { decodeByName } from './decodeByName.js';
import { CSVError } from './CSVError.js';

describe(decodeByName, () => {
  const expectTask = withTask(expect);
  const expectAsyncIterable = withAsyncIterable(expect);
  it('should decode header', async () => {
    const input = ['column', '1,col', 'umn2\na1,'];
    await expectTask(decodeByName(input)).toResolveAsync(
      expect.objectContaining({
        csvHeader: ['column1', 'column2'],
      }),
    );
  });
  it('should decode records', async () => {
    const input = [
      [
        // lines
        `column1,column2`,
        'a1,a2',
        'b1,b2',
        'c1',
      ].join('\n'),
    ];
    const result = await decodeByName(input).run();
    const { csvHeader, csvRecords } = Result.getOrThrow(result);
    expect(csvHeader).toEqual(['column1', 'column2']);
    await expectAsyncIterable(csvRecords).toHaveValues([
      Result.Ok({ column1: 'a1', column2: 'a2' }),
      Result.Ok({ column1: 'b1', column2: 'b2' }),
      Result.Error(new CSVError({ message: 'Cannot decode line number 2' })),
    ]);
  });

  it('should throw an error for missing header', async () => {
    const input: string[] = [];
    await expectTask(decodeByName(input)).toRejectAsync(new CSVError({ message: 'No header found' }));
  });
});
