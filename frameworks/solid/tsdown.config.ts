import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['./src/index.tsx'],
  outDir: 'dist',
  clean: false,
  dts: {
    emitDtsOnly: true,
    resolve: ['@formisch/core/solid', '@formisch/methods/solid'],
  },
});
