import type {
  FieldElement,
  PartialValues,
  PathValue,
  RequiredPath,
  Schema,
  ValidArrayPath,
  ValidPath,
} from '@formisch/core/preact';
import type { ReadonlySignal } from '@preact/signals';
import type { JSX } from 'preact';
import type * as v from 'valibot';

/**
 * Value type of the field element props.
 */
export interface FieldElementProps {
  readonly name: string;
  readonly autofocus: boolean;
  readonly ref: (element: FieldElement) => void;
  readonly onFocus: JSX.FocusEventHandler<FieldElement>;
  readonly onInput: JSX.InputEventHandler<FieldElement>;
  readonly onChange: JSX.GenericEventHandler<FieldElement>;
  readonly onBlur: JSX.FocusEventHandler<FieldElement>;
}

/**
 * Value type of the field store.
 */
export interface FieldStore<
  TSchema extends Schema = Schema,
  TFieldPath extends RequiredPath = RequiredPath,
> {
  readonly path: ReadonlySignal<ValidPath<v.InferInput<TSchema>, TFieldPath>>;
  readonly input: ReadonlySignal<
    PartialValues<PathValue<v.InferInput<TSchema>, TFieldPath>>
  >;
  readonly errors: ReadonlySignal<[string, ...string[]] | null>;
  readonly isTouched: ReadonlySignal<boolean>;
  readonly isDirty: ReadonlySignal<boolean>;
  readonly isValid: ReadonlySignal<boolean>;
  readonly props: FieldElementProps;
}

/**
 * Value type of the field array store.
 */
export interface FieldArrayStore<
  TSchema extends Schema = Schema,
  TFieldArrayPath extends RequiredPath = RequiredPath,
> {
  readonly path: ReadonlySignal<
    ValidArrayPath<v.InferInput<TSchema>, TFieldArrayPath>
  >;
  readonly items: ReadonlySignal<string[]>;
  readonly errors: ReadonlySignal<[string, ...string[]] | null>;
  readonly isTouched: ReadonlySignal<boolean>;
  readonly isDirty: ReadonlySignal<boolean>;
  readonly isValid: ReadonlySignal<boolean>;
}
