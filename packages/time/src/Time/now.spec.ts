import { describe, it, expect, vi } from 'vitest';
import { Result, Task } from '@w5s/core';
import { now } from './now.js';

describe(now, () => {
  const dateNowSpy = vi.spyOn(Date, 'now');

  it('should return Date.now()', async () => {
    const nowMs = 123;
    dateNowSpy.mockReturnValue(nowMs);
    expect(Task.unsafeRun(now())).toEqual(Result.Ok(nowMs));
  });
});
