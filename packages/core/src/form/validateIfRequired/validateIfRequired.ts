import { getFieldBool } from '../../field/index.ts';
import { untrack } from '../../framework/index.ts';
import type {
  InternalFieldStore,
  InternalFormStore,
  ValidationMode,
} from '../../types/index.ts';
import { validateFormInput } from '../validateFormInput/validateFormInput.ts';

export function validateIfRequired(
  internalFormStore: InternalFormStore,
  internalFieldStore: InternalFieldStore,
  validationModes: ValidationMode
): void {
  if (
    validationModes ===
    (internalFormStore.validate === 'initial' ||
    (internalFormStore.validate === 'submit'
      ? untrack(() => internalFormStore.isSubmitted.value)
      : untrack(() => getFieldBool(internalFieldStore, 'errors')))
      ? internalFormStore.revalidate
      : internalFormStore.validate)
  ) {
    validateFormInput(internalFormStore);
  }
}
