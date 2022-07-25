import { EUR } from '@w5s/money';

export function main(): void {
  const money = EUR(1);
  console.log(money); // > { _type: 'Money', amount: 1, currency: { _type: 'Currency', code: 'EUR', ... } }
}
