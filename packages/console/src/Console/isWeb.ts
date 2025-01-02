/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import type { Option } from '@w5s/core';

export function isWeb(): boolean {
  const stdout = (console as any)._stdout as Option<NodeJS.WriteStream>;
  const stderr = (console as any)._stderr as Option<NodeJS.WriteStream>;
  return stderr == null || stdout == null;
}
