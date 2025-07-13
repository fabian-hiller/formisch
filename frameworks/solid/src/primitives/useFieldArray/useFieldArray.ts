import {
  getFieldBool,
  getFieldStore,
  INTERNAL,
  type InternalArrayStore,
  type RequiredPath,
  type Schema,
  type ValidArrayPath,
} from '@formisch/core/solid';
import { createMemo } from 'solid-js';
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
export function useFieldArray(
  form: MaybeGetter<FormStore>,
  config: MaybeGetter<UseFieldArrayConfig>
): FieldArrayStore {
  const getInternalFieldStore = createMemo(
    () =>
      getFieldStore(
        unwrap(form)[INTERNAL],
        unwrap(config).path
      ) as InternalArrayStore
  );

  return {
    get path() {
      return unwrap(config).path;
    },
    get items() {
      return getInternalFieldStore().items.value;
    },
    get errors() {
      return getInternalFieldStore().errors.value;
    },
    get isTouched() {
      return getFieldBool(getInternalFieldStore(), 'isTouched');
    },
    get isDirty() {
      return getFieldBool(getInternalFieldStore(), 'isDirty');
    },
    get isValid() {
      return !getFieldBool(getInternalFieldStore(), 'errors');
    },
  };
}
