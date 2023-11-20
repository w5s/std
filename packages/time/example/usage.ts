import { Time, TimeDuration } from '@w5s/time';
import { Task } from '@w5s/core';

export function nowPlusTwoMinutes() {
  return Task.map(Time.now, (currentTime) => Time.add(currentTime, TimeDuration.minutes(2)));
}
