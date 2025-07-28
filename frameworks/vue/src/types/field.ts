import type {
  PartialValues,
  PathValue,
  RequiredPath,
  Schema,
  ValidArrayPath,
  ValidPath,
} from '@formisch/core/vue';
import type * as v from 'valibot';
import {
  ComponentPublicInstance,
  ComputedRef,
  ShallowRef,
  WritableComputedRef,
} from 'vue';

/**
 * Value type of the field element props.
 */
export interface FieldElementProps {
  readonly name: string;
  readonly autofocus: boolean;
  readonly ref: (element: Element | ComponentPublicInstance | null) => void;
  readonly onFocus: (event: FocusEvent) => void;
  readonly onChange: (event: Event) => void;
  readonly onBlur: (event: FocusEvent) => void;
}

/**
 * Value type of the field store.
 */
export interface FieldStore<
  TSchema extends Schema = Schema,
  TFieldPath extends RequiredPath = RequiredPath,
> {
  readonly path: ValidPath<v.InferInput<TSchema>, TFieldPath>;
  get input(): PartialValues<PathValue<v.InferInput<TSchema>, TFieldPath>>;
  set input(value: PartialValues<PathValue<v.InferInput<TSchema>, TFieldPath>>);
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
