import type { SchemaAdapter } from "@formisch/adapters";
import type * as v from "valibot";
import type { Schema } from "./schema.js";

/**
 * Extract input type from a schema (either Valibot or adapter)
 */
export type InferInput<TSchema extends Schema> = TSchema extends SchemaAdapter<
	infer _,
	infer TInput,
	infer _
>
	? TInput
	: TSchema extends v.GenericSchema | v.GenericSchemaAsync
		? v.InferInput<TSchema>
		: never;

/**
 * Extract output type from a schema (either Valibot or adapter)
 */
export type InferOutput<TSchema extends Schema> = TSchema extends SchemaAdapter<
	infer _,
	infer _,
	infer TOutput
>
	? TOutput
	: TSchema extends v.GenericSchema | v.GenericSchemaAsync
		? v.InferOutput<TSchema>
		: never;

/**
 * Generic validation result that works with both Valibot and adapters
 */
export interface GenericValidationResult<T = unknown> {
	success: boolean;
	data?: T;
	issues?: Array<{
		message: string;
		path?: Array<{
			key: string | number;
			type: "object" | "array" | "map" | "set";
		}>;
	}>;
}
