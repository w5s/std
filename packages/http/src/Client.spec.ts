import { describe, expect, it } from 'vitest';
import { TimeDuration } from '@w5s/time';
import { Option } from '@w5s/core';
import { Task } from '@w5s/task';
import { Client } from './Client.js';

describe(Client, () => {
  it('constructs a client', () => {
    expect(Client()).toEqual({
      onRequest: Task.resolve,
      fetch: globalThis.fetch,
      timeout: 'default',
    });
  });
  describe(Client.getTimeoutDuration, () => {
    it('returns 30seconds when "default"', () => {
      const client = Client({
        timeout: 'default',
      });
      expect(Client.getTimeoutDuration(client)).toBe(TimeDuration.seconds(30));
    });
    it('returns Option.None when "none"', () => {
      const client = Client({
        timeout: 'none',
      });
      expect(Client.getTimeoutDuration(client)).toBe(Option.None);
    });
    it('returns client.timeout when duration', () => {
      const client = Client({
        timeout: TimeDuration.seconds(123),
      });
      expect(Client.getTimeoutDuration(client)).toBe(TimeDuration.seconds(123));
    });
  });
});
