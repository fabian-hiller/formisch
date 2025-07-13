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
} from '@formisch/core/solid';
import { createMemo, onCleanup } from 'solid-js';
import type * as v from 'valibot';
import type { FieldStore, FormStore, MaybeGetter } from '../../types/index.ts';
import { unwrap } from '../../utils/index.ts';

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
  form: MaybeGetter<FormStore<TSchema>>,
  config: MaybeGetter<UseFieldConfig<TSchema, TFieldPath>>
): FieldStore<TSchema, TFieldPath>;
export function useField(
  form: MaybeGetter<FormStore>,
  config: MaybeGetter<UseFieldConfig>
): FieldStore {
  const getInternalFormStore = createMemo(() => unwrap(form)[INTERNAL]);
  const getInternalFieldStore = createMemo(() =>
    getFieldStore(getInternalFormStore(), unwrap(config).path)
  );

  return {
    get path() {
      return unwrap(config).path;
    },
    get input() {
      return getFieldInput(getInternalFieldStore());
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
    props: {
      get name() {
        return getInternalFieldStore().name;
      },
      // eslint-disable-next-line solid/reactivity
      autofocus: !!getInternalFieldStore().errors.value,
      ref: (element) => {
        const internalFieldStore = getInternalFieldStore();
        internalFieldStore.elements.push(element);
        onCleanup(() => {
          internalFieldStore.elements = internalFieldStore.elements.filter(
            (el) => el !== element
          );
        });
      },
      onFocus() {
        setFieldBool(getInternalFieldStore(), 'isTouched', true);
        validateIfRequired(
          getInternalFormStore(),
          getInternalFieldStore(),
          'touch'
        );
      },
      onInput(event) {
        const internalFieldStore = getInternalFieldStore();
        const nextValue = getElementInput(
          event.currentTarget,
          internalFieldStore
        );
        setFieldInput(internalFieldStore, nextValue);
        validateIfRequired(getInternalFormStore(), internalFieldStore, 'input');
      },
      onChange() {
        validateIfRequired(
          getInternalFormStore(),
          getInternalFieldStore(),
          'change'
        );
      },
      onBlur() {
        validateIfRequired(
          getInternalFormStore(),
          getInternalFieldStore(),
          'blur'
        );
      },
    },
  };
}
