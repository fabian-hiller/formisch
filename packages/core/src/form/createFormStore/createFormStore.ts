import type * as v from 'valibot';
import { type FieldSchema, initializeFieldStore } from '../../field/index.ts';
import { createSignal } from '../../framework/index.ts';
import type {
  FormConfig,
  InternalFormStore,
  Schema,
} from '../../types/index.ts';

export function createFormStore(
  config: FormConfig,
  validate: (input: unknown) => Promise<v.SafeParseResult<Schema>>
): InternalFormStore {
  // Create store object
  const store: Partial<InternalFormStore> = {};

  // Initialize internal field store
  initializeFieldStore(
    store,
    config.schema as FieldSchema,
    config.initialInput,
    []
  );

  // Set form config and validation
  store.validateOn = config.validateOn ?? 'submit';
  store.revalidateOn = config.revalidateOn ?? 'input';
  store.validate = validate;

  // Initialize form signals
  store.isSubmitting = createSignal(false);
  store.isSubmitted = createSignal(false);
  store.isValidating = createSignal(false);

  // Return store object
  return store as InternalFormStore;
}
