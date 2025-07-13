import type { Signal } from '../types/index.ts';

export type Framework = 'solid' | 'qwik';

export const framework: Framework = '' as Framework;

export function createId(): string {
  throw new Error('No framework selected');
}

export function createSignal<T>(): Signal<T | undefined>;
export function createSignal<T>(value: T): Signal<T>;
export function createSignal(): Signal<unknown> {
  throw new Error('No framework selected');
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function batch<T>(fn: () => T): T {
  throw new Error('No framework selected');
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function untrack<T>(fn: () => T): T {
  throw new Error('No framework selected');
}
