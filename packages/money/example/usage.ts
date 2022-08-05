import { EUR } from '@w5s/money';

export function main(): void {
  const money = EUR(1);
  console.log(money); // > { _: 'Money', amount: 1, currency: { _: 'Currency', code: 'EUR', ... } }
}
