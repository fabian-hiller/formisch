import { type FieldSchema, initializeFieldStore } from "../../field/index.ts";
import { createSignal } from "../../framework/index.ts";
import type {
	FormConfig,
	InternalFormStore,
	Schema,
} from "../../types/index.ts";
import { createParser } from "./createParser.ts";

export function createFormStore<TSchema extends Schema>(
	config: FormConfig<TSchema>,
): InternalFormStore<TSchema> {
	// Create store object
	const store: Partial<InternalFormStore<TSchema>> = {};

	// Initialize internal field store
	// Check if it's a schema adapter and extract the Valibot schema
	const fieldSchema = (config.schema as any)?.valibotSchema || config.schema;
	initializeFieldStore(
		store,
		fieldSchema as FieldSchema,
		config.initialInput,
		[],
	);

	// Set form config and validation
	store.validate = config.validate ?? "submit";
	store.revalidate = config.revalidate ?? "input";
	store.parse = createParser(config.schema);

	// Initialize form signals
	store.isSubmitting = createSignal(false);
	store.isSubmitted = createSignal(false);
	store.isValidating = createSignal(false);

	// Return store object
	return store as InternalFormStore<TSchema>;
}
