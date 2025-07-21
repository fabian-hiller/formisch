import {
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
} from '@formisch/core/preact';
import { computed, useComputed, useSignalEffect } from '@preact/signals';
import { useMemo } from 'preact/hooks';
import type * as v from 'valibot';
import type { FieldStore, FormStore } from '../../types/index.ts';
import { usePathSignal } from '../usePathSignal/index.ts';

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
  form: FormStore<TSchema>,
  config: UseFieldConfig<TSchema, TFieldPath>
): FieldStore<TSchema, TFieldPath>;
export function useField(form: FormStore, config: UseFieldConfig): FieldStore {
  const pathSignal = usePathSignal(config.path);
  const internalFieldStore = useComputed(() =>
    getFieldStore(form[INTERNAL], pathSignal.value)
  );

  useSignalEffect(() => {
    return () => {
      internalFieldStore.value.elements =
        internalFieldStore.value.elements.filter(
          (element) => element.isConnected
        );
    };
  });

  return useMemo(
    () => ({
      path: pathSignal,
      input: computed(() => getFieldInput(internalFieldStore.value)),
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
      props: {
        get name() {
          return internalFieldStore.value.name;
        },
        autofocus: !!internalFieldStore.value.errors.value,
        ref(element) {
          if (element) {
            internalFieldStore.value.elements.push(element);
          }
        },
        onFocus() {
          setFieldBool(internalFieldStore.value, 'isTouched', true);
          validateIfRequired(form[INTERNAL], internalFieldStore.value, 'touch');
        },
        onInput(event) {
          setFieldInput(
            internalFieldStore.value,
            getElementInput(event.currentTarget, internalFieldStore.value)
          );
          validateIfRequired(form[INTERNAL], internalFieldStore.value, 'input');
        },
        onChange() {
          validateIfRequired(
            form[INTERNAL],
            internalFieldStore.value,
            'change'
          );
        },
        onBlur() {
          validateIfRequired(form[INTERNAL], internalFieldStore.value, 'blur');
        },
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
}
