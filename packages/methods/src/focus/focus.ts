import {
  type BaseFormStore,
  getFieldStore,
  INTERNAL,
  type RequiredPath,
  type Schema,
  type ValidPath,
} from '@formisch/core';
import type * as v from 'valibot';

/**
 * Focus field config interface.
 */
export interface FocusFieldConfig<
  TSchema extends Schema,
  TFieldPath extends RequiredPath,
> {
  /**
   * The form store containing the field.
   *
   * TODO: This should be the first parameter, not part of the config.
   */
  readonly form: BaseFormStore<TSchema>;

  /**
   * The path to the field to focus.
   */
  readonly path: ValidPath<v.InferInput<TSchema>, TFieldPath>;
}

/**
 * Focuses the first input element of a field. This is useful for
 * programmatically setting focus to a specific field, such as after
 * validation errors or user interactions.
 *
 * @param config The focus field configuration.
 */
export function focus<TSchema extends Schema, TFieldPath extends RequiredPath>(
  config: FocusFieldConfig<TSchema, TFieldPath>
): void {
  getFieldStore(config.form[INTERNAL], config.path).elements[0]?.focus();
}
