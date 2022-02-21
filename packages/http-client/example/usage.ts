import { HTTPClient, parseJSON } from '@w5s/http-client';
import { runTask, Console, Task, assertNever } from '@w5s/core';

const getText = (id: number) => ({
  url: `http://localhost/${id}`,
  parse: parseJSON<{ foo: boolean }>('unsafe'),
});

export function program() {
  const task = HTTPClient.request(getText(123));
  const log = Task.andThen(task, (response) => Console.debug(response.foo));
  const handled = Task.orElse(log, (error) => {
    switch (error.name) {
      case HTTPClient.NetworkError.errorName:
        return Console.error('A network error occurred');
      case HTTPClient.ParserError.errorName:
        return Console.error('A parser error occurred');
      default:
        return assertNever(error);
    }
  });

  return handled;
}

runTask(program()); // Result<{ foo: boolean }, FetchNetworkError|FetchParseError>
