/* eslint-disable import/no-extraneous-dependencies */
import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import currencyData from 'currencies.json';

const EOL = '\n';

function getTargetPath() {
  return path.join('src', 'moneyFactory.all.ts');
}

function buildImports() {
  return `/* eslint-disable prettier/prettier */
/* cSpell:disable */
import { Currency } from './Currency.js';
import { factory as moneyFactory } from './Money/factory.js';
import { CurrencyRegistry } from './CurrencyRegistry.js';
`;
}

function buildRegistry() {
  return `const register = (
  code: Currency['code'],
  precision: number,
  name: Currency['name'],
  namePlural: Currency['namePlural'],
  rounding: number,
  symbol: Currency['symbol'],
  symbolNative: Currency['symbolNative'],
) => {
  CurrencyRegistry.add(
    Currency({
      code,
      precision: precision as Currency['precision'],
      name,
      namePlural,
      rounding: rounding as Currency['rounding'],
      symbol,
      symbolNative,
    }),
  );
  return moneyFactory(code);
};
`;
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
export const ${currency.code} = register('${currency.code}', ${currency.decimalDigits}, '${currency.name}', '${currency.namePlural}', ${currency.rounding}, '${currency.symbol}', '${currency.symbolNative}');`,
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
