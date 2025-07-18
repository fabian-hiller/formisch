import type { Framework } from './index.ts';

export {
  signal as createSignal,
  untracked as untrack,
  batch,
} from '@preact/signals';

export const framework: Framework = 'preact';

export function createId(): string {
  return Math.random().toString(36).slice(2);
}
