import {
  type BaseFormStore,
  getFieldInput,
  getFieldStore,
  INTERNAL,
  type PartialValues,
  type PathValue,
  type RequiredPath,
  type Schema,
  type ValidPath,
} from '@formisch/core';
import type * as v from 'valibot';

export interface GetFormInputConfig {
  readonly path?: undefined;
}

export interface GetFieldInputConfig<
  TSchema extends Schema,
  TFieldPath extends RequiredPath,
> {
  readonly path: ValidPath<v.InferInput<TSchema>, TFieldPath>;
}

export function getInput<TSchema extends Schema>(
  form: BaseFormStore<TSchema>
): PartialValues<v.InferInput<TSchema>>;
export function getInput<
  TSchema extends Schema,
  TFieldPath extends RequiredPath | undefined = undefined,
>(
  form: BaseFormStore<TSchema>,
  config: TFieldPath extends RequiredPath
    ? GetFieldInputConfig<TSchema, TFieldPath>
    : GetFormInputConfig
): PartialValues<
  TFieldPath extends RequiredPath
    ? PathValue<v.InferInput<TSchema>, TFieldPath>
    : v.InferInput<TSchema>
>;
export function getInput(
  form: BaseFormStore,
  config?: GetFormInputConfig | GetFieldInputConfig<Schema, RequiredPath>
): unknown {
  return getFieldInput(
    config?.path ? getFieldStore(form[INTERNAL], config.path) : form[INTERNAL]
  );
}
