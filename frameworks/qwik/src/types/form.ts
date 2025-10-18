import type { BaseFormStore, Schema } from '@formisch/core/qwik';
import type { ReadonlySignal } from '@qwik.dev/core';

/**
 * Form store interface.
 */
export interface FormStore<TSchema extends Schema = Schema>
  extends BaseFormStore<TSchema> {
  /**
   * Whether the form is currently submitting.
   */
  readonly isSubmitting: ReadonlySignal<boolean>;
  /**
   * Whether the form has been submitted.
   */
  readonly isSubmitted: ReadonlySignal<boolean>;
  /**
   * Whether the form is currently validating.
   */
  readonly isValidating: ReadonlySignal<boolean>;
  /**
   * Whether any field in the form has been touched.
   */
  readonly isTouched: ReadonlySignal<boolean>;
  /**
   * Whether any field in the form differs from its initial value.
   */
  readonly isDirty: ReadonlySignal<boolean>;
  /**
   * Whether the form is valid according to the schema.
   */
  readonly isValid: ReadonlySignal<boolean>;
  /**
   * The current error messages of the form.
   */
  readonly errors: ReadonlySignal<[string, ...string[]] | null>;
}
