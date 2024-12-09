import { describe, it, expect } from 'vitest';
import { messageWithData } from './messageWithData.js';
import { fakeLogRecord } from '../Testing.js';
import { LogMessage } from '../LogMessage.js';

describe(messageWithData, () => {
  it('expands ref using data', () => {
    const record = fakeLogRecord({
      message: LogMessage('message', { $ref: 'foo' }),
      data: {
        foo: 'foo_value',
      },
    });
    expect(messageWithData(record)).toEqual(['message', 'foo_value']);
  });
});
