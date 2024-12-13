import { describe, expect, it, vi } from 'vitest';
import { withTask } from '@w5s/task/dist/Testing.js';
import { Task } from '@w5s/task';
import { send } from './send.js';
import { critical } from '../level.js';
import { handle } from './handle.js';
import { LogRecord } from '../LogRecord.js';
import { LogLevel } from '../LogLevel.js';
import { LogMessage } from '../LogMessage.js';

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
        id: expect.any(String),
        domain: '',
        level: LogLevel.Critical,
        message: LogMessage('Mock message ', { $ref: 'foo' }, ' ', { $ref: 'bar' }),
        data: {
          foo: { foo: true },
          bar: 'bar_value',
        },
        created: expect.any(Number),
      }),
    );
  });
});
