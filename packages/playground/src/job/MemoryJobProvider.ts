import type { JobEnqueueOptions, JobProvider } from './JobProvider.js';
import type { JobRequest } from './JobRequest.js';

export interface MemoryJobProviderOptions {
  readonly now?: () => number;
}

export interface MemoryJobQueueEntry<Request extends JobRequest = JobRequest> {
  readonly availableAt: number;
  readonly enqueuedAt: number;
  readonly request: Request;
}

export class MemoryJobProvider implements JobProvider {
  get size(): number {
    return this.#queue.length;
  }

  readonly #now: () => number;
  readonly #queue: Array<MemoryJobQueueEntry> = [];

  readonly #timers = new Set<ReturnType<typeof setTimeout>>();

  constructor(options: MemoryJobProviderOptions = {}) {
    this.#now = options.now ?? (() => Date.now());
  }

  clear(): void {
    for (const timer of this.#timers) {
      clearTimeout(timer);
    }
    this.#timers.clear();
    this.#queue.length = 0;
  }

  dequeue(): MemoryJobQueueEntry | undefined {
    return this.#queue.shift();
  }

  async enqueue<Request extends JobRequest>(request: Request, options: JobEnqueueOptions): Promise<void> {
    const enqueuedAt = this.#now();
    const availableAt = options._ === 'delayed'
      ? enqueuedAt + options.delay
      : enqueuedAt;
    const entry: MemoryJobQueueEntry<Request> = {
      availableAt,
      enqueuedAt,
      request,
    };

    if (options._ === 'delayed') {
      const timer = setTimeout(() => {
        this.#timers.delete(timer);
        this.#queue.push(entry);
      }, options.delay);
      this.#timers.add(timer);
      return;
    }

    this.#queue.push(entry);
  }

  peek(): MemoryJobQueueEntry | undefined {
    return this.#queue[0];
  }
}
