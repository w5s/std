// eslint-disable-next-line import/no-unresolved
import { Type, Codec, Result, JSON } from '@w5s/core';
import fs from 'node:fs/promises';
import path from 'node:path';

const eol = '\n';
const StatusDataComment = Type.Object({
  doc: Type.string,
  description: Type.string,
});
const StatusData = Type.Object({
  code: Type.number,
  phrase: Type.string,
  comment: StatusDataComment,
  isDeprecated: Type.Option(Type.boolean),
});
const StatusArrayData = Type.Array(StatusData);

function outFile(file) {
  return path.join('src', file);
}

async function readStatusFile() {
  const statusContent = await fs.readFile('resource/status.json');
  const statusDecoded = JSON.parse(statusContent);
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
  statusAllContent += `import type { Int } from '@w5s/core/dist/Type/Int.js';${eol}`;
  statusAllContent += `import { Status } from './Status.js';${eol}`;
  statusAllContent += `${eol}`;
  statusAllContent += decodedResult.value
    .map((status) =>
      [
        // Generate
        '/**',
        ` * ${status.comment.doc}`,
        ` *`,
        ` * ${status.comment.description}`,
        ...(status.isDeprecated ? [' *', ' * @deprecated'] : []),
        ' */',
        `export const ${toConstant(status.phrase)} = Status(${status.code} as Int, \`${status.phrase}\`);`,
      ].join(eol)
    )
    .join(eol + eol);
  statusAllContent += eol;
  await fs.writeFile(outFile('Status/status.all.ts'), statusAllContent);
  return Result.Ok();
}

function toConstant(str) {
  return str
    .replaceAll("'", ' ')
    .replaceAll('-', '')
    .split(' ')
    .map((_) => `${_[0].toUpperCase()}${_.slice(1)}`)
    .join('');
}

async function main() {
  return Result.getOrThrow(await generateFiles());
}

await main();
