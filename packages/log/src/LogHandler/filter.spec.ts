import { describe, it, expect, vi } from 'vitest';
import { Task } from '@w5s/task';
import { withTask } from '@w5s/task/dist/Testing.js';
import { fakeLogRecord } from '../Testing.js';
import { filter } from './filter.js';

describe(filter, () => {
  const expectTask = withTask(expect);

  it('should filter input', async () => {
    const handler = vi.fn(() => Task.resolve());
    const filtered = filter(handler, (record) => record.domain === 'foo');
    const defaultProps = fakeLogRecord();
    expectTask(
      filtered(
        fakeLogRecord({
          ...defaultProps,
          domain: 'not_foo',
        }),
      ),
    ).toResolveSync(undefined);
    expectTask(
      filtered(
        fakeLogRecord({
          ...defaultProps,
          domain: 'foo',
        }),
      ),
    ).toResolveSync(undefined);
    expect(handler).not.toHaveBeenLastCalledWith({
      id: '',
      category: 'foo',
    });
  });
});
