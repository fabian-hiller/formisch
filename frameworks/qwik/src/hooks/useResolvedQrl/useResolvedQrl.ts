import { type QRL, useSignal } from '@qwik.dev/core';

/**
 * Resolves a QRL to its value within a Qwik component. Caches the resolved value
 * to avoid re-resolving on each render and throws a promise during resolution.
 *
 * @param qrl The QRL to resolve.
 *
 * @returns The resolved value from the QRL.
 */
// @__NO_SIDE_EFFECTS__
export function useResolvedQrl<T>(qrl: QRL<T>): T {
  const store = useSignal<T>();
  const resolved = qrl.resolved ?? store.value;
  if (!resolved) {
    throw qrl.resolve().then((resolved) => {
      store.value = resolved;
    });
  }
  return resolved;
}
