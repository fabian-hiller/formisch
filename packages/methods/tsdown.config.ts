import { RolldownPluginOption } from 'rolldown';
import { defineConfig, UserConfig, UserConfigFn } from 'tsdown';

type Framework = 'qwik' | 'solid';

/**
 * Rolldown plugin to rewrite framework-specific imports.
 */
function rewriteFrameworkImports(framework: Framework): RolldownPluginOption {
  return {
    name: 'rewrite-framework-imports',

    // Transform core imports to framework-specific imports
    transform(code) {
      return code.replace('@formisch/core', `@formisch/core/${framework}`);
    },
  };
}

/**
 * Defines the configuration for a specific framework.
 */
function defineFrameworkConfig(
  framework: Framework
): UserConfig | UserConfigFn {
  return defineConfig({
    entry: ['./src/index.ts'],
    external: [
      '@formisch/core',
      `@formisch/core/${framework}`,
      '@qwik.dev/core',
      'solid-js',
      'valibot',
    ],
    clean: true,
    format: ['es'],
    minify: false,
    dts: true,
    outDir: './dist',
    outExtensions: () => ({
      js: `.${framework}.js`,
      dts: `.${framework}.d.ts`,
    }),
    plugins: [rewriteFrameworkImports(framework)],
  });
}

const config: (UserConfig | UserConfigFn)[] = [
  defineFrameworkConfig('qwik'),
  defineFrameworkConfig('solid'),
];

export default config;
