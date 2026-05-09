import { Option } from '@w5s/core';
import type { JobEnqueue } from './JobEnqueue.js';
import type { JobProvider } from './JobProvider.js';
import type { JobRequest } from './JobRequest.js';
import { JobId } from './JobId.js';

export interface MemoryJobQueueEntry<Request extends JobRequest = JobRequest> {
  readonly jobId: JobId;
  readonly request: Request;
  readonly enqueuedAt: number;
  readonly availableAt: number;
}

export interface MemoryJobProviderOptions {
  readonly now?: () => number;
  readonly nextJobId?: () => JobId;
}

export class MemoryJobProvider implements JobProvider {
  readonly #queue: MemoryJobQueueEntry[] = [];
  readonly #timers = new Set<ReturnType<typeof setTimeout>>();
  readonly #now: () => number;
  readonly #nextJobId: () => JobId;

  constructor(options: MemoryJobProviderOptions = {}) {
    this.#now = options.now ?? (() => Date.now());
    this.#nextJobId = options.nextJobId ?? (() => JobId(globalThis.crypto.randomUUID()));
  }

  get size(): number {
    return this.#queue.length;
  }

  peek(): MemoryJobQueueEntry | undefined {
    return this.#queue[0];
  }

  dequeue(): MemoryJobQueueEntry | undefined {
    return this.#queue.shift();
  }

  clear(): void {
    for (const timer of this.#timers) {
      clearTimeout(timer);
    }
    this.#timers.clear();
    this.#queue.length = 0;
  }

  async enqueue<Request extends JobRequest>(request: Request, options: JobEnqueue) {
    const jobId = this.#nextJobId();
    const enqueuedAt = this.#now();
    const availableAt = options._ === 'JobEnqueueDelayed'
      ? enqueuedAt + options.delay
      : enqueuedAt;
    const entry: MemoryJobQueueEntry<Request> = {
      jobId,
      request,
      enqueuedAt,
      availableAt,
    };

    if (options._ === 'JobEnqueueDelayed') {
      const timer = setTimeout(() => {
        this.#timers.delete(timer);
        this.#queue.push(entry);
      }, options.delay);
      this.#timers.add(timer);
      return { jobId, providerJobId: Option.None };
    }

    this.#queue.push(entry);
    return { jobId, providerJobId: Option.None };
  }
}
