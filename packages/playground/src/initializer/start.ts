import { useRef } from '@w5s/application/dist/useRef.js';
import type { Result } from '@w5s/core';
import { Ok } from '@w5s/core/dist/Result/Ok.js';
import type { Initializer } from './Initializer.js';
import { InitializerApplication } from './InitializerApplication.js';
import { InitializerStatus } from './InitializerStatus.js';

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const status = useRef(InitializerApplication.state, 'status', {} as Record<Initializer['id'], InitializerStatus>);

function getStatus(initializer: Initializer) {
  return status.current[initializer.id] ?? InitializerStatus.Stopped;
}

function setStatus(initializer: Initializer, statusValue: InitializerStatus) {
  status.current = {
    ...status.current,
    [initializer.id]: statusValue,
  };
}

export async function start<AppContext extends object, AppError>(
  appContext: AppContext,
  initializer: Initializer<AppContext, AppError>,
): Promise<Result<void, AppError>> {
  const currentStatus = getStatus(initializer);
  if (currentStatus === InitializerStatus.Stopped) {
    setStatus(initializer, InitializerStatus.Starting);
    const result = await initializer.onStart(appContext);
    setStatus(initializer, InitializerStatus.Ready);
    return result;
  }
  return Ok();
}
