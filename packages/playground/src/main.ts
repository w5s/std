import { assertNever, Console, pipe, Task, TimeDuration } from '@w5s/core';
import { HTTPClient } from '@w5s/http-client';
import { SlackClient } from './slackClient';
import { timeout, TimeoutError } from './timeout';

function main() {
  const client = SlackClient('token');
  const task = pipe(SlackClient.chat_postMessage(client, {})).to(
    (_) => timeout(_, TimeDuration.minutes(1)),
    (_) => Task.andThen(_, (response) => Console.log('Response:', response)),
    (_) =>
      Task.orElse(_, (error) => {
        switch (error.name) {
          case TimeoutError.errorName:
            return Console.error(`TimeoutError:${error.message}`);
          case HTTPClient.NetworkError.errorName:
            return Console.error(`NetworkError:${error.message}`);
          case HTTPClient.ParserError.errorName:
            return Console.error(`ParserError:${error.message}`);
          default:
            // return Console.error(`Unknown Error:${error.message}`);
            return assertNever(error);
        }
      })
  );

  return task;
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
Task.unsafeRun(main());
