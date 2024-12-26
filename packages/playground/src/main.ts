/* eslint-disable no-console */
import { DecodeError, Int, Option, Result } from '@w5s/core';
import { Console, Task } from '@w5s/task';
import { TimeDuration } from '@w5s/time';
import { HTTPError } from '@w5s/http';
import { randomUUID as defaultRandomUUID } from '@w5s/uuid';
import { EUR, Money } from '@w5s/money';
import { timeout } from '@w5s/task-timeout';
import { AbortError, assertNever, SyntaxError, TimeoutError } from '@w5s/error';
import { Log, debug, error } from '@w5s/log';
import { pipe } from './pipe.js';
import { retry, RetryPolicy } from './task-retry/retry.js';
import { Slack } from './slackClient.js';
import { ContainerKey, provide, use } from './di/index.js';
import { abortable } from './task-abortable/index.js';
import { Initializer, startAll } from './initializer/index.js';

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
    (_) => Task.andRun(_, () => Log.send(debug`Start`)),
    (_) => Task.andThen(_, (uuid) => sendMessage(uuid + Money.format(amount))),
    (_) => Task.andThen(_, (response) => Console.log('Response:', response)),
    (_) =>
      Task.orElse(_, (err) => {
        switch (err.name) {
          case Slack.Error.errorName: {
            return Log.send(error`SlackError:${err.message}`);
          }
          case TimeoutError.errorName: {
            return Log.send(error`TimeoutError:${err.message}`);
          }
          case HTTPError.InvalidURL.errorName: {
            return Log.send(error`InvalidURLError:${err.message}`);
          }
          case HTTPError.NetworkError.errorName: {
            return Log.send(error`NetworkError:${err.message}`);
          }
          case HTTPError.ParserError.errorName: {
            return Log.send(error`ParserError:${err.message}`);
          }
          case DecodeError.errorName: {
            return Log.send(error`Decode Error:${err.message}`);
          }
          case AbortError.errorName: {
            return Log.send(error`Abort Error:${err.message}`);
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
      case DecodeError.errorName: {
        return Console.error(`Decode Error:${_error.message}`);
      }
      default: {
        // return Console.error(`Unknown Error:${error.message}`);
        return assertNever(_error);
      }
    }
  });
}

export interface AppContext {
  foo: boolean;
}

export const init1 = Initializer('init1', async (_: AppContext) => {
  console.log('init1');
  return Result.Ok();
});
export const init2 = Initializer('init2', async (_: AppContext) => {
  console.log('init2');
  return Result.Error(new SyntaxError());
});
export function main3() {
  const appContext: AppContext = { foo: true };
  return startAll(appContext, [
    // initializers
    () => init1,
    async () => init2,
  ]);
}

void Task.unsafeRun(main());
// alternate syntax
void main().run();
void main2().run();
