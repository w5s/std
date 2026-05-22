import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Initializer } from './Initializer.js';
import { InitializerStatus } from './InitializerStatus.js';
import { getStatus, __state } from './__state.js';
import { start } from './start.js';

describe(start, () => {
  beforeEach(() => {
    __state.current = {};
  });

  it('starts a stopped initializer and marks it as ready', async () => {
    const appContext = { appName: 'test-app' };
    const onStart = vi.fn(async () => {});
    const initializer = Initializer('init-1', onStart);

    expect(getStatus(initializer)).toBe(InitializerStatus.Stopped);

    await start(appContext, initializer);

    expect(onStart).toHaveBeenCalledTimes(1);
    expect(onStart).toHaveBeenCalledWith(appContext);
    expect(getStatus(initializer)).toBe(InitializerStatus.Ready);
  });

  it('marks initializer as starting before running onStart', async () => {
    const statuses: string[] = [];

    const initializer = Initializer('init-2', async () => {
      statuses.push(getStatus(initializer));
    });

    await start({}, initializer);

    expect(statuses).toEqual([InitializerStatus.Starting]);
    expect(getStatus(initializer)).toBe(InitializerStatus.Ready);
  });

  it('does not start an initializer that is already ready', async () => {
    const initializer = Initializer('init-3', vi.fn(async () => {}));

    await start({}, initializer);
    await start({}, initializer);

    expect(initializer.onStart).toHaveBeenCalledTimes(1);
    expect(getStatus(initializer)).toBe(InitializerStatus.Ready);
  });
});
