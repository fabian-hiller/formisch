import {
  type BaseFormStore,
  INTERNAL,
  type Schema,
  validateFormInput,
} from '@formisch/core';
import type * as v from 'valibot';

export interface ValidateFormConfig {
  readonly shouldFocus?: boolean | undefined;
}

export function validate<TSchema extends Schema>(
  form: BaseFormStore<TSchema>,
  config?: ValidateFormConfig
): Promise<v.SafeParseResult<TSchema>> {
  return validateFormInput(form[INTERNAL], config);
}
