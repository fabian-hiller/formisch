import type { Signal } from '../types/signal.ts';
import type { Framework } from './index.ts';

export { untrack } from 'svelte';

export const framework: Framework = 'svelte';

export function createId(): string {
  return Math.random().toString(36).slice(2);
}

export function createSignal<T>(initialValue: T): Signal<T> {
  let signal = $state.raw(initialValue);
  return {
    get value() {
      return signal;
    },
    set value(nextValue: T) {
      signal = nextValue;
    },
  };
}

export function batch<T>(fn: () => T): T {
  return fn();
}
