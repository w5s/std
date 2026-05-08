import type { JobEnqueueOptions, JobProvider } from './JobProvider.js';
import type { JobRequest } from './JobRequest.js';

export interface MemoryJobQueueEntry<Request extends JobRequest = JobRequest> {
  readonly request: Request;
  readonly enqueuedAt: number;
  readonly availableAt: number;
}

export interface MemoryJobProviderOptions {
  readonly now?: () => number;
}

export class MemoryJobProvider implements JobProvider {
  readonly #queue: MemoryJobQueueEntry[] = [];
  readonly #timers = new Set<ReturnType<typeof setTimeout>>();
  readonly #now: () => number;

  constructor(options: MemoryJobProviderOptions = {}) {
    this.#now = options.now ?? (() => Date.now());
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

  async enqueue<Request extends JobRequest>(request: Request, options: JobEnqueueOptions): Promise<void> {
    const enqueuedAt = this.#now();
    const availableAt = options._ === 'delayed'
      ? enqueuedAt + options.delay
      : enqueuedAt;
    const entry: MemoryJobQueueEntry<Request> = {
      request,
      enqueuedAt,
      availableAt,
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
}
