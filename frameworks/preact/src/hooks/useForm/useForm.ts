import {
  createFormStore,
  type FormConfig,
  getFieldBool,
  INTERNAL,
  type Schema,
  validateFormInput,
} from '@formisch/core/preact';
import { computed } from '@preact/signals';
import { useLayoutEffect, useMemo } from 'preact/hooks';
import * as v from 'valibot';
import type { FormStore } from '../../types/index.ts';

export function useForm<TSchema extends Schema>(
  config: FormConfig<TSchema>
): FormStore<TSchema>;
export function useForm(config: FormConfig): FormStore {
  const form = useMemo(() => {
    const internalFormStore = createFormStore(config, async (input: unknown) =>
      v.safeParseAsync(config.schema, input)
    );
    return {
      [INTERNAL]: internalFormStore,
      isSubmitting: internalFormStore.isSubmitting,
      isSubmitted: internalFormStore.isSubmitted,
      isValidating: internalFormStore.isValidating,
      isTouched: computed(() => getFieldBool(internalFormStore, 'isTouched')),
      isDirty: computed(() => getFieldBool(internalFormStore, 'isDirty')),
      isValid: computed(() => !getFieldBool(internalFormStore, 'errors')),
      errors: internalFormStore.errors,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    if (config.validateOn === 'initial') {
      validateFormInput(form[INTERNAL]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return form;
}
