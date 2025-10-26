import type { PropertyProps } from '~/components';

export const properties: Record<string, PropertyProps> = {
  TValue: {
    type: 'unknown',
  },
  TPath: {
    modifier: 'extends',
    type: {
      type: 'custom',
      name: 'RequiredPath',
      href: '../RequiredPath/',
    },
  },
  ValidArrayPath: {
    type: {
      type: 'custom',
      name: 'ValidArrayPath',
      generics: [
        {
          type: 'custom',
          name: 'TValue',
        },
        {
          type: 'custom',
          name: 'TPath',
        },
      ],
    },
  },
};
