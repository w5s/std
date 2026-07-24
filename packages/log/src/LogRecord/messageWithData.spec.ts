import { describe, expect, it } from 'vitest';

import { LogMessage } from '../LogMessage.js';
import { fakeLogRecord } from '../Testing.js';
import { messageWithData } from './messageWithData.js';

describe(messageWithData, () => {
  it('expands ref using data', () => {
    const record = fakeLogRecord({
      data: {
        foo: 'foo_value',
      },
      message: LogMessage('message', { $ref: 'foo' }),
    });
    expect(messageWithData(record)).toEqual(['message', 'foo_value']);
  });
});
