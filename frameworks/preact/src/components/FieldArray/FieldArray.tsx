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
 * Properties of the `FieldArray` component.
 */
export interface FieldArrayProps<
  TSchema extends Schema = Schema,
  TFieldArrayPath extends RequiredPath = RequiredPath,
> {
  readonly of: FormStore<TSchema>;
  readonly path: ValidArrayPath<v.InferInput<TSchema>, TFieldArrayPath>;
  readonly children: (
    store: FieldArrayStore<TSchema, TFieldArrayPath>
  ) => JSX.Element;
}

/**
 * Headless field array that provides reactive properties and state.
 */
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
