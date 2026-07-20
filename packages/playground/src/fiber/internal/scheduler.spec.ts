import { describe, it, expect } from 'vitest';
import { scheduler } from './scheduler.js';
import { Scheduler as SchedulerImpl } from '../Scheduler/Scheduler.js';

describe('Scheduler', () => {
  it('is an instance of SchedulerImpl', () => {
    expect(scheduler).toBeInstanceOf(SchedulerImpl);
  });
});
