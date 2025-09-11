import {
  getFieldBool,
  getFieldStore,
  INTERNAL,
  type InternalArrayStore,
  type RequiredPath,
  type Schema,
  type ValidArrayPath,
} from '@formisch/core/svelte';
import type * as v from 'valibot';
import type {
  FieldArrayStore,
  FormStore,
  MaybeGetter,
} from '../../types/index.ts';
import { unwrap } from '../../utils/index.ts';

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
  form: MaybeGetter<FormStore<TSchema>>,
  config: MaybeGetter<UseFieldArrayConfig<TSchema, TFieldArrayPath>>
): FieldArrayStore<TSchema, TFieldArrayPath>;
export function useFieldArray<
  TSchema extends Schema = Schema,
  TFieldArrayPath extends RequiredPath = RequiredPath,
>(
  form: MaybeGetter<FormStore<TSchema>>,
  config: MaybeGetter<UseFieldArrayConfig<TSchema, TFieldArrayPath>>
): FieldArrayStore<TSchema, TFieldArrayPath> {
  const path = $derived(unwrap(config).path);
  const internalFieldStore = $derived(
    getFieldStore(unwrap(form)[INTERNAL], path) as InternalArrayStore
  );

  const isTouched = $derived(getFieldBool(internalFieldStore, 'isTouched'));
  const isDirty = $derived(getFieldBool(internalFieldStore, 'isDirty'));
  const isValid = $derived(!getFieldBool(internalFieldStore, 'errors'));

  return {
    get path() {
      return path;
    },
    get items() {
      return internalFieldStore.items.value;
    },
    get errors() {
      return internalFieldStore.errors.value;
    },
    get isTouched() {
      return isTouched;
    },
    get isDirty() {
      return isDirty;
    },
    get isValid() {
      return isValid;
    },
  };
}
