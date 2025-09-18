import { getFieldInput, walkFieldStore } from "../../field/index.ts";
import { batch, untrack } from "../../framework/index.ts";
import type {
	GenericValidationResult,
	InternalFormStore,
	Schema,
} from "../../types/index.ts";

export interface ValidateFormInputConfig {
	readonly shouldFocus?: boolean | undefined;
}

export async function validateFormInput<TSchema extends Schema>(
	internalFormStore: InternalFormStore<TSchema>,
	config?: ValidateFormInputConfig,
): Promise<GenericValidationResult> {
	internalFormStore.validators++;
	internalFormStore.isValidating.value = true;

	const result = await internalFormStore.parse(
		untrack(() => getFieldInput(internalFormStore)),
	);

	let rootErrors: [string, ...string[]] | undefined;
	let nestedErrors:
		| Record<string, [string, ...string[]] | undefined>
		| undefined;

	if (result.issues) {
		nestedErrors = {};
		for (const issue of result.issues) {
			if (issue.path) {
				const path = [];
				for (const pathItem of issue.path) {
					const key = pathItem.key;
					const keyType = typeof key;
					const itemType = pathItem.type;
					if (
						(keyType !== "string" && keyType !== "number") ||
						itemType === "map" ||
						itemType === "set"
					) {
						break;
					}
					path.push(key);
				}
				const name = JSON.stringify(path);
				const fieldErrors = nestedErrors[name];
				if (fieldErrors) {
					fieldErrors.push(issue.message);
				} else {
					nestedErrors[name] = [issue.message];
				}
			} else {
				if (rootErrors) {
					rootErrors.push(issue.message);
				} else {
					rootErrors = [issue.message];
				}
			}
		}
	}

	let shouldFocus = config?.shouldFocus ?? false;

	batch(() => {
		walkFieldStore(internalFormStore, (internalFieldStore) => {
			if (internalFieldStore.name === "[]") {
				internalFieldStore.errors.value = rootErrors ?? null;
			} else {
				const fieldErrors = nestedErrors?.[internalFieldStore.name] ?? null;
				internalFieldStore.errors.value = fieldErrors;
				if (shouldFocus && fieldErrors) {
					internalFieldStore.elements[0]?.focus();
					shouldFocus = false;
				}
			}
		});

		internalFormStore.validators--;
		internalFormStore.isValidating.value = internalFormStore.validators > 0;
	});

	return result;
}
