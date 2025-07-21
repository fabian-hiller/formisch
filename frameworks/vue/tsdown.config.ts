import { defineConfig } from 'tsdown';
import Vue from 'unplugin-vue/rolldown';

export default defineConfig({
  entry: ['./src/index.ts'],
  outDir: 'dist',
  platform: 'neutral',
  plugins: [Vue({ isProduction: true })],
  dts: {
    vue: true,
    resolve: ['@formisch/core/vue', '@formisch/methods/vue'],
  },
});
