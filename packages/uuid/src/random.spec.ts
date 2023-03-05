import { Result, Task } from '@w5s/core';
import { describe, it, expect, jest } from '@jest/globals';
import { UUID } from './data.js';
import { randomUUID } from './random.js';

describe('randomUUID', () => {
  it('should return a valid UUID', async () => {
    const uuidResult = Result.getOrThrow(await Task.unsafeRun(randomUUID));
    expect(UUID.hasInstance(uuidResult)).toBe(true);
  });
  it('should use import("node:crypto").randomUUID', () => {
    expect(typeof randomUUID.current).toBe('function');
  });
  it('should use ref', async () => {
    const uuidMock = UUID.empty();
    const randomUUIDMock = jest.spyOn(randomUUID, 'current');
    randomUUIDMock.mockReturnValue(uuidMock);
    const uuidResult = await Task.unsafeRun(randomUUID);

    expect(randomUUIDMock).toHaveBeenCalledTimes(1);
    expect(uuidResult).toEqual(Result.Ok(uuidMock));
  });
});
