import type { SchemaAdapter } from "@formisch/types";

// Re-export the SchemaAdapter type from types
export type { SchemaAdapter };

/**
 * Generic validation result interface that can be adapted to different schema libraries
 */
export interface ValidationResult<T = unknown> {
	success: boolean;
	data?: T;
	issues?: ValidationIssue[];
}

/**
 * Generic validation issue interface
 */
export interface ValidationIssue {
	message: string;
	path?: ValidationPathItem[];
}

/**
 * Generic validation path item interface
 */
export interface ValidationPathItem {
	key: string | number;
	type: "object" | "array" | "map" | "set";
}
