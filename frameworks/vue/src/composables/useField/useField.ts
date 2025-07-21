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
import { computed, onUnmounted, unref } from 'vue';
import type { FieldStore, FormStore, MaybeRef } from '../../types/index.ts';

export interface UseFieldConfig<
  TSchema extends Schema = Schema,
  TFieldPath extends RequiredPath = RequiredPath,
> {
  readonly path: MaybeRef<ValidPath<v.InferInput<TSchema>, TFieldPath>>;
}

export function useField<
  TSchema extends Schema,
  TFieldPath extends RequiredPath,
>(
  form: FormStore<TSchema>,
  config: UseFieldConfig<TSchema, TFieldPath>
): FieldStore<TSchema, TFieldPath>;
export function useField(form: FormStore, config: UseFieldConfig): FieldStore {
  const internalFieldStore = computed(() =>
    getFieldStore(form[INTERNAL], unref(config.path))
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
      return unref(config.path);
    },
    get input() {
      return input.value;
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
        validateIfRequired(form[INTERNAL], internalFieldStore.value, 'touch');
      },
      onInput(event) {
        setFieldInput(
          internalFieldStore.value,
          getElementInput(
            event.currentTarget as FieldElement,
            internalFieldStore.value
          )
        );
        validateIfRequired(form[INTERNAL], internalFieldStore.value, 'input');
      },
      onChange() {
        validateIfRequired(form[INTERNAL], internalFieldStore.value, 'change');
      },
      onBlur() {
        validateIfRequired(form[INTERNAL], internalFieldStore.value, 'blur');
      },
    },
  };
}
