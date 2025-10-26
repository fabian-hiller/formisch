import type { PropertyProps } from '~/components';

export const properties: Record<string, PropertyProps> = {
  ValidationMode: {
    type: {
      type: 'union',
      options: [
        {
          type: 'string',
          value: 'initial',
        },
        {
          type: 'string',
          value: 'touch',
        },
        {
          type: 'string',
          value: 'input',
        },
        {
          type: 'string',
          value: 'change',
        },
        {
          type: 'string',
          value: 'blur',
        },
        {
          type: 'string',
          value: 'submit',
        },
      ],
    },
  },
};
