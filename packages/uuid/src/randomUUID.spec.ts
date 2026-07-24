import { Result } from '@w5s/core';
import { UUID } from '@w5s/core/dist/Type/UUID.js';
import { Task } from '@w5s/task';
import { withTask } from '@w5s/task/dist/Testing.js';
import { randomUUID as randomUUIDNodeJS } from 'node:crypto';
import { describe, expect, it, vi } from 'vitest';

import { randomUUID } from './randomUUID.js';
import { empty } from './UUID/empty.js';

vi.mock('node:crypto', async () => ({
  randomUUID: vi.fn(),
}));

describe(randomUUID, () => {
  const crypto = globalThis.crypto;
  const expectTask = withTask(expect);
  it('should return a valid UUID', async () => {
    const uuidResult = Result.getOrThrow(await Task.run(randomUUID()));
    expect(UUID.hasInstance(uuidResult)).toBe(true);
  });
  it.runIf(crypto != null)('should use globalThis.crypto.randomUUID', async () => {
    const randomUUIDGlobal = vi.spyOn(crypto, 'randomUUID');
    const uuidMock = empty();
    const task = randomUUID();
    randomUUIDGlobal.mockReturnValue(uuidMock);

    expectTask(task).toResolveSync(uuidMock);
  });

  it.runIf(crypto == null)('should use node:crypto.randomUUID', async () => {
    const uuidMock = empty();
    const task = randomUUID();
    (randomUUIDNodeJS as any).mockReturnValue(uuidMock);

    expectTask(task).toResolveSync(uuidMock);
  });
});
