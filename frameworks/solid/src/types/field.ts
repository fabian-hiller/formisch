import type {
  FieldElement,
  PartialValues,
  PathValue,
  RequiredPath,
  Schema,
  ValidArrayPath,
  ValidPath,
} from '@formisch/core/solid';
import type { JSX } from 'solid-js';
import type * as v from 'valibot';

/**
 * Value type of the field element props.
 */
export interface FieldElementProps {
  readonly name: string;
  readonly autofocus: boolean;
  readonly ref: (element: FieldElement) => void;
  readonly onFocus: JSX.EventHandler<FieldElement, FocusEvent>;
  readonly onInput: JSX.EventHandler<FieldElement, InputEvent>;
  readonly onChange: JSX.EventHandler<FieldElement, Event>;
  readonly onBlur: JSX.EventHandler<FieldElement, FocusEvent>;
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
