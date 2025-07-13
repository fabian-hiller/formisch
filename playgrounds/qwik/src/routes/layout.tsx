import { component$, Slot } from '@qwik.dev/core';
import { Tabs } from '~/components';

export default component$(() => (
  <div class="space-y-12 md:space-y-14 lg:mx-auto lg:max-w-6xl lg:space-y-16">
    <Tabs items={['Login', 'Payment', 'Todos', 'Special', 'Nested']} />
    <main>
      <Slot />
    </main>
  </div>
));
