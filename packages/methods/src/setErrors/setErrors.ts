import {
  type BaseFormStore,
  getFieldStore,
  INTERNAL,
  type RequiredPath,
  type Schema,
  type ValidPath,
} from '@formisch/core';
import type * as v from 'valibot';

export interface SetFormErrorsConfig {
  readonly path?: undefined;
  readonly errors: [string, ...string[]] | null;
}

export interface SetFieldErrorsConfig<
  TSchema extends Schema,
  TFieldPath extends RequiredPath,
> {
  readonly path: ValidPath<v.InferInput<TSchema>, TFieldPath>;
  readonly errors: [string, ...string[]] | null;
}

export function setErrors<
  TSchema extends Schema,
  TFieldPath extends RequiredPath | undefined = undefined,
>(
  form: BaseFormStore<TSchema>,
  config: TFieldPath extends RequiredPath
    ? SetFieldErrorsConfig<TSchema, TFieldPath>
    : SetFormErrorsConfig
): void;
export function setErrors(
  form: BaseFormStore,
  config: SetFormErrorsConfig | SetFieldErrorsConfig<Schema, RequiredPath>
): void {
  (config.path
    ? getFieldStore(form[INTERNAL], config.path)
    : form[INTERNAL]
  ).errors.value = config.errors;
}
