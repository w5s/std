<!-- AUTO-GENERATED-CONTENT:START (PKGJSON:template=# Generic Database client _(${name})_) -->
# Generic Database client _(@w5s/database-client)_
<!-- AUTO-GENERATED-CONTENT:END -->

[![NPM Version][package-version-svg]][package-url]
[![License][license-image]][license-url]

<!-- AUTO-GENERATED-CONTENT:START (PKGJSON:template=> ${description}&unknownTxt= ) -->
> Database client library
<!-- AUTO-GENERATED-CONTENT:END -->

## Installation

<!-- AUTO-GENERATED-CONTENT:START (PKGJSON:template=```sh\nnpm install ${name}\n```) -->
```sh
npm install @w5s/database-client
```
<!-- AUTO-GENERATED-CONTENT:END -->

## Usage

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./example/usage.ts) -->
<!-- The below code snippet is automatically added from ./example/usage.ts -->
```ts
import { sql, executeQuery, DatabaseClient } from '@w5s/database-client';
import { Task } from '@w5s/core';

interface User {
  id: number;
  name: string;
}

export function getUserById(client: DatabaseClient, id: User['id']) {
  const sqlStatement = sql`SELECT id, name FROM user WHERE id=${String(id)}`;
  const task = executeQuery(client, sqlStatement);

  return Task.map(task, (rows) => (Array.isArray(rows) ? (rows[0] as User) : undefined));
}

export async function main(): Promise<void> {
  const client: DatabaseClient = {
    databaseType: 'mysql',
    database: '',
    user: '',
  };

  const response = getUserById(client, 123);
  console.log(await Task.unsafeRun(response));
}
```
<!-- AUTO-GENERATED-CONTENT:END -->

## License
<!-- AUTO-GENERATED-CONTENT:START (PKGJSON:template=[${license}][license-url] © ${author}) -->
[MIT][license-url] © Julien Polo <julien.polo@gmail.com>
<!-- AUTO-GENERATED-CONTENT:END -->

<!-- VARIABLES -->

<!-- AUTO-GENERATED-CONTENT:START (PKGJSON:template=[package-version-svg]: https://img.shields.io/npm/v/${name}.svg?style=flat-square) -->
[package-version-svg]: https://img.shields.io/npm/v/@w5s/database-client.svg?style=flat-square
<!-- AUTO-GENERATED-CONTENT:END -->
<!-- AUTO-GENERATED-CONTENT:START (PKGJSON:template=[package-url]: https://www.npmjs.com/package/${name}) -->
[package-url]: https://www.npmjs.com/package/@w5s/database-client
<!-- AUTO-GENERATED-CONTENT:END -->
<!-- AUTO-GENERATED-CONTENT:START (PKGJSON:template=[license-image]: https://img.shields.io/badge/license-${license}-green.svg?style=flat-square) -->
[license-image]: https://img.shields.io/badge/license-MIT-green.svg?style=flat-square
<!-- AUTO-GENERATED-CONTENT:END -->
[license-url]: ../../LICENSE
