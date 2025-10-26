import type { PropertyProps } from '~/components';

export const properties: Record<string, PropertyProps> = {
  path: {
    type: 'undefined',
    default: 'undefined',
  },
  errors: {
    type: {
      type: 'union',
      options: [
        {
          type: 'tuple',
          items: [
            'string',
            {
              type: 'array',
              spread: true,
              item: 'string',
            },
          ],
        },
        'null',
      ],
    },
  },
};
