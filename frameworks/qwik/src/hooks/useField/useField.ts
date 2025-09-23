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
} from '@formisch/core/qwik';
import {
  $,
  createComputed$,
  useComputed$,
  useConstant,
  useTask$,
} from '@qwik.dev/core';
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
  const internalFormStore = form[INTERNAL];
  const internalFieldStore = useComputed$(() =>
    getFieldStore(internalFormStore, pathSignal.value)
  );

  useTask$(({ track, cleanup }) => {
    track(internalFieldStore);
    cleanup(() => {
      internalFieldStore.value.elements =
        internalFieldStore.value.elements.filter(
          (element) => element.isConnected
        );
    });
  });

  return useConstant(() => ({
    path: pathSignal,
    input: createComputed$(() => getFieldInput(internalFieldStore.value)),
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
    props: {
      get name() {
        return internalFieldStore.value.name;
      },
      autofocus: !!internalFieldStore.value.errors.value,
      ref: $((element) => {
        internalFieldStore.value.elements.push(element);
      }),
      onFocus$: $(() => {
        setFieldBool(internalFieldStore.value, 'isTouched', true);
        validateIfRequired(
          internalFormStore,
          internalFieldStore.value,
          'touch'
        );
      }),
      onInput$: $((_, element) => {
        setFieldInput(
          internalFormStore,
          pathSignal.value,
          getElementInput(element, internalFieldStore.value)
        );
        validateIfRequired(
          internalFormStore,
          internalFieldStore.value,
          'input'
        );
      }),
      onChange$: $(() => {
        validateIfRequired(
          internalFormStore,
          internalFieldStore.value,
          'change'
        );
      }),
      onBlur$: $(() => {
        validateIfRequired(internalFormStore, internalFieldStore.value, 'blur');
      }),
    },
  }));
}
