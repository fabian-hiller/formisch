import type { Framework } from './index.ts';

export { createSignal, untrack } from '@qwik.dev/core';

export const framework: Framework = 'qwik';

export function createId(): string {
  return Math.random().toString(36).slice(2);
}

export function batch<T>(fn: () => T): T {
  return fn();
}
