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
import { Currency } from './currency.js';
import { moneyFactory } from './moneyFactory.js';
import { currencyRegistry } from './currencyRegistry.js';
`;
}

function buildRegistry() {
  return `function registerAll() {
  const register = (...parameters: Parameters<typeof Currency>) => currencyRegistry.add(Currency(parameters[0]));
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
  });`
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
 * const money = ${currency.code}(1);// Money({ currency: Currency({ code: '${currency.code}' }), amount: 1 })
 * \`\`\`
 * @param amount - The amount of money
 */
export const ${currency.code} = moneyFactory('${currency.code}');`
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
