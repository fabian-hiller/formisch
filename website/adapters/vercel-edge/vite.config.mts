import { vercelEdgeAdapter } from '@qwik.dev/router/adapters/vercel-edge/vite';
import { extendConfig } from '@qwik.dev/router/vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import baseConfig from '../../vite.config';

export default extendConfig(
  // @ts-ignore
  baseConfig,
  () => {
    return {
      ssr: {
        external: ['@vercel/og'],
      },
      build: {
        ssr: true,
        rollupOptions: {
          input: ['src/entry.vercel-edge.tsx'],
        },
        minify: true,
        outDir: '.vercel/output/functions/_qwik-router.func',
      },
      plugins: [
        vercelEdgeAdapter({
          ssg: {
            include: [],
            sitemapOutFile: null,
          },
        }),
        viteStaticCopy({
          targets: [
            {
              src: 'node_modules/@vercel/og/**/*',
              dest: 'node_modules/@vercel/og/',
            },
          ],
        }),
      ],
    };
  }
);
