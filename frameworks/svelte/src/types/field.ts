import type {
  FieldElement,
  PartialValues,
  PathValue,
  RequiredPath,
  Schema,
  ValidArrayPath,
  ValidPath,
} from '@formisch/core/svelte';
import type { FocusEventHandler, FormEventHandler } from 'svelte/elements';
import type * as v from 'valibot';

/**
 * Value type of the field element props.
 */
export interface FieldElementProps {
  readonly name: string;
  readonly autofocus: boolean;
  readonly [ref: symbol]: (element: FieldElement) => () => void;
  readonly onfocus: FocusEventHandler<FieldElement>;
  readonly oninput: FormEventHandler<FieldElement>;
  readonly onchange: FormEventHandler<FieldElement>;
  readonly onblur: FocusEventHandler<FieldElement>;
}

/**
 * Value type of the field store.
 */
export interface FieldStore<
  TSchema extends Schema = Schema,
  TFieldPath extends RequiredPath = RequiredPath,
> {
  readonly path: ValidPath<v.InferInput<TSchema>, TFieldPath>;
  readonly input: PartialValues<PathValue<v.InferInput<TSchema>, TFieldPath>>;
  readonly errors: [string, ...string[]] | null;
  readonly isTouched: boolean;
  readonly isDirty: boolean;
  readonly isValid: boolean;
  readonly props: FieldElementProps;
}

/**
 * Value type of the field array store.
 */
export interface FieldArrayStore<
  TSchema extends Schema = Schema,
  TFieldArrayPath extends RequiredPath = RequiredPath,
> {
  readonly path: ValidArrayPath<v.InferInput<TSchema>, TFieldArrayPath>;
  readonly items: string[];
  readonly errors: [string, ...string[]] | null;
  readonly isTouched: boolean;
  readonly isDirty: boolean;
  readonly isValid: boolean;
}
