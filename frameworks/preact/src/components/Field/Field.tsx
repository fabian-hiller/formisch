import {
  type RequiredPath,
  type Schema,
  type ValidPath,
} from '@formisch/core/preact';
import type { JSX } from 'preact';
import type * as v from 'valibot';
import { useField } from '../../hooks/index.ts';
import type { FieldStore, FormStore } from '../../types/index.ts';

/**
 * Field component props interface.
 */
export interface FieldProps<
  TSchema extends Schema = Schema,
  TFieldPath extends RequiredPath = RequiredPath,
> {
  /**
   * The form store to which the field belongs.
   */
  readonly of: FormStore<TSchema>;
  /**
   * The path to the field within the form schema.
   */
  readonly path: ValidPath<v.InferInput<TSchema>, TFieldPath>;
  /**
   * The render function that receives the field store and returns JSX.
   */
  readonly children: (store: FieldStore<TSchema, TFieldPath>) => JSX.Element;
}

/**
 * Headless form field component that provides reactive properties and state.
 * The field component takes a form store, path to field, and a render function
 * that receives a field store to display field state and handle user interactions.
 *
 * @param props The field component props.
 *
 * @returns The UI of the field to be rendered.
 */
// @__NO_SIDE_EFFECTS__
export function Field<TSchema extends Schema, TFieldPath extends RequiredPath>({
  of,
  path,
  children,
}: FieldProps<TSchema, TFieldPath>): JSX.Element {
  const field = useField(of, { path });
  return children(field);
}
