import { describe, it, expect, vi } from 'vitest';
import { withTask } from '@w5s/task/dist/Testing.js';
import { now } from './now.js';

describe(now, () => {
  const expectTask = withTask(expect);
  const dateNowSpy = vi.spyOn(Date, 'now');

  it('should return Date.now()', async () => {
    const nowMs = 123;
    dateNowSpy.mockReturnValue(nowMs);
    expectTask(now()).toResolveSync(nowMs);
  });
});
