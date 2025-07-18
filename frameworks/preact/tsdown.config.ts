import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['./src/index.ts'],
  outDir: 'dist',
  dts: {
    resolve: ['@formisch/core/preact', '@formisch/methods/preact'],
  },
});
