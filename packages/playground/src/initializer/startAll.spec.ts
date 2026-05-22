import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Initializer } from './Initializer.js';
import { InitializerStatus } from './InitializerStatus.js';
import { getStatus, __state } from './__state.js';
import { startAll } from './startAll.js';

describe(startAll, () => {
  beforeEach(() => {
    __state.current = {};
  });

  it('starts all initializers from both direct and default module exports', async () => {
    const appContext = { env: 'test' };
    const init1 = Initializer('init-1', vi.fn(async () => {}));
    const init2 = Initializer('init-2', vi.fn(async () => {}));

    await startAll(appContext, [
      async () => init1,
      async () => ({ default: init2 }),
    ]);

    expect(init1.onStart).toHaveBeenCalledWith(appContext);
    expect(init2.onStart).toHaveBeenCalledWith(appContext);
    expect(init1.onStart).toHaveBeenCalledTimes(1);
    expect(init2.onStart).toHaveBeenCalledTimes(1);
    expect(getStatus(init1)).toBe(InitializerStatus.Ready);
    expect(getStatus(init2)).toBe(InitializerStatus.Ready);
  });

  it('does not rerun already started initializers', async () => {
    const init1 = Initializer('init-1', vi.fn(async () => {}));
    const init2 = Initializer('init-2', vi.fn(async () => {}));

    const initializers = [
      async () => init1,
      async () => ({ default: init2 }),
    ] as const;

    await startAll({}, initializers);
    await startAll({}, initializers);

    expect(init1.onStart).toHaveBeenCalledTimes(1);
    expect(init2.onStart).toHaveBeenCalledTimes(1);
  });
});
