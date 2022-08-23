import { Money, EUR } from '@w5s/money';

export function main(): void {
  const price = EUR(10);
  const discount = EUR(2);
  const result = Money['-'](price, discount);
  console.log(result); // > Result.Ok(EUR(8))
}
