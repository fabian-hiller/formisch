import { type BaseFormStore, INTERNAL, walkFieldStore } from '@formisch/core';

export function getAllErrors(
  form: BaseFormStore
): [string, ...string[]] | null {
  let allErrors: [string, ...string[]] | null = null;
  walkFieldStore(form[INTERNAL], (internalFieldStore) => {
    const errors = internalFieldStore.errors.value;
    if (errors) {
      if (allErrors) {
        allErrors.push(...errors);
      } else {
        allErrors = [...errors];
      }
    }
  });
  return allErrors;
}
