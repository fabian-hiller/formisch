import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['./src/index.ts'],
  outDir: 'dist',
  outExtensions: () => ({
    dts: '.d.ts',
    js: '.qwik.js',
  }),
  dts: {
    resolve: ['@formisch/core/qwik', '@formisch/methods/qwik'],
  },
});
