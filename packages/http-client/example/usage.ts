import { HTTPClient, HTTPClientError, parseJSON } from '@w5s/http-client';
import { Console, Task, assertNever } from '@w5s/core';

const getText = (id: number) => ({
  url: `http://localhost/${id}`,
  parse: parseJSON<{ foo: boolean }>('unsafe'),
});

export function program() {
  const task = HTTPClient.request(getText(123));
  const log = Task.andThen(task, (response) => Console.debug(response.foo));
  const handled = Task.orElse(log, (error) => {
    switch (error.name) {
      case HTTPClientError.InvalidURL.errorName:
        return Console.error(`A wrong url was passed. Got ${error.input}`);
      case HTTPClientError.NetworkError.errorName:
        return Console.error('A network error occurred');
      case HTTPClientError.ParserError.errorName:
        return Console.error('A parser error occurred');
      default:
        return assertNever(error);
    }
  });

  return handled;
}

Task.unsafeRun(program()); // Result<{ foo: boolean }, FetchNetworkError|FetchParseError>
