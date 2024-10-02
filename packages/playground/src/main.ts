import { Int, Option } from '@w5s/core';
import { Console, Task } from '@w5s/task';
import { TimeDuration } from '@w5s/time';
import { HTTPError } from '@w5s/http';
import { randomUUID } from '@w5s/random';
import { EUR } from '@w5s/money';
import { timeout } from '@w5s/task-timeout';
import { TimeoutError } from '@w5s/error';
import { pipe } from './pipe.js';
import { retrying, RetryPolicy } from './retry.js';
import { Slack } from './slackClient.js';

function sendMessage(text: string) {
  const client = Slack({ token: 'token' });

  return pipe(
    Slack.Chat.postMessage(client, {
      channel: Slack.ChannelId('my-channel'),
      text,
    }),
  ).to(
    (_) => timeout(_, TimeDuration.minutes(1)),
    (_) =>
      retrying(_, {
        policy: RetryPolicy.retries(Int(3)),
        check: (_result) => Task.resolve({ done: false, value: Option.None }),
      }),
  );
}

function main() {
  const amount = EUR('1.55');

  const task = pipe(randomUUID()).to(
    (_) => Task.andThen(_, (uuid) => sendMessage(uuid + String(amount))),
    (_) => Task.andThen(_, (response) => Console.log('Response:', response)),
    (_) =>
      Task.orElse(_, (error) => {
        switch (error.name) {
          case Slack.Error.errorName: {
            return Console.error(`SlackError:${error.message}`);
          }
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
            return Console.error(`Unknown Error:${error.message}`);
            // return assertNever(error);
          }
        }
      }),
  );

  return task;
}

function main2() {
  const task = Task.create(async ({ ok, run }) => {
    const amount = EUR('1.55');
    const uuid = await run(randomUUID());
    if (!uuid.ok) {
      return uuid;
    }
    const messageSent = await run(sendMessage(uuid.value + String(amount)));
    if (!messageSent.ok) {
      return messageSent;
    }

    return ok();
  });

  return Task.orElse(task, (error) => {
    switch (error.name) {
      case Slack.Error.errorName: {
        return Console.error(`SlackError:${error.message}`);
      }
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
        return Console.error(`Unknown Error:${error.message}`);
        // return assertNever(error);
      }
    }
  });
}

void Task.unsafeRun(main());
// alternate syntax
void main().run();
void main2().run();
