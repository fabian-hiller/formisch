import {
  type FieldElement,
  getElementInput,
  getFieldBool,
  getFieldInput,
  getFieldStore,
  INTERNAL,
  type RequiredPath,
  type Schema,
  setFieldBool,
  setFieldInput,
  validateIfRequired,
  type ValidPath,
} from '@formisch/core/vue';
import type * as v from 'valibot';
import { computed, MaybeRefOrGetter, onUnmounted, toValue } from 'vue';
import type { FieldStore, FormStore } from '../../types/index.ts';

export interface UseFieldConfig<
  TSchema extends Schema = Schema,
  TFieldPath extends RequiredPath = RequiredPath,
> {
  readonly path: ValidPath<v.InferInput<TSchema>, TFieldPath>;
}

export function useField<
  TSchema extends Schema,
  TFieldPath extends RequiredPath,
>(
  form: MaybeRefOrGetter<FormStore<TSchema>>,
  config: MaybeRefOrGetter<UseFieldConfig<TSchema, TFieldPath>>
): FieldStore<TSchema, TFieldPath>;
export function useField(
  form: MaybeRefOrGetter<FormStore>,
  config: MaybeRefOrGetter<UseFieldConfig>
): FieldStore {
  const internalFieldStore = computed(() =>
    getFieldStore(toValue(form)[INTERNAL], toValue(config).path)
  );

  onUnmounted(() => {
    internalFieldStore.value.elements =
      internalFieldStore.value.elements.filter(
        (element) => element.isConnected
      );
  });

  const input = computed(() => getFieldInput(internalFieldStore.value));
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
      return toValue(config).path;
    },
    get input() {
      return input.value;
    },
    set input(value) {
      setFieldInput(internalFieldStore.value, value);
      validateIfRequired(
        toValue(form)[INTERNAL],
        internalFieldStore.value,
        'input'
      );
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
    props: {
      get name() {
        return internalFieldStore.value.name;
      },
      autofocus: !!internalFieldStore.value.errors.value,
      ref(element) {
        if (element) {
          internalFieldStore.value.elements.push(element as FieldElement);
        }
      },
      onFocus() {
        setFieldBool(internalFieldStore.value, 'isTouched', true);
        validateIfRequired(
          toValue(form)[INTERNAL],
          internalFieldStore.value,
          'touch'
        );
      },
      onChange() {
        validateIfRequired(
          toValue(form)[INTERNAL],
          internalFieldStore.value,
          'change'
        );
      },
      onBlur() {
        validateIfRequired(
          toValue(form)[INTERNAL],
          internalFieldStore.value,
          'blur'
        );
      },
    },
  };
}
