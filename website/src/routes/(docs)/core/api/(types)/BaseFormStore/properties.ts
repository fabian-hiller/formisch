import type { PropertyProps } from '~/components';

export const properties: Record<string, PropertyProps> = {
  TSchema: {
    modifier: 'extends',
    type: {
      type: 'custom',
      name: 'Schema',
      href: '../Schema/',
    },
    default: {
      type: 'custom',
      name: 'Schema',
      href: '../Schema/',
    },
  },
  INTERNAL: {
    type: {
      type: 'custom',
      name: 'InternalFormStore',
      href: '../InternalFormStore/',
      generics: [
        {
          type: 'custom',
          name: 'TSchema',
        },
      ],
    },
  },
};
