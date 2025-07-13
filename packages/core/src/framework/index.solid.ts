import { createSignal as signal } from 'solid-js';
import type { Signal } from '../types/signal.ts';
import type { Framework } from './index.ts';

export { createUniqueId as createId, untrack, batch } from 'solid-js';

export const framework: Framework = 'solid';

export function createSignal<T>(initialValue: T): Signal<T> {
  const [getSignal, setSignal] = signal<T>(initialValue);
  return {
    get value() {
      return getSignal();
    },
    set value(nextValue: T) {
      setSignal(() => nextValue);
    },
  };
}
