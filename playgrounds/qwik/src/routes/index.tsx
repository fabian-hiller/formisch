import type { RequestHandler } from '@qwik.dev/router';

export const onGet: RequestHandler = async ({ redirect }) => {
  throw redirect(301, '/login');
};
