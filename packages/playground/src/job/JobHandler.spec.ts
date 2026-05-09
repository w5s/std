import { beforeEach, describe, expect, it } from 'vitest';
import { useState } from '@w5s/application';
import { JobHandler } from './JobHandler.js';
import { meta } from './meta.js';
import type { JobRequest } from './JobRequest.js';

function getHandlers() {
  return useState(meta, 'handlers', new Map<JobRequest['jobName'], JobHandler>() as ReadonlyMap<JobRequest['jobName'], JobHandler>);
}

describe('JobHandler', () => {
  // eslint-disable-next-line ts/consistent-type-assertions
  const generateHandler = (): JobHandler => () => ({}) as never;

  beforeEach(() => {
    getHandlers().current = new Map();
  });

  it('registers a handler for a job name', () => {
    const handler = generateHandler();

    JobHandler.register('email', handler);

    const handlers = getHandlers().current;
    expect(handlers.size).toBe(1);
    expect(handlers.get('email')).toBe(handler);
  });

  it('replaces an existing handler for the same job name', () => {
    const previousHandler = generateHandler();
    const nextHandler = generateHandler();

    JobHandler.register('email', previousHandler);
    const previousMap = getHandlers().current;

    JobHandler.register('email', nextHandler);

    const handlers = getHandlers().current;
    expect(handlers).not.toBe(previousMap);
    expect(handlers.size).toBe(1);
    expect(handlers.get('email')).toBe(nextHandler);
  });

  it('unregisters only the requested handler', () => {
    const emailHandler = generateHandler();
    const smsHandler = generateHandler();

    JobHandler.register('email', emailHandler);
    JobHandler.register('sms', smsHandler);

    JobHandler.unregister('email');

    const handlers = getHandlers().current;
    expect(handlers.has('email')).toBe(false);
    expect(handlers.get('sms')).toBe(smsHandler);
    expect(handlers.size).toBe(1);
  });

  it('does nothing when unregistering a missing job name', () => {
    const existing = generateHandler();

    JobHandler.register('existing', existing);
    const previousMap = getHandlers().current;

    JobHandler.unregister('missing');

    const handlers = getHandlers().current;
    expect(handlers).not.toBe(previousMap);
    expect(handlers.get('existing')).toBe(existing);
    expect(handlers.size).toBe(1);
  });
});
