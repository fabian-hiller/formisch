import eslint from '@eslint/js';
import preact from 'eslint-config-preact';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.strict,
  tseslint.configs.stylistic,
  {
    ...preact[1],
    ignores: ['eslint.config.js'],
    languageOptions: {
      ...preact[1].languageOptions,
      parser: undefined,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      ...preact[1].rules,
      'no-unused-vars': 'off',
      'no-redeclare': 'off',
    },
  }
);
