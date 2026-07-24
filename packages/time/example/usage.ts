import { Task } from '@w5s/task';
import { Time, TimeDuration } from '@w5s/time';

export function nowPlusTwoMinutes() {
  return Task.map(Time.now(), (currentTime) => Time['+'](currentTime, TimeDuration({ minutes: 2 })));
}
