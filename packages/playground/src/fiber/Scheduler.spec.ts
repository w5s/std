import { describe, it, expect } from 'vitest';
import { Scheduler } from './Scheduler.js';
import { Scheduler as SchedulerImpl } from './Scheduler/Scheduler.js';

describe('Scheduler', () => {
  it('is an instance of SchedulerImpl', () => {
    expect(Scheduler).toBeInstanceOf(SchedulerImpl);
  });
});
