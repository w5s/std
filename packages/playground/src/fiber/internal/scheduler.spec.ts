import { describe, expect, it } from 'vitest';

import { Scheduler as SchedulerImpl } from '../Scheduler/Scheduler.js';
import { scheduler } from './scheduler.js';

describe('Scheduler', () => {
  it('is an instance of SchedulerImpl', () => {
    expect(scheduler).toBeInstanceOf(SchedulerImpl);
  });
});
