import { cloudflarePagesAdapter } from '@qwik.dev/router/adapters/cloudflare-pages/vite';
import { extendConfig } from '@qwik.dev/router/vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import baseConfig from '../../vite.config.ts';

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
          input: ['src/entry.cloudflare-pages.tsx'],
        },
      },
      plugins: [
        cloudflarePagesAdapter(),
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
