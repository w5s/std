import { describe, expect, it } from 'vitest';

import { Log } from './Log.js';
import { send } from './Log/send.js';
import { sendWith } from './Log/sendWith.js';

describe('Log', () => {
  it('is an alias to functions', () => {
    expect(Log).toEqual(
      expect.objectContaining({
        send,
        sendWith,
      }),
    );
  });
});
