import { type QRL, useSignal } from '@qwik.dev/core';

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
