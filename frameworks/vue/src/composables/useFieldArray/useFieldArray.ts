import {
  getFieldBool,
  getFieldStore,
  INTERNAL,
  type InternalArrayStore,
  type RequiredPath,
  type Schema,
  type ValidArrayPath,
} from '@formisch/core/vue';
import type * as v from 'valibot';
import { computed, type Ref, toRef, unref } from 'vue';
import type {
  FieldArrayStore,
  FormStore,
  MaybeRef,
} from '../../types/index.ts';

export interface UseFieldArrayConfig<
  TSchema extends Schema = Schema,
  TFieldArrayPath extends RequiredPath = RequiredPath,
> {
  readonly path: MaybeRef<
    ValidArrayPath<v.InferInput<TSchema>, TFieldArrayPath>
  >;
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
  const internalFieldStore = computed(
    () =>
      getFieldStore(form[INTERNAL], unref(config.path)) as InternalArrayStore
  );

  const isTouched = computed(() =>
    getFieldBool(internalFieldStore.value, 'isTouched')
  );
  const isDirty = computed(() =>
    getFieldBool(internalFieldStore.value, 'isDirty')
  );
  const isValid = computed(
    () => !getFieldBool(internalFieldStore.value, 'errors')
  );

  return {
    get path() {
      return unref(config.path);
    },
    get items() {
      return internalFieldStore.value.items.value;
    },
    get errors() {
      return internalFieldStore.value.errors.value;
    },
    get isTouched() {
      return isTouched.value;
    },
    get isDirty() {
      return isDirty.value;
    },
    get isValid() {
      return isValid.value;
    },
  };
}
