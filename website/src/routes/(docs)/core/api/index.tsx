import { component$ } from '@qwik.dev/core';
import { routeLoader$ } from '@qwik.dev/router';
import { useFramework } from '~/routes/plugin@framework';

export const useRedirect = routeLoader$(async ({ resolveValue, redirect }) => {
  const framework = await resolveValue(useFramework);
  throw redirect(302, `/${framework}/api`);
});

export default component$(() => {
  useRedirect();
  return null;
});
