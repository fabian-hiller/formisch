import {
  type RequiredPath,
  type Schema,
  type ValidArrayPath,
} from '@formisch/core/qwik';
import { component$, JSXOutput, QRL } from '@qwik.dev/core';
import type * as v from 'valibot';
import { useFieldArray } from '../../hooks/index.ts';
import { useResolvedQrl } from '../../hooks/useResolvedQrl/index.ts';
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
  readonly render$: QRL<
    (store: FieldArrayStore<TSchema, TFieldArrayPath>) => JSXOutput
  >;
}

/**
 * Headless field array that provides reactive properties and state.
 */
export const FieldArray = component$(
  <TSchema extends Schema, TFieldArrayPath extends RequiredPath>({
    of,
    path,
    render$,
  }: FieldArrayProps<TSchema, TFieldArrayPath>): JSXOutput => {
    const field = useFieldArray(of, { path });
    const render = useResolvedQrl(render$);
    return render(field);
  }
);
