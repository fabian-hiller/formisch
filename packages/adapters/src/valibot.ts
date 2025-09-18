import * as v from "valibot";
import type { SchemaAdapter, ValidationResult } from "./types.js";

/**
 * Valibot schema adapter
 */
export class ValibotAdapter<
	TSchema extends v.GenericSchema | v.GenericSchemaAsync,
> implements
		SchemaAdapter<TSchema, v.InferInput<TSchema>, v.InferOutput<TSchema>>
{
	constructor(private schema: TSchema) {}

	// Expose the Valibot schema for field initialization
	get valibotSchema() {
		return this.schema;
	}

	async parse(
		input: v.InferInput<TSchema>,
	): Promise<ValidationResult<v.InferOutput<TSchema>>> {
		const result = await v.safeParseAsync(this.schema, input);

		if (result.success) {
			return {
				success: true,
				data: result.output,
			};
		}

		return {
			success: false,
			issues: result.issues.map((issue: v.Issue) => ({
				message: issue.message,
				path: issue.path?.map((pathItem: v.PathItem) => ({
					key: pathItem.key,
					type: pathItem.type as "object" | "array" | "map" | "set",
				})),
			})),
		};
	}

	getInputType(): v.InferInput<TSchema> {
		// This is a type-only method, the actual implementation is handled by TypeScript
		return undefined as v.InferInput<TSchema>;
	}

	getOutputType(): v.InferOutput<TSchema> {
		// This is a type-only method, the actual implementation is handled by TypeScript
		return undefined as v.InferOutput<TSchema>;
	}

	getSchema(): TSchema {
		return this.schema;
	}
}

/**
 * Create a Valibot schema adapter
 */
export function valibotForm<
	TSchema extends v.GenericSchema | v.GenericSchemaAsync,
>(schema: TSchema): ValibotAdapter<TSchema> {
	return new ValibotAdapter(schema);
}
