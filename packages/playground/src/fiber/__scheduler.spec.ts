import { describe, it, expect } from 'vitest';
import { __scheduler } from './__scheduler.js';
import { Scheduler as SchedulerImpl } from './Scheduler/Scheduler.js';

describe('Scheduler', () => {
  it('is an instance of SchedulerImpl', () => {
    expect(__scheduler).toBeInstanceOf(SchedulerImpl);
  });
});
