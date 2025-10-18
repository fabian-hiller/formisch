import {
  type RequiredPath,
  type Schema,
  type ValidArrayPath,
} from '@formisch/core/preact';
import type { JSX } from 'preact';
import type * as v from 'valibot';
import { useFieldArray } from '../../hooks/index.ts';
import type { FieldArrayStore, FormStore } from '../../types/index.ts';

/**
 * FieldArray component props interface.
 */
export interface FieldArrayProps<
  TSchema extends Schema = Schema,
  TFieldArrayPath extends RequiredPath = RequiredPath,
> {
  /**
   * The form store to which the field array belongs.
   */
  readonly of: FormStore<TSchema>;
  /**
   * The path to the field array within the form schema.
   */
  readonly path: ValidArrayPath<v.InferInput<TSchema>, TFieldArrayPath>;
  /**
   * The render function that receives the field array store and returns JSX.
   */
  readonly children: (
    store: FieldArrayStore<TSchema, TFieldArrayPath>
  ) => JSX.Element;
}

/**
 * Headless field array component that provides reactive properties and state.
 * The field array component takes a form store, path to array field, and a render
 * function that receives a field array store to manage array items and handle
 * array operations.
 *
 * @param props The field array component props.
 *
 * @returns The UI of the field array to be rendered.
 */
// @__NO_SIDE_EFFECTS__
export function FieldArray<
  TSchema extends Schema,
  TFieldArrayPath extends RequiredPath,
>({
  of,
  path,
  children,
}: FieldArrayProps<TSchema, TFieldArrayPath>): JSX.Element {
  const field = useFieldArray(of, { path });
  return children(field);
}
