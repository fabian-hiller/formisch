import type { PropertyProps } from '~/components';

export const properties: Record<string, PropertyProps> = {
  TSchema: {
    modifier: 'extends',
    type: {
      type: 'custom',
      name: 'Schema',
      href: '/core/api/Schema/',
    },
  },
  path: {
    type: 'undefined',
    default: 'undefined',
  },
  input: {
    type: {
      type: 'custom',
      name: 'v.InferInput',
      href: 'https://valibot.dev/api/InferInput/',
      generics: [
        {
          type: 'custom',
          name: 'TSchema',
        },
      ],
    },
  },
};
