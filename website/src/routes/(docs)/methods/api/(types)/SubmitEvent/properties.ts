import type { PropertyProps } from '~/components';

export const properties: Record<string, PropertyProps> = {
  submitter: {
    type: {
      type: 'union',
      options: [
        {
          type: 'custom',
          name: 'HTMLElement',
        },
        'null',
      ],
    },
  },
};
