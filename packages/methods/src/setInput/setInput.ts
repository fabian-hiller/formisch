import {
  type BaseFormStore,
  batch,
  getFieldStore,
  INTERNAL,
  type PathValue,
  type RequiredPath,
  type Schema,
  setFieldInput,
  validateIfRequired,
  type ValidPath,
} from '@formisch/core';
import type * as v from 'valibot';

export interface SetFormInputConfig<TSchema extends Schema> {
  readonly path?: undefined;
  readonly input: v.InferInput<TSchema>;
}

export interface SetFieldInputConfig<
  TSchema extends Schema,
  TFieldPath extends RequiredPath,
> {
  readonly path: ValidPath<v.InferInput<TSchema>, TFieldPath>;
  readonly input: PathValue<v.InferInput<TSchema>, TFieldPath>;
}

export function setInput<TSchema extends Schema>(
  form: BaseFormStore<TSchema>,
  config: SetFormInputConfig<TSchema>
): void;
export function setInput<
  TSchema extends Schema,
  TFieldPath extends RequiredPath | undefined = undefined,
>(
  form: BaseFormStore<TSchema>,
  config: TFieldPath extends RequiredPath
    ? SetFieldInputConfig<TSchema, TFieldPath>
    : SetFormInputConfig<TSchema>
): void;
export function setInput(
  form: BaseFormStore,
  config: SetFormInputConfig<Schema> | SetFieldInputConfig<Schema, RequiredPath>
): void {
  batch(() => {
    const internalFormStore = form[INTERNAL];
    setFieldInput(internalFormStore, config.path ?? [], config.input);
    // TODO: Should we validate on touch, change and blur too?
    validateIfRequired(
      internalFormStore,
      config.path
        ? getFieldStore(internalFormStore, config.path)
        : internalFormStore,
      'input'
    );
  });
}
