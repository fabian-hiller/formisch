import type { PropertyProps } from '~/components';

export const properties: Record<string, PropertyProps> = {
  PathKey: {
    type: {
      type: 'union',
      options: ['string', 'number'],
    },
  },
};
