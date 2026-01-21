import { ByteSize } from '@w5s/byte-size';
import { Codec } from '@w5s/core';

export function main() {
  const size = ByteSize(123);
  console.log(`Size: ${ByteSize.format(size)}`); // Size: 123 B

  console.log(Codec.decode(ByteSize, '1 KB')); // ByteSize(1024)
}
