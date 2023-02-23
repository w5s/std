import type { Record } from '@w5s/core';
import { useRef } from './globalStorage.js';
import type { ApplicationId, ApplicationState } from './data.js';

const emptyObject = Object.freeze({});

/**
 * Application state
 */
export const applicationState = useRef<Record<ApplicationId, ApplicationState>>('application', emptyObject);
