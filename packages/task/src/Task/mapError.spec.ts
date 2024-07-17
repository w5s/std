import { describe, it, expect, vi } from 'vitest';
import { mapError } from './mapError.js';
import { taskStub, withTask } from '../Testing.js';
import { runReportTask } from './_stub.spec.js';

describe(mapError, () => {
  const anyError = Object.freeze({ message: 'error message' });
  const anyValue = Object.freeze({ foo: true });
  const expectTask = withTask(expect);

  it('keeps unchanged when success', async () => {
    const task = taskStub<typeof anyValue, typeof anyError>({ value: anyValue });
    const mapTask = mapError(task, (_) => ({ ..._, bar: true }));

    await expectTask(mapTask).toResolve(anyValue);
  });
  it('maps error when success', async () => {
    const task = taskStub<typeof anyValue, typeof anyError>({ error: anyError });
    const mapTask = mapError(task, (_) => ({ ..._, bar: true }));

    await expectTask(mapTask).toReject({
      ...anyError,
      bar: true,
    });
  });
  it('maps error when async failure', async () => {
    const task = taskStub({ delayMs: 0, error: anyError });
    const mapTask = mapError(task, (_) => ({ ..._, bar: true }));

    await expectTask(mapTask).toReject({
      ...anyError,
      bar: true,
    });
  });
  it('forwards canceler', async () => {
    const task = taskStub<typeof anyValue, typeof anyError>({ delayMs: 0, value: anyValue });
    const mapTask = mapError(task, (_) => _);
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
