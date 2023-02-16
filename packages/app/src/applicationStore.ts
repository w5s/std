import type { Record } from '@w5s/core';
import { useRef } from './globalStorage.js';
import type { ApplicationId, ApplicationState } from './data.js';

const emptyObject = Object.freeze({});

/**
 * Application store for data
 */
export const applicationStore = useRef<Record<ApplicationId, ApplicationState>>('application', emptyObject);
