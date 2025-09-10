import type { BaseFormStore, Schema } from '@formisch/core/svelte';

export interface FormStore<TSchema extends Schema = Schema>
  extends BaseFormStore<TSchema> {
  readonly isSubmitting: boolean;
  readonly isSubmitted: boolean;
  readonly isValidating: boolean;
  readonly isTouched: boolean;
  readonly isDirty: boolean;
  readonly isValid: boolean;
  readonly errors: [string, ...string[]] | null;
}
