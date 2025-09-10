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
} from '@formisch/core/svelte';
import { createAttachmentKey } from 'svelte/attachments';
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
  const internalFormStore = $derived(unwrap(form)[INTERNAL]);
  const internalFieldStore = $derived(
    getFieldStore(internalFormStore, unwrap(config).path)
  );

  const input = $derived(getFieldInput(internalFieldStore));
  const isTouched = $derived(getFieldBool(internalFieldStore, 'isTouched'));
  const isDirty = $derived(getFieldBool(internalFieldStore, 'isDirty'));
  const isValid = $derived(!getFieldBool(internalFieldStore, 'errors'));

  return {
    get path() {
      return unwrap(config).path;
    },
    get input() {
      return input;
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
    props: {
      get name() {
        return internalFieldStore.name;
      },
      autofocus: !!internalFieldStore.errors.value,
      [createAttachmentKey()](element) {
        internalFieldStore.elements.push(element);
        return () => {
          internalFieldStore.elements = internalFieldStore.elements.filter(
            (el) => el !== element
          );
        };
      },
      onfocus() {
        setFieldBool(internalFieldStore, 'isTouched', true);
        validateIfRequired(internalFormStore, internalFieldStore, 'touch');
      },
      oninput(event) {
        setFieldInput(
          internalFieldStore,
          getElementInput(event.currentTarget, internalFieldStore)
        );
        validateIfRequired(internalFormStore, internalFieldStore, 'input');
      },
      onchange() {
        validateIfRequired(internalFormStore, internalFieldStore, 'change');
      },
      onblur() {
        validateIfRequired(internalFormStore, internalFieldStore, 'blur');
      },
    },
  };
}
