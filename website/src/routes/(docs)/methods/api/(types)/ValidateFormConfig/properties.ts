import type { PropertyProps } from '~/components';

export const properties: Record<string, PropertyProps> = {
  shouldFocus: {
    type: 'boolean',
    default: {
      type: 'boolean',
      value: false,
    },
  },
};
