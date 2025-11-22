import type { MaybeGetter } from '../../types/index.ts';

export function unwrap<T>(value: MaybeGetter<T>): T;
export function unwrap(value: MaybeGetter<unknown>): unknown {
  if (typeof value === 'function') {
    return value();
  }
  return value;
}
