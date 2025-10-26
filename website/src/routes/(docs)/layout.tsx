import { component$, Slot } from '@qwik.dev/core';
import { DocsLayout } from '~/components';

export default component$(() => (
  <DocsLayout>
    <Slot />
  </DocsLayout>
));
