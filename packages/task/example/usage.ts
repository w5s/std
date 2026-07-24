import { Task } from '@w5s/task';

// This function returns a task that will do nothing until Task.run is called on it
export function main() {
  // 1. Generate a random number
  const randomValueTask = randomNumber();
  // 2. Compute square value
  const squareValueTask = Task.map(randomValueTask, (value) => value * value);
  // 3. Log value in console
  return Task.andThen(squareValueTask, log);
}

function log(value: unknown) {
  // This is a lazy operation that will only be evaluated when the Task is run
  return Task.create(() => Task.ok(console.log(value)));
}

function randomNumber() {
  return Task.create(() => Task.ok(Math.random()));
}

// runTask is impure and should be put at the edge of the program

void Task.run(main()); // prints { _: 'Result/Ok', value: <random number> * <random number> }
