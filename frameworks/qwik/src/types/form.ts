import type { BaseFormStore, Schema } from '@formisch/core/qwik';
import type { ReadonlySignal } from '@qwik.dev/core';

export interface FormStore<TSchema extends Schema = Schema>
  extends BaseFormStore<TSchema> {
  readonly isSubmitting: ReadonlySignal<boolean>;
  readonly isSubmitted: ReadonlySignal<boolean>;
  readonly isValidating: ReadonlySignal<boolean>;
  readonly isTouched: ReadonlySignal<boolean>;
  readonly isDirty: ReadonlySignal<boolean>;
  readonly isValid: ReadonlySignal<boolean>;
  readonly errors: ReadonlySignal<[string, ...string[]] | null>;
}
