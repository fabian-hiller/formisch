import type * as v from "valibot";

// Legacy Valibot schema type for backward compatibility
export type ValibotSchema = v.GenericSchema | v.GenericSchemaAsync;

// Generic schema adapter interface
export interface SchemaAdapter<
	TSchema = unknown,
	TInput = unknown,
	TOutput = unknown,
> {
	/**
	 * Parse and validate input against the schema
	 */
	parse(input: TInput): Promise<{
		success: boolean;
		data?: TOutput;
		issues?: Array<{
			message: string;
			path?: Array<{
				key: string | number;
				type: "object" | "array" | "map" | "set";
			}>;
		}>;
	}>;

	/**
	 * Get the input type from the schema
	 */
	getInputType(): TInput;

	/**
	 * Get the output type from the schema
	 */
	getOutputType(): TOutput;

	/**
	 * Get the raw schema object
	 */
	getSchema(): TSchema;
}

// Generic schema type that can be either a Valibot schema or a schema adapter
export type Schema = ValibotSchema | SchemaAdapter<any, any, any>;
