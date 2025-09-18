import { defineConfig } from "tsdown";

export default defineConfig({
	entry: ["src/index.ts"],
	format: ["esm"],
	dts: true,
	clean: true,
	splitting: false,
	sourcemap: false,
	minify: false,
	target: "es2020",
	external: ["valibot"],
});
