import { describe, expect, it, jest } from '@jest/globals';
import { Task } from '@w5s/core';
import { Application } from './application.js';

describe('Application', () => {
  // eslint-disable-next-line no-plusplus
  const appId = () => `app-${appId.current++}`;
  appId.current = 0;

  describe('state', () => {
    it('should be a symbol', () => {
      expect(typeof Application.state).toBe('symbol');
    });
  });

  describe('()', () => {
    const applicationDidChange = () => Task.resolve(undefined);
    const applicationStart = () => Task.resolve(undefined);
    const applicationDefault = { foo: true };
    it('should return a new application', () => {
      const applicationId = appId();

      expect(
        Application({
          applicationId,
          applicationStart,
          applicationDefault,
          applicationDidChange,
        })
      ).toEqual({
        applicationId,
        applicationStart,
        applicationDefault,
        applicationDidChange,
      });
    });
    it('should have default applicationDidChange', () => {
      const applicationId = appId();
      const app = Application({
        applicationId,
        applicationStart,
        applicationDefault,
      });
      const task = app.applicationDidChange(applicationDefault, applicationDefault);
      expect(Task.unsafeRunOk(task)).toEqual(undefined);
    });
    it('should have default applicationStart', () => {
      const applicationId = appId();
      const app = Application({
        applicationId,
        applicationDefault,
        applicationDidChange,
      });
      expect(app.applicationStart()).toEqual(
        expect.objectContaining({
          taskRun: expect.any(Function),
        })
      );
    });
  });

  describe('.get', () => {
    const applicationDefault = {
      foo: true,
      bar: 1,
    };
    const applicationStart = () => Task.resolve(undefined);
    it('should return default value', async () => {
      const app = Application({
        applicationId: appId(),
        applicationStart,
        applicationDefault,
      });
      expect(Application.get(app, 'foo')).toBe(true);
    });
    it('should run applicationDidChange task', () =>
      new Promise((resolve) => {
        const app = Application({
          applicationId: appId(),
          applicationDefault,
          applicationDidChange: () => Task(({ ok }) => ok(resolve(undefined))),
        });
        Application.set(app, 'foo', false);
      }));
    it('should return state value if present', () =>
      new Promise((resolve) => {
        const app = Application({
          applicationId: appId(),
          applicationStart,
          applicationDefault,
          applicationDidChange: () =>
            Task(({ ok }) => {
              expect(Application.get(app, 'foo')).toBe(false);
              expect(Application.get(app, 'bar')).toBe(2);
              return ok(resolve(undefined));
            }),
        });
        Application.set(app, 'foo', false);
        Application.set(app, 'bar', 2);
        expect(Application.get(app, 'foo')).toBe(true);
        expect(Application.get(app, 'bar')).toBe(1);
      }));
  });
  describe('.start', () => {
    const applicationDefault = {
      foo: false,
    };

    it('should run start task once', async () => {
      const run = jest.fn();
      const app = Application({
        applicationId: appId(),
        applicationStart: () =>
          Task.wrap((resolve) => {
            expect(Application.get(app, 'foo')).toBe(true);
            run();
            setTimeout(resolve, 10);
          }),
        applicationDefault,
      });
      Application.set(app, 'foo', true);
      const startFirst = Task.unsafeRunOk(Application.start(app));
      const startSecond = Task.unsafeRunOk(Application.start(app));

      await expect(startFirst).resolves.toBe(undefined);
      expect(run).toHaveBeenCalledTimes(1);
      await expect(startSecond).resolves.toBe(undefined);
      expect(run).toHaveBeenCalledTimes(1);
    });
  });
});
