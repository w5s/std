import { describe, it, expect, vi } from 'vitest';
import { FakeTask, withTask } from '../Testing.js';
import { map } from './map.js';
import { runReportTask } from './_stub.spec.js';

describe(map, () => {
  const anyError = 'anyError';
  const anyValue = Object.freeze({ foo: true });
  const expectTask = withTask(expect);

  it('keeps unchanged when failure', async () => {
    const task = FakeTask<typeof anyValue, typeof anyError>({ error: anyError });
    const mapTask = map(task, (_) => ({ ..._, bar: true }));

    await expectTask(mapTask).toReject(anyError);
  });
  it('maps value when success', async () => {
    const task = FakeTask({ value: anyValue });
    const mapTask = map(task, (_) => ({ ..._, bar: true }));
    await expectTask(mapTask).toResolve({
      ...anyValue,
      bar: true,
    });
  });
  it('maps value when async success', async () => {
    const task = FakeTask({ delayMs: 0, value: anyValue });
    const mapTask = map(task, (_) => ({ ..._, bar: true }));
    await expectTask(mapTask).toResolve({
      ...anyValue,
      bar: true,
    });
  });
  it('forwards canceler', async () => {
    const task = FakeTask<typeof anyValue, typeof anyError>({ delayMs: 0, value: anyValue });
    const mapTask = map(task, (_) => _);
    vi.spyOn(task, 'taskRun');
    const runReport = runReportTask(mapTask);
    expect(task.taskRun).toHaveBeenCalledWith({
      resolve: expect.any(Function),
      reject: expect.any(Function),
      canceler: runReport.cancelerRef,
      run: runReport.run,
    });
    await runReport.finished;
  });
});
