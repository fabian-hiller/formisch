import { z } from "zod";
import type { SchemaAdapter, ValidationResult } from "./types.js";

/**
 * Zod schema adapter
 */
export class ZodAdapter<TSchema extends z.ZodTypeAny>
	implements SchemaAdapter<TSchema, z.input<TSchema>, z.output<TSchema>>
{
	constructor(private schema: TSchema) {}

	// Convert Zod schema to Valibot schema for field initialization
	get valibotSchema() {
		return this.convertZodToValibot(this.schema);
	}

	private convertZodToValibot(zodSchema: z.ZodTypeAny): any {
		// This is a simplified conversion - in practice, you'd need a more comprehensive converter
		// For now, we'll create a basic object schema that matches the Zod structure
		if (zodSchema instanceof z.ZodObject) {
			const entries: any = {};
			for (const [key, value] of Object.entries(zodSchema.shape)) {
				entries[key] = this.convertZodToValibot(value as z.ZodTypeAny);
			}
			return {
				type: "object",
				entries,
			};
		}

		if (zodSchema instanceof z.ZodString) {
			return {
				type: "string",
			};
		}

		if (zodSchema instanceof z.ZodNumber) {
			return {
				type: "number",
			};
		}

		if (zodSchema instanceof z.ZodBoolean) {
			return {
				type: "boolean",
			};
		}

		// Fallback for other types
		return {
			type: "unknown",
		};
	}

	async parse(
		input: z.input<TSchema>,
	): Promise<ValidationResult<z.output<TSchema>>> {
		const result = this.schema.safeParse(input);

		if (result.success) {
			return {
				success: true,
				data: result.data,
			};
		}

		return {
			success: false,
			issues: result.error.issues.map((issue: z.ZodIssue) => ({
				message: issue.message,
				path: issue.path?.map((pathItem: string | number) => ({
					key: String(pathItem),
					type: "object" as const, // Zod doesn't distinguish between object/array in path
				})),
			})),
		};
	}

	getInputType(): z.input<TSchema> {
		// This is a type-only method, the actual implementation is handled by TypeScript
		return undefined as z.input<TSchema>;
	}

	getOutputType(): z.output<TSchema> {
		// This is a type-only method, the actual implementation is handled by TypeScript
		return undefined as z.output<TSchema>;
	}

	getSchema(): TSchema {
		return this.schema;
	}
}

/**
 * Create a Zod schema adapter
 */
export function zodForm<TSchema extends z.ZodTypeAny>(
	schema: TSchema,
): ZodAdapter<TSchema> {
	return new ZodAdapter(schema);
}
