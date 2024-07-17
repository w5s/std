import { Result } from '@w5s/core';
import { Task } from '@w5s/task';
import { describe, it, expect, vi } from 'vitest';
import { UUID } from './UUID.js';
import { defaultUUIDGenerator, randomUUID } from './randomUUID.js';

describe('defaultUUIDGenerator', () => {
  it('is a function', () => {
    expect(defaultUUIDGenerator.current).toBeTypeOf('function');
  });
});
describe('randomUUID', () => {
  it('should return a valid UUID', async () => {
    const uuidResult = Result.getOrThrow(await Task.unsafeRun(randomUUID()));
    expect(UUID.hasInstance(uuidResult)).toBe(true);
  });
  it('should use ref', async () => {
    const uuidMock = UUID.empty();
    const task = randomUUID();
    const randomUUIDMock = vi.spyOn(defaultUUIDGenerator, 'current');
    randomUUIDMock.mockReturnValue(uuidMock);
    const uuidResult = await Task.unsafeRun(task);

    expect(randomUUIDMock).toHaveBeenCalledTimes(1);
    expect(uuidResult).toEqual(Result.Ok(uuidMock));
  });
});
