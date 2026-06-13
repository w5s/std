import { TObject } from '@w5s/core/Type/Object';
import { string } from '@w5s/core/Type/string';
import { number } from '@w5s/core/Type/number';
import { boolean } from '@w5s/core/Type/boolean';
import { Array as TArray } from '@w5s/core/Type/Array';
import { Option as TOption } from '@w5s/core/Type/Option';
import { Codec } from '@w5s/core/Codec';
import { Result } from '@w5s/core/Result';
import { JSON } from '@w5s/core/JSON';
import fs from 'node:fs/promises';
import path from 'node:path';

const eol = '\n';
const StatusDataComment = TObject({
  doc: string,
  description: string,
});
const StatusData = TObject({
  code: number,
  phrase: string,
  comment: StatusDataComment,
  isDeprecated: TOption(boolean),
});
const StatusArrayData = TArray(StatusData);

function outFile(file: string) {
  return path.join('src', file);
}

async function readStatusFile() {
  const statusContent = await fs.readFile('resource/status.json');
  const statusDecoded = JSON.parse(String(statusContent));
  if (!statusDecoded.ok) {
    return statusDecoded;
  }
  return Codec.decode(StatusArrayData, statusDecoded.value);
}

async function generateFiles() {
  const decodedResult = await readStatusFile();
  if (!decodedResult.ok) {
    return decodedResult;
  }
  let statusAllContent = '';
  statusAllContent += `import type { Int } from '@w5s/core/Type/Int';${eol}`;
  statusAllContent += `import { Status } from './Status.js';${eol}`;
  statusAllContent += `${eol}`;
  statusAllContent += decodedResult.value
    .map((status) =>
      [
        // Generate
        '/**',
        ` * ${status.comment.doc}`,
        ` *`,
        ` * ${status.comment.description.split('\n').join(`${eol} * `)}`,
        ...(status.isDeprecated ? [' *', ' * @deprecated'] : []),
        ' */',
        `export const ${toConstant(status.phrase)} = Status(${status.code} as Int, \`${status.phrase}\`);`,
      ].join(eol),
    )
    .join(eol + eol);
  statusAllContent += eol;
  await fs.writeFile(outFile('Status/status.all.ts'), statusAllContent);
  return Result.Ok();
}

function toConstant(str: string) {
  return str
    .replaceAll("'", ' ')
    .replaceAll('-', '')
    .split(' ')
    .map((_) => `${(_[0] ?? '').toUpperCase()}${_.slice(1)}`)
    .join('');
}

async function main() {
  return Result.getOrThrow(await generateFiles());
}

await main();
