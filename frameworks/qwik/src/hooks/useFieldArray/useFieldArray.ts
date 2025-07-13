import {
  getFieldBool,
  getFieldStore,
  INTERNAL,
  type InternalArrayStore,
  type RequiredPath,
  type Schema,
  type ValidArrayPath,
} from '@formisch/core/qwik';
import { createComputed$, useComputed$, useConstant } from '@qwik.dev/core';
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
  const internalFieldStore = useComputed$(
    () => getFieldStore(form[INTERNAL], pathSignal.value) as InternalArrayStore
  );

  return useConstant(() => ({
    path: pathSignal,
    items: createComputed$(() => internalFieldStore.value.items.value),
    errors: createComputed$(() => internalFieldStore.value.errors.value),
    isTouched: createComputed$(() =>
      getFieldBool(internalFieldStore.value, 'isTouched')
    ),
    isDirty: createComputed$(() =>
      getFieldBool(internalFieldStore.value, 'isDirty')
    ),
    isValid: createComputed$(
      () => !getFieldBool(internalFieldStore.value, 'errors')
    ),
  }));
}
