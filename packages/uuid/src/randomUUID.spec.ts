import { Result } from '@w5s/core';
import { Task } from '@w5s/task';
import { describe, it, expect, vi } from 'vitest';
import { withTask } from '@w5s/task/dist/Testing.js';
import { UUID } from '@w5s/core/dist/Type/UUID.js';
import { randomUUID } from './randomUUID.js';
import { empty } from './UUID/empty.js';

const randomUUIDMock = vi.spyOn(globalThis.crypto, 'randomUUID');

describe(randomUUID, () => {
  const expectTask = withTask(expect);
  it('should return a valid UUID', async () => {
    const uuidResult = Result.getOrThrow(await Task.unsafeRun(randomUUID()));
    expect(UUID.hasInstance(uuidResult)).toBe(true);
  });
  it('should use ref', async () => {
    const uuidMock = empty();
    const task = randomUUID();
    randomUUIDMock.mockReturnValue(uuidMock);

    await expectTask(task).toResolve(uuidMock);
  });
});
