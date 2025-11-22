import type { PropertyProps } from '~/components';

export const properties: Record<string, PropertyProps> = {
  FieldElement: {
    type: {
      type: 'union',
      options: [
        {
          type: 'custom',
          name: 'HTMLInputElement',
        },
        {
          type: 'custom',
          name: 'HTMLSelectElement',
        },
        {
          type: 'custom',
          name: 'HTMLTextAreaElement',
        },
      ],
    },
  },
};
