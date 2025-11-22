import type { PropertyProps } from '~/components';

export const properties: Record<string, PropertyProps> = {
  TValue: {
    type: 'unknown',
  },
  PartialValues: {
    type: {
      type: 'union',
      options: [
        {
          type: 'custom',
          name: 'TValue',
        },
        'undefined',
      ],
    },
  },
};
