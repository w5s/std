import { CodecError, Int, Option, Result } from '@w5s/core';
import { Task } from '@w5s/task';
import { Console } from '@w5s/console';
import { TimeDuration } from '@w5s/time';
import { HTTPError } from '@w5s/http';
import { randomUUID as defaultRandomUUID } from '@w5s/uuid';
import { EUR, Money } from '@w5s/money';
import { timeout } from '@w5s/task-timeout';
import { AbortError, assertNever, TimeoutError } from '@w5s/error';
import { Log as LogModule, debug, error } from '@w5s/log';
import type { LogSendFunction } from '@w5s/log/dist/Log/sendWith.js';
import { pipe } from './pipe.js';
import { retry, RetryPolicy } from './task-retry/retry.js';
import { Slack } from './slackClient.js';
import { ContainerKey, provide, use } from './di/index.js';
import { abortable } from './task-abortable/index.js';

const RandomUUID = ContainerKey('RandomUUID', () => defaultRandomUUID);
const Logger = ContainerKey('Logger', (): ((name: string) => LogSendFunction) => LogModule.sendWith);
const app = {
  ...provide(RandomUUID, () => defaultRandomUUID),
  ...provide(Logger, () => LogModule.sendWith),
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
  const log = use(app, Logger)('main');

  const controller = new AbortController();

  const task = pipe(randomUUID()).to(
    (_) => Task.andRun(_, () => log(debug`Start`)),
    (_) => Task.andThen(_, (uuid) => sendMessage(uuid + Money.format(amount))),
    (_) => Task.andThen(_, (response) => Console.log('Response:', response)),
    (_) => abortable(_, controller),
    (_) =>
      Task.orElse(_, (err) => {
        switch (err.name) {
          case Slack.Error.errorName: {
            return log(error`SlackError:${err.message}`);
          }
          case TimeoutError.errorName: {
            return log(error`TimeoutError:${err.message}`);
          }
          case HTTPError.InvalidURL.errorName: {
            return log(error`InvalidURLError:${err.message}`);
          }
          case HTTPError.NetworkError.errorName: {
            return log(error`NetworkError:${err.message}`);
          }
          case HTTPError.ParserError.errorName: {
            return log(error`ParserError:${err.message}`);
          }
          case CodecError.errorName: {
            return log(error`Decode Error:${err.message}`);
          }
          case AbortError.errorName: {
            return log(error`Abort Error:${err.message}`);
          }
          default: {
            // return Console.error(`Unknown Error:${error.message}`);
            return assertNever(err);
          }
        }
      }),
  );

  return task;
}

function main2() {
  const randomUUID = use(app, RandomUUID);

  const task = Task.create(async ({ run }) => {
    const amount = EUR('1.55');
    const uuid = await run(randomUUID());
    if (!uuid.ok) {
      return uuid;
    }
    const messageSent = await run(sendMessage(uuid.value + Money.format(amount)));
    if (!messageSent.ok) {
      return messageSent;
    }

    return Task.ok();
  });

  return Task.orElse(task, (_error) => {
    switch (_error.name) {
      case Slack.Error.errorName: {
        return Console.error(`SlackError:${_error.message}`);
      }
      case TimeoutError.errorName: {
        return Console.error(`TimeoutError:${_error.message}`);
      }
      case HTTPError.InvalidURL.errorName: {
        return Console.error(`InvalidURLError:${_error.message}`);
      }
      case HTTPError.NetworkError.errorName: {
        return Console.error(`NetworkError:${_error.message}`);
      }
      case HTTPError.ParserError.errorName: {
        return Console.error(`ParserError:${_error.message}`);
      }
      case CodecError.errorName: {
        return Console.error(`Decode Error:${_error.message}`);
      }
      default: {
        // return Console.error(`Unknown Error:${error.message}`);
        return assertNever(_error);
      }
    }
  });
}

void Task.run(main());
// alternate syntax
void main().run();
void main2().run();
