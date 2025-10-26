import { component$ } from '@qwik.dev/core';
import { type DocumentHead } from '@qwik.dev/router';
import { ActionButton, ButtonGroup } from '~/components';

export const head: DocumentHead = {
  title: 'Formisch playground',
};

export default component$(() => (
  <main class="max-w-(--breakpoint-lg) flex w-full flex-1 flex-col items-center self-center py-12 md:py-20 lg:py-32">
    <div class="mdx text-center">
      <h1>Formisch playground</h1>
      <p>
        Sorry, the page you are looking for is under construction. Please come
        back in a few days.
      </p>
    </div>

    <ButtonGroup class="mt-10 px-8 md:mt-12 lg:mt-14 lg:px-10">
      <ActionButton
        variant="secondary"
        label="Back to home page"
        type="link"
        href="/"
      />
    </ButtonGroup>
  </main>
));
