import { type BaseFormStore, INTERNAL } from '@formisch/core';

export function submit(form: BaseFormStore): void {
  form[INTERNAL].element?.requestSubmit();
}
