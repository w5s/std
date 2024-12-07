import { describe, it, expect } from 'vitest';
import { LogApplication } from './Log/LogApplication.js';
import { Log } from './Log.js';
import { sendWith } from './Log/sendWith.js';
import { send } from './Log/send.js';

describe('Log', () => {
  it('is an alias to functions', () => {
    expect(Log).toEqual(expect.objectContaining(LogApplication));
    expect(Log).toEqual(
      expect.objectContaining({
        sendWith,
        send,
      }),
    );
  });
});
