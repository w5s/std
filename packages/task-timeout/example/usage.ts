import { Task } from '@w5s/task';
import { timeout } from '@w5s/task-timeout';
import { TimeDuration } from '@w5s/time';

function sayHelloworld(delay: TimeDuration) {
  return Task.from(({ resolve, canceler }) => {
    const timerId = setTimeout(() => {
      console.log('Hello World!');
      resolve(undefined);
    }, delay);
    canceler.current = () => clearTimeout(timerId);
  });
}

export function main() {
  // Example of a task that will
  const someTask = sayHelloworld(TimeDuration.seconds(2)); // log "Hello world" after 2 seconds
  const withTimeout = timeout(someTask, TimeDuration.seconds(1)); // set timeout to 1 second

  return withTimeout;
}

void Task.unsafeRun(main());
