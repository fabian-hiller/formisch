import {
  type RequiredPath,
  type Schema,
  type ValidArrayPath,
} from '@formisch/core/solid';
import type { JSX } from 'solid-js';
import type * as v from 'valibot';
import { useFieldArray } from '../../primitives/index.ts';
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
>(props: FieldArrayProps<TSchema, TFieldArrayPath>): JSX.Element;
export function FieldArray(props: FieldArrayProps): JSX.Element {
  const field = useFieldArray<Schema, RequiredPath>(
    () => props.of,
    () => ({ path: props.path })
  );
  return <>{props.children(field)}</>;
}
