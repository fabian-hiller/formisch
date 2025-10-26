import { component$, Slot, useSignal } from '@qwik.dev/core';
import { DocSearch, Footer, Header, RoutingIndicator } from '~/components';

export default component$(() => {
  // Use search open signal
  const searchOpen = useSignal(false);

  return (
    <>
      <RoutingIndicator />
      <Header searchOpen={searchOpen} />
      <Slot />
      <Footer />
      <DocSearch open={searchOpen} />
    </>
  );
});
