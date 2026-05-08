import { afterEach, describe, expect, it, vi } from 'vitest';
import { MemoryJobProvider } from './MemoryJobProvider.js';

describe(MemoryJobProvider, () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('enqueues immediate jobs in memory', async () => {
    const provider = new MemoryJobProvider();
    const request = { _: 'email', payload: { userId: '1' } };

    await provider.enqueue(request, { _: 'immediate' });

    expect(provider.size).toBe(1);
    expect(provider.peek()).toEqual({
      request,
      enqueuedAt: expect.any(Number),
      availableAt: expect.any(Number),
    });
    expect(provider.dequeue()).toEqual({
      request,
      enqueuedAt: expect.any(Number),
      availableAt: expect.any(Number),
    });
    expect(provider.size).toBe(0);
  });

  it('keeps delayed jobs out of the queue until ready', async () => {
    vi.useFakeTimers();
    const provider = new MemoryJobProvider({ now: () => Date.now() });
    const request = { _: 'reminder', payload: { userId: '1' } };

    await provider.enqueue(request, { _: 'delayed', delay: 100 });

    expect(provider.size).toBe(0);
    vi.advanceTimersByTime(99);
    expect(provider.size).toBe(0);

    vi.advanceTimersByTime(1);
    expect(provider.size).toBe(1);
    expect(provider.dequeue()).toEqual({
      request,
      enqueuedAt: expect.any(Number),
      availableAt: expect.any(Number),
    });
  });

  it('clears queued and scheduled jobs', async () => {
    vi.useFakeTimers();
    const provider = new MemoryJobProvider({ now: () => Date.now() });

    await provider.enqueue({ _: 'immediate', payload: {} }, { _: 'immediate' });
    await provider.enqueue({ _: 'delayed', payload: {} }, { _: 'delayed', delay: 100 });

    provider.clear();
    vi.advanceTimersByTime(100);

    expect(provider.size).toBe(0);
    expect(provider.dequeue()).toBeUndefined();
  });
});
