import type { SchemaAdapter } from "@formisch/adapters";
import type * as v from "valibot";
import type { GenericValidationResult, Schema } from "../../types/index.js";

/**
 * Create a parser function that works with both Valibot schemas and adapters
 */
export function createParser<TSchema extends Schema>(
	schema: TSchema,
): (input: unknown) => Promise<GenericValidationResult> {
	// Check if it's a schema adapter
	if (typeof schema === "object" && schema !== null && "parse" in schema) {
		const adapter = schema as SchemaAdapter<any, any, any>;
		return async (input: unknown) => {
			const result = await adapter.parse(input);
			return {
				success: result.success,
				data: result.data,
				issues: result.issues,
			};
		};
	}

	// Fallback to Valibot for backward compatibility
	const valibotSchema = schema as v.GenericSchema | v.GenericSchemaAsync;
	return async (input: unknown) => {
		const result = await v.safeParseAsync(valibotSchema, input);
		return {
			success: result.success,
			data: result.output,
			issues: result.issues?.map((issue) => ({
				message: issue.message,
				path: issue.path?.map((pathItem) => ({
					key: pathItem.key,
					type: pathItem.type as "object" | "array" | "map" | "set",
				})),
			})),
		};
	};
}
