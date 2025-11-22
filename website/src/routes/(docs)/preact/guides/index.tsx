import { component$ } from '@qwik.dev/core';
import { routeLoader$ } from '@qwik.dev/router';

export const useRedirect = routeLoader$(({ redirect }) => {
  throw redirect(302, '/preact/guides/introduction/');
});

export default component$(() => {
  useRedirect();
  return null;
});
