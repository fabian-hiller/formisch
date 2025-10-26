import type { PropertyProps } from '~/components';

export const properties: Record<string, PropertyProps> = {
  MaybeGetter: {
    type: {
      type: 'union',
      options: [
        {
          type: 'custom',
          name: 'T',
        },
        {
          type: 'function',
          params: [],
          return: {
            type: 'custom',
            name: 'T',
          },
        },
      ],
    },
  },
  T: {
    modifier: 'extends',
    type: 'unknown',
  },
};
