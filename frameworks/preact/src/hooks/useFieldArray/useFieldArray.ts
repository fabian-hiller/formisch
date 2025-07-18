import {
  getFieldBool,
  getFieldStore,
  INTERNAL,
  type InternalArrayStore,
  type RequiredPath,
  type Schema,
  type ValidArrayPath,
} from '@formisch/core/preact';
import { computed, useComputed } from '@preact/signals';
import { useMemo } from 'preact/hooks';
import type * as v from 'valibot';
import type { FieldArrayStore, FormStore } from '../../types/index.ts';
import { usePathSignal } from '../usePathSignal/usePathSignal.ts';

export interface UseFieldArrayConfig<
  TSchema extends Schema = Schema,
  TFieldArrayPath extends RequiredPath = RequiredPath,
> {
  readonly path: ValidArrayPath<v.InferInput<TSchema>, TFieldArrayPath>;
}

export function useFieldArray<
  TSchema extends Schema,
  TFieldArrayPath extends RequiredPath,
>(
  form: FormStore<TSchema>,
  config: UseFieldArrayConfig<TSchema, TFieldArrayPath>
): FieldArrayStore<TSchema, TFieldArrayPath>;
export function useFieldArray(
  form: FormStore,
  config: UseFieldArrayConfig
): FieldArrayStore {
  const pathSignal = usePathSignal(config.path);
  const internalFieldStore = useComputed(
    () => getFieldStore(form[INTERNAL], pathSignal.value) as InternalArrayStore
  );

  return useMemo(
    () => ({
      path: pathSignal,
      items: computed(() => internalFieldStore.value.items.value),
      errors: computed(() => internalFieldStore.value.errors.value),
      isTouched: computed(() =>
        getFieldBool(internalFieldStore.value, 'isTouched')
      ),
      isDirty: computed(() =>
        getFieldBool(internalFieldStore.value, 'isDirty')
      ),
      isValid: computed(
        () => !getFieldBool(internalFieldStore.value, 'errors')
      ),
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
}
