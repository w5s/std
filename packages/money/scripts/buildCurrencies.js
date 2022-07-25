/* eslint-disable import/no-extraneous-dependencies */
import currencyData from 'currencies.json';
import { writeFile } from 'node:fs/promises';
import path from 'node:path';

const EOL = '\n';
const comment = '// ';

function getTargetPath() {
  return path.join('src', 'moneyFactory.all.ts');
}

function buildImports() {
  return `import type { Int } from '@w5s/core/lib/integer.js';
import { moneyFactory } from './moneyFactory.js';
`;
}

function buildFactory(currency) {
  return `/**
 * ${currency.name} money factory
 *
 * @example
 * \`\`\`typescript
 * const money = ${currency.code}(1);// Money({ currency: Currency({ code: 'EUR' }), amount: 1 })
 * \`\`\`
 * @param amount - The amount of money
 */
export const ${currency.code} = moneyFactory({
  code: '${currency.code}',
  ${currency.decimalDigits === 2 ? comment : ''}precision: ${currency.decimalDigits} as Int,
  name: '${currency.name}',
  namePlural: '${currency.namePlural}',
  ${currency.rounding === 0 ? comment : ''}rounding: ${currency.rounding} as Int,
  symbol: '${currency.symbol}',
  ${currency.symbolNative === currency.symbol ? comment : ''}symbolNative: '${currency.symbolNative}',
});`;
}

function buildContents() {
  return buildImports() + EOL + currencyData.currencies.map(buildFactory).join(EOL) + EOL;
}

export async function main() {
  const contents = buildContents();
  const targetPath = getTargetPath();
  await writeFile(targetPath, contents);
}
main();
