import { useState } from '@w5s/application';
import { meta } from './meta.js';
import type { JobRequest } from './JobRequest.js';

export const handlers = useState(meta, 'handlers', new Map<JobRequest['_'], JobHandler>());

export interface JobHandler {
  (request: JobRequest): Promise<void> | void;
}
