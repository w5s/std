import { assertNever } from '@w5s/invariant';
import { Console, Int, Option, Task } from '@w5s/core';
import { TimeDuration } from '@w5s/time';
import { HTTPError } from '@w5s/http';
import { randomUUID } from '@w5s/random';
import { EUR } from '@w5s/money';
import { pipe } from './pipe.js';
import { retrying, RetryPolicy } from './retry.js';
import { Slack } from './slackClient.js';
import { timeout, TimeoutError } from './timeout.js';

function main() {
  const client = Slack({ token: 'token' });
  const amount = EUR('1.55');
  const task = pipe(randomUUID()).to(
    (_) =>
      Task.andThen(_, (uuid) =>
        Slack.Chat.postMessage(client, {
          channel: Slack.ChannelId('my-channel'),
          text: uuid + String(amount),
        })
      ),
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

void Task.unsafeRun(main());
