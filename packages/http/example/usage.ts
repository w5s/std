import { requestSend, HTTPError, ResponseParser, Client } from '@w5s/http';
import { Type } from '@w5s/core';
import { Task } from '@w5s/task';
import { TimeoutError } from '@w5s/error';

const client = Client();
const getText = (id: number) => ({
  url: `http://localhost/${id}`,
});
const FooObject = Type.Object({
  foo: Type.boolean,
});

declare function logDebug(message: unknown): Task<void, never>;
declare function logError(message: unknown): Task<void, never>;

export function program() {
  const responseTask = requestSend(client, getText(123));
  const parsed = Task.andThen(responseTask, ResponseParser.json(FooObject));
  const log = Task.andThen(parsed, (response) => logDebug(response.foo));
  const handled = Task.orElse(log, (error) => {
    switch (error.name) {
      case HTTPError.InvalidURL.errorName: {
        return logError(`A wrong url was passed. Got ${error.input}`);
      }
      case HTTPError.NetworkError.errorName: {
        return logError('A network error occurred');
      }
      case HTTPError.ParserError.errorName: {
        return logError('A parser error occurred');
      }
      case TimeoutError.errorName: {
        return logError('Operation timed out');
      }
      default: {
        return logError('Unknown');
      }
    }
  });

  return handled;
}

Task.run(program()); // Result<{ foo: boolean }, FetchNetworkError|FetchParseError>
