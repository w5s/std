import { Time, TimeDuration } from '@w5s/time';
import { Task } from '@w5s/task';

export function nowPlusTwoMinutes() {
  return Task.map(Time.now(), (currentTime) => Time['+'](currentTime, TimeDuration.minutes(2)));
}
