import type { Framework } from './index.ts';

export { shallowRef as createSignal } from 'vue';

export const framework: Framework = 'vue';

export function createId(): string {
  return Math.random().toString(36).slice(2);
}

export function batch<T>(fn: () => T): T {
  return fn();
}

export function untrack<T>(fn: () => T): T {
  return fn();
}
