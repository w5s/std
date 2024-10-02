/* eslint-disable import/no-extraneous-dependencies */
import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import currencyData from 'currencies.json';

const EOL = '\n';
const comment = '// ';

function getTargetPath() {
  return path.join('src', 'moneyFactory.all.ts');
}

function buildImports() {
  return `/* cSpell:disable */
import type { Int } from '@w5s/core';
import { Currency } from './Currency.js';
import { moneyFactory } from './moneyFactory.js';
import { CurrencyRegistry } from './CurrencyRegistry.js';
`;
}

function buildRegistry() {
  return `function registerAll() {
  const register = (...parameters: Parameters<typeof Currency>) => CurrencyRegistry.add(Currency(parameters[0]));
${currencyData.currencies
  .map(
    (currency) =>
      `
  register({
    code: '${currency.code}',
    ${currency.decimalDigits === 2 ? comment : ''}precision: ${currency.decimalDigits} as Int,
    name: '${currency.name}',
    namePlural: '${currency.namePlural}',
    ${currency.rounding === 0 ? comment : ''}rounding: ${currency.rounding} as Int,
    symbol: '${currency.symbol}',
    ${currency.symbolNative === currency.symbol ? comment : ''}symbolNative: '${currency.symbolNative}',
  });`,
  )
  .join(EOL)}
}
registerAll();`;
}

function buildFactories() {
  return currencyData.currencies
    .map(
      (currency) => `/**
 * ${currency.name} money factory
 *
 * @example
 * \`\`\`typescript
 * const money = ${currency.code}('1.25');// Money({ currency: Currency({ code: '${currency.code}' }), amount: BigDecimal('1') })
 * \`\`\`
 * @param amount - The amount of money
 */
export const ${currency.code} = moneyFactory('${currency.code}');`,
    )
    .join(EOL);
}

function buildContents() {
  return buildImports() + EOL + buildRegistry() + EOL + buildFactories() + EOL;
}

export async function main() {
  const contents = buildContents();
  const targetPath = getTargetPath();
  await writeFile(targetPath, contents);
}
await main();
