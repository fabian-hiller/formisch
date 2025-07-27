import {
  createFormStore,
  type FormConfig,
  getFieldBool,
  INTERNAL,
  type Schema,
  validateFormInput,
} from '@formisch/core/qwik';
import {
  $,
  createComputed$,
  implicit$FirstArg,
  QRL,
  useConstant,
  useTask$,
} from '@qwik.dev/core';
import * as v from 'valibot';
import type { FormStore } from '../../types/index.ts';
import { useResolvedQrl } from '../useResolvedQrl/useResolvedQrl.ts';

export function useFormQrl<TSchema extends Schema>(
  configQrl: QRL<FormConfig<TSchema>>
): FormStore<TSchema>;
export function useFormQrl(configQrl: QRL<FormConfig>): FormStore {
  const config = useResolvedQrl(configQrl);

  const form = useConstant(() => {
    const internalFormStore = createFormStore(
      {
        ...config,
        schema: JSON.parse(JSON.stringify(config.schema)),
      },
      $(async (input: unknown) =>
        v.safeParseAsync((await configQrl.resolve()).schema, input)
      )
    );
    return {
      [INTERNAL]: internalFormStore,
      isSubmitting: internalFormStore.isSubmitting,
      isSubmitted: internalFormStore.isSubmitted,
      isValidating: internalFormStore.isValidating,
      isTouched: createComputed$(() =>
        getFieldBool(internalFormStore, 'isTouched')
      ),
      isDirty: createComputed$(() =>
        getFieldBool(internalFormStore, 'isDirty')
      ),
      isValid: createComputed$(
        () => !getFieldBool(internalFormStore, 'errors')
      ),
      errors: internalFormStore.errors,
    };
  });

  const validate = config.validate;
  useTask$(async () => {
    if (validate === 'initial') {
      await validateFormInput(form[INTERNAL]);
    }
  });

  return form;
}

export const useForm$ = implicit$FirstArg(useFormQrl);
