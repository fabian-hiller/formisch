import { component$, Slot } from '@qwik.dev/core';
import type { DocumentHead } from '@qwik.dev/router';
import { DocsLayout } from '~/components';
import { useFramework } from '../plugin@framework';

export const head: DocumentHead = ({ resolveValue }) => {
  const framework = resolveValue(useFramework);
  return {
    meta: [
      {
        name: 'docsearch:framework',
        content: framework,
      },
    ],
  };
};

export default component$(() => (
  <DocsLayout>
    <Slot />
  </DocsLayout>
));
