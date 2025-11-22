import type { PropertyProps } from '~/components';

export const properties: Record<string, PropertyProps> = {
  form: {
    type: {
      type: 'custom',
      name: 'BaseFormStore',
      href: '/core/api/BaseFormStore/',
    },
  },
  result: {
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
