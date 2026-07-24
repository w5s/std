import { Task } from '@w5s/task';
import { timeout } from '@w5s/task-timeout';
import { TimeDuration } from '@w5s/time';

export function main() {
  // Example of a task that will
  const someTask = sayHelloWorld(TimeDuration({ seconds: 2 })); // log "Hello world" after 2 seconds
  const withTimeout = timeout(someTask, TimeDuration({ seconds: 1 })); // set timeout to 1 second

  return withTimeout;
}

function sayHelloWorld(delay: TimeDuration) {
  return Task.from(({ canceler, resolve }) => {
    const timerId = setTimeout(() => {
      console.log('Hello World!');
      resolve(undefined);
    }, delay);
    canceler.onCancel = () => clearTimeout(timerId);
  });
}

void Task.run(main());
