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
  form: {
    type: {
      type: 'custom',
      name: 'BaseFormStore',
      href: '/core/api/BaseFormStore/',
      generics: [
        {
          type: 'custom',
          name: 'TSchema',
        },
      ],
    },
  },
  handler: {
    type: {
      type: 'custom',
      name: 'SubmitHandler',
      href: '/core/api/SubmitHandler/',
      generics: [
        {
          type: 'custom',
          name: 'TSchema',
        },
      ],
    },
  },
  result: {
    type: {
      type: 'function',
      params: [
        {
          name: 'event',
          type: {
            type: 'custom',
            name: 'SubmitEvent',
            href: '../SubmitEvent/',
          },
        },
      ],
      return: 'void',
    },
  },
};
