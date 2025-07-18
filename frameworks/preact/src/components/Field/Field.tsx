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
 * Properties of the `Field` component.
 */
export interface FieldProps<
  TSchema extends Schema = Schema,
  TFieldPath extends RequiredPath = RequiredPath,
> {
  readonly of: FormStore<TSchema>;
  readonly path: ValidPath<v.InferInput<TSchema>, TFieldPath>;
  readonly render: (store: FieldStore<TSchema, TFieldPath>) => JSX.Element;
}

/**
 * Headless form field that provides reactive properties and state.
 */
export function Field<TSchema extends Schema, TFieldPath extends RequiredPath>({
  of,
  path,
  render,
}: FieldProps<TSchema, TFieldPath>): JSX.Element {
  const field = useField(of, { path });
  return render(field);
}
