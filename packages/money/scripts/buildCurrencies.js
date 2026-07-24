import currencyData from 'currencies.json';
import { writeFile } from 'node:fs/promises';
import path from 'node:path';

const EOL = '\n';

export async function main() {
  const contents = buildContents();
  const targetPath = getTargetPath();
  await writeFile(targetPath, contents);
}

function buildContents() {
  return buildImports() + EOL + buildRegistry() + EOL + buildFactories() + EOL;
}

function buildFactories() {
  return currencyData.currencies
    .map(
      (currency) => `
/**
 * ${currency.name} money factory
 *
 * @example
 * \`\`\`typescript
 * const money = ${currency.code}('1.25');// Money({ currency: Currency({ code: '${currency.code}' }), amount: BigDecimal('1') })
 * \`\`\`
 * @param amount The amount of money
 */
export const ${currency.code} = register('${currency.code}', ${currency.decimalDigits}, '${currency.name}', '${currency.namePlural}', ${currency.rounding}, '${currency.symbol}', '${currency.symbolNative}');`,
    )
    .join(EOL);
}

function buildImports() {
  return `/* cSpell:disable */
import { Currency } from './Currency.js';
import { CurrencyRegistry } from './CurrencyRegistry.js';
import { factory as moneyFactory } from './Money/factory.js';
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
      name,
      namePlural,
      precision: precision as Currency['precision'],
      rounding: rounding as Currency['rounding'],
      symbol,
      symbolNative,
    }),
  );
  return moneyFactory(code);
};`;
}

function getTargetPath() {
  return path.join('src', 'moneyFactory.all.ts');
}

await main();
