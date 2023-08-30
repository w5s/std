import { assertNever, Console, Int, Option, Task, TimeDuration, unsafeRun } from '@w5s/core';
import { HTTPError } from '@w5s/http';
import { randomUUID } from '@w5s/random';
import { pipe } from './pipe.js';
import { retrying, RetryPolicy } from './retry.js';
import { Slack } from './slackClient.js';
import { timeout, TimeoutError } from './timeout.js';

function main() {
  const client = Slack({ token: 'token' });
  const task = pipe(randomUUID).to(
    (_) => Task.andThen(_, (uuid) => Slack.Chat.postMessage(client, { text: uuid })),
    (_) => timeout(_, TimeDuration.minutes(1)),
    (_) => Task.andThen(_, (response) => Console.log('Response:', response)),
    (_) =>
      retrying(_, {
        policy: RetryPolicy.retries(Int.of(3)),
        check: (_result) => Task.resolve({ done: false, value: Option.None }),
      }),
    (_) =>
      Task.orElse(_, (error) => {
        switch (error.name) {
          case TimeoutError.errorName: {
            return Console.error(`TimeoutError:${error.message}`);
          }
          case HTTPError.InvalidURL.errorName: {
            return Console.error(`InvalidURLError:${error.message}`);
          }
          case HTTPError.NetworkError.errorName: {
            return Console.error(`NetworkError:${error.message}`);
          }
          case HTTPError.ParserError.errorName: {
            return Console.error(`ParserError:${error.message}`);
          }
          default: {
            // return Console.error(`Unknown Error:${error.message}`);
            return assertNever(error);
          }
        }
      })
  );

  return task;
}

void unsafeRun(main());
