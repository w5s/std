import { requestSend, HTTPError, ResponseParser, Client } from '@w5s/http';
import { Type } from '@w5s/core';
import { Console, Task } from '@w5s/task';

const client = Client();
const getText = (id: number) => ({
  url: `http://localhost/${id}`,
});
const FooObject = Type.Object({
  foo: Type.boolean,
});

export function program() {
  const responseTask = requestSend(client, getText(123));
  const parsed = Task.andThen(responseTask, ResponseParser.json(FooObject));
  const log = Task.andThen(parsed, (response) => Console.debug(response.foo));
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

Task.unsafeRun(program()); // Result<{ foo: boolean }, FetchNetworkError|FetchParseError>
