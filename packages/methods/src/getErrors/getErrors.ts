import {
  type BaseFormStore,
  getFieldStore,
  INTERNAL,
  type RequiredPath,
  type Schema,
  type ValidPath,
} from '@formisch/core';
import type * as v from 'valibot';

export interface GetFormErrorsConfig {
  readonly path?: undefined;
}

export interface GetFieldErrorsConfig<
  TSchema extends Schema,
  TFieldPath extends RequiredPath,
> {
  readonly path: ValidPath<v.InferInput<TSchema>, TFieldPath>;
}

export function getErrors<TSchema extends Schema>(
  form: BaseFormStore<TSchema>
): [string, ...string[]] | null;
export function getErrors<
  TSchema extends Schema,
  TFieldPath extends RequiredPath | undefined = undefined,
>(
  form: BaseFormStore<TSchema>,
  config: TFieldPath extends RequiredPath
    ? GetFieldErrorsConfig<TSchema, TFieldPath>
    : GetFormErrorsConfig
): [string, ...string[]] | null;
export function getErrors(
  form: BaseFormStore,
  config?: GetFormErrorsConfig | GetFieldErrorsConfig<Schema, RequiredPath>
): [string, ...string[]] | null {
  return (
    config?.path ? getFieldStore(form[INTERNAL], config.path) : form[INTERNAL]
  ).errors.value;
}
