import { Result } from '@w5s/core';
import { Task } from '@w5s/task';
import { describe, it, expect, vi } from 'vitest';
import { withTask } from '@w5s/task/dist/Testing.js';
import { UUID } from '@w5s/core/dist/Type/UUID.js';
import { randomUUID as randomUUIDNodeJS } from 'node:crypto';
import { randomUUID } from './randomUUID.js';
import { empty } from './UUID/empty.js';

vi.mock('node:crypto', async () => ({
  randomUUID: vi.fn(),
}));

describe(randomUUID, () => {
  const expectTask = withTask(expect);
  it('should return a valid UUID', async () => {
    const uuidResult = Result.getOrThrow(await Task.unsafeRun(randomUUID()));
    expect(UUID.hasInstance(uuidResult)).toBe(true);
  });
  it.runIf(globalThis.crypto)('should use globalThis.crypto.randomUUID', async () => {
    const randomUUIDGlobal = vi.spyOn(globalThis.crypto, 'randomUUID');
    const uuidMock = empty();
    const task = randomUUID();
    randomUUIDGlobal.mockReturnValue(uuidMock);

    expectTask(task).toResolveSync(uuidMock);
  });
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  it.runIf(!globalThis.crypto)('should use node:crypto.randomUUID', async () => {
    const uuidMock = empty();
    const task = randomUUID();
    (randomUUIDNodeJS as any).mockReturnValue(uuidMock);

    expectTask(task).toResolveSync(uuidMock);
  });
});
