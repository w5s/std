import { DecodeError, Int, Option, Result } from '@w5s/core';
import { Console, Task } from '@w5s/task';
import { TimeDuration } from '@w5s/time';
import { HTTPError } from '@w5s/http';
import { randomUUID as defaultRandomUUID } from '@w5s/uuid';
import { EUR, Money } from '@w5s/money';
import { timeout } from '@w5s/task-timeout';
import { AbortError, assertNever, TimeoutError } from '@w5s/error';
import { pipe } from './pipe.js';
import { retry, RetryPolicy } from './task-retry/retry.js';
import { Slack } from './slackClient.js';
import { ContainerKey, provide, use } from './di/index.js';
import { abortable } from './task-abortable/index.js';

const RandomUUID = ContainerKey('RandomUUID', () => defaultRandomUUID);
const app = {
  ...provide(RandomUUID, () => defaultRandomUUID),
};

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
      retry(_, {
        policy: RetryPolicy.retries(Int(3)),
        check: (result) => Task.resolve(Result.isError(result) ? { done: false, value: Option.None } : { done: true }),
      }),
  );
}

function main() {
  const amount = EUR('1.55');
  const randomUUID = use(app, RandomUUID);

  const controller = new AbortController();

  const task = pipe(randomUUID()).to(
    (_) => abortable(_, controller),
    (_) => Task.andThen(_, (uuid) => sendMessage(uuid + Money.format(amount))),
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
          case DecodeError.errorName: {
            return Console.error(`Decode Error:${error.message}`);
          }
          case AbortError.errorName: {
            return Console.error(`Abort Error:${error.message}`);
          }
          default: {
            // return Console.error(`Unknown Error:${error.message}`);
            return assertNever(error);
          }
        }
      }),
  );

  return task;
}

function main2() {
  const randomUUID = use(app, RandomUUID);

  const task = Task.create(async ({ ok, run }) => {
    const amount = EUR('1.55');
    const uuid = await run(randomUUID());
    if (!uuid.ok) {
      return uuid;
    }
    const messageSent = await run(sendMessage(uuid.value + Money.format(amount)));
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
      case DecodeError.errorName: {
        return Console.error(`Decode Error:${error.message}`);
      }
      default: {
        // return Console.error(`Unknown Error:${error.message}`);
        return assertNever(error);
      }
    }
  });
}

void Task.unsafeRun(main());
// alternate syntax
void main().run();
void main2().run();
