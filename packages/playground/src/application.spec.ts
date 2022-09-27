import { describe, expect, test, jest } from '@jest/globals';
import { Task } from '@w5s/core';
import { Application } from './application.js';

describe(Application, () => {
  // eslint-disable-next-line no-plusplus
  const appId = () => `app-${appId.current++}`;
  appId.current = 0;

  describe('Internal', () => {
    const { state, defaultState, ref } = Application.Internal;
    describe('state', () => {
      test('should be a symbol', () => {
        expect(typeof state).toBe('symbol');
      });
    });
    describe('defaultState', () => {
      test('should equal correct data', () => {
        expect(defaultState).toEqual({
          application: {},
          status: {},
          configuration: {},
        });
      });
    });
    describe('ref()', () => {
      test('should have a current getter that defaults to Application.defaultState', () => {
        const globalMock = {};
        const _stateRef = ref(globalMock);
        expect(_stateRef.current).toBe(defaultState);
      });
      test('should have a current setter that will set value', () => {
        const globalMock = {};
        const _stateRef = ref(globalMock);
        const nextState = { ...defaultState };
        _stateRef.current = nextState;
        expect(_stateRef.current).toBe(nextState);
      });
    });
  });
  describe('()', () => {
    const applicationDidChange = () => Task.resolve(undefined);
    const applicationStart = () => Task.resolve(undefined);
    const applicationDefault = { foo: true };
    test('should return a new application', () => {
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
    test('should have default applicationDidChange', () => {
      const applicationId = appId();
      const app = Application({
        applicationId,
        applicationStart,
        applicationDefault,
      });
      const task = app.applicationDidChange(applicationDefault, applicationDefault);
      expect(Task.unsafeRunOk(task)).toEqual(undefined);
    });
    test('should have default applicationStart', () => {
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

  describe(Application.get, () => {
    const applicationDefault = {
      foo: true,
      bar: 1,
    };
    const applicationStart = () => Task.resolve(undefined);
    test('should return default value', async () => {
      const app = Application({
        applicationId: appId(),
        applicationStart,
        applicationDefault,
      });
      expect(Application.get(app, 'foo')).toBe(true);
    });
    test('should run applicationDidChange task', () =>
      new Promise((resolve) => {
        const app = Application({
          applicationId: appId(),
          applicationDefault,
          applicationDidChange: () => Task(({ ok }) => ok(resolve(undefined))),
        });
        Application.set(app, 'foo', false);
      }));
    test('should return state value if present', () =>
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
  describe(Application.start, () => {
    const applicationDefault = {
      foo: false,
    };

    test('should run start task once', async () => {
      const run = jest.fn();
      const app = Application({
        applicationId: appId(),
        applicationStart: () =>
          Task(({ ok }) => {
            expect(Application.get(app, 'foo')).toBe(true);
            run();
            return ok();
          }),
        applicationDefault,
      });
      Application.set(app, 'foo', true);
      await expect(Task.unsafeRunOk(Application.start(app))).resolves.toBe(undefined);
      expect(run).toHaveBeenCalledTimes(1);
      await expect(Task.unsafeRunOk(Application.start(app))).resolves.toBe(undefined);
      expect(run).toHaveBeenCalledTimes(1);
    });
  });
});
