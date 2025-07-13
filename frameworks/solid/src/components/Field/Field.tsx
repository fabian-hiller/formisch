import {
  type RequiredPath,
  type Schema,
  type ValidPath,
} from '@formisch/core/solid';
import type { JSX } from 'solid-js';
import type * as v from 'valibot';
import { useField } from '../../primitives/index.ts';
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
export function Field<TSchema extends Schema, TFieldPath extends RequiredPath>(
  props: FieldProps<TSchema, TFieldPath>
): JSX.Element;
export function Field(props: FieldProps): JSX.Element {
  const field = useField(() => props.of, {
    get path() {
      return props.path;
    },
  });
  return <>{props.render(field)}</>;
}
