import {
  type RequiredPath,
  type Schema,
  type ValidPath,
} from '@formisch/core/qwik';
import { component$, JSXOutput, QRL } from '@qwik.dev/core';
import type * as v from 'valibot';
import { useField } from '../../hooks/index.ts';
import { useResolvedQrl } from '../../hooks/useResolvedQrl/index.ts';
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
  readonly render$: QRL<(store: FieldStore<TSchema, TFieldPath>) => JSXOutput>;
}

/**
 * Headless form field that provides reactive properties and state.
 */
export const Field = component$(
  <TSchema extends Schema, TFieldPath extends RequiredPath>({
    of,
    path,
    render$,
  }: FieldProps<TSchema, TFieldPath>): JSXOutput => {
    const field = useField(of, { path });
    const render = useResolvedQrl(render$);
    return render(field);
  }
);
