import { component$ } from '@qwik.dev/core';
import { routeLoader$ } from '@qwik.dev/router';

export const useRedirect = routeLoader$(async ({ redirect }) => {
  throw redirect(302, `/playground/login`);
});

export default component$(() => {
  useRedirect();
  return null;
});
