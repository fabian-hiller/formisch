import type {
  FieldElement,
  PartialValues,
  PathValue,
  RequiredPath,
  Schema,
  ValidArrayPath,
  ValidPath,
} from '@formisch/core/qwik';
import type { QRL, ReadonlySignal } from '@qwik.dev/core';
import type * as v from 'valibot';

/**
 * Value type of the field element props.
 */
export interface FieldElementProps {
  readonly name: string;
  readonly autofocus: boolean;
  readonly ref: QRL<(element: FieldElement) => void>;
  readonly onFocus$: QRL<(event: FocusEvent, element: FieldElement) => void>;
  readonly onInput$: QRL<(event: InputEvent, element: FieldElement) => void>;
  readonly onChange$: QRL<(event: Event, element: FieldElement) => void>;
  readonly onBlur$: QRL<(event: FocusEvent, element: FieldElement) => void>;
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
