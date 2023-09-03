import { Result, unsafeRun } from '@w5s/core';
import { describe, it, expect, vi } from 'vitest';
import { UUID } from './uuid.js';
import { randomUUID } from './randomUUID.js';

describe('randomUUID', () => {
  it('should return a valid UUID', async () => {
    const uuidResult = Result.getOrThrow(await unsafeRun(randomUUID()));
    expect(UUID.hasInstance(uuidResult)).toBe(true);
  });
  it('should use import("node:crypto").randomUUID', () => {
    expect(typeof randomUUID.current).toBe('function');
  });
  it('should use ref', async () => {
    const uuidMock = UUID.empty();
    const task = randomUUID();
    const randomUUIDMock = vi.spyOn(randomUUID, 'current');
    randomUUIDMock.mockReturnValue(uuidMock);
    const uuidResult = await unsafeRun(task);

    expect(randomUUIDMock).toHaveBeenCalledTimes(1);
    expect(uuidResult).toEqual(Result.Ok(uuidMock));
  });
});
