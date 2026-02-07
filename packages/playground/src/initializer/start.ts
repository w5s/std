import { Ref, type Result } from '@w5s/core';
import { Ok } from '@w5s/core/dist/Result/Ok.js';
import { useGlobalValue } from '@w5s/global-storage';
import type { Initializer } from './Initializer.js';
import { InitializerStatus } from './InitializerStatus.js';

const status = useGlobalValue('@w5s/initializer', () => Ref<Record<Initializer['id'], InitializerStatus>>({}));

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
