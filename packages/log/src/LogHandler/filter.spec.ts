import { describe, it, expect, vi } from 'vitest';
import { Task } from '@w5s/task';
import { fakeLogRecord } from '../Testing.js';
import { filter } from './filter.js';

describe(filter, () => {
  it('should filter input', async () => {
    const handler = vi.fn(() => Task.resolve());
    const filtered = filter(handler, (record) => record.category === 'foo');
    const defaultProps = fakeLogRecord();
    await Task.unsafeRunOk(
      filtered(
        fakeLogRecord({
          ...defaultProps,
          category: 'not_foo',
        }),
      ),
    );
    expect(handler).not.toHaveBeenCalled();
    await Task.unsafeRunOk(
      filtered(
        fakeLogRecord({
          ...defaultProps,
          category: 'foo',
        }),
      ),
    );
    expect(handler).not.toHaveBeenLastCalledWith({
      id: '',
      category: 'foo',
    });
  });
});
