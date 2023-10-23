import { HTTP, HTTPError, HTTPParser } from '@w5s/http';
import { Console, Task, unsafeRun } from '@w5s/core';

const getText = (id: number) => ({
  url: `http://localhost/${id}`,
  parse: HTTPParser.json<{ foo: boolean }>('unsafe'),
});

export function program() {
  const task = HTTP.request(getText(123));
  const log = Task.andThen(task, (response) => Console.debug(response.foo));
  const handled = Task.orElse(log, (error) => {
    switch (error.name) {
      case HTTPError.InvalidURL.errorName: {
        return Console.error(`A wrong url was passed. Got ${error.input}`);
      }
      case HTTPError.NetworkError.errorName: {
        return Console.error('A network error occurred');
      }
      case HTTPError.ParserError.errorName: {
        return Console.error('A parser error occurred');
      }
      default: {
        return Console.error('Unknown');
      }
    }
  });

  return handled;
}

unsafeRun(program()); // Result<{ foo: boolean }, FetchNetworkError|FetchParseError>
