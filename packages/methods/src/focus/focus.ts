import {
  type BaseFormStore,
  getFieldStore,
  INTERNAL,
  type RequiredPath,
  type Schema,
  type ValidPath,
} from '@formisch/core';
import type * as v from 'valibot';

export interface FocusFieldConfig<
  TSchema extends Schema,
  TFieldPath extends RequiredPath,
> {
  readonly form: BaseFormStore<TSchema>;
  readonly path: ValidPath<v.InferInput<TSchema>, TFieldPath>;
}

export function focus<TSchema extends Schema, TFieldPath extends RequiredPath>(
  config: FocusFieldConfig<TSchema, TFieldPath>
): void {
  getFieldStore(config.form[INTERNAL], config.path).elements[0]?.focus();
}
