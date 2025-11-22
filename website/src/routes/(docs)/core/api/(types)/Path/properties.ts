import type { PropertyProps } from '~/components';

export const properties: Record<string, PropertyProps> = {
  Path: {
    type: {
      type: 'custom',
      name: 'ReadonlyArray',
      generics: [
        {
          type: 'custom',
          name: 'PathKey',
          href: '../PathKey/',
        },
      ],
    },
  },
};
