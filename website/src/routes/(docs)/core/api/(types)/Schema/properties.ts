import type { PropertyProps } from '~/components';

export const properties: Record<string, PropertyProps> = {
  Schema: {
    type: {
      type: 'union',
      options: [
        {
          type: 'custom',
          name: 'GenericSchema',
          href: 'https://valibot.dev/api/GenericSchema/',
        },
        {
          type: 'custom',
          name: 'GenericSchemaAsync',
          href: 'https://valibot.dev/api/GenericSchemaAsync/',
        },
      ],
    },
  },
};
