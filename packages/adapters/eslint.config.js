import js from "@eslint/js";

export default [
	js.configs.recommended,
	{
		languageOptions: {
			ecmaVersion: 2020,
			sourceType: "module",
		},
		rules: {
			"@typescript-eslint/no-unused-vars": "off",
			"no-unused-vars": "off",
		},
	},
];
