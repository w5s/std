import { Task } from '@w5s/task';
import { withTask } from '@w5s/task/dist/Testing.js';
import { describe, expect, it, vi } from 'vitest';

import { critical } from '../level.js';
import { LogLevel } from '../LogLevel.js';
import { LogMessage } from '../LogMessage.js';
import { LogRecord } from '../LogRecord.js';
import { handle } from './handle.js';
import { send } from './send.js';

vi.mock('./handle.js', async () => ({
  handle: vi.fn(() => Task.resolve()),
}));

describe(send, () => {
  const expectTask = withTask(expect);

  it('.logDomain', () => {
    expect(send).toEqual(
      expect.objectContaining({
        logDomain: '',
      }),
    );
  });
  it('creates a new logRecord and forward to handle()', async () => {
    const message = critical`Mock message ${['foo', { foo: true }]} ${['bar', 'bar_value']}`;
    expectTask(send(message)).toResolveSync(undefined);
    expect(handle).toHaveBeenLastCalledWith(
      LogRecord({
        created: expect.any(Number),
        data: {
          bar: 'bar_value',
          foo: { foo: true },
        },
        domain: '',
        id: expect.any(String),
        level: LogLevel.Critical,
        message: LogMessage('Mock message ', { $ref: 'foo' }, ' ', { $ref: 'bar' }),
      }),
    );
  });
});
